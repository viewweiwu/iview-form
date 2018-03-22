<template>
  <div id="app">
    <iview-form inline @submit="onSubmit" :formList="formList"></iview-form>
    <p>日期</p>
    <iview-form @submit="onSubmit" :formList="dateFormList"></iview-form>
  </div>
</template>

<script>
import IviewForm from '@/index.js'
export default {
  name: 'App',
  components: {
    IviewForm
  },
  data() {
    return {
      formList: [{
        title: '姓名',
        type: 'input',
        key: 'name',
        props: {
          placeholder: '请输入姓名'
        },
        onInput: (value, item, form) => console.log(value),
        renderTitle: (h, item, form) => h('span', { style: 'color: red' }, item.title)
      }, {
        title: '特长',
        type: 'select',
        key: 'interest',
        defaultValue: 2,
        options: [{
          value: 0,
          text: '上班'
        }, {
          value: 1,
          text: '吃饭'
        }, {
          value: 2,
          text: '睡觉'
        }, {
          value: 3,
          text: '偷懒'
        }],
        props: {
          placeholder: '请选择兴趣'
        }
      }, {
        title: '协议',
        type: 'checkbox',
        text: '我同意'
      }, {
        title: '喜欢的食物',
        type: 'checkbox-group',
        key: 'foods',
        options: [{
          value: 0,
          text: '草莓'
        }, {
          value: 1,
          text: '酸奶'
        }, {
          value: 2,
          text: '面包'
        }, {
          value: 3,
          text: '鸡蛋'
        }]
      }, {
        title: '生日',
        type: 'date',
        formatValue: 'yyyy年MM月dd日', // 指定返回格式
        key: 'birthday'
      }, {
        title: 'radio',
        type: 'radio',
        key: 'radio'
      }, {
        title: '不存在的食物',
        type: 'radio-group',
        key: 'radio-group',
        defaultValue: 0,
        options: [{
          value: 0,
          text: '冬瓜'
        }, {
          value: 1,
          text: '西瓜'
        }, {
          value: 2,
          text: '南瓜'
        }, {
          value: 3,
          text: '北瓜'
        }]
      }, {
        title: '开关',
        type: 'switch',
        key: 'switch'
      }, {
        title: 'custom',
        renderContent: (h, item, form) => {
          return h('tag', {
            props: {
              color: 'red'
            }
          }, 'hello')
        }
      }, {
        title: '备注',
        type: 'input',
        key: 'remark',
        props: {
          type: 'textarea',
          placeholder: '请输入备注'
        }
      }],
      dateFormList: [{
        title: 'date',
        type: 'date',
        formatValue: 'yyyy年MM月dd日', // 指定返回格式
        key: 'birthday'
      }, {
        title: 'datetime',
        type: 'datetime',
        key: 'datetime',
        props: {
          type: 'datetime',
          format: 'yyyy-MM-dd hh:mm' // 这里不填的话 自动有秒
        }
      }, {
        title: 'daterange',
        type: 'daterange',
        key: 'daterange'
      }, {
        title: 'datetimerange',
        type: 'datetimerange',
        key: 'datetimerange'
      }]
    }
  },
  methods: {
    onSubmit(form) {
      console.log(form)
    }
  }
}
</script>
