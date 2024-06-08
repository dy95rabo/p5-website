<template>
  <div v-if="showPopUp">
    <div
      class="card position-absolute top-50 start-50 translate-middle bg-secondary"
    >
      <div class="card-body">
        <header>
          <slot name="title" class="card-title"></slot>
        </header>
        <main>
          <slot class="card-text"></slot>
        </main>
        <footer>
          <slot name="footer" class="card-footer"></slot>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["showPopUp"],
  data() {
    return {};
  },
};
</script>

<style scoped></style>
