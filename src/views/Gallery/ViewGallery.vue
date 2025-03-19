<template>
  <div class="py-4 px-0 w-[90%] m-auto flex justify-center items-start min-h-screen p-4">
    <div
      class="max-w-[600px] w-full bg-indigo-100 shadow-lg rounded-sm overflow-x-auto border border-solid border-indigo-200"
    >
      <div v-if="error" class="p-4 text-red-500 text-center">{{ error }}</div>

      <div v-else class="overflow-auto h-[600px]">
        <table class="w-full table-fixed" ref="tableRef">
          <thead>
            <tr class="bg-indigo-400 sticky top-[-1px] z-10">
              <th
                v-for="column in columns"
                class="p-2 hover:bg-indigo-300 cursor-pointer overflow-hidden text-ellipsis border border-solid border-indigo-600"
                :key="column.key"
                @click="onClickSort(column.key)"
              >
                {{ column.label }}
              </th>
            </tr>
          </thead>
          <tbody>
            <template v-if="loading">
              <tr v-for="n in 10" :key="n">
                <td v-for="column in columns" class="p-2 border border-solid border-indigo-400" :key="column.key">
                  <el-skeleton animated>
                    <el-skeleton-item variant="text" style="width: 100%" />
                  </el-skeleton>
                </td>
              </tr>
            </template>

            <template v-else>
              <tr v-for="photo in visiblePhotos" class="border-b" :key="photo.id">
                <td class="p-2 border border-solid border-indigo-400 hover:bg-indigo-50">{{ photo.id }}</td>
                <td class="p-2 border border-solid border-indigo-400 hover:bg-indigo-50">{{ photo.albumId }}</td>
                <td
                  :title="photo.title"
                  class="p-2 border border-solid border-indigo-400 w-10 truncate overflow-hidden hover:bg-indigo-50"
                >
                  {{ photo.title }}
                </td>
                <td
                  :title="photo.url"
                  class="p-2 border border-solid border-indigo-400 w-10 truncate overflow-hidden hover:bg-indigo-50"
                >
                  {{ photo.url }}
                </td>
                <td
                  :title="photo.thumbnailUrl"
                  class="p-2 border border-solid border-indigo-400 w-10 truncate overflow-hidden hover:bg-indigo-50"
                >
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
import { ref, computed } from 'vue';
import { useInfiniteScroll } from '@vueuse/core';

const photoStore = usePhotoStore();
const { photos, loading, error } = storeToRefs(photoStore);

const itemsPerPage = ref(30);
const tableRef = ref<HTMLDivElement | null>(null);
const sortByCategory = ref<string | null>(null);
const sortDirection = ref<'asc' | 'desc'>('asc');

const columns = [
  { key: 'id', label: 'Ид' },
  { key: 'albumId', label: 'Альбом' },
  { key: 'title', label: 'Название' },
  { key: 'url', label: 'Ссылка' },
  { key: 'thumbnailUrl', label: 'Миниатюра' },
];

const onClickSort = (column: string) => {
  if (sortByCategory.value === column) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortByCategory.value = column;
    sortDirection.value = 'asc';
  }

  itemsPerPage.value = 30;
  tableRef.value?.scrollTo({ top: 0, behavior: 'smooth' });
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

    const valA = a[category as keyof typeof a];
    const valB = b[category as keyof typeof b];

    if (valA > valB) {
      return sortDirection.value === 'asc' ? 1 : -1;
    }
    if (valA < valB) {
      return sortDirection.value === 'asc' ? -1 : 1;
    }

    return 0;
  });
});

const loadMoreItems = () => {
  itemsPerPage.value += 20;
};

useInfiniteScroll(tableRef, loadMoreItems, { distance: 10 });

const visiblePhotos = computed(() => sortedPhotos.value.slice(0, itemsPerPage.value));

photoStore.searchPhotos([]);
</script>
