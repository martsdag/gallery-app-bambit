import type { Component } from 'vue';
import { createRouter, createWebHistory, type NavigationGuard } from 'vue-router';

import LayoutDefault from '@/layouts/Default/LayoutDefault.vue';

export enum LayoutName {
  Default = 'Default',
  Empty = 'Empty',
}

export enum RouteName {
  Gallery = 'Gallery',
}

export const router = createRouter({
  routes: [
    {
      name: RouteName.Gallery,
      path: '/',
      component: () => import('@/views/Gallery'),
    },
  ],
  history: createWebHistory('/'),
});

const loadLayout: NavigationGuard = async (to) => {
  if (!to.meta.layout) {
    to.meta.layoutComponent = LayoutDefault;

    return;
  }

  await import(`@/layouts/${to.meta.layout}/index.ts`)
    .then(({ default: LayoutComponent }: { default: Component }) => {
      to.meta.layoutComponent = LayoutComponent;
    })
    .catch((err) => {
      console.error(`Error while loading ${to.meta.layout} layout:`, err);

      to.meta.layoutComponent = LayoutDefault;
    });
};

router.beforeEach(loadLayout);
