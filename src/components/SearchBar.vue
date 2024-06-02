<template>
    <form @submit.prevent="handleSubmit" class="flex gap-4 pb-10 items-center justify-center mx-12 md:mx-96">
      <div class="relative w-full">
        <input
          aria-label="Search repositories"
          @input="handleChange"
          v-model="searchTerm"
          type="text"
          placeholder="Search repositories..."
          class="placeholder-gray-400 placeholder:italic focus:outline-none focus:ring-0 rounded-xl w-full h-14"
          :style="{ padding: '1rem' }"
        />
        <button
          type="submit"
          class="absolute inset-y-0 right-0 bg-[#4AA2D9] text-white font-semibold p-2 self-center rounded-xl my-4 mr-2"
        >
          Search
        </button>
      </div>
    </form>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router';
  import { ref, defineProps } from 'vue';
  
  const props = defineProps({
  handleSearch: Function,
  // searchTerm: String,
});

  const user = 'emmanuelawe';
  const router = useRouter();
  
  const searchTerm = ref('');
  
  const handleChange = (event) => {
    searchTerm.value = event.target.value;
    if (props.handleSearch) {
      props.handleSearch(event.target.value);
      console.log(event.target.value);
    }
  };
  
  const handleSubmit = () => {
    if (searchTerm.value.trim() !== '') {
      router.push(`/repos/${user}/${searchTerm.value}`);
    }
  };
  </script>
  