import readline from "readline-sync";
import { Riddle } from "./Riddle.js"


export class MultipleChoiceRiddle extends Riddle{
    constructor({id,name,taskDescription,correctAnswer,choices}){
        super({id,name,taskDescription,correctAnswer});
        this.choices = choices;
    }
    ask(){
        console.log(`\nRiddle ${this.id}: ${this.name}`);
        console.log(this.taskDescription);

        this.choices.forEach((choice,index) => {
            console.log(`${index + 1}: ${choice}`)
            
        });
        while(true){
            const userChoice = readline.questionInt("Your choice (number):");
            const selected = this.choices[userChoice - 1];

            if (selected  === this.correctAnswer){
                console.log("Corrrect!")
                break;
            }else{
                console.log("Wrong answer")
            }
        }


    }
    

        
    
}