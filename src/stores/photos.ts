import { defineStore } from 'pinia';
import { ref } from 'vue';
import { fetchPhotos, type Photo } from '@/api/photos';

export const usePhotoStore = defineStore('photoStore', () => {
  const photos = ref<Photo[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const searchPhotos = async (albumIds?: number[]) => {
    loading.value = true;
    error.value = null;

    try {
      photos.value = await fetchPhotos(albumIds?.length ? albumIds : []);
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Что-то пошло не так';
    } finally {
      loading.value = false;
    }
  };

  return {
    photos,
    loading,
    error,
    searchPhotos,
  };
});
