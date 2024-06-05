<template>
  <div v-if="showPopUp">
    <div class="card position-absolute top-50 start-50 translate-middle">
      <div class="card-body">
        <header>
            <slot name="title" class="card-title"></slot>
        </header>
        
          <slot class="card-text"></slot>
          <slot name="footer" class="card-footer"></slot>
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
