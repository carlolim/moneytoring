
export const initialize = () => {
    var request = window.indexedDB.open("Moneytoring", 3);
    
    request.onupgradeneeded = function(event) {
        var db = event.target.result;
    
        db.onerror = function(event) {
            
        };

        if (!db.objectStoreNames.contains('expense')) {
            var expenseTable = db.createObjectStore("expense", { keyPath: "expenseId", autoIncrement: true });
            expenseTable.createIndex("expenseId", "expenseId", { unique: true });
            expenseTable.createIndex("title", "title", { unique: false });
            expenseTable.createIndex("categoryId", "categoryId", { unique: false });
            expenseTable.createIndex("amount", "amount", { unique: false });
            expenseTable.createIndex("accountId", "accountId", { unique: false });
            expenseTable.createIndex("description", "description", { unique: false });
            expenseTable.createIndex("date", "date", { unique: false });
        }
        
        if (!db.objectStoreNames.contains('account')) {
            var accountTable = db.createObjectStore("account", { keyPath: "accountId", autoIncrement: true });
            accountTable.createIndex("name", "name", { unique: false });
        }

        if (!db.objectStoreNames.contains('category')) {
            var categoryTable = db.createObjectStore("category", { keyPath: "categoryId", autoIncrement: true });
            categoryTable.createIndex("name", "name", { unique: false });
        }

        if (!db.objectStoreNames.contains('budget')) {
            var budgetTable = db.createObjectStore("budget", {keyPath: "budgetId", autoIncrement: true});
            budgetTable.createIndex("name", "name", { unique: false});
            budgetTable.createIndex("repeat", "repeat", { unique: false});
            budgetTable.createIndex("startDate", "startDate", { unique: false});
            budgetTable.createIndex("endDate", "endDate", { unique: false});
            budgetTable.createIndex("amount", "amount", { unique: false});
            budgetTable.createIndex("accountIds", "accountIds", { unique: false});
            budgetTable.createIndex("isActive", "isActive", { unique: false});
            budgetTable.createIndex("categoryIds", "categoryIds", { unique: false});
            budgetTable.createIndex("ledger", "ledger", { unique: false});
            budgetTable.createIndex("noEndDate", "noEndDate", { unique: false});
        }
    }

    request.onsuccess = function (event) {
        var db = event.target.result;

        //---------------------------------------
        //create default account (personal)
        //---------------------------------------
        var transaction = db.transaction(["account"], "readonly");
        var accountStore = transaction.objectStore("account");
        var selectAccounts = accountStore.getAll();
        transaction.oncomplete = function (event) {            
            if (selectAccounts.result.length === 0) {
                var addAccountTransaction = db.transaction(["account"], "readwrite");
                var accountStore1 = addAccountTransaction.objectStore("account");
                accountStore1.put({name: "personal"});
            }
        }
        //----------------------------------------------------------------
        //create default categories (food, transportation, clothing)
        //----------------------------------------------------------------
        var categoryTransaction = db.transaction(["category"], "readonly");
        var categoryStore = categoryTransaction.objectStore("category");
        var selectCategories = categoryStore.getAll();
        categoryTransaction.oncomplete = function (event) {
            if (selectCategories.result.length === 0) {
                var addCategoriesTransaction = db.transaction(["category"], "readwrite");
                var addCategoryStore = addCategoriesTransaction.objectStore("category");
                addCategoryStore.put({name: "food"});
                addCategoryStore.put({name: "transportation"});
                addCategoryStore.put({name: "clothing"});
            }
        }
    }
}