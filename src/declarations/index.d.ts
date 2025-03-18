/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module '*.vue' {
  import type { ComponentPublicInstance } from 'vue';
  const component: ComponentPublicInstance;

  export default component;
}
