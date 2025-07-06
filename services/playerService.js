import readline from "readline-sync";
import { MultipleChoiceRiddle } from "../classes/MultipleChoiceRiddle";
import { Player } from "../classes/Player";
import { Riddle } from "../classes/Riddle";
import { loadRiddles } from "../utils/load";
import {measureTime} from "../utils/time";


function playGame() {
    const riddlesData = loadRiddles();
    const name = readline.question("what is your name?");
    const p = new Player(name);

    const riddles = riddlesData.map(r =>
        r.choices ? new MultipleChoiceRiddle(r) : new Riddle(r)

    )

    for (const riddle of riddles) {
        const { start, end } = measureTime(() => riddle.ask());
        p.recordTime(start, end);
    }

    p.showStats()
}

// Creat
function createRiddle() {
    const data = loadRiddles();
    
   

}
