<template>
  <a-modal v-model:open="open" title="预览表单" @ok="handleOk" @cancel="handleCancel">
    <renderForm ref="renderFormRef" />
  </a-modal>
</template>
<script lang="ts" setup>
import renderForm from './renderForm.vue'
import type { IFormState } from '../types'
import { useProvideFormState, useProvidePreview } from '../hooks'
// const formState = reactive<IFormState>({})
// useProvideFormState(formState)
useProvidePreview(true)
const open = defineModel<boolean>({
  required: true
})
const renderFormRef = ref()
const handleOk = () => {
  renderFormRef.value!.formRef.validate().then((res: IFormState) => {
    console.log(res)
    open.value = false
  })
}
const handleCancel = () => {
  renderFormRef.value!.formRef.resetFields()
}
</script>
