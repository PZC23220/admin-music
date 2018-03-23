<template>
	<div class="">
		<p class="pages_tab">当前页：歌单管理<i class="el-icon-arrow-right"></i>全部歌单</p>
		<!-- 筛选区域 -->
    <el-form label-width="80px" :inline="true">
        <el-form-item label="歌单标签">
		  <el-select v-model="Stag" clearable placeholder="歌单标签筛选">
		    <el-option
		      key="Hot"
		      label="热门歌单"
		      value="Hot">
		    </el-option>
		    <el-option
		      key="HotSinger"
		      label="人气歌手"
		      value="HotSinger">
		    </el-option>
		  </el-select>
		</el-form-item>
        <el-form-item label="歌单状态">
          <el-select v-model="Sstatus" clearable placeholder="歌单状态筛选">
            <el-option
              key="1"
              label="已上线"
              value="1">
            </el-option>
            <el-option
              key="0"
              label="已下线"
              value="0">
            </el-option>
          </el-select>
        </el-form-item>
		<el-form-item label="歌单名称">
			<el-input placeholder="歌单名称" v-model="Stitle"></el-input>
		</el-form-item>
        <el-form-item label="歌曲数目">
          <el-select v-model="Snums" clearable placeholder="歌单状态筛选">
            <el-option
              key="0"
              label="0"
              value="0">
            </el-option>
          </el-select>
        </el-form-item>
		<el-button type="success" icon="el-icon-search" @click="handleCurrentChange()">搜索</el-button>
		<el-button type="primary" style="float:right" icon="el-icon-edit" @click="editSong()">添加歌单</el-button>
    </el-form>
		<el-table
			align="center"
			header-align="center"
	    :data="songList"
	    height="calc(100vh - 270px)"
	    :row-class-name="tableRowClassName">
	    <el-table-column
	      prop="id"
	      label="ID"
	      width="60px">
	    </el-table-column>
	    <el-table-column
	      prop="title"
	      label="歌名">
	    </el-table-column>
	    <el-table-column
	      prop="description"
	      label="描述">
	    </el-table-column>
        <el-table-column
          prop="nums"
          label="歌曲数">
        </el-table-column>
	    <el-table-column
	      prop="TAG"
	      label="标签">
	      <template slot-scope="scope">
		    		<span v-if="scope.row.TAG == 'Hot'">热门歌单</span>
		    		<span v-if="scope.row.TAG == 'HotSinger'">人气歌手</span>
		    	</template>
	    </el-table-column>
	    <el-table-column
	      prop="img"
	      width="120px"
	      label="封面图">
	      <template slot-scope="scope">
	    		<img :src="scope.row.img" alt="" @click="showBigImg(scope.row.img)" class="song_img">
	    	</template>
	    </el-table-column>
	    <el-table-column
	      prop="original_id"
	      label="歌单链接">
	      <template slot-scope="scope">
	    		<a :href="'https://www.youtube.com/playlist?list='+scope.row.original_id" target="_blank" class="links">https://www.youtube.com/playlist?list={{scope.row.original_id}}</a>
	    	</template>
	    </el-table-column>
	    <el-table-column
		      fixed="right"
		      label="处理"
		      width="220">
		      <template slot-scope="scope">
		         <el-button plain type="success" v-if="scope.row.status == 1" @click="editStatus(0,scope.row.id)">已上线</el-button>
		         <el-button plain type="danger" v-if="scope.row.status == 0" @click="editStatus(1,scope.row.id)">已下线</el-button>
		         <el-button plain type="warning" @click="editSong(scope.row)">修 改</el-button>
		      </template>
		    </el-table-column>
	  </el-table>
	  <el-pagination
	  	:current-page="currentPage"
	  	background
	  	@current-change="handleCurrentChange"
	    layout="prev, pager, next"
	    :total="total">
	  </el-pagination>
        <!-- 查看banner大图 -->
	    <el-dialog
          title="查看大图"
          width="500px"
          :visible.sync="dialogVisible">
          <img :src="dialogImg" style="width: 100%;">
          <span slot="footer" class="dialog-footer">
            <el-button type="danger" @click="dialogVisible = false">关 闭</el-button>
          </span>
        </el-dialog>
        <!-- 下线歌单 -->
        <el-dialog
          width="500px"
          :title="title"
          :visible.sync="addVisible">
          <span slot="footer" class="dialog-footer">
            <el-button type="danger" @click="pushStatus()" :loading="loading2">确 定</el-button>
          </span>
        </el-dialog>
        <!-- 修改/添加歌单 -->
        <el-dialog
          :title="'编辑歌单'"
          :visible.sync="visible2">
          <el-form :rules="rules"label-width="80px">
	          <el-form-item label="歌单ID">
					    <el-input :disabled="true" v-model="song.id"></el-input>
					  </el-form-item>
					  <el-form-item label="歌单名称" prop="title">
					    <el-input v-model="song.title"></el-input>
					  </el-form-item>
					  <el-form-item label="歌单链接" prop="link">
					    <el-input v-model="song.link"></el-input>
					  </el-form-item>
					  <el-form-item label="歌单描述">
					    <el-input v-model="song.description"></el-input>
					  </el-form-item>
					  <el-form-item label="歌单标签">
              <el-radio-group v-model="song.TAG">
                <el-radio :label="'HotSinger'">人气歌手</el-radio>
                <el-radio :label="'Hot'">热门歌单</el-radio>
                <el-radio :label="''">其他</el-radio>
              </el-radio-group>
            </el-form-item>
					  <el-form-item label="封面图上传" prop="img">
					  	<el-upload class="avatar-uploader" :action="hosts" :show-file-list="false" :on-success="handleImg">
	            <img v-if="song.img" :src="song.img" class="avatar">
	            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
	            </el-upload>
					  </el-form-item>
					  <el-form-item label="中文描述">
					    <el-input v-model="song.original_name"></el-input>
					  </el-form-item>
					  <el-form-item label="是否上线">
              <el-radio-group v-model="song.status">
                <el-radio :label="0">否</el-radio>
                <el-radio :label="1">是</el-radio>
              </el-radio-group>
	           <!--  <el-switch
	              @change="changeStatus"
							  v-model="song.status"
							  active-color="#13ce66"
    						inactive-color="#ff4949"
							  active-value="1"
							  inactive-value="0">
							</el-switch> -->
            </el-form-item>
			  	</el-form>
          <span slot="footer" class="dialog-footer">
            <el-button type="success" @click="visible2 = false" :loading="loading2">取 消</el-button>
            <el-button type="danger" @click="pushSong()" :loading="loading2">确定</el-button>
          </span>
        </el-dialog>
	</div>
</template>
<script type="text/javascript">
	import http from '../../utils/http.js';
	require('../../utils/common.js');
	export default {
		data() {
			return {
				songList:[],
				dialogVisible: false,
				dialogImg :'',
				addVisible: false,
				loading2: false,
				visible2: false,
				currentPage: 1,
				id:'',
				total: 0,
				idolname: '',
                Snums: '',
				Stitle: '',
                Sstatus: '',
				title: '',
				Stag: '',
				hosts: 'http://opt.groupy.cn/api/fileupload',
				Status: 1,
				idolType: 'idol',
				song: {
					id: '',
          title: '',
          description: '',
          img: '',
          TAG: '',
          original_name: '',
          link: '',
          status: 1
        },
        rules: {
          title: [
            { required: true, message: '请输入歌单名称', trigger: 'blur' }
          ],
          link: [
            { required: true, message: '请输入歌单链接', trigger: 'blur' }
          ],
          img: [
            { required: true, message: '请上传封面图', trigger: 'blur' }
          ]
        },
			}
		},
		methods: {
			handleImg(res, file) {
        this.song.img = res.url;
      },
			tableRowClassName({row, index}) {
		        if(row.status == '0') {
		        	return 'del-row';
		        }
		          return '';
		    },
			showBigImg(val) {
        this.dialogImg = val;
        this.dialogVisible = true;
		    },
      editStatus(val,id) {
        this.addVisible = true;
        this.Status = val;
        this.id = id;
        if(val == 1) {
        	this.title = `你确定要上线ID为${id}这个歌单吗？？`
        }else {
        	this.title = `你确定要下线ID为${id}这个歌单吗？？`
        }
      },
      pushStatus() {
        var self = this;
        self.loading2 = true;
        http.get('/api/playlist/editStatus',{
        	params: {
        		id: self.id,
        		status: self.Status
        	}
        }).then(function(res){
	      	self.loading2 = false;
        	if(res.success) {
        		self.handleCurrentChange(self.currentPage);
		        self.addVisible = false
		      	if(self.Status == 0) {
		      		self.$message({
			          message: '😭，你再也不会在app里面看到这个歌单了！',
			          type: 'success'
			        });
		      	}else {
			      	self.$message({
			          message: '😃，你很快就可以在app里面看到这个歌单了！',
			          type: 'success'
			        });
		      	}
        	}else {
        		self.$message.error('服务器或者网络错误'+ res);
        	}
      	}).catch(err => {
      		self.loading2 = false;
      		self.$message.error('服务器或者网络错误'+ res);
      	})
      },
      handleCurrentChange(val) {
      	var self = this;
      	const loading = self.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
      	if(!val) {
      		self.currentPage = 1;
      	}else{
      		self.currentPage = val;
      	}
      	console.log(self.Stitle)
      	http.get('/api/playlist/list',{
      		params: {
            pageNum: 10,
      			page: self.currentPage,
      			TAG: self.Stag,
      			title: self.Stitle,
                status: self.Sstatus,
                nums: self.Snums
      		}
      	}).then(function(res){
      		console.log(res)
        	self.songList = res;
	        loading.close();
      	}).catch(err => {
      		self.$message.error('服务器或者网络错误'+ res);
      	})
        http.get('/api/playlist/count',{
            params: {
                TAG: self.Stag,
                title: self.Stitle,
                status: self.Sstatus,
                nums: self.Snums
            }
        }).then(function(res){
            console.log(res)
            self.total = res[0].count;
        }).catch(err => {
            self.$message.error('服务器或者网络错误'+ res);
        })
      },
      editSong(obj) {
      	this.visible2 = true;
      	if(obj) {
      		this.song = {
      			id: obj.id,
      			title: obj.title,
	          description: obj.description,
	          img: obj.img,
	          TAG: obj.TAG,
	          original_name: obj.original_name,
	          link: 'https://www.youtube.com/playlist?list=' + obj.original_id,
	          status: obj.status
      		}
      	}else {
      		this.song = {
      			id: '',
      			title: '',
	          description: '',
	          img: '',
	          TAG: '',
	          original_name: '',
	          link: '',
	          status: 1
      		}
      	}
      },
      pushSong() {
        var self = this;
        self.loading2 = true;
        if(self.song.title && self.song.link && self.song.img) {
	        let data_ = {
	        	id: self.song.id,
	        	title: self.song.title,
	          description: self.song.description,
	          img: self.song.img,
	          TAG: self.song.TAG,
	          original_name: self.song.original_name,
	          original_id: self.song.link.match(/.*list=(.*)&?.*/)[1],
	          status: self.song.status
	        }
	        http.post('/api/playlist/edit',data_).then(function(res){
		      	self.loading2 = false;
	        	if(res.success) {
	        		self.handleCurrentChange(self.currentPage);
			        self.visible2 = false
		      		self.$message({
			          message: '😄 你很快就可以看到你编辑的这个歌单了！！',
			          type: 'success'
			        });
	        	}else {
	        		self.$message.error('服务器或者网络错误'+ res);
	        	}
	      	}).catch(err => {
	      		self.loading2 = false;
	      		self.$message.error('服务器或者网络错误'+ res);
	      	})
        }else {
        	self.$message({
	          message: '😡 那么大的空看不到吗？？',
	          type: 'warning'
	        });
        }
      },
		},
		created: function(){
			var self = this;
			self.hosts = `http://${location.hostname}:4000/api/fileupload`;
    	   self.handleCurrentChange();
		}
	}
</script>
