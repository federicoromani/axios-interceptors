<script setup lang="ts">
import {VContainer, VForm, VRow, VCol, VBtn, VAlert} from 'vuetify/components'
import { fetchBySubregion } from '@/composables/countriesFetch'
import type { Country } from '@/models';
import { computed, ref } from 'vue';
const results = ref<Country[]>([])
const isCalled = ref(false)
const getCountries = async (subregion?: string) => {
  results.value = await fetchBySubregion(subregion)
  isCalled.value = true
}
const countryNames = computed<string>(() => results.value.map(country => country.name.common).sort().join(', '))
</script>
<template>
  <v-container fluid>
    <div class="text-h5 text-uppercase">INTERCEPTORES</div>
    <div class="text-subtitle-1 text-grey">CON MENSAJES EMERGENTES</div>
    <v-form class="my-4">
      <v-row>
        <v-col cols="12" md="6">
          <v-btn class="ma-2" color="success" @click="getCountries()">Interceptar Sin Error</v-btn>
          <v-btn class="ma-2" color="error" @click="getCountries('Western Antarctica')">Interceptar Con Error</v-btn>
        </v-col>
      </v-row>
    </v-form>
    <v-alert
      v-if="results.length"
      type="info"
      title="PAISES EN SUD AMÉRICA"
      :text="countryNames"
      variant="tonal"
    ></v-alert>
    <v-alert
      v-else-if="isCalled"
      type="error"
      title="PAISES EN ANTÁRTIDA OCCIDENTAL"
      text="No hay paises en esta región"
      variant="tonal"
    ></v-alert>
  </v-container>
</template>

<style scoped></style>
