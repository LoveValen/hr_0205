<template>
  <el-row :tree-node="treeNode" type="flex" justify="space-between" align="middle" style="height: 40px; width: 100%">
    <el-col>
      <strong v-if="isRoot">{{ treeNode.name }}</strong>
      <span v-else>{{ treeNode.name }}</span>
    </el-col>
    <el-col :span="4">
      <el-row type="flex" justify="start">
        <el-col>{{ treeNode.manager }}</el-col>
        <el-col>
          <el-dropdown @command="handleCommand">
            <span>
              操作<i class="el-icon-arrow-down" />
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="add">添加子部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" command="edit">编辑部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" command="del">删除部门</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { delDepartments } from '@/api/departments'
export default {
  props: {
    treeNode: {
      type: Object,
      required: true
    },
    isRoot: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    async handleCommand(command) {
      try {
        if (command === 'add') {
          this.$emit('addDepts', this.treeNode)
        } else if (command === 'edit') {
          this.$emit('editDepts', this.treeNode)
        } else if (command === 'del') {
        // 先询问是否确认
          await this.$confirm('是否确认删除该部门')
          // 拿到 id 发送请求即可
          await delDepartments(this.treeNode.id)
          // 如果正常删除完毕，应该重新载入页面
          // 需要通知父页面
          this.$emit('delDepartments')
          this.$message.success('删除成功')
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style>

</style>
