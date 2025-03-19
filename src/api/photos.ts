import { client } from '@/api/_client';

export interface Gallery {
  id: number;
  title: string;
  url: string;
  albumId: number;
  thumbnailUrl: string;
}

export const fetchPhotos = async (albumIds: number[] = []) => {
  const query = albumIds.map((id) => `albumId=${id}`).join('&');

  return client<Gallery[]>(`/photos?${query}`);
};
