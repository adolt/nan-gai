<template>
  <div>
    <el-button @click="addOne" type="primary" style="display:block; position: relative; left:1390px; margin-bottom:6px;">新增</el-button>
    <departmentCard v-for="(depart, index) in tableData" key="depart.name" :depart="depart">
      <el-button @click="editIt(index)" style="float: right;" type="primary">修改</el-button>
    </departmentCard>
    <el-pagination layout="prev, pager, next" :total="50" @current-change="loadPage">
    </el-pagination>
    <el-dialog :title="operation" v-model="visible">
      <el-form :model="form">
        <el-form-item label="部门" :label-width="formLabelWidth">
          <el-input v-model="form.orga.organName" auto-complete="off" :disabled="status === 'edit'" required></el-input>
        </el-form-item>
        <el-form-item label="部门岗位" :label-width="formLabelWidth" v-for="(job, index) in form.orgJobs" key="job.jobId">
          <el-input v-model="job.jobName" auto-complete="off">
            <el-button slot="append" type="danger" icon="delete" size="small" @click="form.orgJobs.splice(index, 1)"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth">
          <el-button type="success" icon="plus" @click="form.orgJobs.push({'jobId': null, 'jobName': '', 'organId': form.orga.organId})">新增</el-button>
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
import departmentCard from './departmentCard';
import axios from 'axios';

export default {
  components: {
    departmentCard
  },

  data() {
    return {
      tableData: [],
      visible: false,
      status: '',
      operation: '',
      formLabelWidth: '120px',
      form: {
        orga: {
          organId: null,
          organName: ''
        },
        orgJobs: []
      }
    };
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
      console.log(index);
      this.status = 'edit';
      this.editIndex = index;
      this.modal('edit', index);
    },
    modal(type, index) {
      this.operation = type === 'new' ? '添加公司部门' : '编辑公司部门';
      this.visible = true;
      if (type === 'edit') {
        this.form = Object.assign({}, this.tableData[index]);
      } else {
        this.form = {
          orga: {
            organId: null,
            organName: ''
          },
          orgJobs: []
        };
      }
    },
    add() {
      this.visible = false;

      this.tableData.unshift(this.form);
      axios.post('/organ/add', this.form.orga)
        .then((res) => {
          this.tableData[0].orga.organId = res.organId;
          this.form.orgJobs = this.form.orgJobs.map((cur) => {
            cur.organId = res.data.organId;
            return cur;
          });
          return axios.post('/job/add', this.form.orgJobs);
          // console.log(res.data);
          // this.form = {};
          // this.tableData.unshift(res.data);
          // this.$message.success('添加公司部门成功');
        })
        .then(() => {
          this.$message.success('添加公司部门成功');
        })
        .catch((err) => {
          this.tableData.shift();
          if (err) this.$message.error('网络错误');
        });
    },
    update() {
      this.visible = false;
      axios.put('/job/update', this.form.orgJobs)
        .then((res) => {
          if (res.status === 200) {
            this.$message.success('修改公司部门成功');
            Object.assign(this.tableData[this.editIndex], this.form);
            this.form = {
              orga: {
                organId: null,
                organName: ''
              },
              orgJobs: []
            };
          }
        })
        .catch((err) => {
          if (err) this.$message.error('网络错误');
        });
    },
    loadPage(i) {
      let page = i - 1;
      console.log(page);
      axios.get('/organ/find/' + page)
        .then((res) => {
          console.log(res.data);
          this.tableData = res.data.map((cur) => {
            let [organId, organName] = cur.orga.slice(14, -1).split(', ');
            organId = organId.split('=')[1];
            organName = organName.split('=')[1];
            cur.orga = {
              organId,
              organName
            };
            return cur;
          });
          // this.tableData = res.data;
        })
        .catch((err) => {
          if (err) this.$message.error('网络错误');
        });
    }
  }
};
</script>

<style scoped>
.el-button+.el-button {
  margin-left: 10px;
  margin-right: 5px;
}
</style>
