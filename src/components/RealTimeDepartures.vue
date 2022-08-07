<template>
  <div class="py-10">
    <!-- title -->
    <header>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold leading-tight text-gray-800">NexTrip</h1>
      </div>
    </header>

    <!-- body -->
    <main>
      <!-- route -->
      <item-selector-component
          label="Select Route"
          :items="routes"
          :item-selected="routeSelected">
      </item-selector-component>
    </main>
  </div>
</template>

<script setup>

import {onMounted, ref, watch} from 'vue'
import {metroTransitService} from '@/services/metroTransitService'
import ItemSelectorComponent from "@/components/ItemSelectorComponent.vue";

const routes = ref([]);
const routeSelected = ref();

onMounted(async () => {
  routes.value = await metroTransitService.findAllRoutes();
});

watch(routeSelected, (routeSelected) => {
  console.log(routeSelected);
});
</script>