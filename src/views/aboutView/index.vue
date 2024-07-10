<template>
  <div class="flex h-screen">
    <div class="left">
      <componentDictionary />
    </div>
    <div class="right flex-1 flex flex-col">
      <div class="edit p-2">
        <a-button type="primary" @click="previewFormModalVisible = true">预览</a-button>
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
  useProvideActiveComponent
} from './hooks'
import { getInitFormProps } from './utils'
const formState = reactive<IFormState>({})
const formProps = reactive<IFormProps>(getInitFormProps())
const schemas = ref<IItemContent[]>([])
const activeComponent = ref<IActiveComponent>(null)
useProvideFormState(formState)
useProvideFormProps(formProps)
useProvideSchemas(schemas)
useProvideActiveComponent(activeComponent)

const previewFormModalVisible = ref(false)
</script>
<style lang="scss" scoped></style>
