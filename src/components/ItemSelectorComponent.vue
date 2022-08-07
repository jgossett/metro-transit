<template>
  <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
    <div class="px-4 py-8 sm:px-0">
      <Combobox as="div"
                v-model="itemSelected">

        <!-- label -->
        <ComboboxLabel class="block text-sm font-medium text-gray-700">
          {{ label }}
        </ComboboxLabel>

        <div class="relative mt-1">
          <ComboboxInput
              class="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
              @change="itemQuery = $event.target.value" :display-value="(person) => person?.route_label"/>
          <ComboboxButton class="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
            <SelectorIcon class="h-5 w-5 text-gray-400" aria-hidden="true"/>
          </ComboboxButton>

          <ComboboxOptions v-if="itemsFiltered.length > 0"
                           class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            <ComboboxOption v-for="item in itemsFiltered"
                            :key="item.route_id"
                            :value="item"
                            as="template"
                            v-slot="{ active, selected }">
              <li :class="['relative cursor-default select-none py-2 pl-3 pr-9', active ? 'bg-sky-600 text-white' : 'text-gray-900']">
                <span :class="['block truncate', selected && 'font-semibold']">
                  {{ item.route_label }}
                </span>

                <span v-if="selected"
                      :class="['absolute inset-y-0 right-0 flex items-center pr-4', active ? 'text-white' : 'text-sky-600']">
                  <CheckIcon class="h-5 w-5"
                             aria-hidden="true"/>
                </span>
              </li>
            </ComboboxOption>
          </ComboboxOptions>
        </div>
      </Combobox>
    </div>
  </div>
</template>

<script setup>
import {CheckIcon, SelectorIcon} from '@heroicons/vue/solid'
import {Combobox, ComboboxButton, ComboboxInput, ComboboxLabel, ComboboxOption, ComboboxOptions} from '@headlessui/vue'
import {computed, defineProps, ref, toRefs} from "vue";

const itemQuery = ref('')
const props = defineProps({
  label: {
    required: true,
    type: String
  },

  items: {
    default: [],
    type: Array
  },

  itemSelected: {
    default: undefined,
    type: Object
  }
});

const { items } = toRefs(props);

const itemsFiltered = computed(() => {
  if (itemQuery.value === '') {
    return items;
  }

  return items.value.filter((person) => {
    return person.route_label.toLowerCase().includes(itemQuery.value.toLowerCase())
  });
});
</script>
