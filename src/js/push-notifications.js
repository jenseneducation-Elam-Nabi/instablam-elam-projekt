export default () => {
    let servicew;
    const publicKey = 'BBplhidqNPeLGzhIeXbQf736vi_WOJA3_b8mPS_0a1IWE77wQzojHmgLRw9ks4AQ3NpbSrSOgaD9Sqw4ghTlVfA';

    if ('serviceWorker' in navigator && 'PushManager' in window) {
        navigator.serviceWorker.ready.then((sw) => {
            servicew = sw;
            sw.pushManager.getSubscription().then((subscription) => {
                console.log('Is subscribed: ', subscription);
            });
        });
    }

    const urlB64ToUint8Array = (base64String) => {
        const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
        const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')
        const rawData = atob(base64)
        const outputArray = new Uint8Array(rawData.length)

        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i)
        }

        return outputArray
    }

    async function saveSubscription(subscription) {
        const url = 'https://push-notifications-api.herokuapp.com/api/notifications/save';

        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(subscription),
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const data = await response.json();
        console.log(data)
    }
    document.querySelector('.bell').addEventListener('click', (event) => {
        event.srcElement.disabled = true;

        servicew.pushManager.getSubscription().then(async (subscription) => {
            if (subscription) {
                subscription.unsubscribe();
                event.srcElement.disabled = false;
            } else {
                try {
                    const subscribed = await servicew.pushManager.subscribe({
                        userVisibleOnly: true,
                        applicationServerKey: urlB64ToUint8Array(publicKey)
                    });
                    saveSubscription(subscribed);
                    console.log(subscribed);
                    event.srcElement.disabled = false;
                } catch (error) {
                    console.log(error)
                }
            }
        });
    });
}