#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";


// initializing user pin and current balnce
let pin: number = 1234;
let currentBalance: number = 10000;

//limit for deposit at a time
let depositLimit: number = 200000;

//welcome message
console.log((`\n\t\t\t\t   <<========================>>`));
console.log(`\t\t<<==={==={==={==={  ${chalk.blueBright("WELCOME TO MY ATM MACHINE!")}  }===}===}===}===>>`);
console.log((`\t\t\t\t   <<========================>>\n`));


// asking user to enter the pin
let pinAnswer = await inquirer.prompt(
    {
        name: "pin",
        type: "password",
        message: "Kindly enter your pin : "
    }
);


//checks if pin is correct
if (Number(pinAnswer.pin) === pin) {

    console.log(chalk.greenBright("Your pin is correct login successfully"));
    

while (true) {

    console.log();// printing empty line

    //asking user to select operation
    let selectedOperation = await inquirer.prompt(
        {
            name: "operation",
            type: "list",
            message: "select the operation :",
            choices: ["Deposit Cash", "Withdraw Cash", "Current Balance" ,chalk.red("Exit")]
        }
    );

    console.log();



    // if selected operation is deposit
    if (selectedOperation.operation === "Deposit Cash") {

        let deposit = await inquirer.prompt(
            {
                name: "amount1",
                type: "number",
                message: "Enter amount : "
            }
        );

        //checks if amount is less than deposit limit
        if (deposit.amount1 != 0) {
            if (deposit.amount1 <= depositLimit) {

                    currentBalance += deposit.amount1;

                console.log(chalk.white.bold(`\n-> Congrats! You have deposited : ${chalk.greenBright(`${deposit.amount1}$`)}.`));

                console.log(chalk.white.bold(`-> Your current balance is : ${chalk.greenBright(`${currentBalance}$`)}.`));
            
            } else {
                console.log(chalk.red(`-> You exceeded your maximum deposit limit : ${depositLimit}$`));
            };
    } else {
        console.log(chalk.red("-> For deposit amount must be greater than zero."));
    }
    };


    // if selected operation is withdrawal
    if (selectedOperation.operation === "Withdraw Cash") {

        //ask for method of withdrawal
        let selectedMethod = await inquirer.prompt(
            {
                name: "method",
                type: "list",
                message: "Choose withdrawal method :",
                choices: ["Fast Cash" ,"Enter Amount"]
            }
        );

        console.log("");// leaving some empty lines

        // if selected method is fast cash
        if (selectedMethod.method === "Fast Cash") {


                //give some amount options
            let selectedAmounts = await inquirer.prompt(
                {
                    name: "selectedAmount",
                    type: "list",
                    message: "Select the amount :",
                    choices: ["500" ,"1000" ,"5000" ,"10000"]
                }
            );

        if (selectedAmounts.selectedAmount <= currentBalance) {

            currentBalance -= selectedAmounts.selectedAmount; 

            console.log(chalk.white.bold(`\n-> Congrats! You have withdrawn : ${chalk.greenBright(`${selectedAmounts.selectedAmount}$`)}.`));

            //checks if balance is zero
            if (currentBalance === 0) {
                console.log(chalk.white.bold(`-> Your remaining balance is ${chalk.red(`${currentBalance}$`)}.`));
            } else {
                console.log(chalk.white.bold(`-> The remaining balance is : ${chalk.greenBright(`${currentBalance}$`)}.`));
            };
    
        } else {
            console.log(chalk.red("Your current balance is insufficient for this withdrawal."));
        };
    };
        

        // if selected method is enter amount
        if (selectedMethod.method === "Enter Amount") {

            let deduct = await inquirer.prompt(
                {
                    name: "amount",
                    type: "number",
                    message: "Enter amount : "
                }
            );
            //checks if amount is less than current balance

            if (deduct.amount != 0) {
            if (deduct.amount <= currentBalance) {

                currentBalance -= deduct.amount;

                console.log(chalk.white.bold(`\n-> Congrats! You have withdrawn : ${chalk.greenBright(`${deduct.amount}$`)}.`));

                if (currentBalance === 0) {
                console.log(chalk.white.bold(`-> Your remaining balance is ${chalk.red(`${currentBalance}$`)}.`));
            } else {
                console.log(chalk.white.bold(`-> Your remaining balance is : ${chalk.greenBright(`${currentBalance}$`)}.`));
            };
    
            } else {
                console.log(chalk.red("Your current balance is insufficient for this withdrawal."));
            };
            } else {
                console.log(chalk.red("-> For withdrawal amount must be greater than zero."));
            }
        };
    };

    // if selected operation is current balance
    if (selectedOperation.operation === "Current Balance") {

        if (currentBalance === 0) {
            console.log(chalk.white.bold(`-> Your current balance is ${chalk.red(`${currentBalance}$`)}.`));

        } else {
            console.log(chalk.white.bold(`-> Your current balance is : ${chalk.greenBright(`${currentBalance}$`)}.`));
        };
    };

    if (selectedOperation.operation === chalk.red("Exit")) {
        break;
    };

};

    //thank you message
    console.log((`\n\t\t\t\t   =======================`));
    console.log(`\t\t\t\t   ${chalk.blueBright("Thank you for visiting!")}`);
    console.log((`\t\t\t\t   =======================\n`));

} else {
    console.log(chalk.red("-> Invalid pin."));
};
