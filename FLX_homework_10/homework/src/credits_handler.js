function userCard(index) {
    let balance = 100, transactionLimit = 100, historyLogs = [];
    return {
        getCardOptions: function () {
            return {
                'balance': balance,
                'transactionLimit': transactionLimit,
                'historyLogs': historyLogs,
                'key': index
            };
        },
        putCredits: function (money) {
            balance += money;
            historyLogs.push({
                'operation Type': 'Received credits',
                'credits': money,
                'operationTime': new Date().toLocaleString()
            });
        },
        takeCredits: function (money) {
            if (balance < money) {
                console.error(`Sorry, your balance - ${balance}`);
            } else if (transactionLimit < money) {
                console.error(`Sorry, your transaction limit - ${transactionLimit}`);
            } else {
                balance -= money;
                historyLogs.push({
                    'operation Type': 'Withdrawal of credits',
                    'credits': money,
                    'operationTime': new Date().toLocaleString()
                });
            }
        },
        setTransactionLimit: function (money) {
            transactionLimit = money;
            historyLogs.push({
                'operation Type': 'Transaction limit change',
                'credits': money,
                'operationTime': new Date().toLocaleString()
            });
        },
        transferCredits: function (money, card) {
            const TO_FIXED = 2;
            const TAXES = 1.005; //0.5%
            let moneyWithTaxes = money * TAXES;
            if (balance < moneyWithTaxes) {
                console.error(`Sorry, your balance - ${balance}`);
            } else if (transactionLimit < moneyWithTaxes) {
                console.error(`Sorry, your transaction limit - ${transactionLimit}`);
            } else {
                this.takeCredits(parseFloat(moneyWithTaxes.toFixed(TO_FIXED)));
                card.putCredits(money);
            }
        }
    }
}

class UserAccount {
    constructor(name) {
        this.name = name;
        this.cards = [];
    }

    addCard(card) {
        const MAX_CARDS = 3;
        if (this.cards.length > MAX_CARDS) {
            console.error('Sorry, You should have <= 3 cards.');
        } else {
            this.cards.push(userCard(this.cards.length + 1));
        }
    }

    getCardByKey(key) {
        return this.cards[key - 1];
    }
}
