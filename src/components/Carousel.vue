<template>
  <div class="relative w-full max-w-lg mx-auto overflow-hidden">
    <div
      class="flex transition-transform duration-500"
      :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
    >
      <div v-for="(slide, index) in slides" :key="index" class="w-full flex-shrink-0">
        <component :is="slide.component" v-bind="slide.props" />
      </div>
    </div>

    <button
      @click="prevSlide"
      class="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
    >
      &#10094;
    </button>
    <button
      @click="nextSlide"
      class="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
    >
      &#10095;
    </button>
  </div>
</template>

<script setup>
import { defineProps, ref } from 'vue';

const { slides } = defineProps({
  slides: {
    type: Array,
    required: true,
  },
});
const currentIndex = ref(0);

const prevSlide = () => {
  currentIndex.value = (currentIndex.value - 1 + slides.length) % slides.length;
};

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % slides.length;
};
</script>

<style scoped></style>
