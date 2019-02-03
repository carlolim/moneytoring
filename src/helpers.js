
export const formatMoney = (n, c, d, t) => {
  var c = isNaN(c = Math.abs(c)) ? 2 : c,
    d = d === undefined ? "." : d,
    t = t === undefined ? "," : t,
    s = n < 0 ? "-" : "",
    i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
    j = (j = i.length) > 3 ? j % 3 : 0;

  return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};

export const selectAll = (table, done) => {
  let db = indexedDB.open("Moneytoring");
  db.onsuccess = (event) => {
    let tx = event.target.result.transaction([table], "readonly");
    let store = tx.objectStore(table);
    let allItems = store.getAll();
    allItems.onsuccess = (event) => {
      done(event.target.result);
    }
  }
}

export const insert = (table, data, done) => {
  let db = indexedDB.open("Moneytoring");
  db.onsuccess = (event) => {
    let tx = event.target.result.transaction([table], "readwrite");
    let store = tx.objectStore(table);
    store.put(data);
    tx.oncomplete = (event) => {
      done(true);
    }
    tx.onerror = (event) => {
      done(false);
    }
  }
}

export const update = (table, data, done) => {
  let db = indexedDB.open("Moneytoring");
  db.onsuccess = (event) => {
    let tx = event.target.result.transaction([table], "readwrite");
    let store = tx.objectStore(table);
    store.put(data);
    tx.oncomplete = (event) => {
      done(true);
    }
    tx.onerror = (event) => {
      done(false);
    }
  }
}

export const budgetRepeatEnum = {
  none: 0,
  daily: 1,
  weekly: 2,
  monthly: 3,
  custom: 4
}