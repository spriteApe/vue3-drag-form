<template>
  <div class="flex h-screen">
    <div class="left">
      <componentDictionary />
    </div>
    <div class="right flex-1 flex flex-col">
      <div class="edit p-2">
        <a-button type="primary" @click="previewFormModalVisible = true">预览</a-button>
        <a-button type="primary" @click="handleExport">导出</a-button>
        <a-button type="primary" @click="handleImport">导入</a-button>
        <previewFormModal v-model="previewFormModalVisible" />
      </div>
      <div class="flex-1 h-0">
        <renderForm />
      </div>
    </div>
    <div class="config w-100 p-4 h-full overflow-auto">
      <optionConfig />
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { IItemContent, IFormProps, IFormState, IActiveComponent } from './types'
import componentDictionary from './components/componentDictionary.vue'
import renderForm from './components/renderForm.vue'
import optionConfig from './components/optionConfig.vue'
import previewFormModal from './components/previewFormModal.vue'
import {
  useProvideFormState,
  useProvideFormProps,
  useProvideSchemas,
  useProvideActiveComponent,
  useItemContentByItemContent
} from './hooks'
import { getInitFormProps, getModelKey, uploadJson, downloadJson } from './utils'
import { cloneDeep } from 'lodash-es'
const formState = reactive<IFormState>({})
const formProps = reactive<IFormProps>(getInitFormProps())
const schemas = ref<IItemContent[]>([])
const activeComponent = ref<IActiveComponent>(null)
useProvideFormState(formState)
useProvideFormProps(formProps)
useProvideSchemas(schemas)
useProvideActiveComponent(activeComponent)

const previewFormModalVisible = ref(false)

const handleExport = () => {
  const schemasClone = cloneDeep(schemas.value)
  const result = schemasClone.map((item) => {
    const modelKey = getModelKey(item.component)
    const updateModelKey = 'onUpdate:' + modelKey
    Reflect.deleteProperty(item.componentProps!, modelKey)
    Reflect.deleteProperty(item.componentProps!, updateModelKey)
    return item
  })
  const formPropsClone = {
    ...cloneDeep(formProps),
    schemas: result
  }
  downloadJson(formPropsClone)
}

const handleImport = () => {
  uploadJson().then((res) => {
    const {
      schemas: schemasJson,
      labelCol: { span: labelColSpan },
      wrapperCol: { span: wrapperColSpan },
      layout
    } = res
    Reflect.deleteProperty(res, 'schemas')
    // Object.assign(formProps, res) //不能这样,会导致响应式丢失
    formProps.labelCol.span = labelColSpan
    formProps.wrapperCol.span = wrapperColSpan
    formProps.layout = layout
    const result = schemasJson.map((options) => {
      return useItemContentByItemContent(options, formState)
    })
    schemas.value = result
  })
}
</script>
<style lang="scss" scoped></style>
