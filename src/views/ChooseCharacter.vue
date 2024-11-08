<template>
    <div>
      <h1>Selecciona tu personaje</h1>
  
      <div class="slideshow-container" ref="slideshowP1">
        <div v-for="(slide, index) in slidesP1" :key="'p1-' + index" class="mySlides fade" v-show="index + 1 === slideIndexP1">
          <div class="numbertext">{{ index + 1 }} / 4</div>
          <img :src="slide.src" class="slide-image">
          <div class="text">p1</div>
        </div>
        <a class="prev" @click="plusSlidesP1(-1)">&#10094;</a>
        <a class="next" @click="plusSlidesP1(1)">&#10095;</a>
        <div v-for="(dot, index) in slidesP1" :key="'dotP1-' + index" class="dot" @click="currentSlideP1(index + 1)"></div>
      </div>
  
      <div class="slideshow-container" ref="slideshowP2">
        <div v-for="(slide, index) in slidesP2" :key="'p2-' + index" class="mySlides fade" v-show="index + 1 === slideIndexP2">
          <div class="numbertext">{{ index + 1 }} / 4</div>
          <img :src="slide.src" class="slide-image">
          <div class="text">p2</div>
        </div>
        <a class="prev" @click="plusSlidesP2(-1)">&#10094;</a>
        <a class="next" @click="plusSlidesP2(1)">&#10095;</a>
        <div v-for="(dot, index) in slidesP2" :key="'dotP2-' + index" class="dot" @click="currentSlideP2(index + 1)"></div>
      </div>
  
      <div class="button-container">
        <button @click="ready">Listo</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ChooseCharacter',
    data() {
      return {
        slideIndexP1: 1,
        slideIndexP2: 1,
        slidesP1: [
          { src: require('@/assets/images/rifle/idle/survivor-idle_rifle_0.png') },
          { src: require('@/assets/images/shotgun/idle/survivor-idle_shotgun_0.png') },
          { src: require('@/assets/images/handgun/idle/survivor-idle_handgun_0.png') },
          { src: require('@/assets/images/flashlight/idle/survivor-idle_flashlight_0.png') }
        ],
        slidesP2: [
          { src: require('@/assets/images/shotgun/idle/survivor-idle_shotgun_0.png') },
          { src: require('@/assets/images/rifle/idle/survivor-idle_rifle_0.png') },
          { src: require('@/assets/images/handgun/idle/survivor-idle_handgun_0.png') },
          { src: require('@/assets/images/flashlight/idle/survivor-idle_flashlight_0.png') }
        ]
      };
    },
    methods: {
      plusSlidesP1(n) {
        this.showSlidesP1(this.slideIndexP1 += n);
      },
      currentSlideP1(n) {
        this.showSlidesP1(this.slideIndexP1 = n);
      },
      showSlidesP1(n) {
        if (n > this.slidesP1.length) this.slideIndexP1 = 1;
        if (n < 1) this.slideIndexP1 = this.slidesP1.length;
      },
      plusSlidesP2(n) {
        this.showSlidesP2(this.slideIndexP2 += n);
      },
      currentSlideP2(n) {
        this.showSlidesP2(this.slideIndexP2 = n);
      },
      showSlidesP2(n) {
        if (n > this.slidesP2.length) this.slideIndexP2 = 1;
        if (n < 1) this.slideIndexP2 = this.slidesP2.length;
      },
      ready() {
        localStorage.setItem('selectedP1', this.slideIndexP1 - 1);
        localStorage.setItem('selectedP2', this.slideIndexP2 - 1);
        this.$router.push({ path: '/game' });
      }
    }
  };
  </script>
  
  <style src="@/assets/style/ChooseCharacter.css"></style>