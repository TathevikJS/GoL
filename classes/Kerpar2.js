let LivingCreature = require('./LivingCreature')

module.exports = class Kerpar2 extends LivingCreature {
    constructor(x, y, index){
        super(x, y, index);
        
    }
   

    move() {
        var emptyCells = super.chooseCell(0);
		var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]
       
            if (newCell) {
                var newX = newCell[0];
                var newY = newCell[1];
                matrix[newY][newX] = matrix[this.y][this.x];
                matrix[this.y][this.x] = 0;

                this.x = newX;
                this.y = newY;
                
                this.kill();
            }
            else{
                this.die();
            }
        
    }

    kill() {

        var dexinner = super.chooseCell(2);

        if (dexinner.length > 0) {
            for (var i in dexinner) {
                var x = dexinner[i][0];
                var y = dexinner[i][1];
                
                matrix[y][x] = 1;
                var gr = new Grass(x, y, 1);
                grassArr.push(gr);
               
                for (var i in grassEaterArr) {
                    if (grassEaterArr[i].x == x && grassEaterArr[i].y == y) {
                        grassEaterArr.splice(i, 1)
                    }
                }
                
                }
        }
    }
    die(){
             matrix[this.y][this.x] = 0;
             for (var i in kerpar2Arr) {
                if (kerpar2Arr[i].x == this.x && kerpar2Arr[i].y == this.y) {
                    kerpar2Arr.splice(i, 1)
                }
            }
    }

}