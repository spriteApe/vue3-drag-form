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
  key: string
): T => {
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
}
const handleConfigOptions = (
  configOptions: IConfigOptions,
  obj: Record<string, any>,
  ignoreNull = true
) => {
  const { options, path } = configOptions
  if (get(obj, path) === undefined && ignoreNull) return
  const item = getOption(options as IConfigList, obj, path)
  return handleOn(item)
}
const getOptions = (options: IConfigOptions['options'], renderFormId: string) => {
  const optionsClone = cloneDeep(options)
  return {
    ...optionsClone,
    _id: uuidv4()
  }
}
const getComponent = (optionList: IConfigOptions[], obj: Record<string, any>) => {
  return optionList
    .map((item) => {
      return handleConfigOptions(
        {
          options: getOptions(item.options, obj._id),
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
export const usePreviewSchemas = (schemas: ISchemasRef, formState: IFormState) => {
  const newSchemas = ref<IItemContent[]>([])
  watch(
    schemas,
    (data) => {
      newSchemas.value = data.map((item) => {
        Reflect.deleteProperty(item, 'on') //相关的事件删除 避免影响最外层的formState
        const itemContent = useItemContentByItemContent(item, formState)
        return itemContent
      })
    },
    {
      immediate: true,
      deep: true
    }
  )
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
  itemClone.visible = itemClone.visible ?? true
  itemClone.hideCondition = itemClone.hideCondition ?? {}

  return useGetItemContent(itemClone, formState, { id: uid, _id: uid, span })
}
export const useItemContentByItemContent = (
  item: IItemContent,
  formState: IFormState
): IItemContent => {
  return useGetItemContent(item, formState, { id: item.id, _id: item._id, span: item.span }) //保持原来的id和span
}
