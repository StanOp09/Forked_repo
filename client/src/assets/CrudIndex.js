import { openDB } from './indexedDB';
async function performDatabaseOperation(operation) {
  const db = await openDB();
  return operation(db);
}
function addToDB(storeName, data) {
  return performDatabaseOperation(db => {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.put(data);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  });
}
function getFromDB(storeName, id) {
  return performDatabaseOperation(db => {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([storeName], 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.get(id);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  });
}
function deleteFromDB(storeName, id) {
  return performDatabaseOperation(db => {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.delete(id);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  });
}
export { addToDB, getFromDB, deleteFromDB };