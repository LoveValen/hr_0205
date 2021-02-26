const oldArr = [
  {
    id: 1,
    pid: ''
  },
  {
    id: 2,
    pid: 1
  },
  {
    id: 3,
    pid: ''
  },
  {
    id: 4,
    pid: 1
  },
  {
    id: 5,
    pid: ''
  },
  {
    id: 6,
    pid: 1
  }
]

function convertTreeData(oldArr, pid) {
  const newArr = []
  oldArr.forEach(item => {
    if (item.pid === pid) {
      const children = convertTreeData(oldArr, item.id)
      if (children.length) {
        console.log(children)
        item.children = children
      }
      newArr.push(item)
    }
  })
  return newArr
}

console.log(convertTreeData(oldArr, ''))
