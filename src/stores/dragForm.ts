import { getInitFormProps } from '@/views/HomeView/utils'
import type { IItemContent, IFormProps, IFormState, IActiveComponent } from '@/views/HomeView/types'
import { usePreviewSchemas } from '@/views/HomeView/hooks'
export const useDragFormStore = defineStore('dragForm', () => {
  const formState = reactive<IFormState>({})
  const formProps = reactive<IFormProps>(getInitFormProps())
  const schemas = ref<IItemContent[]>([])
  const activeComponent = ref<IActiveComponent>(null)

  const formStatePreview = reactive<IFormState>({})
  const newSchemas = usePreviewSchemas(schemas, formStatePreview)

  const renderComponentGetData = (isPreview: boolean) =>
    isPreview
      ? {
          formState: formStatePreview,
          schemas: newSchemas
        }
      : { formState, schemas }

  return {
    formState,
    formProps,
    schemas,
    activeComponent,
    formStatePreview,
    newSchemas,
    renderComponentGetData
  }
})
