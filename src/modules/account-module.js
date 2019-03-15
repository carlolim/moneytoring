import { selectAll, sumProperty, selectById } from "../helpers";
import { getExpensesBetweenDates } from "./expense-module";

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

export const getAllUpdatedBalance = () => {
    return new Promise((resolve, reject) => {
        selectAll("account").then(accounts => {
            getMinStartDate().then(minStartDate => {
                if (minStartDate !== null) {
                    getExpensesBetweenDates(minStartDate.startDate, new Date(), 'desc').then(expenses => {
                        for (var i = 0; i < accounts.length; i++) {
                            if (accounts[i].trackBalance) {
                                var accountExpenses = expenses.filter(m => m.accountId === accounts[i].accountId);
                                var total = sumProperty(accountExpenses, 'amount');
                                accounts[i].balance -= total;
                            }
                        }
                        resolve(accounts);
                    });
                }
                else {
                    resolve(accounts);
                }
            });
        });
    })
}

export const getSingleUpdatedBalance = (accountId) => {
    return new Promise((resolve, reject) => {
        selectById("account", accountId).then(account => {
            if (account.trackBalance) {
                getExpensesBetweenDates(account.startDate, new Date(), 'desc').then(expenses => {
                    var accountExpenses = expenses.filter(m => m.accountId === account.accountId);
                    var total = sumProperty(accountExpenses, 'amount');
                    account.initialBalance = account.balance;
                    account.balance -= total;
                    resolve(account);
                });
            }
            else {
                resolve(account);
            }
        });
    })
}