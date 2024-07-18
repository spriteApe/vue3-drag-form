<template>
  <div>
    <a-button type="primary" :danger="buttonDanger" @click="open = true">设置隐藏条件</a-button>
    <a-modal v-model:open="open" title="隐藏条件" @ok="handleOk" :width="800">
      <div class="h-140 overflow-auto">
        <renderTreeCondition :condition="conditionCloned" />
        <a-button @click="restState" danger>重置隐藏条件</a-button>
      </div>
    </a-modal>
  </div>
</template>
<script lang="ts" setup>
import { cloneDeep, isEmpty } from 'lodash-es'
import renderTreeCondition from './renderTreeCondition.vue'
import type { ICondition, IRight } from './types'
import { EType, ESymbols } from './types'
import { getVisibleConfig } from './utils'
const conditionList = defineModel<ICondition>('value', {
  required: true
})

const getConditionList = (): ICondition => {
  const res = cloneDeep(conditionList.value)
  if (!res || isEmpty(res)) return getVisibleConfig()
  return res
}
const conditionCloned = ref(getConditionList())
const open = ref<boolean>(false)
watch(open, (val) => {
  if (!val) return
  conditionCloned.value = getConditionList()
})
const buttonDanger = computed(() => !isEmpty(conditionList.value))
const filterRight = (rightList: IRight[]): IRight[] => {
  return rightList.filter((right) => {
    if (right.type === EType['CONDITION']) {
      return (
        right.formId &&
        right.symbol &&
        ([ESymbols['EMPTY'], ESymbols['NOT_EMPTY']].includes(right.symbol) || right.value)
      )
    } else {
      return !isEmpty(filterNull(right.conditionGroup))
    }
  })
}
const filterNull = (condition?: ICondition): ICondition => {
  if (!condition?.right?.length) return {}
  condition.right = filterRight(condition.right)
  if (!condition.right.length) return {}
  return condition
}
const handleOk = () => {
  open.value = false
  const formStateListFilterNull = filterNull(conditionCloned.value)
  conditionList.value = formStateListFilterNull
}
const restState = () => {
  conditionCloned.value = getVisibleConfig()
}
</script>
<style lang="scss" scoped></style>
