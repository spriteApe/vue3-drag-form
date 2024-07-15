<template>
  <div>
    <a-button :type="buttonType" @click="open = true">设置隐藏条件</a-button>
    <a-modal v-model:open="open" title="隐藏条件" @ok="handleOk">
      <div class="flex items-center p-4" v-for="(item, index) in formStateList" :key="item.id">
        <a-select
          v-model:value="formStateList[index].id"
          style="width: 120px"
          :options="getOptions(formStateList[index].id)"
          @change="() => (formStateList[index].value = undefined)"
        ></a-select>
        <span class="mx-4">等于</span>
        <dynamicRenderingComponent :item="renderItem(item)!" v-if="renderItem(item)" />
        <span class="mx-4 c-red cursor-pointer" @click="delFormStateList(index)"> 删除 </span>
      </div>
      <a-button @click="addFormStateList">新增一条</a-button>
      <a-button @click="restState">重置隐藏条件</a-button>
    </a-modal>
  </div>
</template>
<script lang="ts" setup>
import { useGetItemContent } from '@/views/HomeView/hooks'
import dynamicRenderingComponent from '@/views/HomeView/components/dynamicRenderingComponent.vue'
import type { ButtonProps } from 'ant-design-vue'
import { useVisibleConfigStore } from '@/stores/visibleConfig'
import { useDragFormStore } from '@/stores/dragForm'
const dragFormStore = useDragFormStore()
const visibleConfigStore = useVisibleConfigStore()
const open = ref<boolean>(false)
const buttonType = computed<ButtonProps['type']>(() =>
  !visibleConfigStore.totalFormState[props.id] ? 'primary' : 'link'
)
const props = defineProps<{ id: string }>()
const formState = visibleConfigStore.getFormState(props.id)
type IFormStateListItem = {
  id?: string
  value?: string | number
}
const getFormStateList = (): IFormStateListItem[] => {
  const res = Object.keys(formState).map((key) => {
    return {
      id: key,
      value: formState[key]
    }
  })
  if (res.length === 0) return [{}]
  return res
}
const formStateList = ref(getFormStateList())
const filterNull = (list: IFormStateListItem[]) => list.filter((item) => item.value !== undefined)
const handleOk = () => {
  open.value = false
  const formStateListFilterNull = filterNull(formStateList.value)
  visibleConfigStore.setFormState(
    props.id,
    formStateListFilterNull.reduce(
      (pre, cur) => {
        if (!cur.id) return pre
        pre[cur.id] = cur.value
        return pre
      },
      {} as Record<string, any>
    )
  )
}
const renderItem = (options: IFormStateListItem) => {
  if (!options.id) return
  const thatComponent = dragFormStore.schemas.find((item) => item.id === options.id)
  if (!thatComponent) return
  const { span } = thatComponent //保持原来的id和span
  Reflect.deleteProperty(thatComponent, 'on') //相关的事件删除 避免影响最外层的formState
  return useGetItemContent(thatComponent, options, { id: options.id, span }, 'value')
}
const restState = () => {
  formStateList.value = [{}]
}
const selectOptions = computed(() =>
  dragFormStore.schemas
    .filter((item) => item !== dragFormStore.activeComponent)
    .map((item) => ({
      value: item.id,
      label: item.title || item.id
    }))
)
const getOptions = (selectId?: string) => {
  let selectIds = formStateList.value.map((item) => item.id).filter(Boolean) as string[]
  selectIds = selectIds.filter((item) => item !== selectId)
  return selectOptions.value.filter((item) => !selectIds.includes(item.value))
}
const addFormStateList = () => {
  formStateList.value.push({})
}
const delFormStateList = (index: number) => {
  formStateList.value.splice(index, 1)
}
</script>
<style lang="scss" scoped></style>
