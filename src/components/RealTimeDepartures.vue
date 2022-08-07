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

      <!-- departure table -->
      <div v-if="placeSelected != null"
           class="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
        <div class="-ml-4 -mt-4 flex justify-between items-center flex-wrap sm:flex-nowrap">
          <div class="ml-4 mt-4">
            <h3 class="text-lg leading-6 font-medium text-gray-900">
              {{ stop?.description }}
            </h3>

            <p class="mt-1 text-sm text-gray-500">
              {{ stop?.stop_id }}
            </p>
          </div>
        </div>

        <div class="mt-8 flex flex-col">
          <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table class="min-w-full divide-y divide-gray-300">
                  <thead class="bg-gray-50">
                  <tr>
                    <th scope="col"
                        class="py-3 pl-4 pr-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 sm:pl-6">
                      Route
                    </th>
                    <th scope="col"
                        class="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
                      Destination
                    </th>
                    <th scope="col"
                        class="px-3 py-3 text-right text-xs font-medium uppercase tracking-wide text-gray-500">
                      Departs
                    </th>
                  </tr>
                  </thead>

                  <tbody class="divide-y divide-gray-200 bg-white">
                  <tr v-for="departure in departuresRef"
                      :key="departure.departure_time">

                    <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 text-bold">
                      {{ departure.route_short_name }}
                    </td>

                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {{ departure.description }}
                    </td>

                    <td class="whitespace-nowrap px-3 py-4 text-right text-sm  text-gray-500">
                      {{ departure.departure_text }}
                    </td>
                  </tr>

                  <!-- expander -->
                  <tr class="border-t border-gray-200">
                    <th colspan="5" scope="colgroup" class="bg-gray-50 px-4 py-2 text-left text-sm font-semibold text-gray-900 sm:px-6">
                      <a @click.prevent="onExpand()">
                        Departures
                      </a>
                    </th>
                  </tr>

                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

    </main>
  </div>
</template>

<script setup lang="ts">

import ItemSelectorComponent from '@/components/OptionSelectorComponent.vue';
import { metroTransitService } from '@/services/metroTransitService';
import { onMounted, ref } from 'vue';
import { Direction, Place, Route } from '../services/generated-nextrip-api';


const routeOptions = ref([]);
const routeSelected = ref();
const directionOptions = ref([]);
const directionSelected = ref();
const placesOptions = ref([]);
const placeSelected = ref();
const stop = ref()
const departuresRef = ref([])

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
  const {departures, stops} = await metroTransitService.findDepartureRouteAndDirectionAndPlace(
      routeSelected.value.route_id,
      directionSelected.value.direction_id,
      place.place_code,
  );

  departuresRef.value = departures;
  stop.value = stops[0];
}

const onExpand = () => {
  console.log("expand")
}
</script>