export default `
<template>
  <iViewForm
    ref="loginForm"
    notCtrl
    enterSubmit
    @submit="onSubmit"
    :label-width="80"
    :formList="formList">
    <Button @click="login" style="width: 300px" type="primary" long>登陆</Button>
  </iViewForm>
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
          title: '用户名',
          type: 'input',
          key: 'username',
          rule: { required: true, message: '请输入用户名', trigger: 'blur' },
          props: {
            placeholder: '请输入用户名'
          }
        },
        {
          title: '密码',
          type: 'input',
          key: 'password',
          rule: { required: true, message: '请输入密码', trigger: 'blur' },
          props: {
            type: 'password',
            placeholder: '请输入密码'
          }
        }
      ]
  },
  methods: {
    onSubmit(form, valid) {
      console.log(form, valid)
    }
  }
}
</script>
`