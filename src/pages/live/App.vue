<template>
    <el-container>
        <el-container>
            <el-main>
                <danmaku-item v-if="errMsg" type="info" :message="errMsg"/>
                <live v-else-if="ready" v-bind="props"/>
            </el-main>
        </el-container>
        <el-aside width="200px">
            <el-header>
                <el-dropdown @command="changeLang" class="el-dropdown">
          <span class="el-dropdown-link" style="font-size: 15px; display: inline-block; margin-left: auto">
            language<el-icon class="el-icon--right"><arrow-down/></el-icon>
          </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item :disabled="language === 'zh'" command="zh"> 中文</el-dropdown-item>
                            <el-dropdown-item :disabled="language === 'en'" command="en"> English</el-dropdown-item>
                            <el-dropdown-item :disabled="language === 'pt-br'" command="ptBr"> Português (Brasil)
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
                <span><el-slider v-model="volume" :min="0" :max="100"></el-slider></span>
            </el-header>
        </el-aside>
    </el-container>
</template>

<script>
import {defineComponent, reactive, onBeforeUnmount, ref, getCurrentInstance, watch} from 'vue';
import {parseProps, selectOptions} from '@/utils/props';
import {setCors, autoGet} from '@/utils/request';
import {setFaceOption} from '@/utils/face';
import {ElSlider} from 'element-plus';

const useMainVariableEffect = () => {
    const {
        proxy: {$lang},
    } = getCurrentInstance();
    return {$lang};
};
import Live from '@/components/Live';
import DanmakuItem from '@/components/DanmakuItem';

import {useDark, useToggle} from '@vueuse/core';
import {useI18n} from 'vue-i18n';

const isDark = useDark();

export default defineComponent({
    components: {Live, DanmakuItem, ElSlider},
    setup() {
        const onHashChange = () => window.location.reload();
        window.addEventListener('hashchange', onHashChange);
        onBeforeUnmount(() => window.removeEventListener('hashchange', onHashChange));
        const {$lang} = useMainVariableEffect();
        const props = reactive(parseProps(window.location.hash));
        const canCORS = props.cors === 'true';
        setCors(canCORS);
        setFaceOption({
            method: props.face,
            expireDay: props.faceExpireDay,
        });
        let volume=ref(50)
        const ready = ref(false);
        const errMsg = ref('');
        if (props.anchor) {
            ready.value = true;
        } else {
            // 获取房间信息
            autoGet(`https://api.live.bilibili.com/room/v1/Room/room_init?id=${props.room}`)
                .then(({code, msg, data: {room_id, uid}}) => {
                    if (code === 0) {
                        props.room = parseInt(room_id);
                        props.anchor = parseInt(uid);
                        ready.value = true;
                    } else {
                        errMsg.value = msg;
                    }
                })
                .catch(() => {
                    errMsg.value = '获取房间信息失败';
                    if (canCORS) errMsg.value += '，请检查是否正确禁用了浏览器的 web security 以允许直接跨域';
                });
        }
        const {locale} = useI18n();

        const changeLang = val => {
            locale.value = val;
            localStorage.setItem('lang', val);
        };

        if (props.debug) {
            import(/* webpackIgnore: true */ 'https://fastly.jsdelivr.net/npm/vconsole/dist/vconsole.min.js').then(() => {
                new window.VConsole();
            });
        }

        watch(volume, (newValue, oldValue) => {
            localStorage.setItem("volume",String(newValue))
        })
        let switchThemes = () => {
            const toggleDark = useToggle(isDark);
            console.log(toggleDark());
        };


        return {props, ready, errMsg, switchThemes, $lang, changeLang, volume};
    },
});
</script>

<style>
html,
body,
.el-container {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
}

#app {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
    background-color: transparent;
}
</style>
