import allRiddlesData from "./riddles/module.js";
import { Riddle } from "./classes/Riddle.js";
import { Player } from "./classes/Player.js";
import { MultipleChoiceRiddle } from "./classes/MultipleChoiceRiddle.js";
import readline from "readline-sync";

console.log("Welcome to Riddle Game!");
const name = readline.question("what is your name?");
const p = new Player(name);

const riddles = allRiddlesData.map(r => {
  if(r.choices){
    return new MultipleChoiceRiddle(r);
  }else{
    return new Riddle(r);
  }
});

function measureTime(callback){
  const start = Date.now();
  callback();
  const end = Date.now();
  return {start,end};
}


for (const riddle of riddles) {
 const {start,end} = measureTime(() => riddle.ask());
 p.recordTime(start,end);
}

p.showStats()