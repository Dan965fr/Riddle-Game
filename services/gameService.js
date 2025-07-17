
import { playGame, showLeaderboard } from "./playerService.js";
import { createRiddle, readRiddles, updateRiddlePrompt, deleteRiddlePrompt } from "./playerService.js";


import readline from "readline-sync"


export async function mainMenu() {
    let flag = true
    while (flag) {
        console.log("\n What do you want to do?");
        console.log("1. Play the game");
        console.log("2. Create a new riddle");
        console.log("3. Read all riddles");
        console.log("4. Update an existing riddle");
        console.log("5. Delete a riddle");
        console.log("6. View leaderboard")
        console.log("0. Exit");

        const choice = readline.questionInt("Enter your choice: ");

        switch (choice) {
            case 1: await playGame(); break;
            case 2: await createRiddle(); break;
            case 3: await readRiddles(); break;
            case 4: await updateRiddlePrompt(); break;
            case 5: await deleteRiddlePrompt(); break;
            case 6: await showLeaderboard();break;
            case 0: console.log(" Bye!"); flag = false; break;
            default: console.log(" Invalid choice.");
        }
    }
}

