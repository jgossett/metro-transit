<template>
  <div class="min-h-full">
    <header-component></header-component>
    <router-view></router-view>
  </div>
</template>

<script setup>
import HeaderComponent from "./components/HeaderComponent.vue";
import RealTimeDepartures from "./components/RealTimeDepartures.vue";</script>