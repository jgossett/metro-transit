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
          :options="routeOptions"
          @option-selected="onRouteSelected">
      </item-selector-component>
    </main>
  </div>
</template>

<script setup lang="ts">

import ItemSelectorComponent from '@/components/OptionSelectorComponent.vue';
import { metroTransitService } from '@/services/metroTransitService';
import { onMounted, ref } from 'vue';
import type { Route } from './Route'

const routeOptions = ref([]);

onMounted(async () => {
  const routesRaw = await metroTransitService.findAllRoutes();
  routeOptions.value = routesRaw.map((route: Route) => {
    return {
      display: route.route_label,
      id: route.route_id,
      value: route,
    }
  });
});

const onRouteSelected = (route: Route) => {

};
</script>