<template>
  <Disclosure as="nav" class="bg-white border-b border-gray-200" v-slot="{ open }">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <!-- header -->
        <div class="flex">
          <div class="flex-shrink-0 flex items-center">
            <img class="block sm:hidden h-8 w-auto" src="@/assets/metro-transit-logo__sm.svg"
                 alt="Workflow"/>
            <img class="hidden sm:block h-8 w-auto"
                 src="@/assets/metro-transit-logo.svg" alt="Workflow"/>
          </div>

        </div>

        <!-- left side -->
        <div class="hidden sm:ml-6 sm:flex sm:items-center">
          <!-- Profile -->
          <Menu as="div" class="ml-3 relative">

            <div>
              <MenuButton
                  class="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <span class="sr-only">Open profile menu</span>
                <UserCircleIcon class="block h-8 w-8 text-gray-400 hover:text-gray-600 " aria-hidden="true"> </UserCircleIcon>
              </MenuButton>
            </div>

            <transition enter-active-class="transition ease-out duration-200"
                        enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
                        leave-active-class="transition ease-in duration-75"
                        leave-from-class="transform opacity-100 scale-100"
                        leave-to-class="transform opacity-0 scale-95">
              <MenuItems
                  class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                <MenuItem v-for="item in userNavigation" :key="item.name" v-slot="{ active }">
                  <a :href="item.href" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">
                    {{ item.name }}
                  </a>
                </MenuItem>
              </MenuItems>
            </transition>
          </Menu>
        </div>

        <!-- mobile menu button -->
        <div class="-mr-2 flex items-center sm:hidden">
          <DisclosureButton
              class="bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <span class="sr-only">Open main menu</span>
            <MenuIcon v-if="!open" class="block h-6 w-6" aria-hidden="true"/>
            <XIcon v-else class="block h-6 w-6" aria-hidden="true"/>
          </DisclosureButton>
        </div>

      </div>
    </div>

    <!-- mobile profile menu -->
    <DisclosurePanel class="sm:hidden">
      <div class="pt-4 pb-3 border-t border-gray-200">
        <div class="mt-3 space-y-1">
          <DisclosureButton v-for="item in userNavigation"
                            :key="item.name"
                            as="a"
                            :href="item.href"
                            class="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100">
            {{ item.name }}
          </DisclosureButton>
        </div>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<script setup>
import {Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems} from '@headlessui/vue'
import {MenuIcon, XIcon} from '@heroicons/vue/outline'
import {UserCircleIcon} from '@heroicons/vue/solid'


const userNavigation = [
  {name: 'Sign In', href: '#'},
  {name: 'Create Account', href: '#'},
]
</script>