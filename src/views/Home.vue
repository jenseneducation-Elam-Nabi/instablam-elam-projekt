<template>
  <main>
    <h1 id="coords">
      Nuvarande koordinater:
      <p>Latitude: {{ lat }} Longitude: {{ long }}</p>
    </h1>
    <Camera @imageCapture="setImage" />
    <Canvas :imageCapture="imageCapture" />
  </main>
</template>

<script>
import Camera from "@/components/Camera.vue";
import Canvas from "@/components/Canvas.vue";
export default {
  name: "home",
  components: {
    Camera,
    Canvas
  },
  data() {
    return {
      imageCapture: null,
      lat: null,
      long: null
    };
  },
  methods: {
    setImage(imageCapture) {
      this.imageCapture = imageCapture;
    }
  },
  mounted() {
    if (!navigator.geolocation) {
      console.log("Your browser doesn't support geolocation");
    } else {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.long = position.coords.longitude;
        console.log("Latitude: ", this.lat);
        console.log("Longitude: ", this.long);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
main {
  width: 100%;
  margin: auto;
  max-width: 560px;
}

#coords {
  font-size: 3rem;
  text-align: center;
  margin-bottom: 2rem;

  p {
    font-size: 1rem;
  }
}
</style>