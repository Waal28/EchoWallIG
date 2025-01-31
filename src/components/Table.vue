<script setup>
import { store } from '../store';
const { rows, cols } = defineProps({
  cols: {
    type: Array,
    required: true,
  },
  rows: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <!-- component -->
  <div class="overflow-auto max-h-[50vh] bg-gray-600 rounded-lg hide-scrollbar">
    <table class="w-full min-w-max table-auto text-left">
      <thead>
        <tr>
          <th class="bg-fuchsia-800 sm:px-4 px-2 sm:py-4 py-2">
            <p class="block antialiased sm:text-lg text-base text-white sm:font-bold font-medium">
              #
            </p>
          </th>
          <th v-for="col in cols" :key="col.id" class="bg-fuchsia-800 sm:px-4 px-2 sm:py-4 py-2">
            <p class="block antialiased sm:text-lg text-base text-white sm:font-bold font-medium">
              {{ col.label }}
            </p>
          </th>
        </tr>
      </thead>
      <tbody>
        <template v-if="store.globalLoading">
          <tr>
            <td :colspan="cols.length + 1" class="sm:px-4 px-2 sm:py-4 py-3">
              <div class="flex sm:flex-row flex-col items-center justify-center">
                <img
                  src="https://api.iconify.design/line-md:downloading-loop.svg?color=%23ffffff"
                  alt="..."
                  class="sm:w-28 sm:h-28 w-16 h-16 me-2"
                />
              </div>
            </td>
          </tr>
        </template>
        <template v-if="rows.length > 0 && !store.globalLoading">
          <tr v-for="(row, idx) in rows" :key="idx">
            <td class="sm:px-4 px-2 sm:py-4 py-2 border-b-2 border-gray-700">
              <p class="block sm:text-lg text-base leading-normal text-white font-bold">
                {{ idx + 1 }}
              </p>
            </td>
            <td
              v-for="col in cols"
              :key="col.id"
              class="sm:px-4 px-2 sm:py-4 py-2 border-b-2 border-gray-700"
            >
              <a
                v-if="row[col.id].isLink"
                :href="row[col.id].href"
                target="_blank"
                style="text-underline-offset: 8px"
                class="block sm:text-lg text-base leading-normal text-white font-normal underline cursor-pointer decoration-fuchsia-800 hover:text-fuchsia-500 hover:decoration-fuchsia-500"
              >
                {{ row[col.id].label }}
              </a>
              <p
                v-else
                class="block antialiased sm:text-lg text-base leading-normal text-white font-normal"
              >
                {{ row[col.id] }}
              </p>
            </td>
          </tr>
        </template>
        <template v-if="rows.length === 0 && !store.globalLoading">
          <tr>
            <td :colspan="cols.length + 1" class="sm:px-4 px-2 sm:py-4 py-2">
              <div class="flex sm:flex-row flex-col items-center justify-center">
                <img
                  src="https://api.iconify.design/line-md:coffee-half-empty-filled-loop.svg?color=%23ffffff"
                  alt="..."
                  class="sm:w-28 sm:h-28 w-16 h-16 sm:me-2 me-0"
                />
                <p class="block w-fit sm:text-xl text-base leading-normal text-white font-bold">
                  No Data
                </p>
              </div>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.hide-scrollbar {
  overflow: auto; /* Tetap bisa di-scroll */
  scrollbar-width: none; /* Untuk Firefox */
  -ms-overflow-style: none; /* Untuk Internet Explorer dan Edge */
}

.hide-scrollbar::-webkit-scrollbar {
  display: none; /* Untuk Chrome, Safari, dan Edge */
}
</style>
