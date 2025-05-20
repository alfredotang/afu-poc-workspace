export {}

declare global {
  interface Window {
    vueRouter?: import('vue-router').Router
    pinia?: import('pinia').Pinia
  }
}
