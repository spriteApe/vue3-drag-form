<template>
  <div class="flex h-screen">
    <div class="left">
      <componentDictionary />
    </div>
    <div class="right flex-1 flex flex-col">
      <div class="edit flex p-2 gap-2">
        <a-button type="primary" @click="dragFormStore.previewFormModalVisible = true"
          >预览</a-button
        >
        <previewFormModal v-model="dragFormStore.previewFormModalVisible" />
        <a-button type="primary" @click="handleExport">导出</a-button>
        <a-button type="primary" @click="handleImport">导入</a-button>
        <a-popconfirm
          title="清空后将不能恢复，确定要清空吗？"
          ok-text="清空"
          cancel-text="取消"
          @confirm="handleClear"
        >
          <a-button type="primary" danger>清空</a-button>
        </a-popconfirm>
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
import componentDictionary from './components/componentDictionary.vue'
import renderForm from './components/renderForm.vue'
import optionConfig from './components/optionConfig.vue'
import previewFormModal from './components/previewFormModal.vue'
import { getModelKey, uploadJson, downloadJson } from './utils'
import { cloneDeep } from 'lodash-es'
import { useDragFormStore } from '@/stores/dragForm'
const dragFormStore = useDragFormStore()

const handleExport = () => {
  const schemasClone = cloneDeep(dragFormStore.schemas)
  const result = schemasClone.map((item) => {
    const modelKey = getModelKey(item.component)
    const updateModelKey = 'onUpdate:' + modelKey
    Reflect.deleteProperty(item.componentProps!, modelKey)
    Reflect.deleteProperty(item.componentProps!, updateModelKey)
    return item
  })
  const formPropsClone = {
    ...cloneDeep(dragFormStore.formProps),
    schemas: result
  }
  downloadJson(formPropsClone)
}

const handleImport = () => {
  uploadJson().then(dragFormStore.restByImport)
}
const handleClear = () => {
  dragFormStore.restByImport({
    ...dragFormStore.formProps,
    schemas: []
  })
}
</script>
<style lang="scss" scoped></style>
