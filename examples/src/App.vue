<template>
  <div id="app">
    <div class="app-header">
      <span class="title">iView-form</span>
      <span>
        <i-button class="ms" @click="jumpPage('https://github.com/viewweiwu/iview-form')" icon="social-github">github</i-button>
      </span>
    </div>
    <!-- 测试区域 -->
    <!-- <el-button @click="onClick">加载</el-button>
    <iViewForm maxlength="40" :options="{size: 'small'}" enterSubmit ref="form"  :formList="formList" @submit="onSubmit"></iViewForm> -->
    <h2>普通示例</h2>
    <iframe height='500' scrolling='no' title='iview-form demo' src='//codepen.io/viewweiwu/embed/preview/GdwGPE/?height=500&theme-id=dark&default-tab=js,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/viewweiwu/pen/GdwGPE/'>iview-form_demo1</a> by view (<a href='https://codepen.io/viewweiwu'>@viewweiwu</a>) on <a href='https://codepen.io'>CodePen</a>.
    </iframe>
    <h2>日期示例</h2>
    <iframe height='500' scrolling='no' title='iview-form date' src='//codepen.io/viewweiwu/embed/preview/qYQKGZ/?height=500&theme-id=dark&default-tab=js,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/viewweiwu/pen/qYQKGZ/'>iview-form demo1</a> by view (<a href='https://codepen.io/viewweiwu'>@viewweiwu</a>) on <a href='https://codepen.io'>CodePen</a>.
    </iframe>
    <h2>登陆示例</h2>
    <div class="info">
      <p>如果你设置了 enterSubmit, 那么按 enter 会出发 submit 事件哦!</p>
      <p>设定了 rule 之后，submit 时会触发校验，并且得到的第二个参数就是触发的结果。</p>
    </div>
    <iframe height='500' scrolling='no' title='iview-form login' src='//codepen.io/viewweiwu/embed/preview/QrJBLJ/?height=500&theme-id=dark&default-tab=js,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/viewweiwu/pen/QrJBLJ/'>iview-form login</a> by view (<a href='https://codepen.io/viewweiwu'>@viewweiwu</a>) on <a href='https://codepen.io'>CodePen</a>.
    </iframe>
    <h2>【grid】网格布局</h2>
    <div class="info">
      <p>gird 支持三种类型的值</p>
      <p>下面会逐个解释</p>
    </div>
    <div class="info">
      <p>1、【Number】表示每行会有几个表单元素</p>
      <p>例如：:grid="2" 表示每行有两个元素，每个占 50% 宽度。</p>
      <p>例如：:grid="3" 表示每行有三个元素，每个占 33.33% 宽度。</p>
    </div>
    <div class="info">
      <p>2、【Array】每个数字表示这一行有几个表单元素</p>
      <p>例如：:grid="[3, 1, 2]" 表示第一行会有 3 个，第二行有 1 个，第三行有 2 个。</p>
      <p>例如：:grid="[2, 2, 2]" 表示每一行都是 2 个，跟设置成 Number 没区别。</p>
      <p>注意：如果你有 7 个表单元素，但是你的数组总和只有 4 ，那么剩下的 3 个表单元素将会被忽略（不显示）。</p>
    </div>
    <div class="info">
      <p>3、【二维Array】每个数组的每个数字表示这一行占比, 且每一行的总和是 24 </p>
      <p>例如：:grid="[[6, 12, 6], [12, 12], [24]]" 取第一个数组 [6, 12, 6] 做解释，意思是所占宽度是 6/24, 12/24, 6/24。</p>
      <p>iView 和 element-ui 组件库都用 gird 布局的，这里的 24 格栅格布局，就是组件库栅格布局。</p>
    </div>
    <iframe height='500' scrolling='no' title='iview-form grid' src='//codepen.io/viewweiwu/embed/preview/NMEzZB/?height=500&theme-id=dark&default-tab=js,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/viewweiwu/pen/NMEzZB/'>iview-form date</a> by view (<a href='https://codepen.io/viewweiwu'>@viewweiwu</a>) on <a href='https://codepen.io'>CodePen</a>.
    </iframe>
    <h2>【render】自定义 render</h2>
    <iframe height='500' scrolling='no' title='iview-form render' src='//codepen.io/viewweiwu/embed/preview/MGzBKM/?height=500&theme-id=dark&default-tab=js,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/viewweiwu/pen/MGzBKM/'>iview-form render</a> by view (<a href='https://codepen.io/viewweiwu'>@viewweiwu</a>) on <a href='https://codepen.io'>CodePen</a>.
    </iframe>
    <h2>【isShow】控制显示和隐藏</h2>
    <iframe height='500' scrolling='no' title='iview-form isShow' src='//codepen.io/viewweiwu/embed/preview/erQjzY/?height=500&theme-id=dark&default-tab=js,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/viewweiwu/pen/erQjzY/'>iview-form isShow</a> by view (<a href='https://codepen.io/viewweiwu'>@viewweiwu</a>) on <a href='https://codepen.io'>CodePen</a>.
    </iframe>
  </div>
</template>

<script>
import iViewForm from '@/index.js'

let initForm = {
  key1: '默认值测试',
  key2: '',
  key3: ['', ''],
  key4: ['', ''],
  key5: ''
}

export default {
  name: 'App',
  components: {
    iViewForm
  },
  data () {
    return {
      // 测试用数据
      formList: [
        {
          title: 'input',
          type: 'input',
          key: 'key1',
          rule: { required: true, message: '请输入用户名', trigger: 'blur' },
          settings: {
            class: 'test',
            style: {
              'font-weight': 'bold'
            }
          },
          props: {
            placeholder: 'hello'
          }
        },
        {
          title: 'time',
          type: 'time',
          key: 'key2'
        },
        {
          title: 'daterange',
          type: 'daterange',
          key: 'key3'
        },
        {
          title: 'datetimerange',
          type: 'datetimerange',
          key: 'key4'
        },
        {
          title: 'textarea',
          type: 'input',
          key: 'key5',
          props: {
            placeholder: 'textarea',
            type: 'textarea'
          }
        }
      ]
    }
  },
  mounted () {
    this.setForm(initForm)
  },
  methods: {
    onClick () {
      this.setForm({
        'key1': '你好呀！',
        'key2': 5
      })
    },
    setForm (form) {
      this.$refs.form.setForm(form)
    },
    onSubmit (form) {
      console.log(form)
    },
    jumpPage(target) {
      window.open(target)
    }
  }
}
</script>

<style lang="less">
  .test {
    background-color: #6cf;
  }
  body {
    padding: 70px 50px 50px;
    background-color: #fafafa;
  }
  h2 {
    margin: 20px 0;
    padding-left: 10px;
    border-left: 3px solid #f60;
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
  .info {
    margin: 10px;
    padding: 10px;
    border: 1px solid #ddd;
    font-size: 18px;
    background-color: #fff;
  }
  .ms {
    margin: 10px;
  }
</style>