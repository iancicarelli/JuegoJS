<template>
    <div id="game-container">
      <div id="health-bars">
        <div style="position: absolute; top: 10px; left: 10px; color: aliceblue;">
            <progress id="P2-health" max="100" :value="player2.health"></progress>
          <span id="P2-health-span">P2 Health: {{ player2.health }}</span>
        </div>
        <div style="position: absolute; top: 10px; right: 10px; color: aliceblue;">
            <progress id="P2-health" max="100" :value="player1.health"></progress>
          <span id="P1-health-span">P1 Health: {{ player1.health }}</span>
        </div>
      </div>
      <canvas ref="gameCanvas" width="640" height="480"></canvas>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        player1Images: [
          require("../assets/images/rifle/idle/survivor-idle_rifle_0.png"),
          require("../assets/images/shotgun/idle/survivor-idle_shotgun_0.png"),
          require("../assets/images/handgun/idle/survivor-idle_handgun_0.png"),
          require("../assets/images/flashlight/idle/survivor-idle_flashlight_0.png")
        ],
        player2Images: [
          require("../assets/images/shotgun/idle/survivor-idle_shotgun_0.png"),
          require("../assets/images/rifle/idle/survivor-idle_rifle_0.png"),
          require("../assets/images/handgun/idle/survivor-idle_handgun_0.png"),
          require("../assets/images/flashlight/idle/survivor-idle_flashlight_0.png")
        ],
        selectedPlayer1Image: null,
        selectedPlayer2Image: null,
        keys: {},
        player1: { width: 32, height: 32, x: 210, y: 240, health: 100, angle: 0, speed: 0, moveAngle: 0, type: 0 },
        player2: { width: 32, height: 32, x: 530, y: 240, health: 100, angle: 0, speed: 0, moveAngle: 0, type: 0 },
        bullet1: { width: 4, height: 4, x: 0, y: 0, health: 1, angle: 0, speed: 5, moveAngle: 0, type: 1 },
        bullet2: { width: 4, height: 4, x: 0, y: 0, health: 1, angle: 0, speed: 5, moveAngle: 0, type: 1 },
        gameObjects: [],
      };
    },
    methods: {
      startGame() {
        const selectedP1 = localStorage.getItem('selectedP1');
        const selectedP2 = localStorage.getItem('selectedP2');

        this.selectedPlayer1Image = new Image();
        this.selectedPlayer1Image.src = this.player1Images[selectedP1];
        
        this.selectedPlayer2Image = new Image();
        this.selectedPlayer2Image.src = this.player2Images[selectedP2];
  
        this.updateGameArea();
        this.gameInterval = setInterval(this.updateGameArea, 20);

        this.gameObjects.push(this.player1);
        this.gameObjects.push(this.player2);
      },
      updateGameArea() {
        const canvas = this.$refs.gameCanvas;
        const ctx = canvas.getContext("2d");

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        //p1
        if (this.keys['ArrowLeft']) this.player1.moveAngle = -6;
        if (this.keys['ArrowRight']) this.player1.moveAngle = 6;
        if (this.keys['ArrowUp']) this.player1.speed = 2;
        if (this.keys['ArrowDown']) this.player1.speed = -2;
        if (this.keys['.']) this.newBullet1();

        //pp2
        if (this.keys['a']) this.player2.moveAngle = -6;
        if (this.keys['d']) this.player2.moveAngle = 6;
        if (this.keys['w']) this.player2.speed = 2;
        if (this.keys['s']) this.player2.speed = -2;
        if (this.keys['e']) this.newBullet2();

        for (let index = 0; index < this.gameObjects.length; index++) {
          this.updatePlayerPosition(this.gameObjects[index]);
          if (index == 0) this.drawPlayer(ctx, this.gameObjects[index], this.selectedPlayer1Image);
          else if (index == 1) this.drawPlayer(ctx, this.gameObjects[index], this.selectedPlayer2Image);
          else this.drawBullet(ctx, this.gameObjects[index]);
        }
      },
      async newBullet1() {
        this.bullet1.x = this.player1.x;
        this.bullet1.angle = this.player1.angle;
        this.bullet1.y = this.player1.y;
        this.gameObjects.push(this.bullet1);
      },
      async newBullet2() {
        this.bullet2.x = this.player2.x;
        this.bullet2.angle = this.player2.angle;
        this.bullet2.y = this.player2.y;
        this.gameObjects.push(this.bullet2);
      },
      newPos(player) {
        if (player.type!=1) {
                player.angle += player.moveAngle * Math.PI / 180;
        }
              let newx = player.x + player.speed * Math.sin(player.angle);
              let newy = player.y - player.speed * Math.cos(player.angle);

        if (newx >= player.width / 2 && player.width / 2 + newx <= 600){ 
          player.x = newx
        } else if (player.type == 1) {
          player.health = 0;
        }
        if (newy > player.height / 2 && player.height / 2 + newy <= 480){
          player.y = newy
        } else if (player.type == 1) {
          player.health = 0;
        }
      },
      updatePlayerPosition(player) {
        this.newPos(player)
        if (player.type != 1) {
          player.moveAngle = 0;
          player.speed = 0;
        }
      },
      drawPlayer(ctx, player, image) {
        ctx.save();
        ctx.translate(player.x, player.y);
        ctx.rotate(player.angle);
        ctx.drawImage(image, player.width / -2, player.height / -2, player.width, player.height);
        ctx.restore();
      },
      drawBullet(ctx, player) {
        ctx.save();
        ctx.translate(player.x, player.y);
        ctx.rotate(player.angle);
        ctx.fillStyle = "yellow";
        ctx.fillRect(player.width / -2, player.height / -2, player.width, player.height);
        ctx.restore();
      },
      keyDownHandler(e) {
        this.keys[e.key] = true;
      },
      keyUpHandler(e) {
        this.keys[e.key] = false;
      }
    },
    mounted() {
      window.addEventListener("keydown", this.keyDownHandler);
      window.addEventListener("keyup", this.keyUpHandler);
      this.startGame();
    },
    beforeUnmount() {
      window.removeEventListener("keydown", this.keyDownHandler);
      window.removeEventListener("keyup", this.keyUpHandler);
      if (this.gameInterval) clearInterval(this.gameInterval);
    }
  };
</script>

  
  
  <style src="@/assets/style/game.css"></style>
  