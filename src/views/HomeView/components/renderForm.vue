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
            <a-form-item :label="item.title" :name="item.symbols ? item._id : null">
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
import type { IItemContent, IFormState } from '../types'
import type { IRight, ICondition } from '@/components/visibleConfig/types'
import { ECondition, ESymbols, EType } from '@/components/visibleConfig/types'
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
const getSchemas = (schemas: IItemContent[], formState: IFormState) => {
  if (isEmpty(formState)) return schemas
  return schemas.filter((item) => !matchCondition(formState, item.hideCondition))
}

const matchCondition = (formState: Record<string, any>, condition?: ICondition): boolean => {
  // Helper function to match individual conditions
  const matchSingleCondition = (right: IRight): boolean => {
    if (right.type === EType['CONDITION_GROUP']) {
      return matchCondition(formState, right.conditionGroup)
    }
    if (!right.formId) return false
    const formValue = formState[right.formId]

    switch (right.symbol) {
      case ESymbols.EQUAL:
        return formValue === right.value
      case ESymbols.NOT_EQUAL:
        return formValue !== right.value
      case ESymbols.GREATER_THAN:
        return formValue > right.value
      case ESymbols.GREATER_THAN_EQUAL:
        return formValue >= right.value
      case ESymbols.LESS_THAN:
        return formValue < right.value
      case ESymbols.LESS_THAN_EQUAL:
        return formValue <= right.value
      case ESymbols.CONTAIN:
        return formValue.includes(right.value)
      case ESymbols.NOT_CONTAIN:
        return !formValue.includes(right.value)
      case ESymbols.EMPTY:
        return isEmpty(formValue)
      case ESymbols.NOT_EMPTY:
        return !isEmpty(formValue)
      default:
        return false
    }
  }
  if (isEmpty(condition)) return false

  // Check all right conditions
  if (condition.left === ECondition.AND) {
    return condition.right!.every(matchSingleCondition)
  } else {
    return condition.right!.some(matchSingleCondition)
  }
}
const showSchemas = computed({
  get() {
    return getSchemas(schemas.value, currentFormState)
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
