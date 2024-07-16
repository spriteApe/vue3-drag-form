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
const showSchemas = computed(() => {
  return schemas.value.filter((item) => {
    if (!item.hideCondition || isEmpty(item.hideCondition)) return true
    const hidden = Object.keys(item.hideCondition).every((key) => {
      return item.hideCondition![key] === currentFormState[key]
    })
    return !hidden
  })
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
