# iview-form

> 让 iview 的 form 使用起来更加简单。

## 例子
[demo][1]

## 安装

### npm（推荐方式）

```bash
$ npm install iview-form
```

## 使用方法

``` html
<template>
  <iViewForm @submit="onSubmit" :formList="formList"></iViewForm>
</template>

<script>
import iViewForm from 'iview-form'

export default {
  components: {
    iViewForm
  },
  data() {
    return {
      formList: [
        {
          title: '姓名',
          type: 'input',
          key: 'name'
        }
      ]
    }
  },
  methods: {
    onSubmit(form, valid) {
      console.log(form, valid)
    }
  }
}
</script>
```
标签大小写随你心情
``` html
<iview-form @submit="onSubmit" :formList="formList"></iview-form>
```
使用 element-ui 组件库
``` html
<iview-form lib="element" @submit="onSubmit" :formList="formList"></iview-form>
```

## iview-form 参数

| 参数 | 说明 | 类型 | 默认值 |
| - | - | - | - |
| grid | 网格，更多请看 demo | Number, Array | - |
| formList | 配置项（看下面 formList 参数） | Array | [] |
| notCtrl | 是否不显示 提交、重置 按钮 | Boolean | false |
| inline | 是否显示成一行 | Boolean | false |
| autocomplete | iview 独占的 api | Boolean | 'off' |
| enterSubmit | 如果设定这个值为 true，那么 input 按 enter 键会触发 submit 事件 | Boolean | false |
| lib | 可选值（'iview', 'element'），如果指定为 element 那么组件会按照 element 来渲染 | String | 'iview' |
| disabled | 如果设定这个值为 true，那么该表单下所有的表单元素都会被禁用 | Boolean | false |
| label-width | 标签的宽度 | Number | 100 |
| content-width | 内容的宽度 | Number | 240 |

## formList 参数
| 参数 | 说明 | 类型 | 默认值 |
| - | - | - | - |
| title | 显示的标签 | String | '' |
| type | 不同的类型默认值不同，具体看下面 type 的种类 | String | '' |
| key | 可以监听 submit 事件，返回的 form 里面的 key 就是你定义的 key | String | '' |
| defaultValue | item 的默认值 | - | - |
| props | 组件库自带的参数,可以参考 iview 或者 element 组件库的文档 | Object | {} |
| text | type 为 checkbox 或者 radio 时才有用，显示后面跟着的文字 | String | '' |
| options | type 为 checkbox-group 或者 radio-group 时才有用，由 {value: 0, text: '苹果'} 组成，数据项支持异步 | Array | [] |
| onInput | 监听参数改变事件 | Function | (value, item, form) |
| renderTitle | 自定义标签 | Function | (h, item, form) |
| renderContent | 自定义内容主题 | Function | (h, item, form) |
| renderOption | type 为 select 时才有用，可以自定义 select 的 option | Function | (h, option, item) |


## type 种类
| 类型 | 默认值 |
| - | - |
| input | '' |
| select | null |
| checkbox | false |
| checkbox-group | [] |
| radio | false |
| radio-group | [] |
| date | 当前时间，new Date() |
| datetime | 当前时间，new Date() |
| daterange | ['', ''] |
| datetimerange | ['', ''] |
| switch | false |
| slider | 0 |

## 内置方法
| 名称 | 说明 | 返回类型 | 返回值 |
| - | - | - | - |
| reset | 还原表单 | - | - |
| getFormBykey | 根据 key 来获取这个 key 在 form 的值 | - | 打印出来你就知道了 |
| getForm | 获取整个 form 的值 | - | 打印出来你就知道了 |
| submit | 手动触发 submit 事件 | - | - |

## 事件
| 名称 | 说明 | 返回类型 | 返回值 |
| - | - | - | - |
| submit | 提交按钮的点击事件，监听这个事件，然后 console 出来，你就知道是啥了 | Object | (form, valid) |

[1]: https://viewweiwu.github.io/iview-form/examples/dist/