<script setup lang="ts">
import { VApp, VMain, VContainer, VToolbar, VToolbarTitle } from 'vuetify/components'
import ToastMessage from '@/common/components/ToastMessage.vue'
import ApiLoader from '@/common/components/ApiLoader.vue'
</script>
<template>
  <v-app id="new-app" class="w-100">
    <v-toolbar color="blue-grey-darken-2" dark>
      <v-toolbar-title> INTERCEPTORES </v-toolbar-title>
    </v-toolbar>
    <v-main class="bg-grey-lighten-5">
      <v-container class="bg-transparent" fluid style="height: 100%">
        <router-view></router-view>
      </v-container>
    </v-main>
    <toast-message />
    <api-loader />
  </v-app>
</template>

<style scoped></style>
