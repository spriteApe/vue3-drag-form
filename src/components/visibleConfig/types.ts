export enum ECondition {
  AND = 'and',
  OR = 'or'
}
export enum EType {
  CONDITION = 'condition',
  CONDITION_GROUP = 'conditionGroup'
}

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

export const symbolSelectOptions = [
  {
    label: '等于',
    value: ESymbols['EQUAL']
  },
  {
    label: '不等于',
    value: ESymbols['NOT_EQUAL']
  },
  {
    label: '大于',
    value: ESymbols['GREATER_THAN']
  },
  {
    label: '大于等于',
    value: ESymbols['GREATER_THAN_EQUAL']
  },
  {
    label: '小于',
    value: ESymbols['LESS_THAN']
  },
  {
    label: '小于等于',
    value: ESymbols['LESS_THAN_EQUAL']
  },
  {
    label: '包含',
    value: ESymbols['CONTAIN']
  },
  {
    label: '不包含',
    value: ESymbols['NOT_CONTAIN']
  },
  {
    label: '为空',
    value: ESymbols['EMPTY']
  },
  {
    label: '不为空',
    value: ESymbols['NOT_EMPTY']
  }
]

export type IRight = {
  type: EType
  formId?: string
  symbol?: ESymbols
  value?: any
  conditionGroup?: ICondition
}
export type ICondition = {
  left?: ECondition
  right?: IRight[]
}
