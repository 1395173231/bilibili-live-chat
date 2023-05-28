import '@/utils/bufferPolyfill';
import Vue, { createApp } from 'vue';
import elementPlus from 'element-plus';
// import 'element-plus/theme-chalk/dark/css-vars.css';
import 'element-plus/dist/index.css';
import i18n from '@/i18n/i18n.js';
import App from './App.vue';
import VueSpeech from '@codekraft-studio/vue-speech'

const app = createApp(App);
app.use(elementPlus);
app.use(i18n);
app.use(VueSpeech)
app.mount('#app');
