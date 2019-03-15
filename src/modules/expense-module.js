
export const getExpensesBetweenDates = (from, to, order = 'desc') => {
    return new Promise((resolve, reject) => {
        let db = indexedDB.open("Moneytoring");
        order = order === 'desc' ? 'prev' : 'next';
        db.onsuccess = (event) => {
            let tx = event.target.result.transaction(["expense"], "readonly");
            let store = tx.objectStore("expense");
            var range = IDBKeyRange.bound(from, to);
            var result = store.index('date').openCursor(range, order);
            var items = [];
            result.onsuccess = (event) => {
                var cursor = event.target.result;
                if (cursor) {
                    items.push(cursor.value);
                    cursor.continue();
                }
            }

            tx.oncomplete = (event) => {
                resolve(items);
            }
        }
    });
}

export const getAccountExpensesBetweenDates = (accountId, from, to, order = 'desc') => {
    return new Promise((resolve, reject) => {
        let db = indexedDB.open("Moneytoring");
        order = order === 'desc' ? 'prev' : 'next';
        db.onsuccess = (event) => {
            let tx = event.target.result.transaction(["expense"], "readonly");
            let store = tx.objectStore("expense");
            var range = IDBKeyRange.bound(from, to);
            var result = store.index('date').openCursor(range, order);
            var items = [];
            result.onsuccess = (event) => {
                var cursor = event.target.result;
                if (cursor) {
                    if (cursor.value.accountId === accountId) {
                        items.push(cursor.value);
                    }
                    cursor.continue();
                }
            }

            tx.oncomplete = (event) => {
                resolve(items);
            }
        }
    });
}
