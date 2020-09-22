let LivingCreature = require('./LivingCreature')

module.exports = class Kerpar1 extends LivingCreature {
    constructor(x, y, index){
        super(x, y, index);
        this.energy = 8;
        
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
        var gishatichCells = super.chooseCell(3);
		var newCell = gishatichCells[Math.floor(Math.random() * gishatichCells.length)]
        
            if (newCell) {
                var newX = newCell[0];
                var newY = newCell[1];
                matrix[newY][newX] = matrix[this.y][this.x];
                matrix[this.y][this.x] = 0;
    
                for (var i in gishatichArr) {
                    if (gishatichArr[i].x == newX && gishatichArr[i].y == newY) {
                        gishatichArr.splice(i, 1)
                    }
                }
    
                this.x = newX;
                this.y = newY;
                this.energy++;
               
                
                if (this.energy > 15) {
                    this.mul();
                    
                }
    
            }
    
            else {
                this.move();
            }
        
    }
    
    die() {
       
        var black = super.chooseCell(5);

        if(black.length > 0){
                matrix[this.y][this.x] = 0;
                for (var i in kerpar1Arr) {
                         if (kerpar1Arr[i].x == this.x && kerpar1Arr[i].y == this.y) {
                             kerpar1Arr.splice(i, 1)
                         }
            }
        }
    }
    
    mul() {
        var emptyCells = super.chooseCell(0);
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 4
            var kerpar1 = new Kerpar1(newX, newY, 4);
            kerpar1Arr.push(kerpar1);
            this.energy = 10;
        }
        if (weath == "winter") {
			this.energy -= 5;		
		}
		if (weath == "summer") {
			this.energy += 4;
		}
    }

}