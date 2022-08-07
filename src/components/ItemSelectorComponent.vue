<template>
  <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
    <div class="px-4 py-8 sm:px-0">
      <Combobox as="div"
                v-model="optionSelected">

        <!-- label -->
        <ComboboxLabel class="block text-sm font-medium text-gray-700">
          {{ label }}
        </ComboboxLabel>

        <div class="relative mt-1">
          <ComboboxInput
              class="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
              @change="optionDisplayQuery = $event.target.value" :display-value="(option) => option?.display"/>
          <ComboboxButton class="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
            <SelectorIcon class="h-5 w-5 text-gray-400" aria-hidden="true"/>
          </ComboboxButton>

          <ComboboxOptions v-if="optionsFiltered.length > 0"
                           class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            <ComboboxOption v-for="option in optionsFiltered"
                            :key="option.id"
                            :value="option"
                            as="template"
                            v-slot="{ active, selected }">
              <li :class="['relative cursor-default select-none py-2 pl-3 pr-9', active ? 'bg-sky-600 text-white' : 'text-gray-900']">
                <span :class="['block truncate', selected && 'font-semibold']">
                  {{ option.display }}
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
import {computed, defineEmits, defineProps, ref, toRefs, watch} from "vue";

const optionDisplayQuery = ref('');
const optionSelected = ref();

const props = defineProps({
  label: {
    required: true,
    type: String
  },

  options: {
    default: [],
    type: Array
  },
});

const { options } = toRefs(props);

const emits = defineEmits(['optionSelected']);

watch(optionSelected, (option) => {
  emits('optionSelected', option.value);
})

const optionsFiltered = computed(() => {
  if (optionDisplayQuery.value === '') {
    return options;
  }

  return options.value.filter((item) => {
    return item.display.toLowerCase().includes(optionDisplayQuery.value.toLowerCase())
  });
});
</script>
