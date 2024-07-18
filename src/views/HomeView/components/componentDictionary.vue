<template>
  <a-collapse v-model:activeKey="activeKey" ghost>
    <a-collapse-panel key="1" header="表单组件">
      <renderComponentDictionary v-model="formComponentListRef" />
    </a-collapse-panel>
    <a-collapse-panel key="2" header="非表单组件">
      <renderComponentDictionary v-model="notFormComponentListRef" />
    </a-collapse-panel>
  </a-collapse>
</template>
<script lang="ts" setup>
import { formComponentList, notFormComponentList } from '../constants'
import renderComponentDictionary from './renderComponentDictionary.vue'
const formComponentListRef = ref(formComponentList)
const notFormComponentListRef = ref(notFormComponentList)
const activeKey = ref(['1', '2'])
</script>
<style lang="scss" scoped></style>
