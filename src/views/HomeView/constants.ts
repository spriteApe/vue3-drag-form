import type { IItem, IConfigOptions } from './types'
export const componentList: IItem[] = [
  // {
  //   title: '按钮',
  //   component: 'a-button',
  //   width: 200,
  //   slot: '默认按钮',
  //   componentProps: {
  //     type: 'primary'
  //   },
  //   required: false
  // },
  {
    title: '输入框',
    component: 'a-input',
    required: true,
    componentProps: {
      placeholder: '请输入内容',
      showCount: true
    }
  },
  {
    title: '开关',
    component: 'a-switch',
    componentProps: {
      checked: true
    }
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
    }
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
      component: 'a-select',
      title: 'layout',
      componentProps: {
        options: [
          {
            value: 'horizontal',
            label: 'horizontal'
          },
          {
            value: 'vertical',
            label: 'vertical'
          },
          {
            value: 'inline',
            label: 'inline'
          }
        ]
      }
    },
    path: 'layout'
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
