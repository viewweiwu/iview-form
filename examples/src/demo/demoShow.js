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
      formList: [{
        title: '试着输入',
        type: 'input',
        key: 'a',
        props: {
          placeholder: '输入东西，会显示第二个表单元素'
        }
      }, {
        title: '哈哈，我出现了',
        type: 'input',
        key: 'b',
        isShow: (form, item) => form['a'] !== ''
      }, {
        render: (h) => h('h3', '第二种使用方式')
      }, {
        title: '第二种控制',
        type: 'checkbox',
        key: 'c',
        text: '点我',
        onInput: (value) => {
          this.formList[4].isShow = value
        }
      }, {
        title: '我显示啦！',
        key: 'd',
        type: 'input',
        isShow: false,
        props: {
          placeholder: '被 checkbox 控制显示隐藏'
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