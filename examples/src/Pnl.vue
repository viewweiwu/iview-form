<template>
  <div>
    <div class="pnl" :class="{full: isFull}">
      <div class="pnl-content">
        <div class="content">
          <div class="pnl-title">
            <slot name="title"></slot>
          </div>
          <slot></slot>
        </div>
        <div class="code">
          <pre ref="code">
            <code>
              <slot name="code"></slot>
            </code>
          </pre>
        </div>
      </div>
      <Button @click="isFull = !isFull" class="mt" type="primary" long>{{isFull ? '隐藏' : '展开'}}</Button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isFull: false
    }
  },
  mounted() {
    window.hljs.highlightBlock(this.$refs.code)
    // this.$refs.code.forEach(item => {
    //   console.log(item)
    // })
  }
}
</script>

<style lang="less">
  .pnl {
    height: 500px;
    margin: 20px;
    padding: 20px;
    border: 1px solid #ddd;
    background-color: #fff;
    &.full {
      height: auto;
    }
  }
  .pnl-title {
    margin-bottom: 20px;
    font-size: 30px;
  }
  .content,
  .code {
    width: 50%;
    overflow: auto;
    font-size: 16px;
  }
  .pnl-content {
    width: 100%;
    height: ~'calc(100% - 40px)';
    display: flex;
    overflow: hidden;
  }
  .content {
    padding: 10px;
  }
  .code {
    margin-left: 20px;
  }
  .mt {
    margin-top: 10px;
  }
</style>