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

<script setup>

import {onMounted, ref} from 'vue'
import {metroTransitService} from '@/services/metroTransitService'
import ItemSelectorComponent from "@/components/ItemSelectorComponent.vue";

const routeOptions = ref([]);

onMounted(async () => {
  const routesRaw = await metroTransitService.findAllRoutes();
  routeOptions.value = routesRaw.map(toRouteOption);
});

const onRouteSelected = (route) => {

};

const toRouteOption = _ => {
  return {
    display: _.route_label,
    id: _.route_id,
    value: _
  }
}
</script>