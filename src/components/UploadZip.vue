<template>
  <div class="flex flex-col items-center justify-center w-full mb-8">
    <label
      for="dropzone-file"
      class="flex flex-col items-center justify-center w-full sm:h-48 h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-800 bg-gray-700 border-fuchsia-900 hover:border-fuchsia-800"
    >
      <div class="flex flex-col items-center justify-center pt-5 pb-6">
        <svg
          class="sm:w-14 sm:h-14 w-10 h-10 mb-4 text-gray-400"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 16"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
          />
        </svg>
        <p class="mb-2 sm:text-lg text-sm font-zain text-gray-400">
          <span class="font-semibold">Click to upload</span> or drag and drop ZIP file
        </p>
      </div>
      <input
        id="dropzone-file"
        type="file"
        @change="handleFileUpload"
        accept=".zip"
        class="hidden"
      />
    </label>
    <span v-if="errorMessage" class="block sm:text-lg text-sm text-red-500 mt-2 font-medium">{{
      errorMessage
    }}</span>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import JSZip from 'jszip';
import { store } from '../store';

// Untuk menyimpan pesan kesalahan (jika ada)
const errorMessage = ref('');

// Fungsi untuk menangani upload file ZIP
const handleFileUpload = async (event) => {
  const file = event.target.files[0]; // Ambil file pertama yang di-upload
  if (!file || !file.name.endsWith('.zip')) {
    errorMessage.value = 'Pilih file ZIP yang valid!';
    return;
  }
  store.setGlobalLoading(true);

  try {
    // Menggunakan JSZip untuk membaca file ZIP
    const zip = new JSZip();
    const zipData = await zip.loadAsync(file); // Muat file ZIP

    // Kosongkan daftar file yang sudah diekstrak sebelumnya
    errorMessage.value = '';

    // Object untuk menyimpan hasil ekstraksi
    const extractedJsonData = {};

    // Loop melalui file-file dalam ZIP
    for (const [fileName, fileObj] of Object.entries(zipData.files)) {
      if (!fileObj.dir) {
        // Hanya ambil file, bukan folder
        const content = await fileObj.async('text'); // Mengambil konten file sebagai teks

        // Tentukan kategori berdasarkan nama file
        if (fileName.includes('following.json')) {
          extractedJsonData.followingData = JSON.parse(content); // Parsing JSON ke dalam format yang sesuai
        } else if (fileName.includes('followers_1.json')) {
          extractedJsonData.followersData = JSON.parse(content);
        } else if (fileName.includes('close_friends.json')) {
          extractedJsonData.closeFriendsData = JSON.parse(content);
        } else if (fileName.includes('blocked_profiles.json')) {
          extractedJsonData.blockProfileData = JSON.parse(content);
        } else if (fileName.includes('pending_follow_requests.json')) {
          extractedJsonData.pendingFollowReqData = JSON.parse(content);
        }
        // Tambahkan kondisi untuk file lainnya jika diperlukan
      }
    }

    // Setelah ekstraksi selesai, masukkan data ke dalam global state
    if (extractedJsonData.followingData) {
      store.setFollowingData(extractedJsonData.followingData); // Set data untuk following
    }
    if (extractedJsonData.followersData) {
      store.setFollowersData(extractedJsonData.followersData); // Set data untuk followers
    }
    if (extractedJsonData.followingData && extractedJsonData.followersData) {
      store.setNoFollowBackData(extractedJsonData.followingData, extractedJsonData.followersData); // Set data untuk followers
    }
    if (extractedJsonData.closeFriendsData) {
      store.setCloseFriendsData(extractedJsonData.closeFriendsData); // Set data untuk close friends
    }
    if (extractedJsonData.blockProfileData) {
      store.setBlockProfileData(extractedJsonData.blockProfileData); // Set data untuk blocked profiles
    }
    if (extractedJsonData.pendingFollowReqData) {
      store.setPendingFollowReqData(extractedJsonData.pendingFollowReqData); // Set data untuk pending follow requests
    }

    // Jika tidak ada file yang ditemukan atau ekstraksi gagal
    if (Object.keys(extractedJsonData).length === 0) {
      errorMessage.value = 'ZIP kosong atau format tidak valid.';
    }
  } catch (error) {
    console.error('Gagal mengekstrak ZIP:', error);
    errorMessage.value = 'Terjadi kesalahan saat mengekstrak file ZIP.';
  } finally {
    store.setGlobalLoading(false);
  }
};
</script>
<style lang=""></style>
