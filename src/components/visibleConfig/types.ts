export enum ECondition {
  AND = 'and',
  OR = 'or'
}
export enum EType {
  CONDITION = 'condition',
  CONDITION_GROUP = 'conditionGroup'
}
export enum ESymbol {
  EQUAL_TO = '=',
  NOT_EQUAL_TO = '!='
}
export type IRight = {
  type: EType
  formId?: string
  symbol?: ESymbol
  value?: any
  conditionGroup?: ICondition
}
export type ICondition = {
  left?: ECondition
  right?: IRight[]
}
