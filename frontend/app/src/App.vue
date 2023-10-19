<template>
  <ion-app>
    <ComponenteMenu></ComponenteMenu>
    <ion-router-outlet :key="$route.fullPath"/>
  </ion-app>
</template>

<script setup>
import { IonApp, IonRouterOutlet } from '@ionic/vue';
</script>
