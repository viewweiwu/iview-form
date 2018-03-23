<template>
  <div id="app">
    <p>
      <Button size="small" type="error" v-if="lib === 'iview'" @click="lib = 'element'">切换到 element</Button>
      <el-button size="mini" type="success" v-if="lib === 'element'" @click="lib = 'iview'">切换到 iview</el-button>
    </p>
    <Pnl>
      <p slot="title">
        完整示例
      </p>
      <iViewForm :key="1" :lib="lib" @submit="onSubmit" :formList="formList"></iViewForm>
      <span slot="code">
        {{demo1}}
      </span>
    </Pnl>
    <Pnl>
      <p slot="title">日期示例</p>
      <iViewForm :key="2" :lib="lib" @submit="onSubmit" :formList="dateFormList"></iViewForm>
      <span slot="code">
        {{demo2}}
      </span>
    </Pnl>
    <Pnl>
      <p slot="title">登陆示例</p>
      <iViewForm
        ref="loginForm"
        notCtrl
        enterSubmit
        @submit="onSubmit"
        :key="3"
        :lib="lib"
        :label-width="80"
        :formList="loginFormList">
        <Button @click="login" style="width: 320px" type="primary" long>登陆</Button>
      </iViewForm>
      <span slot="code">
        {{demo3}}
      </span>
    </Pnl>
  </div>
</template>

<script>
import iViewForm from '@/index.js'
import Pnl from './Pnl'
import demo1 from './demo/demo1'
import demo2 from './demo/demo2'
import demo3 from './demo/demo3'

export default {
  name: 'App',
  components: {
    iViewForm,
    Pnl
  },
  data() {
    return {
      demo1,
      demo2,
      demo3,
      lib: 'element',
      formList: [{
        type: 'row',
        children: [{
          span: 8,
          title: 'a',
          type: 'input',
          width: 200
        }, {
          span: 8,
          title: 'b',
          type: 'input',
          width: 200
        }, {
          span: 8,
          title: 'c',
          type: 'input',
          width: 200
        }]
      }, {
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
        width: 'auto',
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
        formatValue: 'yyyy年MM月dd日', // 指定  返回格式
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
        width: 'auto',
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
        key: 'datetimerange',
        width: 300,
        props: {
          'start-placeholder': '开始日期',
          'end-placeholder': '结束日期'
        }
      }],
      loginFormList: [
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
    }
  },
  methods: {
    onSubmit(form, valid) {
      if (valid) {
        this.$Modal.info({
          title: '你得到的值',
          content: '请在 console 里面看你得到的值'
        })
        console.log(form, valid)
      } else {
        console.log(form, valid)
        this.$Message.error('验证失败')
      }
    },
    login() {
      this.$refs['loginForm'].submit()
    }
  }
}
</script>

<style lang="less">
  body {
    padding: 50px;
    background-color: #fafafa;
  }
  .el-checkbox + .el-checkbox,
  .el-radio + .el-radio {
    margin-left: 10px;
    margin-right: 10px;
  }
</style>