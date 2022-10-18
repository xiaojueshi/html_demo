// 点击tab-item 开启激活状态
const parentNode = document.querySelector('.tabbar')
const activeTop = document.querySelector('.active-top')
// 去除顶部的active-top
const childList = [...parentNode.children].slice(1)

// 利用实践冒泡，使用事件委托绑定事件
parentNode.addEventListener('click', function (event) {
  let currentItem = null
  const target = event.target

  // tips: 或者使用event.target.closest(selector)获取最近父节点
  // const parentNode = target.closest('li')
  const parentNode = target.parentNode

  // 鼠标点击可能是li，或者是其子元素i、p，需要区分
  // 我们只需要获取li元素，所以当点击子元素时，要获取其父元素
  if (target.className.includes('tab-item')) {
    currentItem = target
  } else if (parentNode.className.includes('tab-item')) {
    currentItem = parentNode
  }

  // 获取当前点击元素的索引
  const currentItemIndex = childList.indexOf(currentItem)

  setListStyle(currentItem, currentItemIndex)
})

setListStyle(childList[0], 0)

function setListStyle(currentItem, currentItemIndex) {
  console.log();
  // 添加active激活类名，其他兄弟元素移除active
  currentItem.classList.add('active')
  childList.forEach((item, index) => {
    if (index !== currentItemIndex) {
      item.classList.remove('active')
    }
  })

  if (!activeTop.style.top && !activeTop.style.display) {
    activeTop.style.display = 'block'
    activeTop.style.top = '-6px'
  }

  const gap = currentItemIndex ? 23 : 22

  activeTop.style.left = (currentItemIndex * currentItem.offsetWidth + currentItem.offsetWidth * (currentItemIndex + 1)) / 2 - gap + 'px'
}