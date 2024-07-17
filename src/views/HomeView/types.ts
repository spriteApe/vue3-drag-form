import type { ICondition } from '@/components/visibleConfig/types'

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

export enum ESymbols {
  EQUAL = '=',
  NOT_EQUAL = '!=',
  GREATER_THAN = '>',
  GREATER_THAN_EQUAL = '>=',
  LESS_THAN = '<',
  LESS_THAN_EQUAL = '<=',
  CONTAIN = 'contain',
  NOT_CONTAIN = '!contain',
  EMPTY = 'empty',
  NOT_EMPTY = '!empty'
}
