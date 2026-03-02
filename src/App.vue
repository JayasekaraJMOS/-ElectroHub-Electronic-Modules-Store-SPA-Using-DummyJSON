<script setup lang="ts">
import { useThemeStore } from './stores/theme'
import { onMounted } from 'vue'

const theme = useThemeStore()

onMounted(() => {
  theme.loadTheme()
})
</script>

<template>
  <router-view />
</template>