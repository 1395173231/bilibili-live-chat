<template>
    <div id="live">
        <danmaku-list
                ref="giftPinList"
                v-bind="props"
                :gift-show-face="giftShowFace"
                :is-gift-list="true"
                v-if="props.giftPin"
        />
        <danmaku-list ref="danmakuList" v-bind="props"/>
    </div>
</template>

<script>
import {onBeforeUnmount, ref, onMounted, computed, nextTick} from 'vue';
import {KeepLiveWS} from 'bilibili-live-ws';
import {propsType} from '@/utils/props';
import {setFace} from '@/utils/face';

import DanmakuList from '@/components/DanmakuList';

// const deepl = require('deepl-node')
// import * as deepl from 'deepl-node';
import {translate} from '@/utils/request';

export default {
    components: {DanmakuList},
    props: propsType,
    setup(props) {
        const giftPinList = ref(null);
        const danmakuList = ref(null);

        let synth = window.speechSynthesis
        let isHandlingData = false;
        let utterance = null
        const giftCombMap = new Map();
        const giftShowFace = computed(() => !['false', 'gift'].includes(props.face));

        const blockUIDs = computed(() => new Set(props.blockUID.split('|').map(uid => uid.trim())));
        const isBlockedUID = uid => blockUIDs.value.has(String(uid));

        const queue = ref([""])

        const addInfoDanmaku = message => {
            danmakuList.value.addDanmaku({
                type: 'info',
                message,
                stay: props.stay || 5000,
            });
        };
        let addToQueue = (inputText) => {
            console.log(inputText)
            queue.value.push(inputText);
        }

        // 处理队列中的数据
        const handleQueue = () => {
            nextTick(() => {
                setTimeout(() => {
                    handleQueue()
                }, 500)
            })
            if (isHandlingData) return
            // 读取队列中的数据
            const data = queue.value.shift()
            if (!data) return
            isHandlingData = true
            utterance = new SpeechSynthesisUtterance(data);
            utterance.volume=Number(localStorage.getItem("volume")??50)
            utterance.onend = () => {
                isHandlingData = false
            }
            synth.speak(utterance);
        }
        const addDanmaku = danmaku => {
            if (props.limit) danmakuList.value.addSpeedLimitDanmaku(danmaku);
            else danmakuList.value.addDanmaku(danmaku);
        };
        onMounted(() => {
            handleQueue()
            console.log('正在连接直播弹幕服务器');
            const live = new KeepLiveWS(props.room);
            onBeforeUnmount(() => live.close());
            live.on('open', () => {
                console.log('已连接直播弹幕服务器');
                addInfoDanmaku('已连接直播弹幕服务器');
            });
            live.on('live', () => {
                console.log('已连接直播间', props.room);
                addInfoDanmaku(`已连接直播间 ${props.room}`);
            });
            live.on('close', () => console.log('已断开与直播弹幕服务器的连接'));
            live.on('heartbeat', online => console.log('当前人气值', online));

            // 礼物
            const giftList = props.giftPin ? giftPinList : danmakuList;
            live.on('SEND_GIFT', ({data: {uid, uname, action, giftName, num, face}}) => {
                if (isBlockedUID(uid)) {
                    console.log(`屏蔽了来自[${uname}]的礼物：${giftName}*${num}`);
                    return;
                }
                setFace(uid, face);
                if (props.giftComb) {
                    const key = `${uid}-${giftName}`;
                    const existComb = giftCombMap.get(key);
                    if (existComb) {
                        giftCombMap.set(key, {
                            ...existComb,
                            num: existComb.num + num,
                        });
                    } else {
                        giftCombMap.set(key, {
                            type: 'gift',
                            showFace: props.face !== 'false',
                            uid,
                            uname,
                            action,
                            giftName,
                            num,
                        });
                        setTimeout(() => {
                            addToQueue("感谢" + giftCombMap.get(key).uname + "赠送的" + giftCombMap.get(key).num + "个" + giftCombMap.get(key).giftName)
                            giftList.value.addDanmaku(giftCombMap.get(key));
                            giftCombMap.delete(key);
                        }, props.giftComb);
                    }
                } else {
                    addToQueue("感谢" + uname + "赠送的" + num + "个" + giftName)
                    giftList.value.addDanmaku({
                        type: 'gift',
                        showFace: props.face !== 'false',
                        uid,
                        uname,
                        action,
                        giftName,
                        num,
                    });
                }
            });

            // 弹幕
            live.on('DANMU_MSG', async ({info: [, message, [uid, uname, isOwner /*, isVip, isSvip*/]]}) => {
                if (isBlockedUID(uid)) {
                    console.log(`屏蔽了来自[${uname}]的弹幕：${message}`);
                    return;
                }
                if (props.deeplToken) {
                    localStorage._token = `DeepL-Auth-Key ${props.deeplToken}`;
                    let translate_msg = await translate(
                        'zh' && props.translateFrom,
                        'en' && props.translateTo,
                        message,
                        props.corsProxyUrl
                    );
                    message += '    ' + props.translateTo + ':' + translate_msg.translations[0].text;
                    // message = await translate("zh"&&props.translateFrom,'en'&&props.translateTo,message)
                }
                const danmaku = {
                    type: 'message',
                    showFace: giftShowFace.value,
                    uid,
                    uname,
                    message,
                    isAnchor: uid === props.anchor,
                    isOwner: !!isOwner,
                };
                if (props.delay > 0) setTimeout(() => addDanmaku(danmaku), props.delay * 1000);
                else addDanmaku(danmaku);
            });

            // 进入房间
            live.on('WELCOME', ({data: {uid, uname, medal_info: medalInfo}}) => {
                if (isBlockedUID(uid)) {
                    console.log(`屏蔽了来自[${uname}]的进入房间`);
                    return;
                }
                const danmaku = {
                    type: 'welcome',
                    showFace: giftShowFace.value,
                    uid,
                    uname,
                    medalInfo,
                };
                if (props.delay > 0) setTimeout(() => addDanmaku(danmaku), props.delay * 1000);
                else addDanmaku(danmaku);
            });

            // 舰长
            live.on('ANCHOR_LOT_CHECK', ({data: {uid, uname, medal_info: medalInfo}}) => {
                if (isBlockedUID(uid)) {
                    console.log(`屏蔽了来自[${uname}]的舰长`);
                    return;
                }
                const danmaku = {
                    type: 'guard',
                    showFace: giftShowFace.value,
                    uid,
                    uname,
                    medalInfo,
                };
                if (props.delay > 0) setTimeout(() => addDanmaku(danmaku), props.delay * 1000);
                else addDanmaku(danmaku);
            });

            // SC
            live.on('SUPER_CHAT_MESSAGE', async fullData => {
                console.log('SUPER_CHAT_MESSAGE', fullData);
                let {
                    data: {
                        uid,
                        user_info: {uname},
                        message,
                    },
                } = fullData;
                if (props.deeplToken) {
                    localStorage._token = `DeepL-Auth-Key ${props.deeplToken}`;
                    let translate_msg = await translate(
                        'zh' && props.translateFrom,
                        'en' && props.translateTo,
                        message,
                        props.corsProxyUrl
                    );
                    message += '/' + props.translateTo + ':' + translate_msg.translations[0].text;
                    // message = await translate("zh"&&props.translateFrom,'en'&&props.translateTo,message)
                }
                giftList.value.addDanmaku({
                    type: 'sc',
                    showFace: props.face !== 'false',
                    uid,
                    uname,
                    message,
                });
            });
            window.giftList = giftList;

            live.on('SUPER_CHAT_MESSAGE_JPN', data => console.log('SUPER_CHAT_MESSAGE_JPN', data));

            // 舰长
            live.on('USER_TOAST_MSG', fullData => {
                const {
                    data: {uid, username: uname, role_name: giftName, num},
                } = fullData;
                giftList.value.addDanmaku({
                    type: 'gift',
                    showFace: props.face !== 'false',
                    uid,
                    uname,
                    giftName,
                    num,
                });
            });
        });

        return {props, giftShowFace, giftPinList, danmakuList};
    },
};
</script>

<style lang="scss">
#live {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  background-color: transparent;
  display: flex;
  flex-direction: column;
}
</style>
