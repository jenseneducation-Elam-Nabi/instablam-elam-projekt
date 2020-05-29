<template>
  <div v-show="imageCapture">
    <canvas
      data-caman-hidpi-disabled
      id="my-canvas"
      width="300"
      height="300"
    ></canvas>
    <FilterPhoto />
  </div>
</template>

<script>
import FilterPhoto from "@/components/FilterPhoto.vue";
export default {
  name: "CanvasPhoto",
  props: ["imageCapture"],
  components: {
    FilterPhoto,
  },
};
</script>

<style lang="scss" scoped>
#my-canvas {
  margin: auto;
  display: block;
}

@media screen and (min-width: 768px) {
  #my-canvas {
    width: 560px;
    height: 560px;
  }
}
</style>
