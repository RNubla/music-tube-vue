<template>
  <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
    <div class="flex items-center">
      <div class="flex-shrink-0">
        <a href="#" class="block relative">
          <img
            alt="profil"
            src="/images/person/8.jpg"
            class="mx-auto object-cover rounded-full h-10 w-10"
          />
        </a>
      </div>
      <div class="ml-3">
        <p class="text-gray-900 whitespace-no-wrap">{{ songValues.title }}</p>
      </div>
    </div>
  </td>
  <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
    <p class="text-gray-900 whitespace-no-wrap">{{ songValues.link }}</p>
  </td>
  <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
    <p class="text-gray-900 whitespace-no-wrap">{{ songValues.added }}</p>
  </td>
  <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
    <span
      class="
        relative
        inline-block
        px-3
        py-1
        font-semibold
        text-green-900
        leading-tight
      "
    >
      <span
        aria-hidden="true"
        class="absolute inset-0 bg-green-200 opacity-50 rounded-full"
      >
      </span>
      <span class="relative"> active </span>
    </span>
  </td>
</template>

<script>
export default {
  props: {
    songValues: {},
  },
};
</script>

<style>
</style>