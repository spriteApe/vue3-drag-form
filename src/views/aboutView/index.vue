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
import type { IItemContent, IFormProps, IFormState } from './types'
import componentDictionary from './components/componentDictionary.vue'
import renderForm from './components/renderForm.vue'
import optionConfig from './components/optionConfig.vue'
import { useProvideFormState, useProvideFormProps, useProvideSchemas } from './hooks'
import { getInitFormProps } from './utils'
const formState = reactive<IFormState>({})
const formProps = reactive<IFormProps>(getInitFormProps())
const schemas = ref<IItemContent[]>([])
useProvideFormState(formState)
useProvideFormProps(formProps)
useProvideSchemas(schemas)
</script>
<style lang="scss" scoped></style>
