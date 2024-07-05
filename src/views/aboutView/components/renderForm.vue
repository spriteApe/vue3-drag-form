<template>
  <a-form
    :model="formState"
    v-bind="formProps"
    autocomplete="off"
    @finish="onFinish"
    class="p-4 h-full m-auto bg-gray-500/5 overflow-auto"
  >
    <a-row>
      <VueDraggable
        v-model="schemas"
        :animation="150"
        group="people"
        ghostClass="ghost"
        class="w-full flex flex-wrap"
      >
        <a-col :span="item.span" v-for="item in schemas" :key="item.id">
          <editComponent :item>
            <a-form-item class="bg-gray-500/5" :label="item.title" :name="item.id">
              <component
                :is="item.component"
                :style="item.width ? { width: item.width + 'px' } : {}"
                v-bind="item.componentProps"
              >
                {{ item.slot }}
              </component>
            </a-form-item>
          </editComponent>
        </a-col>
      </VueDraggable>
    </a-row>
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
