<template>
  <a-tabs v-model:activeKey="activeKey">
    <a-tab-pane key="1" tab="表单">
      <div v-for="item in formConfigList" :key="item._id">
        {{ item.title }}: <dynamicRenderingComponent :item /></div
    ></a-tab-pane>
    <a-tab-pane key="2" tab="组件">
      <div v-for="item in configList" :key="item._id">
        {{ item.title }}:
        <dynamicRenderingComponent :item />
      </div>
    </a-tab-pane>
  </a-tabs>
</template>
<script lang="ts" setup>
import { useCompileFormConfigList, useCompileConfigList } from '../hooks'
import dynamicRenderingComponent from './dynamicRenderingComponent.vue'
import { useDragFormStore } from '@/stores/dragForm'
const dragFormStore = useDragFormStore()
const activeKey = ref('1')
const formConfigList = useCompileFormConfigList(dragFormStore.formProps)
const { configList, updateConfigList } = useCompileConfigList()
watch(
  () => dragFormStore.activeComponent,
  (res) => {
    updateConfigList(res ?? undefined)
    activeKey.value = res ? '2' : '1'
  }
)
</script>
<style lang="scss" scoped></style>
