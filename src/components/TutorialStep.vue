<template>
  <div>
    <p class="sm:text-xl text-base text-white mb-4">{{ title }}</p>
    <div class="flex justify-center">
      <img :src="image" alt="..." class="sm:w-[60%] w-[70%]" />
    </div>
  </div>
</template>
<script setup>
const { title, image } = defineProps({
  title: {
    type: String,
    required: true,
    default: '',
  },
  image: {
    type: String,
    required: true,
    default: '',
  },
});
</script>
<style lang=""></style>
