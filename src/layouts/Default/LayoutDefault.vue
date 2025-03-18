<template>
  <div class="flex h-screen">
    <div class="flex flex-col flex-1 relative">
      <LayoutDefaultHeader />
      <main class="flex-1 flex overflow-hidden">
        <slot />
      </main>
      <LayoutDefaultFooter />
    </div>
  </div>
</template>

<script setup lang="ts">
import LayoutDefaultHeader from '@/layouts/Default/components/LayoutDefaultHeader.vue';
import LayoutDefaultFooter from '@/layouts/Default/components/LayoutDefaultFooter.vue';
</script>
