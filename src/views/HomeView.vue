<script setup>
import PreviewCard from "@/components/home/PreviewCard.vue";
const cards = [
  {
    headline: "Random Lines",
    description: "Generate random lines",
    imageName: "day1/01-random-lines.png",
  },
  {
    headline: "Floating Bubbles",
    description: "pop some floating Bubbles",
    imageName: "day1/02-floating-bubbles.png",
  },
  {
    headline: "Random Maze",
    description: "Creates a random Maze. You can create a new maze with every click",
    imageName: "day1/03-random-maze.png",
  },
  {
    headline: "Random Rectangles",
    description: "Generate random Rectangles with a parallax effect when you move your mouse cursor",
    imageName: "day1/04-parallax-squares.png",
  },
  {
    headline: "Image Pixel Manipulation",
    description: "With every click you can se a different type of pixel manipulation, like: red-, green-, blue-filters, color-inversion and grayscale",
    imageName: "day2/01-image-pixel-manipulation.png",
  },
  {
    headline: "Max Color Values",
    description: "Generate random lines",
    imageName: "day2/02-max-pixel-value.png",
  },
  {
    headline: "Glitch Effect",
    description: "Generate random lines",
    imageName: "day2/03-glitch-effect.png",
  },
  {
    headline: "Random Circle Fill",
    description: "Generate random lines",
    imageName: "day3/01-circle-fill.png",
  },
  {
    headline: "Pipe",
    description: "Draw images with the help of the pipe, it will follow your cursor",
    imageName: "day3/02-pipe.png",
  },
  {
    headline: "Lindenmayer System",
    description: "Generate random lines",
    imageName: "day4/01-l-system.png",
  },
  {
    headline: "Recursive Tree Generator",
    description: "Generate a new Random Tree with every click (can be a bit slow!!)",
    imageName: "day4/02-tree-generator.png",
  },
  {
    headline: "Shakespear-GPT",
    description: "This hightech AI-Chat bot learned from one of the greatest poets of the last millenium",
    imageName: "day5/01-shakespear-gpt.png",
  },
  {
    headline: "Random Lines",
    description: "Generate random lines",
    imageName: "day5/02-word-cloud.png",
  },
  {
    headline: "Random Lines",
    description: "Generate random lines",
    imageName: "day6/01-conway-game-of-life.png",
  },
  {
    headline: "Random Lines",
    description: "Generate random lines",
    imageName: "day6/02-falling-sand-simulator.png",
  },
  {
    headline: "Random Lines",
    description: "Generate random lines",
    imageName: "day7/01-mandelbrot-set.png",
  },
  {
    headline: "Work in progress",
    description: "please don't knock on the glass, it scares the developer",
    imageName: "wow_such_empty.avif",
  },
  {
    headline: "Work in progress",
    description: "please don't knock on the glass, it scares the developer",
    imageName: "wow_such_empty.avif",
  },
  {
    headline: "Work in progress",
    description: "please don't knock on the glass, it scares the developer",
    imageName: "wow_such_empty.avif",
  },
  {
    headline: "Work in progress",
    description: "please don't knock on the glass, it scares the developer",
    imageName: "wow_such_empty.avif",
  },
  {
    headline: "Work in progress",
    description: "please don't knock on the glass, it scares the developer",
    imageName: "wow_such_empty.avif",
  },
  {
    headline: "Work in progress",
    description: "please don't knock on the glass, it scares the developer",
    imageName: "wow_such_empty.avif",
  },
  {
    headline: "Work in progress",
    description: "please don't knock on the glass, it scares the developer",
    imageName: "wow_such_empty.avif",
  },
  {
    headline: "Work in progress",
    description: "please don't knock on the glass, it scares the developer",
    imageName: "wow_such_empty.avif",
  },
  {
    headline: "Work in progress",
    description: "please don't knock on the glass, it scares the developer",
    imageName: "wow_such_empty.avif",
  },
  {
    headline: "Work in progress",
    description: "please don't knock on the glass, it scares the developer",
    imageName: "wow_such_empty.avif",
  },
  {
    headline: "Work in progress",
    description: "please don't knock on the glass, it scares the developer",
    imageName: "wow_such_empty.avif",
  },
  {
    headline: "Work in progress",
    description: "please don't knock on the glass, it scares the developer",
    imageName: "wow_such_empty.avif",
  },
  {
    headline: "Work in progress",
    description: "please don't knock on the glass, it scares the developer",
    imageName: "wow_such_empty.avif",
  },
  {
    headline: "Work in progress",
    description: "please don't knock on the glass, it scares the developer",
    imageName: "wow_such_empty.avif",
  },
];
</script>

<template>
  <!-- <div class="container my-4">
    <div class="card">
      <img
        src="../assets/wow_such_empty.avif"
        class="card-img-top"
        alt="Nothing here"
      />
    </div>
  </div> -->
  <div class="m-4">
    <h1 class="text-center">My Creative Coding Website</h1>
  </div>
  <div class="container mt-4">
    <div class="row">
      <PreviewCard
        v-for="(previewCard, index) of cards"
        :key="index"
        :card-info="previewCard"
      ></PreviewCard>
    </div>
  </div>
</template>
