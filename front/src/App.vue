<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">Wiki</router-link> |
    <router-link to="/register">Game</router-link>
  </nav>
  <router-view/>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
 body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
  background-color: #040301;
}

nav a {
  font-weight: bold;
  color: #3a4d5f;
}

nav a.router-link-exact-active {
  color: #efdd80;
}
</style>
