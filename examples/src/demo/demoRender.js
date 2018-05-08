export default `
<template>
  <div>
    <iViewForm
      @submit="onSubmit"
      :formList="customFormList">
    </iViewForm>
  </div>
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
          title: '你好哇',
          key: 'c1',
          type: 'input',
          props: {
            placeholder: '你看 title 是蓝色的'
          },
          renderTitle: (h, item, form) => h('span', { style: 'color: #6cf' }, item.title)
        },
        {
          title: '你好哇',
          key: 'c2',
          renderContent: (h, item, form) => {
            let $input = h('i-input', {
              props: {
                value: form['custom']
              },
              style: {
                width: '240px'
              },
              on: {
                input: (value) => {
                  form['custom'] = value
                }
              }
            })
            return h('div', [
              $input,
              h('p', {
                style: {
                  color: '#999'
                }
              }, '这里是自定义 content')
            ])
          }
        }, {
          render: (h, item, form) => {
            return h('h2', '我猜你可能需要整个自定义')
          }
        }, {
          title: '组合',
          key: 'c4',
          renderTitle: (h) => {
            return h('checkbox', '组合')
          },
          renderContent: (h, item, form) => {
            return h('rate', {
              props: {
                value: 3
              }
            })
          }
        }, {
          title: '',
          key: 'c5',
          type: 'input',
          props: {
            placeholder: '你有可能不需要 title'
          }
        }
      ]
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