<script setup>
import { RouterLink } from "vue-router";
const props = defineProps(["cardInfo","routePrefix"]);
</script>

<template>
  <div class="col-xxl-4 col-lg-6 py-4">
    <RouterLink :to="routePrefix+cardInfo.path" class="card p-2 no-decoration">
      <img
        class="card-img-top my-2"
        :src="'preview'+ routePrefix + cardInfo.path + '.png'"
        alt=""
      />
      <div class="card-body">
        <h5 class="card-title">{{ cardInfo.headline }}</h5>
        <p class="card-text">
          {{ cardInfo.description }}
        </p>
      </div>
    </RouterLink>
  </div>
</template>

<style scoped>
.no-decoration {
  text-decoration: none;
  color: inherit;
}
</style>
