var socket = io();

side = 20;
n = 30;
m = 30;
var weath;

function setup() {
    createCanvas(n * side, m * side);
    background('#acacac');
}

socket.on("weather", function (data) {
    weath = data;
    console.log(weath); 
})

function nkarel(matrix) {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[0].length; x++) {
            var obj = matrix[y][x];
            if (obj == 1) {
                if (weath == "summer") {
                    fill("green");
                } else if (weath == "autumn") {
                    fill("#333300");
                } else if (weath == "winter") {
                    fill("white");
                } else if (weath == "spring") {
                    fill("#4dffa6");
                }
            } else if (obj == 2) {
                fill("yellow");
            } else if (obj == 3) {
                fill("red");
            } else if (obj == 4) {
                fill("orange");
            } else if (obj == 5) {
                fill("black");
            } else if (obj == 0) {
                fill("#acacac")
            }
            rect(x * side, y * side, side, side);
        }
    }

}

socket.on('send matrix', nkarel)



function addGrassEater() {
    socket.emit("add grassEater")
}

function addKerpar2() {
    socket.emit("add Kerpar2")
}

function addGishatich() {
    socket.emit("add Gishatich")
}
