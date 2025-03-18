import 'vue-router';
import type { Component } from 'vue';

import { LayoutName } from '@/router';

declare module 'vue-router' {
  interface RouteMeta {
    layout?: LayoutName;
    layoutComponent?: Component;
  }
}
