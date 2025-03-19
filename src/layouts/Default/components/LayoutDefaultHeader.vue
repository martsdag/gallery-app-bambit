<template>
  <header class="py-3">
    <div class="flex items-center gap-4 flex-row-reverse mx-auto my-0 w-[90%] max-w-[37.5rem]">
      <el-button :icon="Search" color="#7c86ff" round :loading="store.loading" @click="searchAlbums"> Поиск </el-button>
      <el-input placeholder="Введите ID альбома" v-model="input" @keyup.enter="searchAlbums" />
    </div>
  </header>
</template>

<script setup lang="ts">
import { usePhotoStore } from '@/stores/photos';
import { ref } from 'vue';
import { Search } from '@element-plus/icons-vue';
import { useLocalStorage } from '@vueuse/core';

const store = usePhotoStore();
const albumIdsInLocalStorage = useLocalStorage('albumIds', '');
const input = ref('');

const searchAlbums = async () => {
  const newAlbumsIds = input.value.trim();

  if (newAlbumsIds) {
    albumIdsInLocalStorage.value = albumIdsInLocalStorage.value
      ? `${albumIdsInLocalStorage.value} ${newAlbumsIds}`
      : newAlbumsIds;
  }

  const albumIds = newAlbumsIds
    .split(' ')
    .map(Number)
    .filter((id) => !isNaN(id) && id > 0);

  await store.searchPhotos(albumIds);
  input.value = '';
};
</script>
