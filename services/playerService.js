import readline from "readline-sync";
import { MultipleChoiceRiddle } from "../classes/MultipleChoiceRiddle.js";
import { Player } from "../classes/Player.js";
import { Riddle } from "../classes/Riddle.js";
import { loadRiddles,saveRiddles } from "../utils/load.js";
import {measureTime} from "../utils/time.js";


export async function playGame() {
    const response = await fetch("http://localhost:3007/riddles");
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
}



