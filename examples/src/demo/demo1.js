export default `
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
      formList: [{
        title: '姓名',
        type: 'input',
        key: 'name',
        props: {
          placeholder: '请输入姓名'
        },
        onInput: (value, item, form) => console.log(value),
        renderTitle: (h, item, form) => h('span', { style: 'color: blue' }, item.title)
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
        title: '零花钱',
        type: 'slider',
        defaultValue: 10,
        key: 'slider'
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
`