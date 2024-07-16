<template>
  <a-form
    :model="currentFormState"
    v-bind="dragFormStore.formProps"
    :rules="formRules"
    :name="formName"
    ref="formRef"
    autocomplete="off"
    @finish="onFinish"
    class="p-4 h-full m-auto bg-gray-500/5 overflow-auto"
  >
    <a-row>
      <VueDraggable
        v-model="showSchemas"
        :animation="150"
        group="people"
        :disabled="isPreview"
        ghostClass="ghost"
        class="w-full flex flex-wrap"
      >
        <a-col :span="item.span" v-for="item in showSchemas" :key="item._id">
          <editComponent :item :isPreview>
            <a-form-item :label="item.title" :name="item._id">
              <dynamicRenderingComponent :item />
            </a-form-item>
          </editComponent>
        </a-col>
      </VueDraggable>
    </a-row>
  </a-form>
</template>
<script lang="ts" setup>
import { VueDraggable } from 'vue-draggable-plus'
import dynamicRenderingComponent from './dynamicRenderingComponent.vue'
import editComponent from './editComponent.vue'
import type { Rule } from 'ant-design-vue/es/form'
import type { FormInstance } from 'ant-design-vue'
import { v4 as uuidv4 } from 'uuid'
import { useDragFormStore } from '@/stores/dragForm'
import { isEmpty } from 'lodash-es'
import type { IItemContent } from '../types'
const dragFormStore = useDragFormStore()
const props = withDefaults(
  defineProps<{
    isPreview?: boolean
  }>(),
  {
    isPreview: false
  }
)
const { formState: currentFormState, schemas } = dragFormStore.renderComponentGetData(
  props.isPreview
)
const getIndex = (array1: IItemContent[], array2: IItemContent[], id: string) => {
  const array1Index = array1.findIndex((item) => item._id === id)
  if (array1Index !== -1) return array1Index
  return array2.findIndex((item) => item._id === id) // 隐藏的表单保持原来的位置
}
const showSchemas = computed({
  get() {
    return schemas.value.filter((item) => {
      if (!item.hideCondition || isEmpty(item.hideCondition)) return true
      const hidden = Object.keys(item.hideCondition).every((key) => {
        return item.hideCondition![key] === currentFormState[key]
      })
      return !hidden
    })
  },
  set(value) {
    schemas.value.sort((a, b) => {
      const aIndex = getIndex(value, schemas.value, a._id)
      const bIndex = getIndex(value, schemas.value, b._id)
      return aIndex - bIndex
    })
  }
})
const onFinish = (values: any) => {
  console.log('Success:', values)
}
const formRef = ref<FormInstance>()
defineExpose({
  formRef: formRef
})
const formName = 'formName' + uuidv4()
const formRules = computed(() => {
  return schemas.value.reduce(
    (pre, cur) => {
      if (!cur.required) return pre
      const message = cur.message || cur.componentProps?.placeholder || '请完善' + cur.title

      pre[cur._id] = [{ message, required: cur.required, trigger: 'change' }]
      return pre
    },
    {} as Record<string, Rule[]>
  )
})
</script>
<style lang="scss" scoped></style>
