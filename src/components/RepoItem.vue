<template>
    <main class="flex items-center pr-10 bg-[#4AA2D9] text-white p-3 cursor-pointer rounded-xl">
      <div class="flex-1">
        <div class="font-bold text-xl">{{ repo.name }}</div>
        <div>{{ repo.language }}</div>
        <div>{{ repo.visibility }}</div>
      </div>
      <img :src="right" alt="Next icon" class="w-4 h-4" />
    </main>
  </template>
  
  <script>
  import right from '../assets/rightt.png';
  
  export default {
    name: 'RepoItem',
    props: {
      repo: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        right
      };
    }
  };
  </script>
  
  <style scoped>
  /* You can add any component-specific styles here */
  </style>
  