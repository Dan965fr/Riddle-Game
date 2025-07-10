import readline from "readline-sync";
import { MultipleChoiceRiddle } from "../classes/MultipleChoiceRiddle.js";
import { Player } from "../classes/Player.js";
import { Riddle } from "../classes/Riddle.js";
import {measureTime} from "../utils/time.js";
import { addRiddle, getAllRiddles, updateRiddle, deleteRiddle } from "./riddleService.js";


export async function playGame() {
    try{
        const response = await fetch("http://localhost:3007/riddles");
        if(!response.ok){
            console.log("faild to fetch riddles:",response.status)
            return;
        }
        const riddlesData = await response.json();
        const name = readline.question("what is your name?");
        const p = new Player(name);

        const riddles = riddlesData.map(r =>
            r.choices ? new MultipleChoiceRiddle(r) : new Riddle(r)
        );

        for (const riddle of riddles) {
            const { start, end } = measureTime(() => riddle.ask());
            p.recordTime(start, end); 
        }
        p.showStats()
  
    
    }catch(error){
        console.log("error playing game:",error.message);

    }

    
}


export async function createRiddle() {
    const name = readline.question("Riddle name: ");
    const taskDescription = readline.question("Question: ");
    const correctAnswer = readline.question("Answer: ");
    const choices = readline.question("Choices (comma separated or empty): ");
    
    const newRiddle = {
        name,
        taskDescription,
        correctAnswer,
        choices: choices ? choices.split(",") : undefined
    };

    await addRiddle(newRiddle);
    console.log(" Riddle added!");
}



export async function readRiddles() {
    const riddles = await getAllRiddles();
    console.log("\n All Riddles:");
    console.log(riddles);
}




export async function updateRiddlePrompt() {
    const id = readline.questionInt("ID to update: ");
    const name = readline.question("New name: ");
    const taskDescription = readline.question("New question: ");
    const correctAnswer = readline.question("New answer: ");

    const updatedRiddle = {
        id,
        name,
        taskDescription,
        correctAnswer
    };

    await updateRiddle(updatedRiddle);
    console.log(" Riddle updated!");
}




export async function deleteRiddlePrompt() {
    const id = readline.questionInt("ID to delete: ");
    await deleteRiddle(id);
    console.log(" Riddle deleted!");


}
