(function(){"use strict";var e={1941:function(e,o,l){l(3943);var t=l(9963),r=l(6460),n=(l(4415),l(3168)),a=l(6252),i=l(3577);const u={id:"panel",class:"panel panel-default"},d={class:"panel-heading"},s=(0,a._)("h2",{class:"panel-title",style:{"font-size":"30px",display:"inline-block","margin-right":"10px"}},"Bilibili Live Chat",-1),c=(0,a._)("iframe",{src:"https://ghbtns.com/github-btn.html?user=Tsuk1ko&repo=bilibili-live-chat&type=star&count=true&size=large",frameborder:"0",scrolling:"0",width:"160px",height:"30px",style:{"vertical-align":"bottom"}},null,-1),f={class:"el-dropdown-link",style:{"font-size":"15px",display:"inline-block","margin-left":"auto"}},p={class:"panel-body"},m=["placeholder"],h={class:"input-group-btn"},g=["disabled"],b=["placeholder"],y=["value"],w={href:"https://github.com/Tsuk1ko/bilibili-live-chat#直接跨域",target:"_blank"},v=["value"],_={href:"https://github.com/Tsuk1ko/bilibili-live-chat#显示头像",target:"_blank"},x=["placeholder"],k=["value"],$=["placeholder"],U=["placeholder"],W=["placeholder"],D=["placeholder"],O=["placeholder"],z=["placeholder"];function j(e,o,l,r,n,j){const V=(0,a.up)("arrow-down"),P=(0,a.up)("el-icon"),T=(0,a.up)("el-dropdown-item"),I=(0,a.up)("el-dropdown-menu"),C=(0,a.up)("el-dropdown"),E=(0,a.up)("input-group");return(0,a.wg)(),(0,a.iD)("div",u,[(0,a._)("div",d,[s,c,(0,a.Wm)(C,{onCommand:e.changeLang,class:"el-dropdown"},{dropdown:(0,a.w5)((()=>[(0,a.Wm)(I,null,{default:(0,a.w5)((()=>[(0,a.Wm)(T,{disabled:"zh"===e.language,command:"zh"},{default:(0,a.w5)((()=>[(0,a.Uk)(" 中文 ")])),_:1},8,["disabled"]),(0,a.Wm)(T,{disabled:"en"===e.language,command:"en"},{default:(0,a.w5)((()=>[(0,a.Uk)(" English ")])),_:1},8,["disabled"]),(0,a.Wm)(T,{disabled:"pt-br"===e.language,command:"ptBr"},{default:(0,a.w5)((()=>[(0,a.Uk)(" Português (Brasil) ")])),_:1},8,["disabled"])])),_:1})])),default:(0,a.w5)((()=>[(0,a._)("span",f,[(0,a.Uk)(" language"),(0,a.Wm)(P,{class:"el-icon--right"},{default:(0,a.w5)((()=>[(0,a.Wm)(V)])),_:1})])])),_:1},8,["onCommand"])]),(0,a._)("div",p,[(0,a.Wm)(E,{header:e.$lang("直播间号")},{default:(0,a.w5)((()=>[(0,a.wy)((0,a._)("input",{class:"form-control",type:"number",min:"0",step:"1",placeholder:e.$lang("必填，支持短号"),"onUpdate:modelValue":o[0]||(o[0]=o=>e.form.room=o)},null,8,m),[[t.nr,e.form.room,void 0,{number:!0}]]),(0,a._)("span",h,[(0,a._)("button",{class:"btn btn-primary",type:"button",disabled:!e.form.room,onClick:o[1]||(o[1]=(...o)=>e.goLive&&e.goLive(...o))},"Go!",8,g)])])),_:1},8,["header"]),(0,a.Wm)(E,{header:e.$lang("主播UID")},{default:(0,a.w5)((()=>[(0,a.wy)((0,a._)("input",{class:"form-control",type:"number",min:"0",step:"1",placeholder:e.$lang("如果获取房间信息失败才需要手动填写此项，并且此时直播间号请填写长号而非短号"),"onUpdate:modelValue":o[2]||(o[2]=o=>e.form.anchor=o)},null,8,b),[[t.nr,e.form.anchor,void 0,{number:!0}]])])),_:1},8,["header"]),(0,a.Wm)(E,{header:e.$lang("直接跨域")},{footer:(0,a.w5)((()=>[(0,a._)("a",w,(0,i.zw)(e.$lang("查看说明")),1)])),default:(0,a.w5)((()=>[(0,a.wy)((0,a._)("select",{class:"form-control","onUpdate:modelValue":o[3]||(o[3]=o=>e.form.cors=o)},[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(e.options.cors,(({value:e,text:o})=>((0,a.wg)(),(0,a.iD)("option",{key:e,value:e},(0,i.zw)(o),9,y)))),128))],512),[[t.bM,e.form.cors]])])),_:1},8,["header"]),(0,a.Wm)(E,{header:e.$lang("显示头像")},{footer:(0,a.w5)((()=>[(0,a._)("a",_,(0,i.zw)(e.$lang("查看说明")),1)])),default:(0,a.w5)((()=>[(0,a.wy)((0,a._)("select",{class:"form-control","onUpdate:modelValue":o[4]||(o[4]=o=>e.form.face=o)},[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(e.options.face,(({value:e,text:o})=>((0,a.wg)(),(0,a.iD)("option",{key:e,value:e},(0,i.zw)(o),9,v)))),128))],512),[[t.bM,e.form.face]])])),_:1},8,["header"]),(0,a.Wm)(E,{header:e.$lang("头像缓存"),footer:e.$lang("天")},{default:(0,a.w5)((()=>[(0,a.wy)((0,a._)("input",{class:"form-control",type:"number",min:"0",step:"1",placeholder:e.$lang("选填，头像 URL 缓存的时间，默认为 7 天"),"onUpdate:modelValue":o[5]||(o[5]=o=>e.form.faceExpireDay=o)},null,8,x),[[t.nr,e.form.faceExpireDay,void 0,{number:!0}]])])),_:1},8,["header","footer"]),(0,a.Wm)(E,{header:e.$lang("弹幕排列")},{default:(0,a.w5)((()=>[(0,a.wy)((0,a._)("select",{class:"form-control","onUpdate:modelValue":o[6]||(o[6]=o=>e.form.display=o)},[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(e.options.display,(({value:e,text:o})=>((0,a.wg)(),(0,a.iD)("option",{key:e,value:e},(0,i.zw)(o),9,k)))),128))],512),[[t.bM,e.form.display]])])),_:1},8,["header"]),(0,a.Wm)(E,{header:e.$lang("弹幕停留"),footer:e.$lang("毫秒")},{default:(0,a.w5)((()=>[(0,a.wy)((0,a._)("input",{class:"form-control",type:"number",min:"0",step:"1",placeholder:e.$lang("选填，弹幕过这么久后会被隐藏，仅弹幕排列为“自底部”时有效"),"onUpdate:modelValue":o[7]||(o[7]=o=>e.form.stay=o)},null,8,$),[[t.nr,e.form.stay,void 0,{number:!0}]])])),_:1},8,["header","footer"]),(0,a.Wm)(E,{header:e.$lang("频率限制"),footer:e.$lang("条/秒")},{default:(0,a.w5)((()=>[(0,a.wy)((0,a._)("input",{type:"number",min:"1",step:"1",class:"form-control",placeholder:e.$lang("选填，限制弹幕频率（不包括礼物），若超出频率则会随机丢弃弹幕"),"onUpdate:modelValue":o[8]||(o[8]=o=>e.form.limit=o)},null,8,U),[[t.nr,e.form.limit,void 0,{number:!0}]])])),_:1},8,["header","footer"]),(0,a.Wm)(E,{header:e.$lang("礼物合并"),footer:e.$lang("毫秒")},{default:(0,a.w5)((()=>[(0,a.wy)((0,a._)("input",{class:"form-control",type:"number",min:"0",step:"1",placeholder:e.$lang("选填，合并统计的等待时间，不知道填多少可填 5000"),"onUpdate:modelValue":o[9]||(o[9]=o=>e.form.giftComb=o)},null,8,W),[[t.nr,e.form.giftComb,void 0,{number:!0}]])])),_:1},8,["header","footer"]),(0,a.Wm)(E,{header:e.$lang("礼物置顶"),footer:e.$lang("条")},{default:(0,a.w5)((()=>[(0,a.wy)((0,a._)("input",{class:"form-control",type:"number",min:"0",step:"1",placeholder:e.$lang("选填，可将礼物置顶，与弹幕分开展示，此项相当于设置礼物区域的高度"),"onUpdate:modelValue":o[10]||(o[10]=o=>e.form.giftPin=o)},null,8,D),[[t.nr,e.form.giftPin,void 0,{number:!0}]])])),_:1},8,["header","footer"]),(0,a.Wm)(E,{header:e.$lang("弹幕延迟"),footer:e.$lang("秒")},{default:(0,a.w5)((()=>[(0,a.wy)((0,a._)("input",{class:"form-control",type:"number",min:"0",step:"1",placeholder:e.$lang("选填，收到弹幕后延迟这么久才会显示"),"onUpdate:modelValue":o[11]||(o[11]=o=>e.form.delay=o)},null,8,O),[[t.nr,e.form.delay,void 0,{number:!0}]])])),_:1},8,["header","footer"]),(0,a.Wm)(E,{header:e.$lang("屏蔽用户"),footer:""},{default:(0,a.w5)((()=>[(0,a.wy)((0,a._)("input",{class:"form-control",type:"text",placeholder:e.$lang("选填，将不显示指定UID用户的弹幕和礼物，用竖杠|分隔"),"onUpdate:modelValue":o[12]||(o[12]=o=>e.form.blockUID=o)},null,8,z),[[t.nr,e.form.blockUID]])])),_:1},8,["header"]),(0,a.Wm)(E,{header:"cors-proxy-url",footer:""},{default:(0,a.w5)((()=>[(0,a.wy)((0,a._)("input",{class:"form-control",type:"text",placeholder:"选填，cors-proxy-url","onUpdate:modelValue":o[13]||(o[13]=o=>e.form.corsProxyUrl=o)},null,512),[[t.nr,e.form.corsProxyUrl]])])),_:1}),(0,a.Wm)(E,{header:"deeplToken",footer:""},{default:(0,a.w5)((()=>[(0,a.wy)((0,a._)("input",{class:"form-control",type:"text",placeholder:"选填，翻译api Token","onUpdate:modelValue":o[14]||(o[14]=o=>e.form.deeplToken=o)},null,512),[[t.nr,e.form.deeplToken]]),(0,a.wy)((0,a._)("input",{class:"form-control",type:"text",placeholder:"选填，翻译api from","onUpdate:modelValue":o[15]||(o[15]=o=>e.form.translateFrom=o)},null,512),[[t.nr,e.form.translateFrom]]),(0,a.wy)((0,a._)("input",{class:"form-control",type:"text",placeholder:"选填，翻译api to","onUpdate:modelValue":o[16]||(o[16]=o=>e.form.translateTo=o)},null,512),[[t.nr,e.form.translateTo]])])),_:1})])])}var V=l(8718),P=l.n(V),T=l(7204),I=l.n(T),C=l(2262);const E={class:"input-group"},L={class:"input-group-addon front"},M={key:0,class:"input-group-addon bl-0"},S={key:1,class:"input-group-addon bl-0"};function B(e,o,l,t,r,n){return(0,a.wg)(),(0,a.iD)("div",E,[(0,a._)("span",L,(0,i.zw)(l.header),1),(0,a.WI)(e.$slots,"default"),l.footer?((0,a.wg)(),(0,a.iD)("span",M,(0,i.zw)(l.footer),1)):e.$slots.footer?((0,a.wg)(),(0,a.iD)("span",S,[(0,a.WI)(e.$slots,"footer")])):(0,a.kq)("",!0)])}var F={props:{header:String,footer:String}},Z=l(3744);const H=(0,Z.Z)(F,[["render",B]]);var q=H,A=l(7247),K=l(6604),Y=l.n(K),G=l(7563);const R={room:"",anchor:"",cors:"false",face:"false",faceExpireDay:"",display:"bottom",stay:"",limit:"",giftComb:"",giftPin:"",delay:"",blockUID:"",debug:"",deeplToken:"",translateFrom:"",corsProxyUrl:"",translateTo:"PT-BR"};Object.freeze(R);const N=["room","anchor","faceExpireDay","stay","giftComb","limit","giftPin","delay"];Object.freeze(N);const Q=new Set(N);Object.freeze(Q);const J={faceExpireDay:7};Object.freeze(J);const X=Y()(R,((e,o)=>Q.has(o)?Number:String));Object.freeze(X);let ee=()=>({cors:[{value:"false",text:(0,n.l3)("关闭（所有跨域请求将依赖 codetabs，限制 5 请求/秒）")},{value:"true",text:(0,n.l3)("开启（请阅读右侧说明）")}],face:[{value:"false",text:(0,n.l3)("不显示")},{value:"gift",text:(0,n.l3)("仅对礼物显示，不需要额外调用 API")},{value:"true",text:(0,n.l3)("显示，通过 Bilibili API 获取（跨域）")},{value:"imjad",text:(0,n.l3)("显示，通过 HibiAPI 获取")}],display:[{value:"bottom",text:(0,n.l3)("自底部")},{value:"top",text:(0,n.l3)("从顶部")}]});var oe=l(9150),le=(0,a.aZ)({methods:{$lang:n.l3},components:{InputGroup:q},setup(){const e=(0,C.qj)({...R,...(0,A.M)("setting",{})});N.forEach((o=>{(0,a.m0)((()=>{"number"===typeof e[o]&&(e[o]=Math.max(Math.floor(e[o]),0))}))}));const o=(0,a.Fl)((()=>P()(I()(Object.entries(e).filter((([e,o])=>{const l=(0,C.SU)(o);return l&&l!==R[e]})).map((([e,o])=>[e,(0,C.SU)(o)]))),Object.keys(R))));(0,a.m0)((()=>{(0,A.y)("setting",o.value)}));const{locale:l}=(0,oe.QT)();let t=(0,C.qj)(ee());const r=e=>{l.value=e,localStorage.setItem("lang",e);let o=ee();for(const l in t)t[l]=o[l]};return{form:e,goLive:()=>window.location.href=`live.html#${(0,G.stringify)(o.value)}`,options:t,changeLang:r}}});const te=(0,Z.Z)(le,[["render",j]]);var re=te;const ne=(0,t.ri)(re);ne.use(r.Z),ne.use(n.ZP),ne.mount("#app")}},o={};function l(t){var r=o[t];if(void 0!==r)return r.exports;var n=o[t]={id:t,loaded:!1,exports:{}};return e[t].call(n.exports,n,n.exports,l),n.loaded=!0,n.exports}l.m=e,function(){var e=[];l.O=function(o,t,r,n){if(!t){var a=1/0;for(s=0;s<e.length;s++){t=e[s][0],r=e[s][1],n=e[s][2];for(var i=!0,u=0;u<t.length;u++)(!1&n||a>=n)&&Object.keys(l.O).every((function(e){return l.O[e](t[u])}))?t.splice(u--,1):(i=!1,n<a&&(a=n));if(i){e.splice(s--,1);var d=r();void 0!==d&&(o=d)}}return o}n=n||0;for(var s=e.length;s>0&&e[s-1][2]>n;s--)e[s]=e[s-1];e[s]=[t,r,n]}}(),function(){l.n=function(e){var o=e&&e.__esModule?function(){return e["default"]}:function(){return e};return l.d(o,{a:o}),o}}(),function(){l.d=function(e,o){for(var t in o)l.o(o,t)&&!l.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:o[t]})}}(),function(){l.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){l.o=function(e,o){return Object.prototype.hasOwnProperty.call(e,o)}}(),function(){l.nmd=function(e){return e.paths=[],e.children||(e.children=[]),e}}(),function(){var e={826:0};l.O.j=function(o){return 0===e[o]};var o=function(o,t){var r,n,a=t[0],i=t[1],u=t[2],d=0;if(a.some((function(o){return 0!==e[o]}))){for(r in i)l.o(i,r)&&(l.m[r]=i[r]);if(u)var s=u(l)}for(o&&o(t);d<a.length;d++)n=a[d],l.o(e,n)&&e[n]&&e[n][0](),e[n]=0;return l.O(s)},t=self["webpackChunkbilibili_live_chat"]=self["webpackChunkbilibili_live_chat"]||[];t.forEach(o.bind(null,0)),t.push=o.bind(null,t.push.bind(t))}();var t=l.O(void 0,[64,586],(function(){return l(1941)}));t=l.O(t)})();