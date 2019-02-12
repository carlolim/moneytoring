import { budgetRepeatEnum, selectAllWhereDateBetween } from "../helpers";
import moment from "moment";

export const getExpensesOfBudgetLedger = (ledger, accountIds, categoryIds) => {
    return new Promise((resolve, reject) => {
        selectAllWhereDateBetween("expense", "date", ledger.startDate, ledger.endDate).then((expenses) => {
            if (accountIds.indexOf(0) !== -1 && categoryIds.indexOf(0) !== -1) {
                resolve(expenses);
            }
            else {
                let result = [];
                for (var i=0; i<expenses.length; i++) {
                    console.log(expenses[i], categoryIds, accountIds);
                    if ((categoryIds.indexOf(expenses[i].categoryId) !== -1 || categoryIds.indexOf(0) !== -1) && 
                    (accountIds.indexOf(expenses[i].accountId) !== -1 || accountIds.indexOf(0) !== -1)) {
                        result.push(expenses[i]);
                    }
                }
                resolve(result);
            }
        });
    });
}

export const getBudgetRepeatTypeForMoment = (budget) => {
    if (budget.repeat === budgetRepeatEnum.daily) return "day";
    else if (budget.repeat === budgetRepeatEnum.weekly) return "week";
    else if (budget.repeat === budgetRepeatEnum.monthly) return "month";
    return undefined;
}

export const validateBudget = (budget) => {
    let type = getBudgetRepeatTypeForMoment(budget);
    if (type) {
        if (moment(budget.startDate).startOf(type).toDate() <= moment().startOf(type).toDate() &&
            (budget.noEndDate || moment(budget.endDate).endOf(type).toDate() >= moment().endOf(type))) {
            let ledger = budget.ledger.find(m => m.startDate.toString() === moment().startOf(type).toDate().toString() && m.endDate.toString() === moment().endOf(type).toDate().toString());
            if (ledger === undefined || ledger === null) {
                ledger = { startDate: moment().startOf(type).toDate(), endDate: moment().endOf(type).toDate(), spent: 0, amount: budget.amount };
            }
            return ledger;
        }
    }
    return null;
}