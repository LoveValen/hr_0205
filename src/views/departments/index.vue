<template>
  <div class="dashboard-container">
    <div class="app-container">
      <h2>
        组织架构
      </h2>
      <el-card class="tree-card">
        <TreeTools :tree-node="company" />
        <el-tree
          :data="departs"
          :props="defaultProps"
          :default-expand-all="true"
          accordion
        >
          <!-- 这里是插槽，每个树形节点都会渲染出一行 -->
          <!-- 利用作用域插槽的方式，获取内部的每个节点数据 -->
          <!-- 拿到了 scoped 以后，当前节点的数据就在 scope.data 当中 -->
          <TreeTools slot-scope="{data}" :tree-node="data" />
        </el-tree>
      </el-card>
    </div>
  </div>
</template>

<script>
import TreeTools from './components/tree-tools'
export default {
  components: {
    TreeTools
  },
  data() {
    return {
      departs: [
        {
          name: '总裁办',
          children: [
            {
              name: '董事会'
            }
          ]
        },
        { name: '行政部' },
        { name: '人事部' }
      ],
      defaultProps: {
        label: 'name'
      },
      company: { name: '江苏传智播客教育科技股份有限公司', manager: '负责人' }
    }
  }
}
</script>

<style scoped>
  .tree-card {
    padding: 30px  140px;
    font-size:14px;
  }
</style>
