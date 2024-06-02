<template>
  <main :class="darkMode ? 'dark bg-gray-900' : 'bg-[#B3D5F2]/20 h-screen'">
    <div class="fixed bottom-12 right-2 pl-10 pt-4 lg:pl-40 lg:pt-4 flex justify-end pr-8 lg:pr-44">
      <button
        @click="toggleDisplayMode"
        :class="darkMode ? 'bg-white text-black' : 'bg-gray-900 text-gray-100'"
        class="w-14 lg:w-20 p-2 rounded-full font-bold border"
      >
        <img :src="darkMode ? darkIcon : lightIcon" :alt="darkMode ? 'Light mode' : 'Dark mode'" />
      </button>
    </div>

    <ErrorBoundary>
      <router-view />
    </ErrorBoundary>
  </main>
</template>

<script>
import { ref, onMounted } from 'vue'
import Light from './assets/light.png'
import Dark from './assets/dark.png'
import ErrorBoundary from '../src/components/ErrorBoundary.vue'

export default {
  components: ErrorBoundary,

  setup() {
    const darkMode = ref(false)
    const user = 'emmanuelawe'

    const toggleDisplayMode = () => {
      darkMode.value = !darkMode.value
      localStorage.setItem('displayMode', darkMode.value ? 'dark' : 'light')
    }

    onMounted(() => {
      let savedMode = localStorage.getItem('displayMode')
      if (!savedMode) {
        savedMode = 'light'
        localStorage.setItem('displayMode', savedMode)
      }
      darkMode.value = savedMode === 'dark'
    })

    return {
      darkMode,
      toggleDisplayMode,
      lightIcon: Light,
      darkIcon: Dark,
      user,
    }
  }
}
</script>
<style scoped></style>
