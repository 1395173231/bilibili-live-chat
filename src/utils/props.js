import { parse as qsp } from 'query-string';
import { mapValues, pick } from 'lodash';
import { $lang } from '@/i18n/i18n.js';
import { reactive } from 'vue';
export const defaultProps = {
  room: '',
  anchor: '',
  cors: 'false',
  face: 'false',
  faceExpireDay: '',
  display: 'bottom',
  stay: '',
  limit: '',
  giftComb: '',
  giftPin: '',
  delay: '',
  blockUID: '',
  debug: '',
  deeplToken: '',
  translateFrom: '',
  corsProxyUrl: '',
  translateTo: 'PT-BR',
  volume:50
};
Object.freeze(defaultProps);

export const intProps = ['room', 'anchor', 'faceExpireDay', 'stay', 'giftComb', 'limit', 'giftPin', 'delay'];
Object.freeze(intProps);

export const intPropsSet = new Set(intProps);
Object.freeze(intPropsSet);

export const isIntProp = name => intPropsSet.has(name);

const intPropsDefault = {
  faceExpireDay: 7,
};
Object.freeze(intPropsDefault);

export const propsType = mapValues(defaultProps, (v, k) => (intPropsSet.has(k) ? Number : String));
Object.freeze(propsType);

export let selectOptions = () => {
  return {
    cors: [
      {
        value: 'false',
        text: $lang('关闭（所有跨域请求将依赖 codetabs，限制 5 请求/秒）'),
      },
      {
        value: 'true',
        text: $lang('开启（请阅读右侧说明）'),
      },
    ],
    face: [
      {
        value: 'false',
        text: $lang('不显示'),
      },
      {
        value: 'gift',
        text: $lang('仅对礼物显示，不需要额外调用 API'),
      },
      {
        value: 'true',
        text: $lang('显示，通过 Bilibili API 获取（跨域）'),
      },
      {
        value: 'imjad',
        text: $lang('显示，通过 HibiAPI 获取'),
      },
    ],
    display: [
      {
        value: 'bottom',
        text: $lang('自底部'),
      },
      {
        value: 'top',
        text: $lang('从顶部'),
      },
    ],
  };
};
// Object.freeze(selectOptions);

export const parseProps = qs =>
  mapValues(
    pick(
      {
        ...defaultProps,
        ...qsp(qs),
      },
      Object.keys(defaultProps)
    ),
    (v, k) => {
      if (isIntProp(k)) return (v && parseInt(v)) || intPropsDefault[k] || 0;
      if (k in selectOptions) return selectOptions[k].some(({ value }) => value === v) ? v : defaultProps[k];
      return v || defaultProps[k];
    }
  );
