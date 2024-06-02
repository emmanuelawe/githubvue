<template>
  <main class="bg-[#B3D5F2]/20 dark:bg-gray-900">
    <nav class="items-center justify-center flex font-semibold pt-10">
      <router-link to="/">
        <button class="bg-[#4AA2D9] text-white font-semibold p-2 px-4 rounded-xl">Home</button>
      </router-link>
    </nav>
    <section class="flex flex-col h-screen justify-center items-center">
      <img :src="NFError" alt="404" class="w-48 lg:w-96" />
      <p class="text-base md:text-xl font-medium dark:text-white">Page not found</p>
    </section>
  </main>
</template>

<script>
import NFError from '../assets/404.png'

export default {
  name: 'NotFound',
  data() {
    return {
      NFError
    }
  }
}
</script>

<style scoped></style>
