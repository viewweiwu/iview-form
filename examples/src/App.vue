<template>
  <div id="app">
    <div class="app-header">
      <span class="title">iView-form</span>
      <span>
        <i-button type="error" v-if="lib === 'iview'" @click="lib = 'element'">切换到 element-ui 版本</i-button>
        <i-button type="primary" v-if="lib === 'element'" @click="lib = 'iview'">切换到 iview 版本</i-button>
        <i-button class="ms" @click="jumpPage('https://github.com/viewweiwu/iview-form')" icon="social-github">github</i-button>
      </span>
    </div>
    <Pnl>
      <p slot="title">
        完整示例
      </p>
      <iViewForm :lib="lib" @submit="onSubmit" :formList="formList"></iViewForm>
      <span slot="code">
        {{demo1}}
      </span>
    </Pnl>
    <Pnl>
      <p slot="title">日期示例</p>
      <iViewForm :lib="lib" @submit="onSubmit" :formList="dateFormList"></iViewForm>
      <span slot="code">
        {{demo2}}
      </span>
    </Pnl>
    <Pnl>
      <p slot="title">登陆示例</p>
      <p>按 enter 会出发 submit 事件哦！</p>
      <p style="margin-bottom: 20px">设定了 rule 之后，submit 时会自动校验</p>
      <iViewForm
        ref="loginForm"
        notCtrl
        enterSubmit
        @submit="onSubmit"
        :lib="lib"
        :label-width="80"
        :formList="loginFormList">
        <i-button @click="login" style="width: 320px" type="primary" long>登陆</i-button>
      </iViewForm>
      <span slot="code">
        {{demo3}}
      </span>
    </Pnl>
    <Pnl>
      <p slot="title">【grid】网格布局</p>
      <p class="ms">grid: 2</p>
      <iViewForm
        ref="loginForm"
        enterSubmit
        @submit="onSubmit"
        :grid="2"
        :lib="lib"
        :label-width="40"
        contentWidth="auto"
        :formList="rowFormList">
      </iViewForm>
      <hr>
      <p class="ms">grid: [3, 1, 2]</p>
      <iViewForm
        ref="loginForm"
        enterSubmit
        @submit="onSubmit"
        :grid="[3, 1, 2]"
        :lib="lib"
        :label-width="40"
        contentWidth="auto"
        :formList="rowFormList">
      </iViewForm>
      <hr>
      <p class="ms">grid: [[6, 12, 6], [12, 12], [24]]</p>
      <iViewForm
        ref="loginForm"
        enterSubmit
        @submit="onSubmit"
        :grid="[[6, 12, 6], [12, 12], [24]]"
        :lib="lib"
        :label-width="40"
        contentWidth="auto"
        :formList="rowFormList">
      </iViewForm>
      <span slot="code">
        {{demoGrid}}
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
import demoGrid from './demo/demoGrid'

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
      demoGrid,
      lib: 'iview',
      formList: [{
        title: '姓名',
        type: 'input',
        key: 'name',
        props: {
          placeholder: '请输入姓名'
        },
        onInput: (value, item, form) => console.log(value),
        renderTitle: (h, item, form) => h('span', { style: 'color: #6cf' }, item.title)
      }, {
        title: '特长',
        type: 'select',
        key: 'interest',
        defaultValue: [],
        props: {
          multiple: true,
          placeholder: '请选择兴趣'
        },
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
        }]
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
        key: 'birthday'
      }, {
        title: 'datetime',
        type: 'datetime',
        key: 'datetime'
      }, {
        title: 'daterange',
        type: 'daterange',
        key: 'daterange'
      }, {
        title: 'datetimerange',
        type: 'datetimerange',
        key: 'datetimerange',
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
      ],
      rowFormList: [{
        title: 'a',
        type: 'input',
        key: 'a'
      }, {
        title: 'b',
        type: 'input',
        key: 'b'
      }, {
        title: 'c',
        type: 'input',
        key: 'c'
      }, {
        title: 'd',
        type: 'slider',
        key: 'd'
      }, {
        title: 'e',
        type: 'slider',
        key: 'e'
      }, {
        title: 'f',
        type: 'input',
        key: 'f'
      }]
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
    },
    jumpPage(target) {
      window.open(target)
    }
  }
}
</script>

<style lang="less">
  body {
    padding: 100px 50px 50px;
    background-color: #fafafa;
  }
  .app-header {
    top: 0;
    left: 0;
    width: 100%;
    height: 70px;
    padding: 10px 30px;
    border-bottom: 1px solid #ddd;
    box-shadow: 0 0 5px #ccc;
    background-color: #fff;
    z-index: 10;
    position: fixed;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title {
      font-size: 40px;
      text-shadow: 1px 1px 2px #fff,
        1px 1px 2px #000;
    }
  }
  .el-checkbox + .el-checkbox,
  .el-radio + .el-radio {
    margin-left: 10px;
    margin-right: 10px;
  }
  .ms {
    margin: 10px;
  }
</style>