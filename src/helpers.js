
export const formatMoney = (n, c, d, t) => {
  var c = isNaN(c = Math.abs(c)) ? 2 : c,
    d = d === undefined ? "." : d,
    t = t === undefined ? "," : t,
    s = n < 0 ? "-" : "",
    i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
    j = (j = i.length) > 3 ? j % 3 : 0;

  return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};

export const selectById = (table, id) => {
  return new Promise((resolve, reject) => {
    let db = indexedDB.open("Moneytoring");
    db.onsuccess = (event) => {
      let tx = event.target.result.transaction([table], "readonly");
      let store = tx.objectStore(table);
      let result = store.get(id);
      result.onsuccess = (event) => {
        resolve(event.target.result);
      }
    }
  });
}

export const selectAll = (table) => {
  return new Promise((resolve, reject) => {
    let db = indexedDB.open("Moneytoring");
    db.onsuccess = (event) => {
      let tx = event.target.result.transaction([table], "readonly");
      let store = tx.objectStore(table);
      let allItems = store.getAll();
      allItems.onsuccess = (event) => {
        resolve(event.target.result);
      }
    }
  });
}

export const select = (table, id) => {
  return new Promise((resolve, reject) => {
    let db = indexedDB.open("Moneytoring");
    db.onsuccess = (event) => {
      let tx = event.target.result.transaction([table], "readonly");
      let store = tx.objectStore(table);
      let item = store.get(id);
      item.onsuccess = (event) => {
        resolve(event.target.result);
      }
    }
  });
}

export const selectAllWhereDateBetween = (table, column, fromDate, toDate) => {
  return new Promise((resolve, reject) => {
    let db = indexedDB.open("Moneytoring");
    db.onsuccess = (event) => {
      let tx = event.target.result.transaction([table], "readonly");
      var store = tx.objectStore(table);
      let range = IDBKeyRange.bound(fromDate, toDate);
      var selectall = store.index(column).openCursor(range, 'prev');
      let shits = [];
      selectall.onsuccess = (event) => {
        var cursor = event.target.result;
        if (cursor) {
          shits.push(cursor.value);
          cursor.continue();
        }
      }
      tx.oncomplete = () => {
        resolve(shits);
      }
    }
  });
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

export const insertAsync = (table, data) => {
  return new Promise((resolve, reject) => {
    let db = indexedDB.open("Moneytoring");
    db.onsuccess = (event) => {
      let tx = event.target.result.transaction([table], "readwrite");
      let store = tx.objectStore(table);
      store.put(data);
      tx.oncomplete = (event) => {
        resolve(true);
      }
      tx.onerror = (event) => {
        reject(false);
      }
    }
  });
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

export const updateAsync = (table, data) => {
  return new Promise((resolve, reject) => {
    let db = indexedDB.open("Moneytoring");
    db.onsuccess = (event) => {
      let tx = event.target.result.transaction([table], "readwrite");
      let store = tx.objectStore(table);
      store.put(data);
      tx.oncomplete = (event) => {
        resolve(true);
      }
      tx.onerror = (event) => {
        reject(false);
      }
    }
  });
}

export const updateBulk = (table, data) => {
  return new Promise((resolve, reject) => {
    let db = indexedDB.open("Moneytoring");
    db.onsuccess = (event) => {
      let tx = event.target.result.transaction([table], "readwrite");
      let store = tx.objectStore(table);
      for (var i = 0; i < data.length; i++) {
        store.put(data[i]);
      }
      tx.oncomplete = (event) => {
        resolve(true);
      }
      tx.onerror = (event) => {
        reject(false);
      }
    }
  });
}

export const remove = (table, id) => {
  return new Promise((resolve, reject) => {
    let db = indexedDB.open("Moneytoring");
    db.onsuccess = (event) => {
      let tx = event.target.result.transaction([table], "readwrite");
      let store = tx.objectStore(table);
      store.delete(id);
      tx.oncomplete = (event) => {
        resolve(true);
      }
      tx.onerror = (event) => {
        reject(false);
      }
    }
  });
}

export const sumProperty = function (items, prop) {
  return items.reduce(function (a, b) {
    return a + b[prop];
  }, 0);
};

export const budgetRepeatEnum = {
  none: 0,
  daily: 1,
  weekly: 2,
  monthly: 3,
  custom: 4
}
