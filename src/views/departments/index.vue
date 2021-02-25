<template>
  <div class="dashboard-container">
    <div class="app-container">
      <h2>
        组织架构
      </h2>
      <el-card class="tree-card">
        <el-row type="flex" justify="space-between" align="middle" style="height: 40px">
          <el-col>
            <span>江苏传智播客科技股份有限公司</span>
          </el-col>
          <el-col :span="4">
            <el-row type="flex" justify="start">
              <el-col>负责人</el-col>
              <el-col>
                <el-dropdown>
                  <span>
                    操作<i class="el-icon-arrow-down" />
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>添加子部门</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-tree
          :data="departs"
          :props="defaultProps"
          :default-expand-all="true"
          accordion
        >
          <!-- 这里是插槽，每个树形节点都会渲染出一行 -->
          <!-- 利用作用域插槽的方式，获取内部的每个节点数据 -->
          <!-- 拿到了 scoped 以后，当前节点的数据就在 scope.data 当中 -->
          <el-row slot-scope="{data}" type="flex" justify="space-between" align="middle" style="height: 40px; width: 100%">
            <el-col>
              <span>{{ data.name }}</span>
            </el-col>
            <el-col :span="4">
              <el-row type="flex" justify="start">
                <el-col>负责人</el-col>
                <el-col>
                  <el-dropdown>
                    <span>
                      操作<i class="el-icon-arrow-down" />
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item>添加子部门</el-dropdown-item>
                      <el-dropdown-item>编辑部门</el-dropdown-item>
                      <el-dropdown-item>删除部门</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-tree>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
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
      }
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
