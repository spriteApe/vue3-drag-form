import type { IItem, IConfigOptions } from './types'
import { ESymbols } from '@/components/visibleConfig/types'

export const componentList: IItem[] = [
  {
    title: '按钮',
    component: 'a-button',
    width: 200,
    slot: '默认按钮',
    componentProps: {
      type: 'primary'
    },
    required: false
  },
  {
    title: '输入框',
    component: 'a-input',
    required: true,
    componentProps: {
      placeholder: '请输入内容',
      showCount: true
    },
    symbols: [
      ESymbols['EQUAL'],
      ESymbols['NOT_EQUAL'],
      ESymbols['CONTAIN'],
      ESymbols['NOT_CONTAIN'],
      ESymbols['EMPTY'],
      ESymbols['NOT_EMPTY']
    ]
  },
  {
    title: '数字输入框',
    component: 'a-input-number',
    componentProps: {
      placeholder: '请输入'
    },
    symbols: [
      ESymbols['EQUAL'],
      ESymbols['NOT_EQUAL'],
      ESymbols['GREATER_THAN'],
      ESymbols['GREATER_THAN_EQUAL'],
      ESymbols['LESS_THAN'],
      ESymbols['LESS_THAN_EQUAL'],
      ESymbols['EMPTY'],
      ESymbols['NOT_EMPTY']
    ]
  },
  {
    title: '开关',
    component: 'a-switch',
    componentProps: {
      checked: true
    },
    symbols: [ESymbols['EQUAL'], ESymbols['NOT_EQUAL']]
  },
  {
    title: '选择器',
    component: 'a-select',
    componentProps: {
      placeholder: '请选择内容',
      options: [
        {
          value: 'jack',
          label: 'Jack'
        },
        {
          value: 'lucy',
          label: 'Lucy'
        }
      ]
    },
    symbols: [
      ESymbols['EQUAL'],
      ESymbols['NOT_EQUAL'],
      ESymbols['CONTAIN'],
      ESymbols['NOT_CONTAIN'],
      ESymbols['EMPTY'],
      ESymbols['NOT_EMPTY']
    ]
  }
]

export const formConfigOptions: IConfigOptions[] = [
  {
    options: {
      component: 'a-slider',
      title: 'labelCol',
      componentProps: {
        min: 1,
        max: 24
      }
    },
    path: 'labelCol.span'
  },
  {
    options: {
      component: 'a-slider',
      title: 'wrapperCol',
      componentProps: {
        min: 1,
        max: 24
      }
    },
    path: 'wrapperCol.span'
  },
  {
    options: {
      component: 'formLabelConfig',
      title: '标签的位置'
    },
    path: ['layout', 'labelAlign']
  }
]
export const componentConfigOptions: IConfigOptions[] = [
  {
    options: {
      component: 'a-input',
      title: '标题',
      componentProps: {
        placeholder: '请输入'
      }
    },
    path: 'title'
  },
  {
    options: {
      component: 'a-input',
      title: '字段ID',
      componentProps: {
        placeholder: '请输入'
      }
    },
    path: 'id'
  },
  {
    options: {
      component: 'a-slider',
      title: '栅格',
      componentProps: {
        min: 1,
        max: 24
      }
    },
    path: 'span'
  },
  {
    options: {
      component: 'requiredConfig',
      title: '必填'
    },
    path: ['required', 'message']
  },
  {
    options: {
      component: 'a-slider',
      title: '宽度',
      componentProps: {
        min: 100,
        max: 500
      }
    },
    path: 'width'
  },
  {
    options: {
      component: 'a-input',
      title: '按钮文本'
    },
    path: 'slot'
  },
  {
    options: {
      component: 'a-input',
      title: 'placeholder',
      componentProps: {
        placeholder: '请输入'
      }
    },
    path: 'componentProps.placeholder'
  },
  {
    options: {
      component: 'optionDataConfig',
      title: '选项数据'
    },
    path: 'componentProps.options'
  },
  {
    options: {
      component: 'visibleConfig',
      title: '隐藏条件'
    },
    path: 'hideCondition'
  },
  {
    options: {
      component: 'a-checkbox',
      title: '显示数字'
    },
    path: 'componentProps.showCount'
  }
]
