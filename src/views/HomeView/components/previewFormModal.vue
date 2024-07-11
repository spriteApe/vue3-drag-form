<template>
  <a-modal v-model:open="open" title="预览表单" @ok="handleOk" @cancel="handleCancel">
    <renderForm ref="renderFormRef" :isPreview="true" />
  </a-modal>
</template>
<script lang="ts" setup>
import renderForm from './renderForm.vue'
import type { IFormState } from '../types'
import { message } from 'ant-design-vue'

const open = defineModel<boolean>({
  required: true
})
const renderFormRef = ref()
const handleCancel = () => {
  renderFormRef.value!.formRef.resetFields()
  open.value = false
}
const handleOk = () => {
  renderFormRef.value!.formRef.validate().then((res: IFormState) => {
    console.log(res)
    message.success('校验成功')
    handleCancel()
  })
}
</script>
