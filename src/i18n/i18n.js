import { createI18n } from 'vue-i18n';
import zh from '@/i18n/json/zh.json';
import en from '@/i18n/json/en.json';
import ptBr from '@/i18n/json/pt-br.json';
import App from 'vue';
import { crc32 } from 'crc';

const localLang = localStorage.getItem('lang'); // 业务需要存放仓库, 如element国际化, 需要刷新页面重新加载, 在main.js初始化element国际化语言. 这里根据你的业务去做语言切换功能.
//实例化语言类
export const i18n = new createI18n({
  legacy: false,
  globalInjection: true,
  locale: localLang || 'zh', // 语言标识
  fallbackLocale: localLang || 'zh', //默认中文语言
  messages: { zh, en, ptBr },
});

function lang(key) {
  let hashKey = `K${crc32(key).toString(16)}`; // 将中文转换成crc32格式去匹配对应的json语言包
  let words = i18n.global.t(hashKey);
  if (words == hashKey) {
    words = key;
    console.log(key, '-无匹配语言key');
  }
  return words;
}

export const $lang = lang;

export default app => {
  app.use(i18n);
  app.config.globalProperties.$lang = lang;
  app.provide('$lang', lang);
};
