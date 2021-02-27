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
      if (command === 'add') {
        console.log(command)
      } else if (command === 'edit') {
        console.log(command)
      } else if (command === 'del') {
        // console.log(command)
        await this.$confirm('是否确认删除该部门')
        await delDepartments(this.treeNode.id)
        this.$emit('delDepartments')
        this.$message.success('删除成功')
      }
    }
  }
}
</script>

<style>

</style>
