<template>
  <main class="h-screen pt-10 dark:text-white bg-[#B3D5F2]/20 dark:bg-gray-900">
    <header
      class="items-center justify-center flex font-semibold pt-10 bg-[#B3D5F2]/20 dark:bg-gray-900"
    >
      <nav>
        <router-link to="/">
          <button class="bg-[#4AA2D9] text-white font-semibold p-2 px-4 rounded-xl">Home</button>
        </router-link>
      </nav>
    </header>

    <section v-if="isLoading" class="justify-center items-center h-screen flex">
      <LoadingUI />
    </section>

    <section v-else class="md:mx-40 mx-2 p-4 pt-10">
      <template v-if="repo">
        <table class="w-full text-left table-fixed">
          <thead class="bg-blue-500">
            <tr>
              <th class="w-[50%] py-4 px-4">Description</th>
              <th class="w-[50%] py-4 px-4">Data</th>
            </tr>
          </thead>
          <tbody class="divide-y">
            <tr class="bg-[#4AA2D9]/30">
              <td class="py-4 px-4">Repo name</td>
              <td class="py-4 px-4">{{ repo.name }}</td>
            </tr>
            <tr class="bg-[#4AA2D9]/50">
              <td class="py-4 px-4">Owner</td>
              <td class="py-4 px-4">{{ repo.owner.login }}</td>
            </tr>
            <tr class="bg-[#4AA2D9]/30">
              <td class="py-4 px-4">Default branch</td>
              <td class="py-4 px-4">{{ repo.default_branch }}</td>
            </tr>
            <tr class="bg-[#4AA2D9]/50">
              <td class="py-4 px-4">Repo Description</td>
              <td class="py-4 px-4">{{ repo.description }}</td>
            </tr>
            <tr class="bg-[#4AA2D9]/30">
              <td class="py-4 px-4">Forks</td>
              <td class="py-4 px-4">{{ repo.forks_count }}</td>
            </tr>
            <tr class="bg-[#4AA2D9]/50">
              <td class="py-4 px-4">Issues</td>
              <td class="py-4 px-4">{{ repo.open_issues_count }}</td>
            </tr>
            <tr class="bg-[#4AA2D9]/30">
              <td class="py-4 px-4">Language</td>
              <td class="py-4 px-4">{{ repo.language }}</td>
            </tr>
          </tbody>
        </table>
      </template>
      <template v-else>
        <LoadingUI />
      </template>
    </section>
  </main>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import LoadingUI from '../components/LoadingUI.vue'
import { Octokit } from 'octokit'

const octokit = new Octokit({
  auth: import.meta.env.VITE_TOKEN
})

export default {
  components: {
    LoadingUI
  },
  setup() {
    const route = useRoute()
    const repo = ref(null)

    onMounted(async () => {
      try {
        const { data } = await octokit.request('GET /repos/{owner}/{repo}', {
          owner: 'emmanuelawe',
          repo: route.params.name
        })
        repo.value = data
        console.log(data)
      } catch (error) {
        console.error(error.message)
      }
    })

    return { repo }
  }
}
</script>

<style scoped></style>
