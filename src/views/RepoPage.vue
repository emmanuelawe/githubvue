<template>
  <main class="bg-[#B3D5F2]/20 dark:bg-gray-900">
    <!-- Skip to main navigation Link -->
    <a href="#main-navigation" class="sr-only focus:not-sr-only bg-white">
      Skip to main navigation
    </a>

    <section v-if="isLoading" class="justify-center items-center h-screen flex">
      <LoadingUI />
    </section>

    <section v-else id="main-navigation" class="flex flex-col pt-20">
      <img :src="Gitwiki" alt="Gitwiki logo" class="w-32 md:w-48 self-center pb-10" />
      <SearchBar :handleSearch="handleSearch" :searchTerm="searchTerm" />
      <div>
        <div
          v-if="filteredRepos.length === 0 && searchTerm"
          class="justify-center items-center h-screen flex flex-col"
        >
          <img :src="ExistImg" alt="Does not exist" class="w-36 lg:w-48" />
          <p class="font-normal text-base md:text-lg dark:text-white italic">
            Repository does not exist
          </p>
        </div>
        <RepoList :repos="filteredRepos" />
      </div>
    </section>
    <section class="flex items-center justify-evenly dark:bg-gray-900 bg-[#B3D5F2]/20">
      <button
        @click="handle404Test"
        class="bg-[#D9042B]/80 dark:bg-white dark:text-[#D9042B]/80 text-white font-semibold p-3 mb-20 rounded-lg"
        aria-label="Test 404 Page"
      >
        Test 404 Page
      </button>
      <button
        @click="handleErrorBoundaryTest"
        class="bg-[#D9042B]/80 dark:bg-white dark:text-[#D9042B]/80 text-white font-semibold p-3 mb-20 rounded-lg"
        aria-label="Test Error Boundary"
      >
        Test Error Boundary
      </button>
    </section>
  </main>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import SearchBar from '../components/SearchBar.vue'
import RepoList from '../components/RepoList.vue'
import LoadingUI from '../components/LoadingUI.vue'
import { Octokit } from 'octokit'
import Gitwiki from '../assets/logo.png'
import ExistImg from '../assets/exist.png'

const octokit = new Octokit({
  auth: import.meta.env.VITE_TOKEN
})

export default {
  components: {
    SearchBar,
    RepoList,
    LoadingUI
  },
  setup() {
    const user = 'emmanuelawe'
    const repos = ref([])
    const filteredRepos = ref([])
    const searchTerm = ref('')
    const isLoading = ref(true)
    const router = useRouter()
    // const { proxy } = getCurrentInstance()

    // Fetch repositories from Github API using Octokit.js
    const fetchRepos = async () => {
      try {
        const { data } = await octokit.request('GET /user/repos')
        repos.value = data
        filteredRepos.value = data
        isLoading.value = false
      } catch (error) {
        console.error('Failed to fetch repositories:', error.message)
        isLoading.value = false
      }
    }

    onMounted(() => {
      fetchRepos()
    })

    // Filter repositories based on search term
    const handleSearch = (term) => {
      searchTerm.value = term
      filteredRepos.value = repos.value.filter((repo) =>
        repo.name.toLowerCase().includes(term.toLowerCase())
      )
    }

    const handle404Test = () => {
      router.push('/testing')
    }

    const handleErrorBoundaryTest = () => {
      // Vue 3 does not have built-in error boundaries like React, use global error handling instead
      throw new Error('Test Error Boundary');
    }

    return {
      Gitwiki,
      ExistImg,
      user,
      searchTerm,
      filteredRepos,
      isLoading,
      handleSearch,
      handle404Test,
      handleErrorBoundaryTest
    }
  }
}
</script>

<style scoped></style>
