function requestNotificationPermission() {
    Notification.requestPermission().then((response) => {
        console.log(response);
    });
}

function createNotification(notice) {
    const play = notice.play;

    const notification = new Notification("New notice", {
        body: play,
    });

    notification.addEventListener("click", () => {
        window.open("https://localhost:0443/");
    });
}

export {
    requestNotificationPermission,
    createNotification
};