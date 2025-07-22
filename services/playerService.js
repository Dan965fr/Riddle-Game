import readline from "readline-sync";
import { MultipleChoiceRiddle } from "../classes/MultipleChoiceRiddle.js";
import { Player } from "../classes/Player.js";
import { Riddle } from "../classes/Riddle.js";
import {measureTime} from "../utils/time.js";
import { addRiddle, getAllRiddles, updateRiddle, deleteRiddle } from "./riddleService.js";
import {addPlayer,updatePlayerTime,getAllPlayers} from "./playersService.js";
  
  
  

// play the game
export async function playGame() {
  try {
    debugger;
    const response = await fetch("http://localhost:3007/riddles");
    if (!response.ok) {
      console.log("failed to fetch riddles:", response.status);
      return;
    }

    const riddlesData = await response.json();

    const nameInput = readline.question("What is your name? ");

    const allPlayers = await getAllPlayers();
    let existingPlayer = allPlayers.find(player => player.username && player.username.toLowerCase() === nameInput.toLowerCase());

    if (!existingPlayer) {
      existingPlayer = await addPlayer({ username: nameInput });
      console.log(`Welcome ${nameInput}, you are now registered!`);
    }

    if (!existingPlayer || !existingPlayer.id) {
      console.error("Missing player ID after creation!");
      return;
    }

    const playerName = existingPlayer.username || nameInput;  // תקן את השם
    const p = new Player(playerName);

    if (existingPlayer.best_time != null) {
      console.log(`Hi ${playerName}, Your previous best time was ${existingPlayer.best_time} seconds`);
    } else {
      console.log(`Hi ${playerName}, no previous record found`);
    }

    const riddles = riddlesData.map(r =>
      r.choices ? new MultipleChoiceRiddle(r) : new Riddle(r)
    );

    for (const riddle of riddles) {
      const start = Date.now();
      riddle.ask();
      const end = Date.now();
      p.recordTime(start, end);
    }

    const totalTime = p.getTotalTime();
    p.showStats();

    const playerId = existingPlayer.id;

    const updateRes = await updatePlayerTime(playerId, totalTime);

    if (updateRes.msg === "New record!") {
      console.log("New record! Time updated.");
    } else {
      console.log("No improvement in time.");
    }
  } catch (error) {
    console.log("Error in playGame:", error);
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
    const id = readline.question("ID to update: ");
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
    const id = readline.question("ID to delete: ");
    await deleteRiddle(id);
    console.log(" Riddle deleted!");


}






export async function showLeaderboard() {
  const players = await getAllPlayers();
  const sorted = players
    .filter(p => typeof p.best_time === 'number')
    .sort((a, b) => a.best_time - b.best_time);

  console.log("\n Leaderboard:");
  sorted.forEach((p, i) => {
    console.log(`${i + 1}. ${p.username} - ${p.best_time} seconds`);
  });
}
