let LivingCreature = require('./LivingCreature')

module.exports = class Gishatich extends LivingCreature {
    constructor(x, y, index){
        super(x, y, index);
        this.energy = 10;
       
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
           
        }
           
            this.energy--;
            if (this.energy <= 0) {
                this.die();
            }

        

    
}

eat() {
        var grassEaterCells = super.chooseCell(2);
		var newCell = grassEaterCells[Math.floor(Math.random() * grassEaterCells.length)]
    
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = matrix[this.y][this.x];
            matrix[this.y][this.x] = 0;

            for (var i in grassEaterArr) {
				if (grassEaterArr[i].x == newX && grassEaterArr[i].y == newY) {
					grassEaterArr.splice(i, 1)
				}
			}

            this.x = newX;
            this.y = newY;
            this.energy+=2;
           
            
            if (this.energy > 15) {
                this.mul();
                
            }

        }

        else {
            this.move();
        }
    
}

die() {
    matrix[this.y][this.x] = 0;
    for (var i in gishatichArr) {
        if (gishatichArr[i].x == this.x && gishatichArr[i].y == this.y) {
            gishatichArr.splice(i, 1)
        }
    }
}

mul() {
    var emptyCells = super.chooseCell(0);
    var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]
    if (newCell) {
        var newX = newCell[0];
        var newY = newCell[1];
        matrix[newY][newX] = 3
        var gishatich = new Gishatich(newX, newY, 3);
        gishatichArr.push(gishatich);
        this.energy = 10;
    }
    if (weath == "winter") {
        this.energy -= 5;		
    }
    if (weath == "summer") {
        this.energy += 3;
    }
}

}
