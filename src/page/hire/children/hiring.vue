<template>
  <div>
    <div class="search">
      搜索：
      <el-input placeholder="请输入关键字" size="large" icon="search" v-model="keyword" :on-icon-click="findBy">
      </el-input>
      <el-button @click="addOne" style="float: right;" type="primary">新增</el-button>
    </div>
  
    <hiringCard v-for="(item, index) in hireInfo" :title="item.jobName" :description="item.jobDisc" @remove="remove(index)" @edit="editIt(index)" :key="item.hireId">
    </hiringCard>
  
    <el-pagination v-if="showPage" layout="prev, pager, next" :total="50" @current-change="loadPage">
    </el-pagination>
  
    <el-dialog :title="operation" v-model="visible">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="职位名称" :label-width="formLabelWidth" prop="jobName">
          <el-input v-model="form.jobName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="部门" :label-width="formLabelWidth" prop="organName">
          <el-input v-model="form.organName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="薪资范围" :label-width="formLabelWidth" prop="salaryRang">
          <el-input v-model="form.salaryRang" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="详细描述" :label-width="formLabelWidth" prop="jobDisc">
          <el-input v-model="form.jobDisc" type="textarea" :rows="3" placeholder="请输入描述内容"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="status === 'add' ? add() : update() ">确定修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import hiringCard from './hiringCard';
import axios from 'axios';

export default {
  data() {
    return {
      visible: false,
      operation: '',
      hireInfo: [],
      status: '',
      editIndex: '',
      keyword: '',
      showPage: true,
      form: {
        jobName: '',
        organName: '',
        salaryRang: '',
        jobDisc: ''
      },
      formLabelWidth: '120px',
      rules: {
        jobName: [
          { required: true, message: '请输入岗位名称', trigger: 'blur' }
        ],
        organName: [
          { required: true, message: '请输入所属部门', trigger: 'blur' }
        ],
        salaryRang: [
          { required: true, message: '请输入薪资范围', trigger: 'blur' }
        ],
        jobDisc: [
          { required: true, message: '请输入岗位描述信息', trigger: 'blur' }
        ]
      }
    };
  },
  components: {
    hiringCard
  },
  created() {
    axios.defaults.baseURL = 'http://localhost:8080';
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = 'http://localhost:3000';
    this.loadPage(1);
  },
  methods: {
    addOne() {
      this.status = 'add';
      this.modal('new');
    },
    editIt(index) {
      this.status = 'edit';
      this.editIndex = index;
      this.modal('edit', index);
    },
    findBy() {
      if (this.keyword === '') {
        this.loadPage(1);
        return;
      }
      axios.get('/hire/findBy/' + this.keyword)
        .then((res) => {
          console.log(res.data);
          this.hireInfo = res.data;
        })
        .catch((err) => {
          if (err) this.$message.error('网络错误');
        });
    },
    modal(type, index) {
      this.operation = type === 'new' ? '新增在招岗位' : '编辑在招岗位';
      this.visible = true;
      if (type === 'edit') {
        this.form = Object.assign({}, this.hireInfo[index]);
      } else {
        this.form = {
          hireId: '',
          jobName: '',
          organName: '',
          salaryRang: '',
          jobDisc: ''
        };
      }
    },
    add() {
      this.visible = false;
      axios.post('/hire/add', this.form)
        .then((res) => {
          console.log(res.data);
          this.form = {};
          this.hireInfo.unshift(res.data);
          this.$message.success('添加招聘岗位成功');
        })
        .catch((err) => {
          if (err) this.$message.error('网络错误');
        });
    },
    update() {
      this.visible = false;
      axios.put('/hire/update', this.form)
        .then((res) => {
          if (res.status === 200) {
            this.$message.success('修改崗位成功');
            Object.assign(this.hireInfo[this.editIndex], this.form);
            this.form = {};
          }
        })
        .catch((err) => {
          if (err) this.$message.error('网络错误');
        });
    },
    remove(index) {
      let id = this.hireInfo[index].hireId;
      axios.delete(`/hire/delete/${id}`)
        .then((res) => {
          if (res.status === 200) {
            this.hireInfo.splice(index, 1);
            this.$message.success('删除成功');
          }
        })
        .catch((err) => {
          if (err) this.$message.error('网络错误');
        });
    },
    loadPage(i) {
      let page = i - 1;
      console.log(page);
      axios.get('/hire/find/' + page)
        .then((res) => {
          console.log(res.data);
          this.hireInfo = res.data;
        })
        .catch((err) => {
          if (err) this.$message.error('网络错误');
        });
    }
  },
  watch: {
    keyword(val) {
      this.showPage = val === '';
      if (val === '') {
        this.loadPage(1);
      }
    }
  }
};
</script>

<style scoped>
.search>.el-input {
  width: 20%;
  margin-bottom: 10px
}

.search>.el-button {
  margin-right: 20px;
}
</style>
