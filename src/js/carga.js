window.onload = () => {
    const hero = {
      element : document.getElementById("p1"),
      topPosition: 0,
      leftPosition: 0,
      step: 20,
      move: function(direction){
        switch(direction){
          case "ArrowUp": 
          this.topPosition = this.topPosition - this.step;
          this.element.style.top = this.topPosition + "px";
              break;
           case "ArrowDown":
            this.topPosition = this.topPosition + this.step;
          this.element.style.top = this.topPosition + "px";
          break;
          case "ArrowLeft": 
          this.leftPosition = this.leftPosition - this.step;
          this.element.style.left = this.leftPosition + "px";
              break;
           case "ArrowRight":
            this.leftPosition = this.leftPosition + this.step;
          this.element.style.left = this.leftPosition + "px";
            break;   
           default:
            break;   
        }
      }
    };

    const enemy = {
        element : document.getElementById("p2"),
      topPosition: 0,
      leftPosition: 0,
      step: 20,
    move: function(direction){
        switch(direction){
            case "keyW": 
          this.topPosition = this.topPosition - this.step;
          this.element.style.top = this.topPosition + "px";
              break;
           case "KeyS":
            this.topPosition = this.topPosition + this.step;
          this.element.style.top = this.topPosition + "px";
          break;
          case "KeyA": 
          this.leftPosition = this.leftPosition - this.step;
          this.element.style.left = this.leftPosition + "px";
              break;
           case "KeyD":
            this.leftPosition = this.leftPosition + this.step;
          this.element.style.left = this.leftPosition + "px";
            break;   
           default:
            break;   
        }
    }
      
    }
    onkeydown = (event) => {
      hero.move(event.code);
      enemy.move(event.code);
      
    }
}