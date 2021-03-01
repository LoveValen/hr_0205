<template>
  <div class="dashboard-container">
    <div class="app-container">
      <h2>
        组织架构
      </h2>
      <el-card class="tree-card">
        <TreeTools
          :tree-node="company"
          :is-root="true"
          @addDepts="addDepts"
        />
        <hr>
        <el-tree
          :data="departs"
          :props="defaultProps"
          :default-expand-all="true"
          accordion
        >
          <!-- 这里是插槽，每个树形节点都会渲染出一行 -->
          <!-- 利用作用域插槽的方式，获取内部的每个节点数据 -->
          <!-- 拿到了 scoped 以后，当前节点的数据就在 scope.data 当中 -->
          <TreeTools
            slot-scope="{data}"
            :tree-node="data"
            @delDepartments="delDepartments"
            @addDepts="addDepts"
            @editDepts="editDepts"
          />
        </el-tree>
      </el-card>
      <AddDept ref="addDept" :show-dialog.sync="showDialog" :node="node" @addDepts="getDepartments" />
    </div>
  </div>
</template>

<script>
import TreeTools from './components/tree-tools'
import AddDept from './components/add-dept'
import { getDepartments } from '@/api/departments'
import { tranListToTreeData } from '@/utils'
export default {
  components: {
    TreeTools,
    AddDept
  },
  data() {
    return {
      departs: [],
      defaultProps: {
        label: 'name',
        children: 'children'
      },
      company: {},
      showDialog: false,
      node: {}
    }
  },
  created() {
    this.getDepartments()
  },
  methods: {
    async getDepartments() {
      const res = await getDepartments()
      console.log(res)
      this.company = {
        name: res.companyName,
        manager: '负责人',
        id: ''
      }
      this.departs = tranListToTreeData(res.depts, '')
    },
    delDepartments() {
      this.getDepartments()
    },
    addDepts(treeNode) {
      this.showDialog = true
      this.node = treeNode
    },
    editDepts(treeNode) {
      // 父组件执行子组件的方法获取数据
      // 回显数据
      this.$refs.addDept.getDepartDetail(treeNode.id)
      this.showDialog = true
      // 将获取的 treeNode 传给弹窗
      this.node = treeNode
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
