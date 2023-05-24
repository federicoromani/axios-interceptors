<script setup lang="ts">
import {VCard, VCardTitle, VCardSubtitle, VCardActions, VIcon, VBtn} from 'vuetify/components'
</script>
<template>
  <div id="error-container" class="d-flex align-center">
		<v-card max-width="800" min-width="600" min-height="280" class="mx-auto text-center">
			<v-icon size="80" color="error" class="mt-6" icon="mdi-alert"></v-icon>
			<v-card-title>404 Error</v-card-title>
			<v-card-subtitle>Página no encontrada</v-card-subtitle>
			<v-card-actions class="d-flex justify-center py-6">
				<v-btn 
				:to="{ name: 'Home' }" 
				class="text-none mb-4"
        variant="flat" 
				density="comfortable" 
				color="primary"
			>Volver al inicio</v-btn></v-card-actions>
		</v-card>
	</div>
</template>

<style scoped>
#error-container {
	width: 100%;
	height: 100vh;
}
</style>
