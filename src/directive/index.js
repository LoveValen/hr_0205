export const imgerror = {
  // 指令对象 会在当前的dom元素插入到节点之后执行
  inserted(dom, options) {
    // console.log(dom)
    // console.log(options)
    dom.onerror = function() {
      // 一旦当前 img 出错
      // 就将调用指令时传入的图片，替换掉当前 src 修复图片
      dom.src = options.value
    }
  }
}
