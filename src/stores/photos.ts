import { defineStore } from 'pinia';
import { useAsyncState } from '@vueuse/core';
import { fetchPhotos } from '@/api/photos';
import { ref } from 'vue';

export const usePhotoStore = defineStore('photos', () => {
  const albumIds = ref<number[]>([]);

  const {
    state: photos,
    isLoading: loading,
    error,
    execute,
  } = useAsyncState(() => fetchPhotos(albumIds.value), [], { immediate: false });

  const searchPhotos = (ids: number[]) => {
    albumIds.value = ids;

    return execute();
  };

  return {
    photos,
    loading,
    error,
    searchPhotos,
  };
});
