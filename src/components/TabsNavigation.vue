<template>
  <div class="grid sm:grid-cols-5 grid-cols-1 sm:gap-4">
    <!-- Tabs -->
    <section
      class="grid sm:grid-cols-1 grid-cols-2 w-full h-fit sm:gap-4 gap-2 font-medium text-gray-500 dark:text-gray-400 sm:mb-0 mb-5"
    >
      <button
        v-for="tab in tabs"
        :key="tab.id"
        :class="[
          'flex items-center w-full px-4 py-3 rounded-lg sm:text-lg text-sm border border-fuchsia-800',
          isTabActive === tab.id ? classActive : classNonActive,
        ]"
        @click="setTabActive(tab.id)"
      >
        <img class="sm:w-6 sm:h-6 w-4 h-4 sm:me-3 me-2" :src="`${tab.icon}?color=%23ffffff`" />
        {{ tab.label }}
      </button>
    </section>

    <!-- Content -->
    <section class="col-span-4 p-6 bg-gray-700 rounded-lg w-full border border-fuchsia-800">
      <div class="sm:mb-5 mb-3 flex items-center sm:gap-4 gap-2">
        <h3 class="w-fit sm:text-3xl text-2xl font-bold text-white text-medium">
          {{ selectedTab.label }}
        </h3>
        <span
          class="sm:text-base text-xs font-bold text-white bg-fuchsia-500 px-1 py-[1px] rounded"
          >{{ filteredRows.length }}</span
        >
      </div>

      <!-- Search Input -->
      <div class="relative mb-4 sm:w-[50%] -ml-0">
        <span class="absolute inset-y-0 left-0 flex items-center sm:pl-2 pl-3">
          <img
            src="https://api.iconify.design/mingcute:search-line.svg?color=%239CA3AF"
            alt="Search"
            class="sm:w-6 sm:h-6 w-4 h-4"
          />
        </span>
        <input
          v-model="keyword"
          type="search"
          class="sm:py-2 py-1 sm:text-lg text-base text-white bg-gray-600 border-2 border-gray-500 rounded-md sm:pl-10 pl-9 focus:outline-none focus:border-fuchsia-800 focus:text-white w-full"
          placeholder="Search..."
          autocomplete="off"
        />
      </div>

      <!-- Table -->
      <Table :cols="cols" :rows="filteredRows" />
    </section>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import Table from './Table.vue';
import { store } from '../store';

const cols = [
  { id: 'username', label: 'Username' },
  { id: 'date', label: 'Date' },
];
const tabs = [
  {
    id: 'followingData',
    label: 'Following',
    icon: 'https://api.iconify.design/material-symbols:person-check.svg',
  },
  {
    id: 'followersData',
    label: 'Followers',
    icon: 'https://api.iconify.design/material-symbols:person-add.svg',
  },
  {
    id: 'noFollowBackData',
    label: 'Not Following Back',
    icon: 'https://api.iconify.design/material-symbols:person-cancel.svg',
  },
  {
    id: 'blockProfileData',
    label: 'Blocked Profiles',
    icon: 'https://api.iconify.design/material-symbols:person-off.svg',
  },
  {
    id: 'closeFriendsData',
    label: 'Close Friends',
    icon: 'https://api.iconify.design/bi:person-fill-gear.svg',
  },
  {
    id: 'pendingFollowReqData',
    label: 'Pending Follow Request',
    icon: 'https://api.iconify.design/fluent:person-clock-24-filled.svg',
  },
];

const isTabActive = ref(tabs[0].id);
const keyword = ref('');

const selectedTab = computed(() => tabs.find((tab) => tab.id === isTabActive.value) || {});

const filteredRows = computed(() => {
  if (!selectedTab.value.id) return [];

  // Dapatkan data dari store berdasarkan selectedTab
  const data = store[selectedTab.value.id] || [];
  if (!keyword.value) return data;

  // Filter berdasarkan keyword
  return data.filter((item) =>
    (item.username?.label || '').toLowerCase().includes(keyword.value.toLowerCase())
  );
});

// Watch store updates and trigger reactivity
watch(
  () => store[selectedTab.value.id], // Mengawasi perubahan pada state sesuai dengan tab yang aktif
  () => {
    // Ketika store berubah, kita memaksa `filteredRows` untuk di-update
    keyword.value = ''; // Reset pencarian jika ada perubahan pada data
  }
);

const setTabActive = (tabId) => {
  isTabActive.value = tabId;
};

const classActive = 'text-white bg-fuchsia-800';
const classNonActive = 'text-white bg-gray-700 hover:bg-fuchsia-500';
</script>
