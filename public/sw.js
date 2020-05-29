const staticCacheName = "static-page";
const assets = ["/", "/index.html", "/offline.html", "/img/lost-connection.png"];
// Installing SW
self.addEventListener("install", (evt) => {
    self.skipWaiting();
    console.log(evt);
    console.log("SW installed at: ", new Date().toLocaleTimeString());
    evt.waitUntil(
        caches.open(staticCacheName).then((cache) => {
            cache.addAll(assets);
        })
    );
});
// activating SW
self.addEventListener("activate", () => {
    self.skipWaiting();
    console.log("SW activated at: ", new Date().toLocaleTimeString());
});
// Fetching SW
self.addEventListener("fetch", (evt) => {
    if (!navigator.onLine) {
        evt.respondWith(
            caches.match(evt.request).then((response) => {
                if (response) {
                    return response;
                } else {
                    return caches.match(new Request("offline.html"));
                }
            })
        );
    } else {
        console.log("Online!");
        if (evt.request.method === "GET") {
            return updateCache(evt.request);
        } else {
            return fetch(evt.request);
        }
    }
});

//Listen to pushnotices
self.addEventListener("push", (event) => {
    if (event.data) {
        createNotification(event.data.text());
    }
});

// Creat a notification with notification API
const createNotification = (text) => {
    self.registration.showNotification("Här kommer en notis", {
        body: text,
        icon: "./img/icons/icons-192.png",
    });
};
// Update cache
function updateCache(request) {
    return fetch(request).then((response) => {
        if (response) {
            return caches.open(staticCacheName).then((cache) => {
                return cache.put(request, response.clone()).then(() => {
                    return response;
                });
            });
        }
    });
}