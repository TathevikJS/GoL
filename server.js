var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require("fs");

app.use(express.static("."));

app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);


matrix = [];
n = 30;
m = 30;

for (var y = 0; y < n; y++) {
    matrix[y] = [];
    for (var x = 0; x < m; x++) {
        matrix[y][x] = Math.floor(Math.random() * 6);
    }
}

io.sockets.emit('send matrix', matrix)


grassArr = [];
grassEaterArr = [];
gishatichArr = [];
kerpar1Arr = [];
kerpar2Arr = [];



weath = "summer";
Grass = require("./classes/Grass")
GrassEater = require("./classes/GrassEater")
Gishatich = require("./classes/Gishatich")
Kerpar1 = require("./classes/Kerpar1")
Kerpar2 = require("./classes/Kerpar2")


function createObject(matrix) {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                var gr = new Grass(x, y, 1);
                grassArr.push(gr)
            }
            else if (matrix[y][x] == 2) {
                var grEater = new GrassEater(x, y, 2);
                grassEaterArr.push(grEater);
            }
            else if (matrix[y][x] == 3) {
                var gishatich = new Gishatich(x, y, 3);
                gishatichArr.push(gishatich);
            }
            else if (matrix[y][x] == 4) {
                var kerpar1 = new Kerpar1(x, y, 4);
                kerpar1Arr.push(kerpar1);
            }
            else if (matrix[y][x] == 5) {
                var kerpar2 = new Kerpar2(x, y, 5);
                kerpar2Arr.push(kerpar2);
            }
        }
    }
    
    io.sockets.emit('send matrix', matrix)


}


function game() {
    for (var i in grassArr) {
        grassArr[i].mul();
    }

    for (var i in grassEaterArr) {

        grassEaterArr[i].eat();

    }
    for (var i in gishatichArr) {

        gishatichArr[i].eat();

    }
    for (var i in kerpar1Arr) {

        kerpar1Arr[i].eat();

    }
    for (var i in kerpar2Arr) {

        kerpar2Arr[i].move();

    }
    
    io.sockets.emit("send matrix", matrix);
}

setInterval(game, 400)

function addGrassEater() {
    for (var i = 0; i < 10; i++) {   
    var x = Math.floor(Math.random() * matrix[0].length)
    var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0 || matrix[y][x] == 1) {
            matrix[y][x] = 2
            var grEater = new GrassEater(x, y, 2);
            grassEaterArr.push(grEater);
        }
    }
    io.sockets.emit("send matrix", matrix);
}

function addKerpar2(){
    for(var i = 0;i < 6; i++){
    var x = Math.floor(Math.random() * matrix[0].length)
    var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 5
            var kerpar2 = new Kerpar2(x, y, 5);
            kerpar2Arr.push(kerpar2);
        }
    }
    io.sockets.emit("send matrix", matrix);
}

function addGishatich() {
    for (var i = 0; i < 5; i++) {   
    var x = Math.floor(Math.random() * matrix[0].length)
    var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0 || matrix[y][x] == 1) {
            matrix[y][x] = 3
            var gishatich = new Gishatich(x, y, 3);
            gishatichArr.push(gishatich);
        }
    }
    io.sockets.emit("send matrix", matrix);
}


function weather() {
    if (weath == "winter") {
        weath = "spring"
    }
    else if (weath == "spring") {
        weath = "summer"
    }
    else if (weath == "summer") {
        weath = "autumn"
    }
    else if (weath == "autumn") {
        weath = "winter"
    }
    io.sockets.emit('weather', weath)
}
setInterval(weather, 5000);



io.on('connection', function (socket) {
    createObject(matrix);
    socket.on("add grassEater", addGrassEater);
    socket.on("add Kerpar2", addKerpar2 );
    socket.on("add Gishatich", addGishatich);
})

var statistics = {};

setInterval(function() {
    statistics.grass = grassArr.length;
    statistics.grassEater = grassEaterArr.length;
    statistics.gishatich = gishatichArr.length;
    statistics.Kerpar1 = kerpar1Arr.length;
    statistics.Kerpar2 = kerpar2Arr.length;
    fs.writeFile("statistics.json", JSON.stringify(statistics), function(){
        console.log("send")
    })
},1000)

