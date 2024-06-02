<template>
    <main class="flex flex-col h-screen justify-center items-center bg-[#B3D5F2]/20 dark:bg-gray-900">
      <img
        :src="errorImage"
        alt="Something went wrong"
        class="w-48 lg:w-96"
      />
      <p class="text-base md:text-xl font-medium">
        Uh oh! Something went wrong.
      </p>
    </main>
  </template>
  
  <script setup>
  import errorImage from '../assets/errorb.png';
  </script>
  
  <style scoped>
  </style>
  