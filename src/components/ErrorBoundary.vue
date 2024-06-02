<template>
  <div v-if="error">
    <p class="flex flex-col h-screen justify-center items-center bg-[#B3D5F2]/20 dark:bg-gray-900">
      Something went wrong: {{ errorMessage }}
    </p>
  </div>
  <div v-else>
    <slot></slot>
  </div>
</template>

<script>
import { ref, onErrorCaptured } from 'vue'

export default {
  setup() {
    const error = ref(null)
    const errorMessage = ref('')

    const handleCapturedError = (err, vm, info) => {
      error.value = err
      errorMessage.value = err.message || info
      return false // Prevents the error from propagating further
    }

    onErrorCaptured(handleCapturedError)

    return {
      error,
      errorMessage
    }
  }
}
</script>

<style scoped></style>
