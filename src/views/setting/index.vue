<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <!-- 放置页签 -->
          <el-tab-pane label="角色管理">
            <!-- 新增角色按钮 -->
            <el-row style="height: 60px">
              <el-button
                icon="el-icon-plus"
                size="small"
                type="primary"
                @click="showDialog = true"
              >新增角色</el-button>
            </el-row>
            <!-- 表格 -->
            <el-table border="" :data="roleList">
              <!-- <el-table-column label="序号" width="120px" type="index" /> -->
              <el-table-column label="序号" width="120px">
                <template slot-scope="data">
                  {{ (page.page - 1) * page.pagesize + data.$index + 1 }}
                </template>
              </el-table-column>
              <el-table-column label="角色名称" width="240px" prop="name" />
              <el-table-column label="描述" prop="description" />
              <el-table-column label="操作">
                <template slot-scope="{ row }">
                  <el-button size="small" type="success">分配权限</el-button>
                  <el-button
                    size="small"
                    type="primary"
                    @click="editRole(row.id)"
                  >编辑</el-button>
                  <el-button
                    size="small"
                    type="danger"
                    @click="deleteRole(row.id)"
                  >删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <!-- 分页组件 -->
            <el-row
              type="flex"
              justify="center"
              align="middle"
              style="height: 60px"
            >
              <!-- 分页组件 -->
              <el-pagination
                background
                layout="total,sizes,prev,pager,next,jumper"
                :total="total"
                :page-sizes="[2, 6, 10, 20]"
                :page-size="page.pagesize"
                @size-change="sizeChange"
                @current-change="currentChange"
              />
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="公司信息">
            <el-alert
              title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
              type="info"
              show-icon
              :closable="false"
            />
            <el-form label-width="120px" style="margin-top: 50px">
              <el-form-item label="公司名称">
                <el-input
                  v-model="formData.name"
                  disabled
                  style="width: 400px"
                />
              </el-form-item>
              <el-form-item label="公司地址">
                <el-input
                  v-model="formData.companyAddress"
                  disabled
                  style="width: 400px"
                />
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input
                  v-model="formData.mailbox"
                  disabled
                  style="width: 400px"
                />
              </el-form-item>
              <el-form-item label="备注">
                <el-input
                  v-model="formData.remarks"
                  type="textarea"
                  :rows="3"
                  disabled
                  style="width: 400px"
                />
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-card>
      <el-dialog :title="title" :visible="showDialog" @close="btnCancel">
        <el-form
          ref="roleForm"
          :rules="rules"
          :model="roleData"
          label-width="140px"
        >
          <el-form-item label="角色名称" prop="name">
            <el-input v-model="roleData.name" style="width: 80%" />
          </el-form-item>
          <el-form-item label="角色描述" prop="description">
            <el-input v-model="roleData.description" style="width: 80%" />
          </el-form-item>
        </el-form>
        <el-row slot="footer" type="flex" justify="center">
          <el-col :span="6">
            <el-button size="small" @click="btnCancel">取消</el-button>
            <el-button
              size="small"
              type="primary"
              @click="btnOk"
            >确认</el-button>
          </el-col>
        </el-row>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  getCompanyInfo,
  getRoleList,
  deleteRole,
  getRoleDetail,
  updateRole,
  addRole
} from '@/api/setting'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      roleList: [],
      formData: {
        name: '',
        companyAddress: '',
        companyPhone: '',
        mailbox: '',
        remarks: ''
      },
      page: {
        page: 1,
        pagesize: 2
      },
      total: 0,
      showDialog: false,
      roleData: {
        name: '',
        description: ''
      },
      rules: {
        name: [
          { required: true, message: '角色名字不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['companyId']),
    title() {
      return this.roleData.id ? '编辑角色' : '新增角色'
    }
  },
  created() {
    this.getCompanyInfo()
    this.getRoleList()
  },
  methods: {
    async getCompanyInfo() {
      this.formData = await getCompanyInfo(this.companyId)
    },
    async getRoleList() {
      const { rows, total } = await getRoleList(this.page)
      this.roleList = rows
      this.total = total
    },
    async deleteRole(id) {
      try {
        // 二次确认 需要catch 点击取消按钮时抛出的错误
        await this.$confirm('你确定要删除吗?')
        // 发送 api 请求
        await deleteRole(id)
        // 重新加载数据
        this.getRoleList()
        // 弹出提示
        this.$message.success('删除成功')
      } catch (error) {
        console.log(error)
      }
    },
    async editRole(id) {
      this.showDialog = true
      this.roleData = await getRoleDetail(id)
    },
    async btnOk() {
      try {
        await this.$refs.roleForm.validate()
        if (this.roleData.id) {
          await updateRole(this.roleData)
        } else {
          await addRole(this.roleData)
        }
        this.getRoleList()
        this.$message.success('操作成功')
        this.showDialog = false
      } catch (error) {
        console.log(error)
      }
    },
    btnCancel() {
      // 这是关闭弹窗是需要处理的数据
      // 重置表单数据和错误提示
      this.roleData = {
        name: '',
        description: ''
      }
      // 这个 reset 只能清理表单有绑定的数据
      // 回显时添加的属性就没办法了
      this.$refs.roleForm.resetFields()
      this.showDialog = false
    },
    currentChange(newPage) {
      this.page.page = newPage
      this.getRoleList()
    },
    sizeChange(newSize) {
      this.page.pagesize = newSize
      this.getRoleList()
    }
  }
}
</script>

<style>
</style>
