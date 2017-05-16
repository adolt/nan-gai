<template>
  <div>
    <div class="search">
      搜索：
      <el-input placeholder="请输入关键字" size="large" icon="search" v-model="keyword" :on-icon-click="findBy">
      </el-input>
      <el-button @click="addOne" style="float: right;" type="primary">新增</el-button>
    </div>
    <!--<searchInput>
            <el-button @click="modal('new', $event)" style="float: right;" type="primary">新增</el-button>
          </searchInput>-->
    <candidateCard :data="tableData" @editIt="editIt()" @remove="remove()">
    </candidateCard>
    <el-pagination v-if="showPage" layout="prev, pager, next" :total="50" @current-change="loadPage">
    </el-pagination>
    <el-dialog :title="operation" v-model="visible">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="姓名" :label-width="formLabelWidth" prop="hipeName">
          <el-input v-model="form.hipeName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" :label-width="formLabelWidth" prop="hipeTel">
          <el-input v-model="form.hipeTel" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="意向岗位" :label-width="formLabelWidth" prop="hipeJob">
          <el-input v-model="form.hipeJob" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="面试时间" :label-width="formLabelWidth" prop="hipeTime">
          <el-date-picker v-model="form.hipeTime" type="date" placeholder="选择日期" :picker-options="pickerOptions">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="status === 'add' ? add() : update()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import candidateCard from './candidateCard';
import axios from 'axios';
import bus from '../../bus';

export default {
  components: {
    candidateCard
  },
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
      visible: false,
      operation: '',
      keyword: '',
      showPage: true,
      form: {
        hipeId: '',
        hipeName: '',
        hipeTel: '',
        hipeJob: '',
        hipeTime: ''
      },
      editIndex: undefined,
      formLabelWidth: '120px',
      tableData: [],
      rules: {
        hipeName: [
          { required: true, message: '请输入求职者姓名', trigger: 'blur' }
        ],
        hipeTel: [
          { required: true, message: '请输入求职者联系方式', trigger: 'blur' }
        ],
        hipeJob: [
          { required: true, message: '请输入应聘岗位', trigger: 'blur' }
        ],
        hipeTime: [
          { required: true, message: '请输入面试时间', trigger: 'blur' }
        ]
      }
    };
  },
  created() {
    axios.defaults.baseURL = 'http://localhost:8080';
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = 'http://localhost:3000';
    this.loadPage(1);
    bus.$on('editIt', this.editIt);
    bus.$on('remove', this.remove);
  },
  methods: {
    addOne() {
      this.status = 'add';
      this.modal('new');
    },
    editIt(index) {
      console.log(index);
      this.status = 'edit';
      this.editIndex = index;
      this.modal('edit', index);
    },
    findBy() {
      if (this.keyword === '') {
        this.loadPage(1);
        return;
      }
      axios.get('/hipe/findBy/' + this.keyword)
        .then((res) => {
          console.log(res.data);
          this.tableData = res.data;
        })
        .catch((err) => {
          if (err) this.$message.error('网络错误');
        });
    },
    modal(type, index) {
      this.operation = type === 'new' ? '新增求职者' : '求职者资料编辑';
      this.visible = true;
      if (type === 'edit') {
        this.form = Object.assign({}, this.tableData[index]);
      } else {
        this.form = {
          hipeId: '',
          hipeName: '',
          hipeTel: '',
          hipeJob: '',
          hipeTime: ''
        };
      }
    },
    add() {
      this.visible = false;
      axios.post('/hipe/add', this.form)
        .then((res) => {
          console.log(res.data);
          this.form = {};
          this.tableData.unshift(res.data);
          this.$message.success('添加招聘岗位成功');
        })
        .catch((err) => {
          if (err) this.$message.error('网络错误');
        });
    },
    update() {
      this.visible = false;
      axios.put('/hipe/update', this.form)
        .then((res) => {
          if (res.status === 200) {
            this.$message.success('修改崗位成功');
            console.log(this.tableData[this.editIndex], this.form);
            Object.assign(this.tableData[this.editIndex], this.form);
            this.tableData[this.editIndex].hipeTime = this.form.hipeTime.toLocaleDateString();
            this.form = {};
          }
        })
        .catch((err) => {
          if (err) this.$message.error('网络错误');
        });
    },
    remove(index) {
      let id = this.tableData[index].hipeId;
      axios.delete(`/hipe/delete/${id}`)
        .then((res) => {
          if (res.status === 200) {
            this.tableData.splice(index, 1);
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
      axios.get('/hipe/find/' + page)
        .then((res) => {
          console.log(res.data);
          this.tableData = res.data;
          this.tableData.map((cur) => {
            cur.hipeTime = new Date(cur.hipeTime).toLocaleDateString();
            return cur;
          });
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
.el-button+.el-button {
  margin-left: 10px;
  margin-right: 5px;
}

.search>.el-input {
  width: 20%;
  margin-bottom: 10px
}

.search>.el-button {
  margin-right: 20px;
}
</style>
