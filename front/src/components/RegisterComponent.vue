<template>
    <div class="register-container">
      <h2>Registro de Jugador</h2>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="playerName">Nombre del Jugador:</label>
          <input type="text" id="playerName" v-model="playerName" required />
        </div>
        <div class="form-group">
          <label for="playerEmail">Correo Electrónico:</label>
          <input type="email" id="playerEmail" v-model="playerEmail" required />
        </div>
        <button type="submit">Registrar</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  export default {
    data() {
      return {
        playerName: '',
        playerEmail: ''
      };
    },
    methods: {
      async handleSubmit() {
  if (this.playerName && this.playerEmail) {
    try {
      const response = await axios.post('http://localhost:3000/register', {
        playerName: this.playerName,
        playerEmail: this.playerEmail
      });
      console.log(response.data.message);
      this.$router.push({ name: 'chooseCharacter' });
    } catch (error) {
      console.error('Error al registrar:', error.response || error);
    }
  } else {
    alert('Por favor, complete todos los campos.');
  }
}
    }
};
  </script>
  
  <style scoped>
  .register-container {
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  h2 {
    text-align: center;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    font-weight: bold;
  }
  
  input {
    width: 100%;
    padding: 8px;
    margin-top: 5px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  button {
    width: 100%;
    padding: 10px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #45a049;
  }
  </style>
  