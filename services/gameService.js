import fs from "fs";
import { Riddle } from "../classes/Riddle.js";
import { Player } from "../classes/Player.js";
import { MultipleChoiceRiddle } from "../classes/MultipleChoiceRiddle.js";
import {
  playGame,
  createRiddle,
  readRiddles,
  updateRiddle,
  deleteRiddle
} from "./playerService.js";

import { loadRiddles,saveRiddles } from "../utils/load.js";
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
        console.log("0. Exit");

        const choice = readline.questionInt("Enter your choice: ");

        switch (choice) {
            case 1: await playGame(); break;
            case 2: await createRiddle(); break;
            case 3: await readRiddles(); break;
            case 4: await updateRiddle(); break;
            case 5: await deleteRiddle(); break;
            case 0: console.log(" Bye!"); flag = false; break;
            default: console.log(" Invalid choice.");
        }
    }
}

