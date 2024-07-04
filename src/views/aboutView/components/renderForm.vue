<template>
  <a-form
    :model="formState"
    v-bind="formProps"
    autocomplete="off"
    @finish="onFinish"
    class="p-4 h-full m-auto bg-gray-500/5 overflow-auto"
  >
    <VueDraggable
      class="flex flex-col gap-2 h-full"
      v-model="schemas"
      :animation="150"
      group="people"
      ghostClass="ghost"
    >
      <a-row v-for="item in schemas" :key="item.id">
        <a-col :span="item.span">
          <a-form-item class="bg-gray-500/5" :label="item.title" :name="item.id">
            <component
              :is="item.component"
              :style="item.width ? { width: item.width + 'px' } : {}"
              v-bind="item.componentProps"
              @click="compileConfigList(item)"
            >
              {{ item.slot }}
            </component>
          </a-form-item>
        </a-col>
      </a-row>
    </VueDraggable>
  </a-form>
</template>
<script lang="ts" setup>
import { VueDraggable } from 'vue-draggable-plus'
import { compileConfigList } from '../utils'
import { useInjectFormState, useInjectSchemas, useInjectFormProps } from '../hooks'
const formState = useInjectFormState()
const schemas = useInjectSchemas()
const formProps = useInjectFormProps()
const onFinish = (values: any) => {
  console.log('Success:', values)
}
</script>
<style lang="scss" scoped></style>
