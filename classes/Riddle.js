import readline from "readline-sync";

export class Riddle {
    constructor({ _id, name, taskDescription, correctAnswer }) {
        this.id = _id
        this.name = name
        this.taskDescription = taskDescription
        this.correctAnswer = correctAnswer
    }

    // 
    ask() {
        console.log(`\nRiddle ${this.id}: ${this.name}`)
        let flag = true;
        while (flag) {
            const answer = readline.question(`${this.taskDescription}`)
            if (answer === this.correctAnswer) {
                console.log("Correct")
                break;
            } else {
                console.log("Try again");
            }
        }
    }

}