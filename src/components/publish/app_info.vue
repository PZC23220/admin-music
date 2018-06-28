<template>
	<div class="">
		<p class="pages_tab">当前页：发布管理<i class="el-icon-arrow-right"></i>首页团队推荐</p>
    <!-- 筛选区域 -->
    <el-form label-width="80px" :inline="true">
      <el-button type="primary" style="float:right;margin-bottom: 20px;" icon="el-icon-edit" @click="addApp()">添加新包</el-button>
    </el-form>
		<el-table
	    :data="transactionsList"
	    height="calc(100vh - 255px)">
	    <el-table-column
	      prop="id"
	      label="id">
	    </el-table-column>
      <el-table-column label="版本号" prop="version_number"></el-table-column>
      <el-table-column label="下载链接" prop="download_url"></el-table-column>
      <el-table-column label="大小" prop="package_size"></el-table-column>
      <el-table-column label="版本特性" prop="version_features"></el-table-column>
      <el-table-column label="更新时间"  width="140">
        <template slot-scope="scope">
          <span @click="">{{formatTime(scope.row.update_date)}}</span>
        </template>
      </el-table-column>
    </el-table>
     <el-pagination
      :current-page="currentPage"
      background
      @current-change="handleCurrentChange"
      layout="prev, pager, next, jumper"
      :total="total">
    </el-pagination>
	  <!-- 编辑团体 -->
    <el-dialog
      title="编辑团体"
      :visible.sync="dialogVisible" :modal-append-to-body="false">
      <el-form>
        <el-form-item label="ID">
          <el-input :disabled="true" v-model="app.id"></el-input>
        </el-form-item>
        <el-form-item label="版本号">
          <el-input v-model="app.version_number"></el-input>
        </el-form-item>
        <el-form-item label="版本特性">
          <el-input v-model="app.version_features"></el-input>
        </el-form-item>
        <el-form-item label="大小">
          <el-input :disabled="true" v-model="app.package_size"></el-input>
        </el-form-item>
        <el-form-item label="包链接">
          <el-input v-if="app.download_url" placeholder="ID" type="textarea" v-model="app.download_url" :disabled="true">
          </el-input>
        </el-form-item>
        <div>
          <el-upload
            class="upload-demo"
            drag
            :on-success="handleImg"
            :action="hosts">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip"  style="color:#f00" slot="tip">因为安装包有点大，所以上传时间会久一点。请耐心等待！不要中途放弃！！
            <br><b>⚠️注意：上传文件过程中进度显示100%并不代表成功了！！！<br>
⚠️当你看到100%消失了变成了上面的包链接地址也变了size也有了，那么恭喜你！传成功了！</b>
            <br><b>⚠️上传的包后缀是.apk，这个我希望你真的知道！！</b></div>
          </el-upload>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="success" :loading="loading2" @click="pushApp()">提 交</el-button>
        <el-button type="danger" :loading="loading2" @click="dialogVisible = false">关 闭</el-button>
      </span>
    </el-dialog>
	</div>
</template>
 <style type="text/css" scoped>
    .upload-demo {
        margin-left: 100px;
    }
 </style>
<script type="text/javascript">
	import http from '../../utils/http.js';
	require('../../utils/common.js');
	export default {
		data() {
			return {
				transactionsList:[],
				summaries: {},
				dialogVisible: false,
				currentPage: 1,
        loading2: false,
				total: 0,
        Sname: '',
        hosts: 'http://opt.groupy.cn/api/fileupload',
        Sfans: '',
        targetType: '',
        app: {
        	id: '',
          version_number: '',
          download_url: '',
          package_size: '',
          version_features: ''
        }
			}
		},
		methods: {
      handleImg(res, file) {
          this.app.download_url = res.url;
          this.app.package_size = ((file.size)/1048576).toFixed(2) + 'M';
        },
      formatTime(key) {
        let timer = new Date(key);
        return timer.Format('yyyy.MM.dd');
      },
    handleCurrentChange(val) {
      var self = this;
    	http.get('/api/app_info/list',{
        params: {
          page: self.currentPage,
          pageNum: 10,
          name: self.Sname
        }
      }).then(function(res){
        self.transactionsList = res.rows;
      	self.total = res.count;
        });
    },
    addApp(obj) {
    	this.dialogVisible = true;
    	if(obj) {
    		this.app = {
    			id: obj.id,
          version_number: obj.app_version,
          download_url: obj.download_url
    		}
    	}else {
        this.app = {
          id: '',
          version_number: '',
          download_url: '',
          package_size: '',
          version_features: ''
        }
      }
    },
    pushApp() {
    	var self = this;
        if(self.app.version_number && self.app.download_url && self.app.package_size && self.app.version_features ) {
    		  self.loading2 = true;
        	http.post('/api/app_info/edit', self.app).then(function(res){
          	if(res.success){
          		self.handleCurrentChange();
          		self.$message({
                message: '更新包成功了！！',
                type: 'success'
              });
              self.dialogVisible = false;
              self.loading2 = false;
          	}else {
          		self.$message.error('可能是你的破网断了，也可能是服务器重启了，等一下再试好吗？');
        			self.loading2 = false;
          	}
          });
        }else {
          self.$message({
            message: '😡 包没传完还是信息没填完？？',
            type: 'warning'
          });
        }

      }
		},
		created: function(){
      this.hosts = `http://${location.hostname}:4000/api/fileupload`;
			this.handleCurrentChange();
		}
	}
</script>
