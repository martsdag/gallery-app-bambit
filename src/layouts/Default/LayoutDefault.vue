<template>
  <div class="flex h-screen">
    <div class="flex flex-col flex-1 relative">
      <LayoutDefaultHeader />
      <main class="flex-1 flex overflow-hidden">
        <Gallery />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import LayoutDefaultHeader from '@/layouts/Default/components/LayoutDefaultHeader.vue';
import Gallery from '@/views/Gallery';
</script>
