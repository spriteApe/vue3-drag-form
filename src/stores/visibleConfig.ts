import { cloneDeep, isEmpty } from 'lodash-es'
import type { IFormState } from '@/views/HomeView/types'

export const useVisibleConfigStore = defineStore('visibleConfig', () => {
  const totalFormState = reactive<Record<string, IFormState>>({})
  function setFormState(key: string, formStateList: IFormState) {
    if (isEmpty(formStateList)) {
      Reflect.deleteProperty(totalFormState, key)
      return
    }
    totalFormState[key] = formStateList
  }
  function getFormState(key: string) {
    return cloneDeep(totalFormState[key] ?? {})
  }

  return { totalFormState, setFormState, getFormState }
})
