
function generateHealth() {
    return Math.floor(Math.random() * 100) + 1; // Genera un valor entre 1 y 100
}

function startGame() {
    const selectedP1 = localStorage.getItem('selectedP1');
    const selectedP2 = localStorage.getItem('selectedP2');

    const player1Images = [
        "../images/rifle/idle/survivor-idle_rifle_0.png",
        "../images/shotgun/idle/survivor-idle_shotgun_0.png",
        "../images/handgun/idle/survivor-idle_handgun_0.png",
        "../images/flashlight/idle/survivor-idle_flashlight_0.png"
    ];

    const player2Images = [
        "../images/shotgun/idle/survivor-idle_shotgun_0.png",
        "../images/rifle/idle/survivor-idle_rifle_0.png",
        "../images/handgun/idle/survivor-idle_handgun_0.png",
        "../images/flashlight/idle/survivor-idle_flashlight_0.png"
    ];

    const player1Image = player1Images[selectedP1];
    const player2Image = player2Images[selectedP2];

    GameFirstPlayer = new component(32, 32, player1Image, 210, 240, 0, 0, generateHealth(), 0);
    GameSecondPlayer = new component(32, 32, player2Image, 530, 240, 0, 0, generateHealth(), 1);
    GameFirstPlayer.team = 0
    GameSecondPlayer.team = 1
    GameObjects = [
	GameFirstPlayer, 
	GameSecondPlayer
	];
    myGameArea.start();
    updateHealth();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 640;
        this.canvas.height = 480;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('keydown', function (e) {
            e.preventDefault();
            myGameArea.keys = (myGameArea.keys || []);
            myGameArea.keys[e.keyCode] = (e.type == "keydown");
        })
        window.addEventListener('keyup', function (e) {
            myGameArea.keys[e.keyCode] = (e.type == "keydown");
        })
    },
    stop : function() {
        clearInterval(this.interval);
    },    
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function component(width, height, imageSrc, x, y, type, angle, health, team) {
    this.type = type;
    this.team = team;
    this.width = width;
    this.height = height;
    this.speed = 0;
    this.angle = 0;
    this.moveAngle = 0;
    this.x = x;
    this.y = y;    
    this.health = health;

    this.image = new Image();
    this.image.src = imageSrc;

    if (this.type == 1) {
	this.speed = 16;
	this.angle = angle;
    }
    
    this.newbullet = function() {
    let bulletColor = "../images/bullet.png";
	return new component(4, 4, bulletColor, this.x, this.y, 1, this.angle, 1, this.team);
    }

    this.update = function() {
        ctx = myGameArea.context;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        
        ctx.drawImage(this.image, this.width / -2, this.height / -2, this.width, this.height);
        ctx.restore();
    }

    this.newPos = function() {
	if (type!=1) {
        	this.angle += this.moveAngle * Math.PI / 180;
	}
        let newx = this.x + this.speed * Math.sin(this.angle);
        let newy = this.y - this.speed * Math.cos(this.angle);

	if (newx >= this.width / 2 && this.width / 2 + newx <= myGameArea.canvas.width){ 
		this.x = newx
	} else if (this.type == 1) {
		this.health = 0;
	}
	if (newy > this.height / 2 && this.height / 2 + newy <= myGameArea.canvas.height){
		this.y = newy
	} else if (this.type == 1) {
		this.health = 0;
	}
   }
}

function updateGameArea() {
    //refresh
      myGameArea.clear();
    	GameObjects[0].moveAngle = 0;
    	GameObjects[0].speed = 0;
    	GameObjects[1].moveAngle = 0;
    	GameObjects[1].speed = 0;
    // keys
  	if (myGameArea.keys && myGameArea.keys[37]) {
	    GameObjects[0].moveAngle = -6; 
	}
    	if (myGameArea.keys && myGameArea.keys[39]) {
    	    GameObjects[0].moveAngle = 6; 
	}
    	if (myGameArea.keys && myGameArea.keys[38]) {
    	    GameObjects[0].speed= 2; 
	}
    	if (myGameArea.keys && myGameArea.keys[40]) {
	    GameObjects[0].speed= -2; 
	}
    	if (myGameArea.keys && myGameArea.keys[65]) {
	    GameObjects[1].moveAngle = -6; 
	}
    	if (myGameArea.keys && myGameArea.keys[68]) {
	    GameObjects[1].moveAngle = 6; 
	}
    	if (myGameArea.keys && myGameArea.keys[87]) {
	    GameObjects[1].speed= 2; 
	}
    	if (myGameArea.keys && myGameArea.keys[83]) {
	    GameObjects[1].speed= -2; 
	}
	if (myGameArea.keys && myGameArea.keys[190]) {
	    GameObjects.push(GameObjects[0].newbullet());
	}
	if (myGameArea.keys && myGameArea.keys[69]) {
	    GameObjects.push(GameObjects[1].newbullet());
	}
    // update
    for (let i = 0; i < GameObjects.length; i++) {
	// death
	if (GameObjects[i].health == 0) {
	    GameObjects.splice(i, 1);
	}
	GameObjects[i].newPos();
	GameObjects[i].update();
    }
}

function updateHealth() {
    const heroHealthBar = document.getElementById("P1-health");
    heroHealthBar.value = GameFirstPlayer.health;

    const enemyHealthBar = document.getElementById("P2-health");
    enemyHealthBar.value = GameSecondPlayer.health;

    document.getElementById("P1-health-span").innerText = `P1 Health: ${GameFirstPlayer.health}`;
    document.getElementById("P2-health-span").innerText = `P2 Health: ${GameSecondPlayer.health}`;
}
