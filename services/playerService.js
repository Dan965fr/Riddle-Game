import readline from "readline-sync";
import { MultipleChoiceRiddle } from "../classes/MultipleChoiceRiddle.js";
import { Player } from "../classes/Player.js";
import { Riddle } from "../classes/Riddle.js";
import {measureTime} from "../utils/time.js";
import { addRiddle, getAllRiddles, updateRiddle, deleteRiddle } from "./riddleService.js";
import {getPlayerByName,addPlayer,updatePlayerTime,getAllPlayers} from "./playersService.js";
  
  
  

// play the game
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


        // check if player exsits
        const existingPlayer = await getPlayerByName(name);
        if(existingPlayer && existingPlayer.lowesTime){
            console.log(`Hi ${name} Your previous lowest time was ${existingPlayer.lowesTime} seconds`);

        }else{
            await addPlayer(name);
            console.log(`Welcome ${name} You are now registered`);
        }



        const riddles = riddlesData.map(r =>
            r.choices ? new MultipleChoiceRiddle(r) : new Riddle(r)
        );

        for (const riddle of riddles) {
            const { start, end } = measureTime(() => riddle.ask());
            p.recordTime(start, end); 
        }

        const totalTime = p.getTotalTime();

        p.showStats()


        // update player time
        const updateRes = await updatePlayerTime(name, totalTime);
        if (updateRes.msg === "New record!") {
            console.log(" New record! Time updated.");
        } else {
            console.log("No improvement in time.");
        }


    
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






export async function showLeaderboard() {
  const players = await getAllPlayers();
  const sorted = players
    .filter(p => p.lowestTime)
    .sort((a, b) => a.lowestTime - b.lowestTime);

  console.log("\n Leaderboard:");
  sorted.forEach((p, i) => {
    console.log(`${i + 1}. ${p.name} - ${p.lowestTime} seconds`);
  });
}
