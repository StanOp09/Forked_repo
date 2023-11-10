const DB_NAME = 'articleDB';
const DB_VERSION = 1; // Use a long long for this value (don't use a float)
const STORE_NAME = 'articles';
let db;
// Open the database
function openDB() {
  return new Promise((resolve, reject) => {
    // Check for support
    if (!('indexedDB' in window)) {
      reject('IndexedDB is not supported on this browser');
      return;
    }
    const request = window.indexedDB.open(DB_NAME, DB_VERSION);
    request.onerror = (event) => {
      reject('Database error: ' + event.target.errorCode);
    };
    // This event is only implemented in recent browsers
    request.onupgradeneeded = (event) => {
      // Save the IDBDatabase interface
      db = event.target.result;
      // Create an objectStore for this database
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };
    request.onsuccess = (event) => {
      // Existing database with the specified version number
      db = event.target.result;
      resolve(db);
    };
  });
}
export { openDB };