<template>
  <el-dialog
    title="新增部门"
    :visible="showDialog"
  >
    <el-form :model="formData" :rules="rules" label-width="120px">
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
        >
          <el-option
            label="负责人"
            value="负责人"
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
      <el-button>取 消</el-button>
      <el-button type="primary">确 定</el-button>
    </el-row>
  </el-dialog>
</template>

<script>
import { getDepartments } from '@/api/departments'
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
      const { depts } = await getDepartments()
      const isRepet = depts.filter(item => {
        return item.pid === this.node.id
      }).some(item => {
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
        introduce: [
          { required: true, message: '部门介绍不能为空', trigger: 'blur' },
          { min: 1, max: 30, message: '部门介绍要求 1-300 个字符', trigger: 'blur' }
        ]
      }
    }
  }
}
</script>

<style>

</style>
