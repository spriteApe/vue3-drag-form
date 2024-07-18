<template>
  <div>
    <a-table :columns="columns" :data-source="dataSource" :pagination="false">
      <template #bodyCell="{ column, index }">
        <template v-if="column.key === 'label' || column.key === 'value'">
          <a-input v-model:value="dataSource[index][column.key as keyof IDataSource[number]]" />
        </template>
        <template v-else-if="column.key === 'action'">
          <a-button type="link" @click="handleDelete(index)">删除</a-button>
        </template>
      </template>
    </a-table>
    <a-button type="primary" @click="handleAdd">添加一项</a-button>
  </div>
</template>
<script lang="ts" setup>
const columns = [
  {
    title: 'label',
    key: 'label'
  },
  {
    title: 'value',
    key: 'value'
  },

  {
    title: '操作',
    key: 'action'
  }
]
type IDataSource = {
  value: string
  label: string
}[]
const dataSource = defineModel<IDataSource>('value', {
  required: true
})
const handleDelete = (index: number) => {
  dataSource.value = dataSource.value.filter((_, i) => i !== index)
}
const handleAdd = () => {
  dataSource.value.push({
    value: '',
    label: ''
  })
}
</script>

<style lang="scss" scoped></style>
