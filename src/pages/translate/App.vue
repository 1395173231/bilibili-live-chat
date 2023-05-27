<template>
    <div class="translation-page">
        <div class="translation-header">
            <h1 class="translation-title">在线翻译</h1>
        </div>
        <div class="translation-container">
            <el-form :model="form" ref="formRef" label-width="14px" label-position="left" class="translation-form">
                <el-header>
                    <el-row style="width: 100%">
                        <el-col :span="12">
                            <el-form-item>
                                <el-select v-model="form.sourceLanguage" placeholder="请选择">
                                    <el-option v-for="item in languageList" :key="item.value" :label="item.label"
                                               :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item>
                                <el-select v-model="form.targetLanguage" placeholder="请选择">
                                    <el-option v-for="item in languageList" :key="item.value" :label="item.label"
                                               :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-header>
                <el-main>
                    <el-row style="width: 100%">
                        <el-col :span="12">
                            <el-form-item>
                                <el-input type="textarea" :ref="sourceArea"
                                          :autosize="{ minRows: 3, maxRows: 15 }" :rows="3"
                                          v-model="form.sourceText" ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item>
                                <el-input type="textarea" :ref="targetArea"
                                          :autosize="{ minRows: 3, maxRows: 15 }" :rows="3" v-model="form.targetText"
                                          readonly ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-main>
            </el-form>
            <div class="translation-form-footer">
                <el-button type="primary" @click="submitForm">翻译</el-button>
                <el-button @click="resetForm">重置</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import {defineComponent, reactive, ref, toRefs, watch} from 'vue'
import {ElSelect, ElOption, ElForm, ElFormItem, ElInput, ElButton} from 'element-plus'

export default defineComponent({
    components: {
        [ElSelect.name]: ElSelect,
        [ElOption.name]: ElOption,
        [ElForm.name]: ElForm,
        [ElFormItem.name]: ElFormItem,
        [ElInput.name]: ElInput,
        [ElButton.name]: ElButton
    },
    props: {
        areaHeight: {
            type: String,
            default: "auto"
        }
    },
    setup(props) {
        const form = reactive({
            sourceLanguage: 'zh',
            targetLanguage: 'en',
            sourceText: '',
            targetText: ''
        })

        const languageList = [
            {value: 'en', label: '英语'},
            {value: 'zh', label: '中文'},
            {value: 'fr', label: '法语'},
            {value: 'de', label: '德语'}
        ]

        const formRef = ref(null) // 引用表单
        const sourceArea = ref(null)
        const targetArea = ref(null)
        const submitForm = () => {
            // 发送翻译请求
            // 此处省略具体实现
            // 假设翻译后的文本为translatedText
            const translatedText = '翻译后的文本'
            form.targetText = translatedText
        }

        watch(form.sourceText, (newVal, oldVal) => {
            targetArea.value.textareaStyle = {
                height: sourceArea.value.textareaStyle.height
            }
        })
        const resetForm = () => {
            form.sourceLanguage = '123'
            form.targetLanguage = '123'
            form.sourceText = ''
            form.targetText = ''
            // 重置表单验证状态
            formRef.value.resetFields()
        }

        return {
            form,
            ...toRefs(props),
            languageList,
            submitForm,
            resetForm,
            sourceArea,
            targetArea,
            formRef // 暴露表单引用
        }
    }
})
</script>


<style>
.el-textarea__inner {
    resize: none !important;
}
</style>

<style scoped>



.el-header {
    width: 100%;
    height: auto;
    display: flex;
}

.el-main {
    width: 100%;
    display: flex;
}

.el-form-item {
    margin-bottom: 0;
}

.translation-page {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

/*.translation-header {*/
/*    margin-bottom: 30px;*/
/*}*/
.translation-title {
    font-size: 36px;
    font-weight: bold;
}

.translation-container {
    width: 75%;
    height: auto;
    padding: 15px 30px 30px 30px;
    border: 1px solid #ccc;
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
}

.translation-form {
    display: flex;
    flex-direction: column;
    width: 100%;
}

.translation-form-left {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
}

.translation-form-right {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
}

.translation-container {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.translation-header {
    font-size: 24px;
    font-weight: bold;
    margin-top: 20px;
    margin-bottom: 20px;
}

.translation-content {
    width: 600px;
}

.translation-form {
    margin-top: 20px;
}


.translation-form-footer {
    display: flex;
    justify-content: center;
    flex-shrink: 0;
    margin-top: 20px;
}

</style>