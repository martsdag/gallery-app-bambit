import { client } from '@/api/_client';

export interface Photo {
  id: number;
  title: string;
  url: string;
  albumId: number;
  thumbnailUrl: string;
}

export const fetchPhotos = async (albumIds: number[] = []) => {
  const query = albumIds.length ? albumIds.map((id) => `albumId=${id}`).join('&') : '';

  const response = await client(`/photos${query ? '?' + query : ''}`);

  return response;
};
