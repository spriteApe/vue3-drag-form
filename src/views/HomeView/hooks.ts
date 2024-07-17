import { handleOn, getModelKey } from './utils'
import { v4 as uuidv4 } from 'uuid'
import { formConfigOptions, componentConfigOptions } from './constants'
import { cloneDeep, get } from 'lodash-es'
import type {
  IConfigList,
  IFormProps,
  IFormState,
  IItemContent,
  IItem,
  IConfigOptions,
  IItemContentOther
} from './types'
import type { Ref } from 'vue'

function toNestedRef(obj: Record<string, any>, path: string) {
  const keys = path.split('.')
  if (keys.length === 1) {
    return toRef(obj, path)
  }
  const lastKey = keys.pop()!
  const parent = keys.reduce((acc, key) => acc[key], obj)
  const nestedRef = ref(parent[lastKey])
  watch(nestedRef, (newValue) => {
    parent[lastKey] = newValue
  })
  watch(
    () => parent[lastKey],
    (newValue) => {
      nestedRef.value = newValue
    }
  )
  return nestedRef
}
const getOption = <T extends IConfigList = IConfigList>(
  option: T,
  obj: Record<string, any>,
  key: string | string[]
): T => {
  if (typeof key === 'string') {
    const dataRef = toNestedRef(obj, key)
    const { component, componentProps = {}, on = {} } = option
    const modelKey = getModelKey(component)
    const updateModelKey = 'update:' + modelKey
    return {
      ...option,
      componentProps: {
        ...componentProps,
        [modelKey]: dataRef
      },
      on: {
        ...on,
        [updateModelKey]: (val: number | string) => {
          dataRef.value = val
          if (option.on?.[updateModelKey]) {
            option.on[updateModelKey](val)
          }
        }
      }
    }
  } else {
    const result = cloneDeep(option)
    key.forEach((item) => {
      const dataRef = toNestedRef(obj, item)
      const modelKey = item.split('.').pop()!
      const updateModelKey = 'update:' + modelKey
      if (!result.componentProps) {
        result.componentProps = {}
      }
      result.componentProps[modelKey] = dataRef
      if (!result.on) {
        result.on = {}
      }
      result.on[updateModelKey] = (val: number | string) => {
        dataRef.value = val
        if (option.on?.[updateModelKey]) {
          option.on[updateModelKey](val)
        }
      }
    })
    return result
  }
}
const handleConfigOptions = (
  configOptions: IConfigOptions,
  obj: Record<string, any>,
  ignoreNull = true
) => {
  const { options, path } = configOptions
  if (!options.symbols && !ignoreNull) return options
  if (typeof path === 'string') {
    if (get(obj, path) === undefined && ignoreNull) return
  } else {
    for (const item of path) {
      if (get(obj, item) === undefined && ignoreNull) return
    }
  }
  const item = getOption(options as IConfigList, obj, path)
  return handleOn(item)
}
const getComponent = (optionList: IConfigOptions[], obj: Record<string, any>) => {
  return optionList
    .map((item) => {
      return handleConfigOptions(
        {
          options: {
            ...item.options,
            _id: uuidv4()
          },
          path: item.path
        },
        obj
      )
    })
    .filter(Boolean) as IConfigList[]
}
export const useCompileFormConfigList = (formProps: IFormProps) => {
  return ref(getComponent(formConfigOptions, formProps))
}

export const useCompileConfigList = () => {
  const configList = ref<IConfigList[]>([])

  const updateConfigList = (item?: IItemContent) => {
    if (!item) {
      configList.value = []
      return
    }
    configList.value = getComponent(componentConfigOptions, item)
  }
  return {
    configList,
    updateConfigList
  }
}
type ISchemasRef = Ref<IItemContent[]>
export const usePreviewSchemas = (
  schemas: ISchemasRef,
  formState: IFormState,
  previewFormModalVisible: Ref<boolean>
) => {
  const newSchemas = ref<IItemContent[]>([])
  watch(previewFormModalVisible, (val) => {
    if (!val) return
    newSchemas.value = schemas.value.map((item) => {
      Reflect.deleteProperty(item, 'on') //相关的事件删除 避免影响最外层的formState
      const itemContent = handleConfigOptions({ options: item, path: item._id }, formState, false)
      return itemContent as IItemContent
    })
  })
  return newSchemas
}

export const useGetItemContent = (
  item: IItem,
  formState: IFormState,
  option: IItemContentOther,
  path = option._id
): IItemContent => {
  const itemClone = cloneDeep(item)
  const configOptions = {
    options: {
      ...itemClone,
      ...option
    },
    path
  }
  return reactive(handleConfigOptions(configOptions, formState, false) as IItemContent)
}

export const useItemContent = (item: IItem, formState: IFormState, span = 24): IItemContent => {
  const uid = uuidv4()
  const itemClone = cloneDeep(item)
  // 默认值
  itemClone.required = itemClone.required ?? false
  itemClone.hideCondition = itemClone.hideCondition ?? {}
  itemClone.message = itemClone.message ?? ''

  return useGetItemContent(itemClone, formState, { id: uid, _id: uid, span })
}
export const useItemContentByItemContent = (
  item: IItemContent,
  formState: IFormState
): IItemContent => {
  return useGetItemContent(item, formState, { id: item.id, _id: item._id, span: item.span }) //保持原来的id和span
}
