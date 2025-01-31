<template>
  <Transition name="fade">
    <div
      v-if="modelValue"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
      @click.self="closeModal"
    >
      <div class="bg-gray-700 rounded-2xl shadow-lg w-fit sm:max-w-[80vw] max-w-[85vw] sm:p-6 p-4">
        <div class="max-h-[80vh] overflow-y-auto">
          <slot></slot>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { defineProps, defineEmits, watch } from 'vue';

const { modelValue } = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(['update:modelValue']);

const closeModal = () => {
  emit('update:modelValue', false);
  document.body.style.overflow = 'auto'; // Mengembalikan scroll saat modal ditutup
};

watch(
  () => modelValue,
  (newValue) => {
    if (newValue) {
      document.body.style.overflow = 'hidden'; // Mencegah scroll saat modal terbuka
    } else {
      document.body.style.overflow = 'auto';
    }
  }
);
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
