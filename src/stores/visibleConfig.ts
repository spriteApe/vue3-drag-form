import { cloneDeep, isEmpty } from 'lodash-es'
import type { IFormState } from '@/views/HomeView/types'

export const useVisibleConfigStore = defineStore('visibleConfig', () => {
  const totalFormState = reactive<Record<string, IFormState>>({})
  function setFormState(id: string, formStateList: IFormState) {
    if (isEmpty(formStateList)) {
      Reflect.deleteProperty(totalFormState, id)
      return
    }
    totalFormState[id] = formStateList
  }
  function getFormState(id: string) {
    return cloneDeep(totalFormState[id] ?? {})
  }

  return { totalFormState, setFormState, getFormState }
})
