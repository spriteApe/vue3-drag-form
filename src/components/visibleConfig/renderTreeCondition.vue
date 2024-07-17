<template>
  <div class="flex items-center p-4">
    <a-select
      ref="select"
      v-model:value="selectValue"
      style="width: 120px"
      :options="conditionSelectOptions"
      placeholder="请选择条件"
    >
    </a-select>
    <div class="flex-1" v-if="condition.right">
      <div class="flex items-center p-4" v-for="(item, inx) in condition.right" :key="inx">
        <template v-if="item.type === EType.CONDITION">
          <a-select
            v-model:value="item.formId"
            style="width: 120px"
            :options="getOptions(condition.right, item.formId)"
            @change="() => (item.value = undefined)"
            placeholder="关联表单"
          ></a-select>
          <a-select
            v-model:value="item.symbol"
            style="width: 120px"
            class="mx-4"
            :options="symbolSelectOptions"
            placeholder="关联关系"
          ></a-select>
          <div class="flex-1">
            <dynamicRenderingComponent :item="renderItem(item)!" v-if="renderItem(item)" />
          </div>
          <span class="mx-4 c-red cursor-pointer" @click="delFormStateList(condition.right, inx)">
            删除
          </span>
        </template>
        <template v-else>
          <renderTreeCondition :condition="item.conditionGroup!" />
        </template>
      </div>
      <a-button @click="addCondition(condition.right)">新增条件</a-button>
      <a-button @click="addConditionGroup(condition.right)">新增条件组</a-button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { ICondition, IRight } from './types'
import { ECondition, EType, ESymbol } from './types'
import { useDragFormStore } from '@/stores/dragForm'
import { useGetItemContent } from '@/views/HomeView/hooks'
import dynamicRenderingComponent from '@/views/HomeView/components/dynamicRenderingComponent.vue'
import { getCondition, getConditionGroup } from './utils'
const dragFormStore = useDragFormStore()
defineOptions({ name: 'renderTreeCondition' })
const conditionSelectOptions = [
  {
    label: 'AND',
    value: ECondition['AND']
  },
  {
    label: 'OR',
    value: ECondition['OR']
  }
]

const symbolSelectOptions = [
  {
    label: '等于',
    value: ESymbol['EQUAL_TO']
  },
  {
    label: '不等于',
    value: ESymbol['NOT_EQUAL_TO']
  }
]

const props = defineProps<{
  condition: ICondition
}>()
const selectValue = toRef(props.condition, 'left')
const renderItem = (options: IRight) => {
  if (!options.formId) return
  const thatComponent = dragFormStore.schemas.find((item) => item._id === options.formId)
  if (!thatComponent) return
  const { span } = thatComponent //保持原来的id和span
  Reflect.deleteProperty(thatComponent, 'on') //相关的事件删除 避免影响最外层的formState
  return useGetItemContent(
    thatComponent,
    options,
    { id: options.formId, _id: options.formId, span },
    'value'
  )
}
const getOptions = (list: IRight[], selectId?: string) => {
  let selectIds = list.map((item) => item.formId).filter(Boolean) as string[]
  selectIds = selectIds.filter((item) => item !== selectId)
  return selectOptions.value.filter((item) => !selectIds.includes(item.value))
}

const selectOptions = computed(() =>
  dragFormStore.schemas
    .filter((item) => item !== dragFormStore.activeComponent)
    .map((item) => ({
      value: item._id,
      label: item.title || item._id
    }))
)

const addCondition = (array: IRight[]) => {
  array.push(getCondition())
}
const addConditionGroup = (array: IRight[]) => {
  array.push(getConditionGroup())
}
const delFormStateList = (array: IRight[], index: number) => {
  array.splice(index, 1)
}
</script>
<style lang="scss" scoped></style>
