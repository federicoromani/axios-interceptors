<script setup lang="ts">
import { loaderStore } from '@/stores/ui.store'
import { toRefs } from 'vue'
import { VOverlay, VProgressCircular } from 'vuetify/components'

const { show } = toRefs(loaderStore)
</script>
<template>
  <v-overlay :model-value="show" class="align-center justify-center">
    <v-progress-circular color="primary" indeterminate size="50"></v-progress-circular>
  </v-overlay>
</template>

<style scoped></style>
