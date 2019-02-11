import { update, selectAll, budgetRepeatEnum } from "../helpers";
import moment from "moment";

export const addSpentToBudget = (expense) => {
    getValidBudgetsForExpense(expense).then((validBudgets) => {
        alignBudgetLedgersForExpense(validBudgets, expense).then((alignedBudgets) => {
            if (alignedBudgets.length > 0) {
                let i = 0;
                putNext(false);
                function putNext(success) {
                    if (success) i++;
                    if (i < alignedBudgets.length) {
                        update("budget", alignedBudgets[i], putNext);
                    }
                }
            }
        });
    });
}

export const getValidBudgetsForExpense = (expense) => {
    return new Promise((resolve, reject) => {
        selectAll("budget", (budgets) => {
            let validBudgets = [];
            for (var i = 0; i < budgets.length; i++) {
                let budget = budgets[i];
                if ((budget.categoryIds.indexOf(expense.categoryId) !== -1 || budget.categoryIds.indexOf(0) !== -1) &&
                    (budget.accountIds.indexOf(expense.accountId) !== -1 || budget.accountIds.indexOf(0) !== -1) &&
                    (moment(budget.startDate).startOf("day").toDate() <= expense.date &&
                        (budget.noEndDate || moment(budget.endDate).endOf("day").toDate() >= expense.date))
                ) {
                    validBudgets.push(budget);
                }
            }
            resolve(validBudgets);
        });
    });
}

export const alignBudgetLedgersForExpense = (validBudgets, expense) => {
    return new Promise((resolve, reject) => {
        for (var i = 0; i < validBudgets.length; i++) {
            let budget = validBudgets[i];
            if (budget.repeat === budgetRepeatEnum.none) {
                validBudgets[i].ledger[0].spent += expense.amount;
            }
            else {
                let ledgerFound = false;
                for (var c = 0; c < budget.ledger.length; c++) {
                    let ledger = budget.ledger[c];
                    ledgerFound = false;
                    if (ledger !== null && ledger !== undefined) {
                        if (moment(ledger.startDate).startOf("day").toDate() <= expense.date &&
                            (moment(ledger.endDate).endOf("day").toDate() >= expense.date)) {
                            ledgerFound = true;
                            validBudgets[i].ledger[c].spent += expense.amount;
                            continue;
                        }
                    }
                }
                if (!ledgerFound) {
                    let type = getBudgetRepeatTypeForMoment(validBudgets[i]);
                    if (type) {
                        validBudgets[i].ledger.push({
                            amount: validBudgets[i].amount,
                            spent: expense.amount,
                            startDate: moment(expense.date).startOf(type).toDate(),
                            endDate: moment(expense.date).endOf(type).toDate()
                        })
                    }
                }
            }
        }

        resolve(validBudgets);
    });
}

export const getBudgetRepeatTypeForMoment = (budget) => {
    if (budget.repeat === budgetRepeatEnum.daily) return "day";
    else if (budget.repeat === budgetRepeatEnum.weekly) return "week";
    else if (budget.repeat === budgetRepeatEnum.monthly) return "month";
    return undefined;
}