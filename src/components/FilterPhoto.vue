<template>
  <div class="filter-container">
    <h1>
      Filter
      <i class="fas fa-cloud-download-alt" title="Ladda ner bild" @click="download"></i>
    </h1>
    <div class="grid-container">
      <div class="filter-content">
        <label>
          <span>Ljusgrad</span>
          <span>{{ brightnessValue }}</span>
        </label>
        <input
          type="range"
          min="-100"
          max="100"
          :step="5"
          v-model="brightnessValue"
          @input="applyFilters"
        />
      </div>
      <div class="filter-content">
        <label>
          <span>Saturation</span>
          <span>{{ saturationValue }}</span>
        </label>
        <input
          type="range"
          min="-100"
          max="100"
          :step="5"
          v-model="saturationValue"
          @input="applyFilters"
        />
      </div>
      <div class="filter-content">
        <label>
          <span>Hue</span>
          <span>{{ hueValue }}</span>
        </label>
        <input type="range" min="0" :step="5" max="100" v-model="hueValue" @input="applyFilters" />
      </div>
      <div class="filter-content">
        <label>
          <span>Gamma</span>
          <span>{{ gammaValue }}</span>
        </label>
        <input type="range" min="0" :step="1" max="5" v-model="gammaValue" @input="applyFilters" />
      </div>
      <div class="filter-content">
        <label>
          <span>Vibration</span>
          <span>{{ vibranceValue }}</span>
        </label>
        <input
          type="range"
          min="-100"
          :step="5"
          max="100"
          v-model="vibranceValue"
          @input="applyFilters"
        />
      </div>
      <div class="filter-content">
        <label>
          <span>Noise</span>
          <span>{{ noiseValue }}</span>
        </label>
        <input
          type="range"
          min="-100"
          :step="5"
          max="100"
          v-model="noiseValue"
          @input="applyFilters"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "filterPhoto",
  methods: {
    applyFilters() {
      const brightness = parseInt(this.brightnessValue);
      const saturation = parseInt(this.saturationValue);
      const hue = parseInt(this.hueValue);
      const gamma = parseInt(this.gammaValue);
      const vibrance = parseInt(this.vibranceValue);
      const noise = parseInt(this.noiseValue);
      this.Caman("#my-canvas", function() {
        this.revert();
        this.brightness(brightness);
        this.saturation(saturation);
        this.hue(hue);
        this.gamma(gamma);
        this.vibrance(vibrance);
        this.noise(noise);
        this.render();
      });
    },

    download() {
      this.Caman("#my-canvas", function() {
        let a = document.createElement("a");
        a.href = this.toBase64();
        a.download = "image-edit.png";
        a.click();
      });
    }
  },
  data() {
    return {
      brightnessValue: 0,
      saturationValue: 0,
      gammaValue: 1,
      vibranceValue: 0,
      hueValue: 0,
      noiseValue: 0
    };
  }
};
</script>

<style lang="scss" scoped>
.filter-container {
  width: 100%;
  margin: auto;
  max-width: 560px;
  margin-bottom: 3rem;
  h1 {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    justify-content: space-between;

    i {
      width: 40px;
      height: 40px;
      padding: 10px;
      color: #333;
      display: flex;
      cursor: pointer;
      transition: 0.3s;
      border-radius: 3px;
      align-items: center;
      justify-content: center;
    }
  }
  .filter-content {
    display: flex;
    padding: 0 1rem;
    flex-flow: column;

    label {
      width: 100%;
      display: flex;
      align-items: center;
      margin: 1rem 0 0.5rem 0;
      justify-content: space-between;
    }
  }
}

@media screen and (min-width: 768px) {
  .filter-container {
    .grid-container {
      gap: 0 2rem;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      .filter-content {
        padding: 0;
      }
    }
  }
}
</style>
