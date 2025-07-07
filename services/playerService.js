import readline from "readline-sync";
import { MultipleChoiceRiddle } from "../classes/MultipleChoiceRiddle.js";
import { Player } from "../classes/Player.js";
import { Riddle } from "../classes/Riddle.js";
import { loadRiddles,saveRiddles } from "../utils/load.js";
import {measureTime} from "../utils/time.js";


export async function playGame() {
    const riddlesData = await loadRiddles();
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
}



// Creat
export async function createRiddle() {
    const riddles = await loadRiddles();

    const isMultiple = readline.keyInYNStrict("is this a multiple choice riddle?");

    const newRiddle = {
        id: riddles.length ? riddles[riddles.length - 1].id + 1 : 1,
        name: readline.question("Enter riddle name:"),
        taskDescription: readline.question("Entet the riddle question:"),
        correctAnswer: readline.question("Enter the correct answer:")

    };

    if(isMultiple){
        const numChoices =readline.questionInt("How many choices:");
        newRiddle.choices = [];
        for(let i = 0; i< numChoices;i++){
            newRiddle.choices.push(readline.question(`Choice ${i+1}:`))
        }
    }
    riddles.push(newRiddle);
    await saveRiddles(riddles);
    console.log("Riddle added successfully");
 

}



// Read
export async function readRiddles() {
    const riddles = await loadRiddles()
    console.log("\n All Ridddles:")
    riddles.forEach(r => {
        console.log(`\n ID: ${r.id}`)
         console.log(`Name: ${r.name}`);
        console.log(`Question: ${r.taskDescription}`);
        console.log(`Answer: ${r.correctAnswer}`);
        if (r.choices) {
            console.log(`Choices: ${r.choices.join(", ")}`);
        }
    });
}


// Update
export async function updateRiddle() {
    const riddles = await loadRiddles();
    const id = readline.questionInt("Enter the id you want to update");
    const riddle = riddles.find(r => r.id === id)


    if (!riddle) {
        console.log(" Riddle not found.");
        return;
    }

    console.log("Leave blank to keep current value.\n");

    const name = readline.question(`New name (${riddle.name}): `);
    const taskDescription = readline.question(`New question (${riddle.taskDescription}): `);
    const correctAnswer = readline.question(`New correct answer (${riddle.correctAnswer}): `);

    if (riddle.choices) {
        console.log("Update multiple-choice options:");
        for (let i = 0; i < riddle.choices.length; i++) {
            const newChoice = readline.question(`Choice ${i + 1} (${riddle.choices[i]}): `);
            if (newChoice.trim() !== "") {
                riddle.choices[i] = newChoice;
            }
        }
    }

    riddle.name = name || riddle.name;
    riddle.taskDescription = taskDescription || riddle.taskDescription;
    riddle.correctAnswer = correctAnswer || riddle.correctAnswer;

    await saveRiddles(riddles);
    console.log(" Riddle updated!");


    
}



// Delete
export async function deleteRiddle() {
    const riddles = await loadRiddles();
    const id = readline.questionInt("Enter the ID of the riddle to delete: ");

    const index = riddles.findIndex(r => r.id === id);
    if (index === -1) {
        console.log(" Riddle not found.");
        return;
    }

    const confirmed = readline.keyInYNStrict(`Are you sure you want to delete riddle ${id}?`);
    if (!confirmed) {
        console.log(" Deletion cancelled.");
        return;
    }

    riddles.splice(index, 1);
    await saveRiddles(riddles);
    console.log(" Riddle deleted.");
}