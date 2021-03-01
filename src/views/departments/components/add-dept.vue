<template>
  <el-dialog
    :title="title"
    :visible="showDialog"
    @close="btnCancel"
  >
    <el-form ref="deptForm" :model="formData" :rules="rules" label-width="120px">
      <el-form-item
        label="部门名称"
        prop="name"
      >
        <el-input
          v-model="formData.name"
          style="width:90%"
          placeholder="1-50个字符"
        />
      </el-form-item>
      <el-form-item
        label="部门编号"
        prop="code"
      >
        <el-input
          v-model="formData.code"
          style="width:90%"
          placeholder="1-50个字符"
        />
      </el-form-item>
      <el-form-item
        label="部门负责人"
        prop="manager"
      >
        <el-select
          v-model="formData.manager"
          style="width:90%"
          placeholder="请选择"
          @focus="getEmployeeSimple"
          @blur="checkManager"
        >
          <el-option
            v-for="person in people"
            :key="person.id"
            :label="person.username"
            :value="person.username"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="部门简介"
        prop="introduce"
      >
        <el-input
          v-model="formData.introduce"
          style="width:90%"
          placeholder="1-50个字符"
        />
      </el-form-item>
    </el-form>
    <el-row slot="footer" class="dialog-footer">
      <el-button @click="btnCancel">取 消</el-button>
      <el-button type="primary" @click="btnOk">确 定</el-button>
    </el-row>
  </el-dialog>
</template>

<script>
import { getDepartments, addDepartments, getDepartDetail } from '@/api/departments'
import { getEmployeeSimple } from '@/api/employees'
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    node: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    const checkNameRepeat = async(rule, value, callback) => {
      // 检查是否还是同级(同一父部门)不能同名
      // 1. 获取全部部门数据
      const { depts } = await getDepartments()
      // 2. 检验是否同名
      const isRepet = depts.filter(item => {
        // 2.1 筛选出父部门相同的部门
        return item.pid === this.node.id
      }).some(item => {
        // 2.2 在这些结果中查出是否跟 value 相同
        return item.name === value
      })
      isRepet ? callback(new Error('同部门名字不能相同')) : callback()
    }
    const checkCodeRepet = async(rule, value, callback) => {
      const { depts } = await getDepartments()
      const isRepet = depts.some(item => item.code === value)
      isRepet ? callback(new Error('部门编码不能相同')) : callback()
    }
    return {
      formData: {
        name: '',
        code: '',
        manager: '',
        introduce: ''
      },
      rules: {
        name: [
          { required: true, message: '部门名称不能为空', trigger: 'blur' },
          { min: 1, max: 50, message: '部门名称要求 1-50 个字符', trigger: 'blur' },
          { validator: checkNameRepeat, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '部门编码不能为空', trigger: 'blur' },
          { min: 1, max: 50, message: '部门编码要求 1-50 个字符', trigger: 'blur' },
          { validator: checkCodeRepet, trigger: 'blur' }
        ],
        manager: [
          { required: true, message: '部门负责人不能为空', trigger: 'blur' }
        ],
        introduce: [
          { required: true, message: '部门介绍不能为空', trigger: 'blur' },
          { min: 1, max: 30, message: '部门介绍要求 1-300 个字符', trigger: 'blur' }
        ]
      },
      people: []
    }
  },
  computed: {
    title() {
      return this.formData.id ? '编辑部门' : '新增部门'
    }
  },
  methods: {
    async getEmployeeSimple() {
      const res = await getEmployeeSimple()
      this.people = res
    },
    async btnOk() {
      try {
        // 校验表单
        await this.$refs.deptForm.validate()
        // 发送请求
        console.log(this.formData)
        await addDepartments({ ...this.formData, pid: this.node.id })
        this.$message.success('操作成功')
        // 关闭当前弹窗
        // 不能直接改 props
        // this.showDialog = false
        // 应该通知父页面进行变更
        // this.$emit('xxxx')
        // 另外还可以用固定写法，配合父组件的 .sync 修饰符，方便修改
        this.$emit('update:showDialog', false)
        // 更新数据
        this.$emit('addDepts')
      } catch (error) {
        console.log(error)
      }
    },
    btnCancel() {
      // 对整个表单进行重置，将所有字段值重置为初始值并移除校验结果
      this.$refs.deptForm.resetFields()
      // 关闭窗口
      this.$emit('update:showDialog', false)
    },
    checkManager() {
      // console.log('失去焦点')
      setTimeout(() => {
        // validateField(props: array) 对部分表单字段进行校验的方法
        this.$refs.deptForm.validateField('manager')
      }, 50)
    },
    async getDepartDetail(id) {
      // 获取部门的详细信息
      this.formData = await getDepartDetail(id)
    }
  }
}
</script>

<style>

</style>
