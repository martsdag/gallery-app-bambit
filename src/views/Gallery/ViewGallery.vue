<template>
  <div class="py-4 px-0 w-[90%] m-auto flex justify-center items-start min-h-screen p-4">
    <div
      class="max-w-[600px] w-full bg-indigo-100 shadow-lg rounded-sm overflow-x-auto border border-solid border-indigo-200"
    >
      <div v-if="error" class="p-4 text-red-500 text-center">{{ error }}</div>

      <div v-else class="overflow-auto h-[600px]" ref="table">
        <table class="w-full table-fixed">
          <thead>
            <tr class="bg-indigo-400 sticky top-[-1px] z-10">
              <th
                v-for="column in columns"
                class="p-2 hover:bg-indigo-300 cursor-pointer overflow-hidden text-ellipsis border border-solid border-indigo-600"
                :key="column.key"
                @click="onClickSort(column.key)"
              >
                {{ column.text }}
              </th>
            </tr>
          </thead>
          <tbody>
            <template v-if="loading">
              <tr v-for="n in 10" :key="n">
                <td v-for="column in columns" class="cell-table" :key="column.key">
                  <el-skeleton animated>
                    <el-skeleton-item variant="text" style="width: 100%" />
                  </el-skeleton>
                </td>
              </tr>
            </template>

            <template v-else>
              <tr v-for="photo in visiblePhotos" class="border-b" :key="photo.id">
                <td class="cell-table">
                  {{ photo.id }}
                </td>
                <td class="cell-table">
                  {{ photo.albumId }}
                </td>
                <td :title="photo.title" class="cell-table w-10 truncate overflow-hidden">
                  {{ photo.title }}
                </td>
                <td :title="photo.url" class="cell-table w-10 truncate overflow-hidden">
                  {{ photo.url }}
                </td>
                <td :title="photo.thumbnailUrl" class="cell-table w-10 truncate overflow-hidden">
                  {{ photo.thumbnailUrl }}
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePhotoStore } from '@/stores/photos';
import { storeToRefs } from 'pinia';
import { ref, computed, useTemplateRef } from 'vue';
import { useInfiniteScroll, useToggle } from '@vueuse/core';

const photoStore = usePhotoStore();
const { photos, loading, error } = storeToRefs(photoStore);

const photosInPage = ref(30);
const table = useTemplateRef('table');
const sortByCategory = ref<string | null>(null);

const [sortDirection, toggleSortDirection] = useToggle<'asc' | 'desc'>('asc');

const columns = [
  { key: 'id', text: 'Ид' },
  { key: 'albumId', text: 'Альбом' },
  { key: 'title', text: 'Название' },
  { key: 'url', text: 'Ссылка' },
  { key: 'thumbnailUrl', text: 'Миниатюра' },
];

const onClickSort = (column: string) => {
  if (sortByCategory.value === column) {
    toggleSortDirection();
  } else {
    sortByCategory.value = column;
    sortDirection.value = 'asc';
  }

  photosInPage.value = 30;
  table.value?.scrollTo({ top: 0, behavior: 'smooth' });
};

const sortedPhotos = computed(() => {
  if (!sortByCategory.value) {
    return photos.value;
  }

  return [...photos.value].sort((a, b) => {
    const category = sortByCategory.value;

    if (!category) {
      return 0;
    }

    if (!(category in a) || !(category in b)) {
      return 0;
    }

    const valA = a[category];
    const valB = b[category];

    if (valA > valB) {
      return sortDirection.value === 'asc' ? 1 : -1;
    }
    if (valA < valB) {
      return sortDirection.value === 'asc' ? -1 : 1;
    }

    return 0;
  });
});

const loadMorePhotos = () => {
  photosInPage.value += 20;
};

useInfiniteScroll(table, loadMorePhotos, { distance: 10 });

const visiblePhotos = computed(() => sortedPhotos.value.slice(0, photosInPage.value));

photoStore.searchPhotos([]);
</script>
