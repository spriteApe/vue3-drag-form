<template>
  <div class="renderTreeCondition">
    <a-select
      ref="select"
      v-model:value="selectValue"
      style="width: 120px"
      :options="conditionSelectOptions"
      placeholder="请选择条件"
      class="flex-shrink-0 z-10"
    >
    </a-select>
    <div class="flex-grow-1 flex-shrink-0" v-if="condition.right">
      <div class="rightItem" v-for="(item, inx) in condition.right" :key="inx">
        <template v-if="item.type === EType.CONDITION">
          <a-select
            v-model:value="item.formId"
            style="width: 120px"
            :options="getOptions(condition.right, item.formId)"
            @change="
              () => {
                item.symbol = undefined
                item.value = undefined
              }
            "
            placeholder="关联表单"
          ></a-select>
          <a-select
            v-if="item.formId"
            v-model:value="item.symbol"
            style="width: 120px"
            class="mx-4"
            :options="getSymbolOptions(item.formId)"
            placeholder="关联关系"
            @change="
              () => {
                item.value = undefined
              }
            "
          ></a-select>
          <div
            class="flex-1"
            v-if="item.symbol && ![ESymbols.EMPTY, ESymbols.NOT_EMPTY].includes(item.symbol!)"
          >
            <dynamicRenderingComponent :item="renderItem(item)!" v-if="renderItem(item)" />
          </div>
          <span class="mx-4 c-red cursor-pointer" @click="delFormStateList(condition.right, inx)">
            删除
          </span>
        </template>
        <template v-else>
          <div class="bg-green/5 relative pb-2">
            <renderTreeCondition :condition="item.conditionGroup!" />
            <span
              class="i-carbon:delete text-xl absolute top-0 right-0 c-red cursor-pointer"
              @click="delFormStateList(condition.right, inx)"
            ></span>
          </div>
        </template>
      </div>
    </div>
  </div>
  <div class="ml-8 mb-4 flex gap-2">
    <a-button @click="addCondition(condition.right!)">新增条件</a-button>
    <a-button @click="addConditionGroup(condition.right!)">新增条件组</a-button>
  </div>
</template>
<script lang="ts" setup>
import type { ICondition, IRight } from './types'
import { ECondition, EType, symbolSelectOptions, ESymbols } from './types'
import { useDragFormStore } from '@/stores/dragForm'
import { useGetItemContent } from '@/views/HomeView/hooks'
import { formComponentList } from '@/views/HomeView/constants'
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

const getSymbolOptions = (formId?: string) => {
  if (!formId) return []
  const thatSchema = dragFormStore.schemas.find((item) => item._id === formId)
  if (!thatSchema) return []
  const thatComponent = formComponentList.find((item) => item.component === thatSchema.component)
  if (!thatComponent?.symbols) return []
  return symbolSelectOptions.filter((item) => thatComponent.symbols!.includes(item.value))
}
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
    .filter((item) => item !== dragFormStore.activeComponent && item.symbols)
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
<style lang="scss" scoped>
.rightItem {
  @apply relative m-4 flex items-center;
  &::before {
    @apply content-[''] absolute top-50% left-0 w-19 h-px bg-gray-2 transform-translate-y--50% transform-translate-x--100%;
  }
}
.renderTreeCondition {
  @apply relative  flex items-center m-4;
  &::before {
    @apply z-2 content-[''] absolute top-0 left-60px  bottom-0 w-px my-32px bg-gray-2;
  }
}
</style>
