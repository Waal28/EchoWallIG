<template>
  <div class="">
    <h1
      class="sm:text-8xl text-[14vw] font-lilitaOne text-white sm:mb-2 mb-0 sm:text-start text-center"
    >
      Echo<span
        class="text-transparent bg-clip-text font-extrabold bg-[url('https://api.iconify.design/game-icons:stone-wall.svg?color=%23ffffff')] bg-[length:50%] bg-center"
        >WALL</span
      >IG
    </h1>
    <p
      class="sm:text-3xl sm:ms-2 ms-0 text-lg font-bold text-white sm:mb-5 mb-3 sm:-mt-0 -mt-2 sm:text-start text-center"
    >
      EchoWallIG – Your Instagram Social Wall
    </p>
    <p class="sm:text-2xl/8 text-base/6 mb-4 text-white sm:text-start text-center">
      EchoWallIG gives you the power to track everything happening on your Instagram. From seeing
      who unfollowed, who’s on your close friends list, to the accounts you’ve blocked — it’s all in
      one place. Keep your account organized and get instant insights on who’s disappeared or who’s
      still waiting for your follow approval.
    </p>
    <div class="flex items-center justify-center">
      <button
        type="button"
        @click="isModalOpen = true"
        class="flex items-center text-white bg-fuchsia-700 hover:bg-fuchsia-800 focus:outline-none focus:ring-4 focus:ring-fuchsia-300 font-medium rounded-full sm:text-lg text-sm sm:px-5 px-4 sm:py-2.5 py-1.5 text-center mb-6 dark:bg-fuchsia-600 dark:hover:bg-fuchsia-700 dark:focus:ring-fuchsia-800"
      >
        <img
          src="https://api.iconify.design/lucide:step-forward.svg?color=%23ffffff"
          alt="..."
          class="sm:w-6 sm:h-6 w-4 h-4 me-2"
        />
        Tutorial
      </button>
    </div>
  </div>
  <ModalDialog :modelValue="isModalOpen" @update:modelValue="isModalOpen = $event">
    <Carousel :slides="slides" />
  </ModalDialog>
</template>
<script setup>
import { ref } from 'vue';
import ModalDialog from './ModalDialog.vue';
import Carousel from './Carousel.vue';
import TutorialStep from './TutorialStep.vue';

// Import semua gambar dalam folder "assets/images"
const images = Object.entries(import.meta.glob('../assets/images/tutorial/*.jpg', { eager: true }))
  .map(([path, module]) => ({ path, src: module.default })) // Buat array objek { path, src }
  .sort((a, b) => {
    // Urutkan berdasarkan angka dalam nama file
    const numA = parseInt(a.path.match(/(\d+)\.jpg$/)[1]);
    const numB = parseInt(b.path.match(/(\d+)\.jpg$/)[1]);
    return numA - numB;
  })
  .map((img) => img.src); // Ambil hanya src setelah diurutkan

const steps = [
  '1. Log in to Instagram and open Settings.',
  "2. Click on 'Accounts Center'.",
  "3. Click on 'Your Information and Permissions'.",
  "4. Click on 'Download Your Information'.",
  "5. Click on 'Download or Transfer Information'.",
  '6. Select Instagram as the platform from which you want to download data.',
  "7. Click on 'Some of Your Information'.",
  "8. Search for 'Followers and Following' and check the box.",
  "9. Click on 'Download to Device'.",
  "10. Select 'All time' as the date range, choose 'JSON' as the file format, and click 'Create Files'. Instagram will begin processing your request, which may take anywhere from a few minutes to several hours depending on the size of your data.",
  "11. Once the data is ready, you’ll receive an email from Instagram with a download link. Click the link and log back into your Instagram account if prompted, then click 'Download'.",
  "12. Enter your password and click 'Continue'.",
  '13. Once the ZIP file is downloaded, upload or drag and drop it onto this website.',
];

const slides = Array.from({ length: images.length }, (_, idx) => ({
  component: TutorialStep,
  props: { title: steps[idx], image: images[idx] },
}));

const isModalOpen = ref(false);
</script>
<style lang=""></style>
