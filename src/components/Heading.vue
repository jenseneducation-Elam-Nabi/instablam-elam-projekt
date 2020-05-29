<template>
  <div class="heading-content">
    <h1>
      {{ headingTitle }}
      <p>{{ smallHeading }}</p>
    </h1>
  </div>
</template>

<script>
export default {
  props: {
    headingTitle: {
      type: String
    },
    smallHeading: {
      type: String
    }
  },
  name: "heading"
};
</script>

<style lang="scss" scoped>
.heading-content {
  display: flex;
  flex-flow: column;
  justify-content: center;
  padding: 2rem 1rem 0 1rem;
}
h1 {
  font-size: 5rem;

  p {
    font-size: 1rem;
  }
}

@media screen and (min-width: 768px) {
  .heading-content {
    padding: 2rem 0;
  }
}
</style>