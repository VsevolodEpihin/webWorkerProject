async function openDatabase() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('CensoredTextsDB', 2);

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains('texts')) {
                db.createObjectStore('texts', { keyPath: 'name' });
            }
        };

        request.onsuccess = (event) => {
            resolve(event.target.result);
        };

        request.onerror = (event) => {
            reject('Ошибка открытия базы данных: ' + event.target.errorCode);
        };
    });
}

self.addEventListener('install', async (event) => {
    try {
        const db = await openDatabase();
    } catch (error) {
        console.error(error);
    }
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(clients.claim());
});

self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);

    if (url.pathname === '/save') {
        event.respondWith(handleSaveRequest(event.request));
    } else if (url.pathname === '/list') {
        event.respondWith(handleListRequest());
    } else if (url.pathname.startsWith('/load/')) {
        const name = url.pathname.split('/load/')[1];
        event.respondWith(handleLoadRequest(name));
    }
});

async function handleSaveRequest(request) {
    const { text, textName } = await request.json();
    const db = await openDatabase();

    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['texts'], 'readwrite');
        const store = transaction.objectStore('texts');
        
        const request = store.put({ name:textName, text });

        request.onsuccess = () => resolve(new Response('Saved successfully', { status: 200 }));
        request.onerror = () => reject(new Response('Error saving data', { status: 500 }));
    });
}

async function handleListRequest() {
    const db = await openDatabase();

    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['texts'], 'readonly');
        const store = transaction.objectStore('texts');
        
        const request = store.getAll();
    
        request.onsuccess = () => resolve(new Response(JSON.stringify(request.result.map(item => item)), { status: 200 }));
        request.onerror = () => reject(new Response('Error retrieving data', { status: 500 }));
    });
}

async function handleLoadRequest(name) {
    const db = await openDatabase();

    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['texts'], 'readonly');
        const store = transaction.objectStore('texts');
        const request = store.get(name);
        request.onsuccess = () => {
            if (request.result) {
                resolve(new Response(JSON.stringify(request.result), { status: 200 }));
            } else {
                resolve(new Response('Not found', { status: 404 }));
            }
        };
        
        request.onerror = () => reject(new Response('Error loading data', { status: 500 }));
    });
}
