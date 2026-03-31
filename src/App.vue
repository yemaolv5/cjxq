<script setup lang="ts">
import { ref } from 'vue'
import { Sparkles } from 'lucide-vue-next'

const count = ref(0)
</script>

<template>
  <div class="min-h-screen bg-neutral-50 flex flex-col items-center justify-center p-4">
    <div class="max-w-md w-full bg-white rounded-3xl shadow-sm border border-neutral-200 p-8 text-center">
      <div class="w-16 h-16 bg-neutral-900 rounded-2xl flex items-center justify-center mx-auto mb-6">
        <Sparkles class="text-white w-8 h-8" />
      </div>
      
      <h1 class="text-3xl font-bold text-neutral-900 mb-2 tracking-tight">
        Vue + Vite
      </h1>
      
      <p class="text-neutral-500 mb-8">
        Your application is now running on Vue 3.
      </p>

      <div class="space-y-4">
        <button 
          @click="count++"
          class="w-full bg-neutral-900 text-white rounded-xl py-3 font-medium hover:bg-neutral-800 transition-colors"
        >
          Count is {{ count }}
        </button>
        
        <p class="text-xs text-neutral-400">
          Edit <code class="bg-neutral-100 px-1 rounded">src/App.vue</code> to test HMR
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
