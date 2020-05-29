<template>
  <main>
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
      imageCapture: null
    };
  },
  methods: {
    setImage(imageCapture) {
      this.imageCapture = imageCapture;
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
</style>