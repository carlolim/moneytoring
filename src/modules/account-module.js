
export const getMinStartDate = () => {
    return new Promise((resolve, reject) => {
        let db = indexedDB.open("Moneytoring");
        db.onsuccess = (event) => {
            let tx = event.target.result.transaction(["account"], "readonly");
            let store = tx.objectStore("account");
            var index = store.index('startDate');
            var result = index.openCursor(null, 'next');
            result.onsuccess = (event) => {
                if (event.target.result !== null && event.target.result !== undefined) {
                    resolve(event.target.result.value);
                }
                else {
                    resolve(null);
                }
            }
        }
    });
}