<script setup lang="ts">
import {VCard, VCardTitle, VCardSubtitle, VCardActions, VIcon, VBtn} from 'vuetify/components'
const baseUrl = import.meta.env.VITE_BASE_URL
</script>
<template>
  <div id="error-container" class="d-flex align-center">
		<v-card max-width="800" min-width="600" min-height="280" class="mx-auto text-center">
			<v-icon size="80" color="error" class="mt-6" icon="mdi-account-off"></v-icon>
			<v-card-title>401 Error</v-card-title>
			<v-card-subtitle>No Autorizado</v-card-subtitle>
			<v-card-actions class="d-flex justify-center py-6">
				<v-btn 
				:href="`${baseUrl}/login`" 
				class="text-none mb-4"
        variant="flat" 
				density="comfortable" 
				color="primary"
			>Inicio de sesión</v-btn></v-card-actions>
		</v-card>
	</div>
</template>

<style scoped>
#error-container {
	width: 100%;
	height: 100vh;
}
</style>
