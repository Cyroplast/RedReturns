document.getElementById("body").style.overflow = "hidden";
function startGame() {
 Red = new component(30, 20, "red", 10, 350, "player");
 obA1 = new component(1150, 25, "yellow", 575, 200, "obsticle");
 obA2 = new component(1150, 25, "yellow", 1175, 60, "obsticle");
 document.getElementById("help").style.display = "none";
 myGameArea.start();
}
var obspeed = 1;
var points = 1;
var prev;
var myGameArea = {
    canvas : document.getElementById("canvas1"),
    start : function() {
        if(screen.width <= 500){
            if (confirm("It seems like you're on a mobile device. Switch to a computer for optimal performance.") == true) {
             location.replace("https://blankwhitescreen.com/");
        }
    }
        this.canvas.width = 1200;
        this.canvas.height = 440;
        this.canvas.style.cursor = "none";
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 0.01);
        window.addEventListener('keydown', function (e) {
            myGameArea.keys = (myGameArea.keys || []);
            myGameArea.keys[e.keyCode] = (e.type == "keydown");
        })
        window.addEventListener('keyup', function (e) {
            myGameArea.keys[e.keyCode] = (e.type == "keyup");            
        })
        window.addEventListener('mousemove', function (e) {
            myGameArea.x = e.pageX;
            myGameArea.y = e.pageY;
          })
    }, 
    clear : function(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
stop : function() {
clearInterval(this.interval);
}
}
function component(width, height, color, x, y,type) {
    this.gamearea = myGameArea;
    this.width = width;
    if(type === "obsticle"){
    this.height = height
    } else if (type === "player"){
        this.height = this.width
    }
    this.speedX = 0;  
    this.x = x;
    this.y = y;    
    this.update = function() {
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }   
    this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) ||
        (mytop > otherbottom) ||
        (myright < otherleft) ||
        (myleft > otherright)) {
          crash = false;
        }
        return crash;
      }
}
    function move(){
        myGameArea.canvas.style = "none";
    }
    function updateGameArea(){
        myGameArea.clear();
        if(myGameArea.keys && myGameArea.keys[27]){myGameArea.canvas.style = "block"};
        Red.x = myGameArea.x;
        Red.update();
        obA1.update();
        obA2.update();
        ctx.font = "15px Comic Sans MS";
        ctx.fillStyle = "white";
        ctx.fillText(`${points - 1} Point(s)`, 10, 20);
        obA1.y += obspeed;
        obA2.y = obA1.y;
        if (Red.crashWith(obA1) || Red.crashWith(obA2)) {
            myGameArea.stop();
            ctx.font = "15px Comic Sans MS";
            ctx.fillStyle = "white";
            ctx.fillText("Game Over: u crashed loser", 500, 220);
        }
        if(obA1.y >= 470){
            points+=1;
            obA1.x = (Math.floor(obA1.x = Math.random() * 1151)-1)-1151;
            obA2.x = obA1.x + 1200;
            obA1.y = 60;
            obspeed+=0.05;
        }
    }
              


/*
if(myGameArea.y <= this.y + this.height/2 && myGameArea.x >= this.x + this.width/2){
    Red.x = Math.floor(Math.random() * 1186);
    Red.y = Math.floor(Math.random() * 586);
    }
*/
