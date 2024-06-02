<template>
  <main class="py-10 min-w-[80%] space-y-4 dark:bg-gray-900 bg-[#B3D5F2]/20 px-8 lg:px-44">
    <div v-for="repo in displayedRepos" :key="repo.name">
      <router-link :to="`/repos/${user}/${repo.name}`">
        <RepoItem :repo="repo" />
      </router-link>
    </div>

    <nav
      role="navigation"
      aria-label="Pagination Navigation"
      class="md:mx-96 mx-40 flex justify-center items-center"
    >
      <button @click="prevPage" :disabled="currentPage === 1" class="px-3 py-1 mx-1 bg-[#4AA2D9] dark:bg-gray-700 text-white rounded">
        Prev
      </button>
      <div class="flex space-x-1">
        <button 
          v-for="page in pageCount" 
          :key="page" 
          @click="goToPage(page)" 
          :class="{'bg-[#4AA2D9]/70 text-white dark:bg-gray-600': currentPage === page, 'bg-gray-200 dark:bg-gray-700': currentPage !== page}" 
          class="px-3 py-1 mx-1 rounded"
        >
          {{ page }}
        </button>
      </div>
      <button @click="nextPage" :disabled="currentPage === pageCount" class="px-3 py-1 mx-1 bg-[#4AA2D9] text-white  dark:bg-gray-700 rounded">
        Next
      </button>
    </nav>
  </main>
</template>
  
<script>
import { ref, computed, watch } from 'vue';
import RepoItem from './RepoItem.vue';

export default {
  components: {
    RepoItem,
  },
  props: {
    repos: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    const currentPage = ref(1);
    const perPage = 5;

    const pageCount = computed(() => Math.ceil(props.repos.length / perPage));

    const displayedRepos = computed(() =>
      props.repos.slice((currentPage.value - 1) * perPage, currentPage.value * perPage)
    );

    const nextPage = () => {
      if (currentPage.value < pageCount.value) {
        currentPage.value += 1;
      }
    };

    const prevPage = () => {
      if (currentPage.value > 1) {
        currentPage.value -= 1;
      }
    };

    const goToPage = (page) => {
      if (page >= 1 && page <= pageCount.value) {
        currentPage.value = page;
      }
    };

    watch(props.repos, () => {
      currentPage.value = 1;
    });

    return {
      currentPage,
      pageCount,
      displayedRepos,
      nextPage,
      prevPage,
      goToPage,
    };
  },
};
</script>

<style scoped>
/* Add any relevant styles here */
</style>
