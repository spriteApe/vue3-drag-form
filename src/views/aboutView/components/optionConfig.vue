<template>
  <a-tabs v-model:activeKey="activeKey">
    <a-tab-pane key="1" tab="表单">
      <div v-for="item in formConfigList" :key="item.id">
        {{ item.title }}: <component :is="item.component" v-bind="item.componentProps" /></div
    ></a-tab-pane>
    <a-tab-pane key="2" tab="组件">
      <div v-for="item in configList" :key="item.id">
        {{ item.title }}:
        <component :is="item.component" v-bind="item.componentProps" />
      </div>
    </a-tab-pane>
  </a-tabs>
</template>
<script lang="ts" setup>
import { compileConfigList } from '../utils'
import { useCompileFormConfigList, useInjectFormProps } from '../hooks'
import type { IConfigList } from '../types'
import { emitter } from '../mitt'
const activeKey = ref('1')
const formProps = useInjectFormProps()
const formConfigList = useCompileFormConfigList(formProps)
const configList = ref<IConfigList[]>([])
emitter.on('update:configList', (res) => {
  configList.value = compileConfigList(res) as IConfigList[]
  activeKey.value = '2'
})
</script>
<style lang="scss" scoped></style>
