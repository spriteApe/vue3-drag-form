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
      <editComponent v-for="item in schemas" :key="item.id" :item>
        <a-row>
          <a-col :span="item.span">
            <a-form-item class="bg-gray-500/5" :label="item.title" :name="item.id">
              <component
                :is="item.component"
                :style="item.width ? { width: item.width + 'px' } : {}"
                v-bind="item.componentProps"
              >
                {{ item.slot }}
              </component>
            </a-form-item>
          </a-col>
        </a-row>
      </editComponent>
    </VueDraggable>
  </a-form>
</template>
<script lang="ts" setup>
import { VueDraggable } from 'vue-draggable-plus'
import { useInjectFormState, useInjectSchemas, useInjectFormProps } from '../hooks'
import editComponent from './editComponent.vue'
const formState = useInjectFormState()
const schemas = useInjectSchemas()
const formProps = useInjectFormProps()
const onFinish = (values: any) => {
  console.log('Success:', values)
}
</script>
<style lang="scss" scoped></style>
