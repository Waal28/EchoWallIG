<template>
  <div class="relative">
    <div
      class="absolute top-0 left-0 w-full h-full bg-[url('/bricks.png')] sm:bg-[size:20%] bg-[size:50%] bg-repeat opacity-5"
    ></div>
    <main class="bg-gray-800 min-h-[100vh] flex flex-col justify-between">
      <div class="mx-auto sm:px-28 px-4 py-4 w-fit z-20">
        <Brand />
        <UploadZip />
        <TabsNavigation />
      </div>
      <div
        class="sm:text-base text-sm tracking-wide text-white bg-gray-700 text-center sm:py-4 py-2 relative z-10"
      >
        © 2025 EchoWallIG
      </div>
    </main>
  </div>
</template>

<script setup>
import Brand from './components/Brand.vue';
import TabsNavigation from './components/TabsNavigation.vue';
import UploadZip from './components/UploadZip.vue';
</script>

<style scoped></style>
