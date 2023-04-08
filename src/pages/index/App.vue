<template>
  <div id="panel" class="panel panel-default">
    <div class="panel-heading">
      <h2 class="panel-title" style="font-size: 30px; display: inline-block; margin-right: 10px">Bilibili Live Chat</h2>
      <iframe
        src="https://ghbtns.com/github-btn.html?user=Tsuk1ko&amp;repo=bilibili-live-chat&amp;type=star&amp;count=true&amp;size=large"
        frameborder="0"
        scrolling="0"
        width="160px"
        height="30px"
        style="vertical-align: bottom"
      ></iframe>
      <el-dropdown @command="changeLang" class="el-dropdown">
        <span class="el-dropdown-link" style="font-size: 15px; display: inline-block; margin-left: auto">
          language<el-icon class="el-icon--right"><arrow-down /></el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item :disabled="language === 'zh'" command="zh"> 中文 </el-dropdown-item>
            <el-dropdown-item :disabled="language === 'en'" command="en"> English </el-dropdown-item>
            <el-dropdown-item :disabled="language === 'pt-br'" command="ptBr"> Português (Brasil) </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <div class="panel-body">
      <!-- 直播间号 -->
      <input-group :header="$lang('直播间号')">
        <input
          class="form-control"
          type="number"
          min="0"
          step="1"
          :placeholder="$lang('必填，支持短号')"
          v-model.number="form.room"
        />
        <span class="input-group-btn">
          <button class="btn btn-primary" type="button" :disabled="!form.room" @click="goLive">Go!</button>
        </span>
      </input-group>
      <!-- 主播UID -->
      <input-group :header="$lang('主播UID')">
        <input
          class="form-control"
          type="number"
          min="0"
          step="1"
          :placeholder="$lang('如果获取房间信息失败才需要手动填写此项，并且此时直播间号请填写长号而非短号')"
          v-model.number="form.anchor"
        />
      </input-group>
      <!-- 直接跨域 -->
      <input-group :header="$lang('直接跨域')">
        <select class="form-control" v-model="form.cors">
          <option v-for="{ value, text } in options.cors" :key="value" :value="value">{{ text }}</option>
        </select>
        <template #footer>
          <a href="https://github.com/Tsuk1ko/bilibili-live-chat#直接跨域" target="_blank"> {{ $lang('查看说明') }}</a>
        </template>
      </input-group>
      <!-- 显示头像 -->
      <input-group :header="$lang('显示头像')">
        <select class="form-control" v-model="form.face">
          <option v-for="{ value, text } in options.face" :key="value" :value="value">{{ text }}</option>
        </select>
        <template #footer>
          <a href="https://github.com/Tsuk1ko/bilibili-live-chat#显示头像" target="_blank"> {{ $lang('查看说明') }}</a>
        </template>
      </input-group>
      <!-- 头像缓存 -->
      <input-group :header="$lang('头像缓存')" :footer="$lang('天')">
        <input
          class="form-control"
          type="number"
          min="0"
          step="1"
          :placeholder="$lang('选填，头像 URL 缓存的时间，默认为 7 天')"
          v-model.number="form.faceExpireDay"
        />
      </input-group>
      <!-- 弹幕排列 -->
      <input-group :header="$lang('弹幕排列')">
        <select class="form-control" v-model="form.display">
          <option v-for="{ value, text } in options.display" :key="value" :value="value">{{ text }}</option>
        </select>
      </input-group>
      <!-- 弹幕停留 -->
      <input-group :header="$lang('弹幕停留')" :footer="$lang('毫秒')">
        <input
          class="form-control"
          type="number"
          min="0"
          step="1"
          :placeholder="$lang('选填，弹幕过这么久后会被隐藏，仅弹幕排列为“自底部”时有效')"
          v-model.number="form.stay"
        />
      </input-group>
      <!-- 频率限制 -->
      <input-group :header="$lang('频率限制')" :footer="$lang('条/秒')">
        <input
          type="number"
          min="1"
          step="1"
          class="form-control"
          :placeholder="$lang('选填，限制弹幕频率（不包括礼物），若超出频率则会随机丢弃弹幕')"
          v-model.number="form.limit"
        />
      </input-group>
      <!-- 礼物合并 -->
      <input-group :header="$lang('礼物合并')" :footer="$lang('毫秒')">
        <input
          class="form-control"
          type="number"
          min="0"
          step="1"
          :placeholder="$lang('选填，合并统计的等待时间，不知道填多少可填 5000')"
          v-model.number="form.giftComb"
        />
      </input-group>
      <!-- 礼物置顶 -->
      <input-group :header="$lang('礼物置顶')" :footer="$lang('条')">
        <input
          class="form-control"
          type="number"
          min="0"
          step="1"
          :placeholder="$lang('选填，可将礼物置顶，与弹幕分开展示，此项相当于设置礼物区域的高度')"
          v-model.number="form.giftPin"
        />
      </input-group>
      <!-- 弹幕延迟 -->
      <input-group :header="$lang('弹幕延迟')" :footer="$lang('秒')">
        <input
          class="form-control"
          type="number"
          min="0"
          step="1"
          :placeholder="$lang('选填，收到弹幕后延迟这么久才会显示')"
          v-model.number="form.delay"
        />
      </input-group>
      <!-- 屏蔽用户 -->
      <input-group :header="$lang('屏蔽用户')" footer="">
        <input
          class="form-control"
          type="text"
          :placeholder="$lang('选填，将不显示指定UID用户的弹幕和礼物，用竖杠|分隔')"
          v-model="form.blockUID"
        />
      </input-group>
      <input-group header="cors-proxy-url" footer="">
        <input class="form-control" type="text" placeholder="选填，cors-proxy-url" v-model="form.corsProxyUrl" />
      </input-group>
      <input-group header="deeplToken" footer="">
        <input class="form-control" type="text" placeholder="选填，翻译api Token" v-model="form.deeplToken" />
        <input class="form-control" type="text" placeholder="选填，翻译api from" v-model="form.translateFrom" />
        <input class="form-control" type="text" placeholder="选填，翻译api to" v-model="form.translateTo" />
      </input-group>
    </div>
  </div>
</template>

<script>
import { defineComponent, unref, reactive, watchEffect, computed, readonly, getCurrentInstance, toRefs } from 'vue';
import InputGroup from '@/components/InputGroup.vue';
import { sget, sset } from '@/utils/storage';
import { defaultProps, intProps, refreshProps, selectOptions } from '@/utils/props';
import { stringify as qss } from 'query-string';
import { fromPairs, pick } from 'lodash';
import { useI18n } from 'vue-i18n';
import { $lang } from '@/i18n/i18n';

export default defineComponent({
  methods: { $lang },
  components: { InputGroup },
  setup() {
    const form = reactive({
      ...defaultProps,
      ...sget('setting', {}),
    });
    intProps.forEach(key => {
      watchEffect(() => {
        if (typeof form[key] === 'number') form[key] = Math.max(Math.floor(form[key]), 0);
      });
    });
    const simpleForm = computed(() =>
      pick(
        fromPairs(
          Object.entries(form)
            .filter(([k, v]) => {
              const val = unref(v);
              return val && val !== defaultProps[k];
            })
            .map(([k, v]) => [k, unref(v)])
        ),
        Object.keys(defaultProps)
      )
    );
    watchEffect(() => {
      sset('setting', simpleForm.value);
    });
    const { locale } = useI18n();

    let options = reactive(selectOptions());
    const changeLang = val => {
      locale.value = val;
      localStorage.setItem('lang', val);
      // 强制更新options
      let data = selectOptions();
      for (const key in options) {
        options[key] = data[key];
      }
    };
    return {
      form,
      goLive: () => (window.location.href = `live.html#${qss(simpleForm.value)}`),
      options,
      changeLang,
    };
  },
});
</script>

<style>
body,
html {
  width: 100%;
  height: 100%;
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
}

#app {
  margin: 16px;
}

@media screen and (min-width: 800px) {
  #app {
    width: 70%;
    min-width: 768px;
    max-width: 1024px;
  }
}

@media screen and (max-width: 799px) {
  #app {
    width: 100%;
  }
}

#panel {
  margin: 0;
}

.form-control {
  box-shadow: none !important;
}
.el-dropdown {
  float: right;
}

input[type='checkbox'] {
  vertical-align: middle;
}

label {
  margin-bottom: 0;
  font-weight: 400;
}

.input-group:not(:last-child) {
  margin-bottom: 10px;
}

.input-group-addon.front {
  min-width: 81px;
}

a {
  text-decoration: none !important;
}

.bl-0 {
  border-left: 0;
}
</style>
