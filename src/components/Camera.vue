<template>
  <div>
    <video
      v-show="stream"
      id="video-item"
      width="300"
      height="300"
      :src-object.prop.camel="stream"
      autoplay
    ></video>
    <button
      class="media-btn"
      v-if="!stream"
      @click="getMedia"
    >{{ isLoading ? "laddar..." : "Starta kamera" }}</button>
    <a
      v-scroll-to="{
        el: '#my-canvas',
        offset: 50,
        easing: 'ease',
        duration: 2000,
      }"
      class="media-btn"
      v-else
      @click="takeSnapshot"
    >Ta foto</a>
  </div>
</template>

<script>
export default {
  name: "camera",
  data() {
    return {
      stream: null,
      isLoading: false,
      imageCapture: null
    };
  },
  methods: {
    getMedia() {
      this.isLoading = true;
      navigator.mediaDevices
        .getUserMedia({
          video: true
        })
        .then(mediaStream => {
          this.stream = mediaStream;
          const track = mediaStream.getVideoTracks()[0];
          this.imageCapture = new ImageCapture(track);
          this.isLoading = false;
        })
        .catch(err => console.log(err));
    },
    takeSnapshot() {
      let canvas = document.querySelector("#my-canvas");
      canvas.removeAttribute("data-caman-id");
      this.imageCapture
        .takePhoto()
        .then(blob => createImageBitmap(blob))
        .then(imageBitmap => {
          this.drawCanvas(canvas, imageBitmap);
        })
        .catch(error => console.log(error));
      this.$emit("imageCapture", this.imageCapture);
    },
    drawCanvas(canvas, img) {
      canvas.width = getComputedStyle(canvas).width.split("px")[0];
      canvas.height = getComputedStyle(canvas).height.split("px")[0];
      let ratio = Math.min(
        canvas.width / img.width,
        canvas.height / img.height
      );
      let x = (canvas.width - img.width * ratio) / 2;
      let y = (canvas.height - img.height * ratio) / 2;
      canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
      canvas
        .getContext("2d")
        .drawImage(
          img,
          0,
          0,
          img.width,
          img.height,
          x,
          y,
          img.width * ratio,
          img.height * ratio
        );
    }
  }
};
</script>

<style lang="scss" scoped>
#video-item {
  margin: auto;
  display: block;
}
.media-btn {
  margin: auto;
  width: 200px;
  border: none;
  outline: none;
  color: #fff;
  display: block;
  cursor: pointer;
  text-align: center;
  border-radius: 3px;
  padding: 14px 10px;
  background: #333;
}

@media screen and (min-width: 768px) {
  #video-item {
    width: 560px;
    height: 560px;
  }
}
</style>
