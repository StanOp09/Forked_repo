export function idbPromise(operation, data) {
    return new Promise((resolve, reject) => {
        const idb = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
        if (!idb) {
            reject('Your browser does not support IndexedDB');
        }

        const request = idb.open('SubscriptionDB', 1);

        request.onupgradeneeded = function (event) {
            const db = event.target.result;

            // Create an object store for subscriptions if it doesn't exist
            if (!db.objectStoreNames.contains('subscriptions')) {
                const subscriptionsStore = db.createObjectStore('subscriptions', { keyPath: '_id' });
                subscriptionsStore.createIndex('email', 'email', { unique: true });
            }
        };

        request.onsuccess = function (event) {
            const db = event.target.result;
            
            // Create transaction
            const transaction = db.transaction('subscriptions', 'readwrite');
            const store = transaction.objectStore('subscriptions');

            transaction.oncomplete = function () {
                db.close();
            }

            switch (operation) {
                case 'get':
                    const getRequest = store.getAll();
                    getRequest.onsuccess = function () {
                        resolve(getRequest.result);
                    };
                    getRequest.onerror = function (event) {
                        reject('Error getting subscriptions' + event.target.error);
                    };
                    break;

                case 'delete':
                    const index = store.index('email');
                    const deleteRequest = index.getKey(data.email);
                    deleteRequest.onsuccess = function () {
                        const deleteRequest = store.delete(deleteRequest.result);
                        deleteRequest.onsuccess = function () {
                            resolve('Subscription deleted');
                        };
                    };
                    deleteRequest.onerror = function (event) {
                        reject('Error deleting subscription: ' + event.target.error);
                    };
                    break;
                
                case 'put': // 'put' updates an existing record or adds a new one if it does not exist
                    const putRequest = store.put(data);
                    putRequest.onsuccess = function () {
                        resolve(putRequest.result);
                    };
                    putRequest.onerror = function (event) {
                        reject('Error updating the  subscription: ' + event.target.error);
                    };
                    break;

                case 'add': // 'add' adds a new record but fails if it already exists
                    const addRequest = store.add(data);
                    addRequest.onsuccess = function () {
                        resolve(addRequest.result);
                    };
                    addRequest.onerror = function (event) {
                        reject('Error adding the subscription: ' + event.target.error);
                    };
                    break;                    

                default:
                    reject('Invalid operation');
            }
        };

        request.onerror = function (event) {
            reject('Error opening database: ' + event.target.error);
        };
    });
}