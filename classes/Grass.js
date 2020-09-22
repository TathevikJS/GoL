let LivingCreature = require('./LivingCreature')

module.exports = class Grass extends LivingCreature {
  
   
    mul() {
        this.multiply++;
        var emptyCells = super.chooseCell(0)
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

        if (newCell && this.multiply >= 5) {
            

            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 1;

            var gr = new Grass(newX ,newY , 1);
            grassArr.push(gr);
           
           this.multiply = 0;
        }
        if (weath == "winter") {
            this.multiply--;
        }
        if (weath == "spring") {
            this.multiply += 5;
        }
        if (weath == "summer") {
            this.multiply += 3;
        }
        if (weath == "autumn") {
            this.multiply += 2;
    }
    }
}
