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

      <!-- direcion -->
      <item-selector-component
          label="Select Direction"
          :options="directionOptions"
          @option-selected="onDirectionSelected">
      </item-selector-component>
    </main>
  </div>
</template>

<script setup lang="ts">

import ItemSelectorComponent from '@/components/OptionSelectorComponent.vue';
import { metroTransitService } from '@/services/metroTransitService';
import { onMounted, ref } from 'vue';
import { Direction, Route } from '../services/generated-nextrip-api';


const routeOptions = ref([]);
const directionOptions = ref([]);

onMounted(async () => {
  const routes = await metroTransitService.findAllRoutes();
  routeOptions.value = routes.map((route: Route) => {
    return {
      display: route.route_label,
      id: route.route_id,
      value: route,
    }
  });
});

const onRouteSelected = async (route: Route) => {
  const directions = await metroTransitService.findDirectionByRoute(route.route_id);
  directionOptions.value = directions.map((direction: Direction) => {
    return {
      display: direction.direction_name,
      id: direction.direction_id,
      value: direction,
    }
  });
};

const onDirectionSelected = async (direction: Direction) => {
  console.log('direction selected', direction)
}
</script>