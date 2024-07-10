<template>
  <a-tabs v-model:activeKey="activeKey">
    <a-tab-pane key="1" tab="表单">
      <div v-for="item in formConfigList" :key="item.id">
        {{ item.title }}: <dynamicRenderingComponent :item /></div
    ></a-tab-pane>
    <a-tab-pane key="2" tab="组件">
      <div v-for="item in configList" :key="item.id">
        {{ item.title }}:
        <dynamicRenderingComponent :item />
      </div>
    </a-tab-pane>
  </a-tabs>
</template>
<script lang="ts" setup>
import { useCompileFormConfigList, useInjectFormProps, useCompileConfigList } from '../hooks'
import { emitter } from '../mitt'
import dynamicRenderingComponent from './dynamicRenderingComponent.vue'
const activeKey = ref('1')
const formProps = useInjectFormProps()
const formConfigList = useCompileFormConfigList(formProps)
const { configList, updateConfigList } = useCompileConfigList()
emitter.on('update:configList', (res) => {
  updateConfigList(res)
  activeKey.value = '2'
})
</script>
<style lang="scss" scoped></style>
