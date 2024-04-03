#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";


let pin: number = 1234;
let currentBalance: number = 10000;

let depositLimit: number = 200000; //limit for deposit at a time


//welcome message
console.log((`\n\t\t\t\t  ==========================`));
console.log(`\t\t<==={==={==={==={ ${chalk.blueBright("WELCOME TO MY ATM MACHINE!")} }===}===}===}===>`);
console.log((`\t\t\t\t  ==========================\n\n`));


// asking user to enter the pin
let pinAnswer = await inquirer.prompt(
    {
        name: "pin",
        type: "password",
        message: "Kindly enter your pin : "
    }
);

console.log("");// leaving some empty lines


//checks if pin is correct
if (Number(pinAnswer.pin) === pin) {


    //asking user to select operation
    let operations = await inquirer.prompt(
        {
            name: "operation",
            type: "list",
            message: "select the operation :",
            choices: ["Deposit Cash", "Withdraw Cash", 
                        "Fast Cash" ,"Current Balance"]
        }
    );

    console.log("");// leaving some empty lines


    // if selected operation is deposit
    if (operations.operation === "Deposit Cash") {

        let deposit = await inquirer.prompt(
            {
                name: "amount1",
                type: "number",
                message: "Enter amount : "
            }
        );

        currentBalance += deposit.amount1;

        //checks if amount is less than deposit limit
        if (deposit.amount1 <= depositLimit) {
            console.log(chalk.greenBright(`\n-> Congrats! You have deposited : ${deposit.amount1}$.`));
            console.log(chalk.white.bold(`-> Your current balance is : ${currentBalance}$.`));
        } else {
            console.log(chalk.red(`The maximum deposit limit is : ${depositLimit}$.`));
        };
    };


    // if selected operation is withdrawal
    if (operations.operation === "Withdraw Cash") {

        let deduct = await inquirer.prompt(
            {
                name: "amount",
                type: "number",
                message: "Enter amount : "
            }
        );

        //checks if amount is less than current balance
        if (deduct.amount <= currentBalance) {

            currentBalance -= deduct.amount; 

            console.log(chalk.greenBright(`\n-> Congrats! You have withdrawn : ${deduct.amount}$.`));
            console.log(chalk.white.bold(`-> The remaining balance is : ${currentBalance}$.`));
               
        } else {
            console.log(chalk.red("Your current balance is insufficient for this withdrawal."));
        };
    };

    //if selected operation is fast cash
    if (operations.operation === "Fast Cash") {

        //give some amount options
        let selectedAmounts = await inquirer.prompt(
            {
                name: "selectedAmount",
                type: "list",
                message: "Select the amount :",
                choices: ["500" ,"1000" ,"5000" ,"10000"]
            }
        );

        console.log(chalk.greenBright(`\n-> Congrats! You have withdrawn : ${selectedAmounts.selectedAmount}$.`));
        console.log(chalk.white.bold(`-> The remaining balance is : ${currentBalance}$.`));

    };

    // if selected operation is current balance
    if (operations.operation === "Current Balance") {
        if (currentBalance === 0) {
            console.log(chalk.red("-> Your current balance is 0$."));

        } else {
            console.log(chalk.greenBright(`-> Your current balance is : ${currentBalance}$.`));
        };
    };

} else {
    console.log(chalk.red("-> Invalid pin. Please try again."));
};

//thank you message
console.log((`\n\n\t\t\t\t   =======================`));
console.log(`\t\t\t\t   ${chalk.blueBright("Thank you for visiting!")}`);
console.log((`\t\t\t\t   =======================\n`));