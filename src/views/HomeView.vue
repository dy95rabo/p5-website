<script setup>
import PreviewCard from "@/components/home/PreviewCard.vue";
import { ref, onMounted } from "vue";
import PopUpCard from "@/components/PopUpCard.vue";
import { useEventListener } from "@vueuse/core";
const showHelp = ref(false);
const visitForFirstTime = ref(!sessionStorage.getItem("visitedAlready"));

const props = defineProps(["routes"]);

onMounted(() => {
  useEventListener(document, "keydown", (e) => {
    if (e.code == "Escape") {
      sessionStorage.removeItem("visitedAlready");
    }
    if (e.code == "KeyH") {
      if (visitForFirstTime.value) {
        sessionStorage.setItem("visitedAlready", true);
        visitForFirstTime.value = false;
        return;
      }
      showHelp.value = !showHelp.value;
    }
  });
  useEventListener(document, "click", (e) => {
    if (visitForFirstTime.value) {
      sessionStorage.setItem("visitedAlready", true);
      visitForFirstTime.value = false;
      return;
    }
  });
});
</script>

<template>
  <div class="m-4">
    <h1 class="text-center">My Creative Coding Website</h1>
  </div>
  <div class="container mt-4">
    <div class="row">
      <template v-for="(route, index1) of routes" :key="index1">
        <PreviewCard
          v-for="(subRoute, index) of route.subRoutes"
          :key="index1 + '' + index"
          :card-info="subRoute"
          :route-prefix="route.routePrefix"
        ></PreviewCard>
      </template>
    </div>
  </div>

  <pop-up-card :show-pop-up="showHelp || visitForFirstTime">
    <p class="lead">
      <strong>
        You can Press "h" on any screen to open/close the help panel for that
        screen
      </strong>
    </p>
  </pop-up-card>
</template>
