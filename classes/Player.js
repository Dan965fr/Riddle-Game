export class Player{
    constructor(name){
        this.name = name;
        this.times = []
    }
    recordTime(start,end){
       const durationInSecond = (end - start) / 1000;
       this.times.push(durationInSecond) 
    }
    showStats(){
        const totalTime = this.times.reduce((sum,time) => sum + time , 0);
        const avrageTime = totalTime / this.times.length
        console.log(`\ngreat job: ${this.name}`)
        console.log(`Total time: ${totalTime.toFixed(2)} seconds`)
        console.log(`Avrage Time: ${avrageTime.toFixed(2)} seconds`)

    }

}

