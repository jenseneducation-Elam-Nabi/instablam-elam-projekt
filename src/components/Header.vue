<template>
  <div>
    <header>
      <Heading headingTitle="Instablam" smallHeading="Create and edit images easily." />
    </header>
  </div>
</template>

<script>
import Heading from "@/components/Heading.vue";
export default {
  components: {
    Heading
  }
};
</script>

<style lang="scss" scoped>
header {
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>