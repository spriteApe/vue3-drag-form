<template>
  <a-collapse v-model:activeKey="activeKey" ghost>
    <a-collapse-panel key="1" header="表单组件">
      <renderComponentDictionary v-model="formComponentList" />
    </a-collapse-panel>
    <a-collapse-panel key="2" header="非表单组件">
      <renderComponentDictionary v-model="notFormComponentList" />
    </a-collapse-panel>
  </a-collapse>
</template>
<script lang="ts" setup>
import { componentList } from '../constants'
import renderComponentDictionary from './renderComponentDictionary.vue'
const formComponentList = ref(componentList.filter((item) => item.symbols))
const notFormComponentList = ref(componentList.filter((item) => !item.symbols))
const activeKey = ref(['1', '2'])
</script>
<style lang="scss" scoped></style>
