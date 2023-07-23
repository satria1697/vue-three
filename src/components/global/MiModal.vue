<template>
  <div class="fixed top-0 left-0 w-screen h-screen" tabindex="-1">
    <div class="bg-opacity-25 bg-gray-700 w-full h-full grid place-items-center">
      <div class="border rounded-md bg-white w-1/4 min-h-1/4">
        <slot />
      </div>
    </div>
  </div>
</template>
