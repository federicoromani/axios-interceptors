<script setup lang="ts">
import { toastMessageStore } from '@/stores/ui.store'
import { ColorMessage, IconMessage } from '@/models/UI'
import { computed, ref } from 'vue'
import { toRefs } from 'vue'
import {VSnackbar, VBtn, VIcon} from 'vuetify/components'

const { titleMessage, message, typeMessage, show } = toRefs(toastMessageStore)
const icons = ref({
  danger: IconMessage.danger,
  warning: IconMessage.warning,
  info: IconMessage.info,
  success: IconMessage.success
})
const colors = ref({
  danger: ColorMessage.danger,
  warning: ColorMessage.warning,
  info: ColorMessage.info,
  success: ColorMessage.success
})
const iconOptions = icons.value
const colorOptions = colors.value
const toastIcon = computed<IconMessage>(
  () => icons.value[typeMessage.value as keyof typeof iconOptions]
)
const toastColor = computed<ColorMessage>(
  () => colors.value[typeMessage.value as keyof typeof colorOptions]
)
</script>
<template>
  <v-snackbar v-model="show" :timeout="4000" :color="toastColor">
    <div class="text-subtitle-1"><v-icon size="large" :icon="toastIcon" class="mr-2"> </v-icon>{{ titleMessage }}</div>
    <div class="text-subtitle-2 ml-4 pa-4">{{ message }}</div>

    <template v-slot:actions>
      <v-btn color="black" icon @click="show = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<style scoped></style>
