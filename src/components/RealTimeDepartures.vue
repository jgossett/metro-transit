<template>
  <div class="py-10">
    <!-- title -->
    <header class="pb-2">
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

      <!-- direction -->
      <item-selector-component
          v-if="routeSelected != null"
          label="Select Direction"
          :options="directionOptions"
          @option-selected="onDirectionSelected">
      </item-selector-component>

      <!-- places -->
      <item-selector-component
          v-if="directionSelected != null"
          label="Select Stop"
          :options="placesOptions"
          @option-selected="onPlaceSelected">
      </item-selector-component>
    </main>
  </div>
</template>

<script setup lang="ts">

import ItemSelectorComponent from '@/components/OptionSelectorComponent.vue';
import { metroTransitService } from '@/services/metroTransitService';
import { onMounted, ref } from 'vue';
import { Direction, Place, Route, Stop } from '../services/generated-nextrip-api';


const routeOptions = ref([]);
const routeSelected = ref();
const directionOptions = ref([]);
const directionSelected = ref();
const placesOptions = ref([]);
const placeSelected = ref();

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
  routeSelected.value = route;
  directionSelected.value = undefined;
  placeSelected.value = undefined;

  const directions = await metroTransitService.findDirectionsByRoute(route.route_id);
  directionOptions.value = directions.map((direction: Direction) => {
    return {
      display: direction.direction_name,
      id: direction.direction_id,
      value: direction,
    }
  });
};

const onDirectionSelected = async (direction: Direction) => {
  directionSelected.value = direction;
  placeSelected.value = undefined;
  const places = await metroTransitService.findStopsByRouteAndDirection(routeSelected.value.route_id, direction.direction_id);
  placesOptions.value = places.map((place: Place) => {
    return {
      display: place.description,
      id: place.place_code,
      value: place,
    }
  });
}

const onPlaceSelected = async (place: Place) => {
  placeSelected.value = place;
  const departures = await metroTransitService.findDepartureRouteAndDirectionAndPlace(
      routeSelected.value.route_id,
      directionSelected.value.direction_id,
      place.place_code
  );
  debugger;
  // stopOptions.value = stops.map((stop: Stop) => {
  //   return {
  //     display: stop.description,
  //     id: stop.stop_id,
  //     value: stop,
  //   }
  // });
}
</script>