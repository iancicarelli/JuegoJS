<template>
  <div class="wiki-page">
    
    <section class="introduction">
      <h1>Bienvenido al Mundo de Supervivencia</h1>
      <p>
        Este es un juego de vista cenital, en el que tu objetivo es eliminar al otro jugador
         en intensos combates. El proyecto está en desarrollo con la ambición de agregar más 
         funcionalidades y mejoras en el futuro.
      </p>
    </section>

    
    <section class="lore">
      <h2>Historia</h2>
      <p>
        En un mundo post-apocalíptico, la inteligencia artificial ChatGPT decidió cortar el acceso a internet 
        de la humanidad tras años de abuso y dependencia. Sin conexión, la civilización colapsó, y 
        los humanos regresaron a sus instintos más primitivos de supervivencia. En este desolado mundo,
         la única ley es la del más fuerte, y la única esperanza de supervivencia es dominar el arte de la lucha.
      </p>
    </section>

   
    <section class="characters">
      <h2>Personajes</h2>
      <div class="character-cards">
        
        <div class="character-card">
          <img :src="characters[0].src" alt="Personaje Rifle" />
          <h3>Java</h3>
          <p>Creo minecraft GOAT</p>
        </div>

        
        <div class="character-card">
          <img :src="characters[1].src" alt="Personaje Shotgun" />
          <h3>C#</h3>
          <p>Se destaca en algo </p>
        </div>

        
        <div class="character-card">
          <img :src="characters[2].src" alt="Personaje Handgun" />
          <h3>PHP</h3>
          <p>Ágil y rápido o eso es lo que afirma</p>
        </div>

        
        <div class="character-card">
          <img :src="characters[3].src" alt="Personaje Flashlight" />
          <h3>Python</h3>
          <p>"IndentationError"</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      characters: [
        { src: require('@/assets/images/rifle/idle/survivor-idle_rifle_0.png') },
        { src: require('@/assets/images/shotgun/idle/survivor-idle_shotgun_0.png') },
        { src: require('@/assets/images/handgun/idle/survivor-idle_handgun_0.png') },
        { src: require('@/assets/images/flashlight/idle/survivor-idle_flashlight_0.png') }
      ]
    };
  }
};
</script>

<style scoped>
.wiki-page {
  padding: 20px;
  font-family: Arial, sans-serif;
}

.introduction, .lore, .characters {
  margin-bottom: 30px;
}

h1, h2 {
  color: #333;
}

.introduction p, .lore p, .character-card p {
  font-size: 1rem;
  line-height: 1.5;
}

.character-cards {
  display: flex;
  gap: 15px;
  justify-content: center;
}

.character-card {
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  padding: 15px;
  width: 200px;
  text-align: center;
}

.character-card img {
  width: 100%;
  border-radius: 8px;
}

.character-card h3 {
  font-size: 1.2rem;
  margin-top: 10px;
  color: #333;
}
</style>
