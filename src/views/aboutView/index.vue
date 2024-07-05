<template>
  <div class="flex h-screen">
    <div class="left">
      <componentDictionary />
    </div>
    <div class="right flex-1">
      <renderForm />
    </div>
    <div class="config w-60 p-4 h-full overflow-auto">
      <optionConfig />
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { IItemContent, IFormProps, IFormState, IActiveComponent } from './types'
import componentDictionary from './components/componentDictionary.vue'
import renderForm from './components/renderForm.vue'
import optionConfig from './components/optionConfig.vue'
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
</script>
<style lang="scss" scoped></style>
