import type { ICondition, ESymbols } from '@/components/visibleConfig/types'

export type IListens = Record<string, (...any: any[]) => void>
export type IItem = {
  title: string
  component: string
  required?: boolean
  message?: string
  hideCondition?: ICondition
  width?: number
  slot?: string
  componentProps?: Record<string, any>
  symbols?: ESymbols[]
  icon?: string
  on?: IListens
}
export interface IItemContentOther {
  id: string
  _id: string
  span: number
}
export type IItemContent = IItem & IItemContentOther
export type IConfigList = IItem & { _id: string }
export enum EFormLayout {
  HORIZONTAL = 'horizontal',
  VERTICAL = 'vertical',
  INLINE = 'inline'
}
export enum EFormLabelAlign {
  LEFT = 'left',
  RIGHT = 'right'
}
export type IActiveComponent = IItemContent | null

export interface IFormProps {
  labelCol: { span: number }
  wrapperCol: { span: number }
  layout: EFormLayout
  labelAlign: EFormLabelAlign
}
export type IFormState = Record<string, any>
export type IConfigOptions = {
  options: IItem | IConfigList
  path: string | string[]
}
export type IExportAndImportJSON = IFormProps & { schemas: IItemContent[] }
