function bankRequests(accounts, requests) {
let error = false;
let errorCode = []
let errorNumber = 0;
let updatedAccounts = []
accounts.forEach(element => {
    updatedAccounts.push(element)
});
updatedAccounts.unshift('account')

function success() {
    return (error ? errorCode : updatedAccounts.splice(1))
}

    let withdraw = (accountNumber, amount) => {
        if(amount <= updatedAccounts[accountNumber]) {
        updatedAccounts[accountNumber] = updatedAccounts[accountNumber] - amount
        
        } 
        else {
           error = true
          
           errorCode.push(-errorNumber)
        }
    }
    let transfer = (fromAccount, toAccount, amount) =>  {
        if(amount <= updatedAccounts[fromAccount]){
        updatedAccounts[fromAccount] = updatedAccounts[fromAccount] - amount
        updatedAccounts[toAccount] = updatedAccounts[toAccount] + amount
       
        } else if(amount >= updatedAccounts[fromAccount]) {
           error = true
           
           errorCode.push(-errorNumber)
           
        }
    }
    let deposit = (accountNumber, amount) => {
        updatedAccounts[accountNumber] = updatedAccounts[accountNumber]+ amount
       
        
    }



    const splitUp = requests.map(request => request.split(","))
    const filtered = splitUp.map(element => {
        const newElement = element.toString().split(" ")
        
        return newElement
    })
    
    for(let i=0; i < filtered.length; i++){
       
        if(error === true) {
            return success()
        }else{
            if(filtered[i].length === 3){
                if (filtered[i][1] > accounts.length) {
                    error = true
                    errorNumber++
                    errorCode.push(-errorNumber)
                    return success()
                }else {
                    errorNumber++
                    if(filtered[i][0] === "withdraw"){
                        withdraw(filtered[i][1], filtered[i][2])
                    }
                    else {
                        deposit(parseInt(filtered[i][1]), parseInt(filtered[i][2]))
                    }
                }
            } 
            if(filtered[i].length === 4){
                if (filtered[i][1] > accounts.length || filtered[i][2] > accounts.length) {
                    error = true
                    errorNumber++
                    errorCode.push(-errorNumber)
                    return success()
                }else {
                    errorNumber++
                    transfer(parseInt(filtered[i][1]), parseInt(filtered[i][2]), parseInt(filtered[i][3])) 
                }
            } 
        }
    }


return success()
    }

bankRequests([20, 1000, 500, 40, 90]
    ,["deposit 3 400", 
     "transfer 1 2 30", 
     "withdraw 4 50"])