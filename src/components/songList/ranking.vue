<template>
	<div class="">
		<p class="pages_tab">当前页：歌单管理<i class="el-icon-arrow-right"></i>榜单</p>
		<!-- 筛选区域 -->
		<el-form label-width="80px" :inline="true">
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
		<el-form-item label="歌曲名称">
			<el-input placeholder="歌曲名称" v-model="Stitle"></el-input>
		</el-form-item>
		<el-button type="success" icon="el-icon-search" @click="handleCurrentChange()">搜索</el-button>
		</el-form>
		<el-table
			align="center"
			header-align="center"
			:data="songList"
			height="calc(100vh - 270px)"
			:row-class-name="tableRowClassName">
			<el-table-column
				prop="id"
				label="ID">
			</el-table-column>
				<el-table-column
					prop="track_id"
					label="歌曲ID">
				</el-table-column>
			<el-table-column
				prop="title"
				label="歌名">
			</el-table-column>
			<el-table-column
				prop="channel_title"
				label="歌手">
			</el-table-column>
				<el-table-column
					prop="played"
					label="播放数">
				</el-table-column>
			<el-table-column
				prop="artwork_url"
				width="120px"
				label="封面图">
				<template slot-scope="scope">
					<img :src="scope.row.artwork_url" alt="" @click="showBigImg(scope.row.artwork_url)" class="song_img">
				</template>
			</el-table-column>
			<el-table-column
				prop="original_id"
				label="歌单链接">
				<template slot-scope="scope">
					<a :href="'https://www.youtube.com/watch?v='+scope.row.original_id" target="_blank" class="links">https://www.youtube.com/watch?v={{scope.row.original_id}}</a>
				</template>
			</el-table-column>
			<el-table-column
					fixed="right"
					label="处理"
					width="220">
					<template slot-scope="scope">
						 <el-button plain type="success" v-if="scope.row.status == 1" @click="editStatus(0,scope.row.track_id)">已上线</el-button>
						 <el-button plain type="danger" v-if="scope.row.status == 0" @click="editStatus(1,scope.row.track_id)">已下线</el-button>
						 <el-button plain type="warning" @click="editSong(scope.row)">编 辑</el-button>
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
					:title="'编辑歌曲'"
					:visible.sync="visible2">
					<el-form label-width="80px">
							<el-form-item label="歌曲ID">
								<el-input :disabled="true" v-model="song.id"></el-input>
							</el-form-item>
							<el-form-item label="歌曲名称" prop="title">
								<el-input v-model="song.title"></el-input>
							</el-form-item>
							<el-form-item label="歌手">
								<el-input v-model="song.channel_title"></el-input>
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
					channel_title: '',
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
        	this.title = `你确定要上线ID为${id}这个歌吗？？`
        }else {
        	this.title = `你确定要下线ID为${id}这个歌吗？？`
        }
      },
      pushStatus() {
        var self = this;
        self.loading2 = true;
        http.get('/api/mfm_track/edit_status',{
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
			          message: '😭，你再也不会在app里面看到这个歌了！',
			          type: 'success'
			        });
		      	}else {
			      	self.$message({
			          message: '😃，你很快就可以在app里面看到这个歌了！',
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
      editSong(obj) {
      	this.visible2 = true;
      	if(obj) {
      		this.song = {
	  			  id: obj.track_id,
	  			  title: obj.title,
	          channel_title: obj.channel_title,
      		}
      	}else {
      		this.song = {
      	     id: '',
      		  title: '',
	          channel_title: '',
      		}
      	}
      },
      pushSong() {
        var self = this;
        self.loading2 = true;
        if(self.song.title && self.song.channel_title) {
	        let data_ = {
	        	id: self.song.id,
            channel_title: self.song.channel_title,
            title: self.song.title,
	        }
	        http.post('/api/mfm_track/edit',data_).then(function(res){
		      	self.loading2 = false;
	        	if(res.success) {
	        		self.handleCurrentChange(self.currentPage);
			        self.visible2 = false
		      		self.$message({
			          message: '😄 你很快就可以看到你编辑的这个歌了！！',
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
			handleCurrentChange(val) {
				var self = this;
				if(!val) {
					self.currentPage = 1;
				}else{
					self.currentPage = val;
				}
				console.log(self.Stitle)
				http.get('/api/ranking/list',{
					params: {
						pageNum: 10,
						page: self.currentPage,
						title: self.Stitle,
            status: self.Sstatus,
					}
				}).then(function(res){
					console.log(res)
					self.songList = res;
				}).catch(err => {
					self.$message.error('服务器或者网络错误'+ res);
				})
				http.get('/api/ranking/count',{
						params: {
								nums: self.Snums
						}
				}).then(function(res){
						console.log(res)
						self.total = res[0].count;
				}).catch(err => {
						self.$message.error('服务器或者网络错误'+ res);
				})
			},
		},
		created: function(){
			var self = this;
			self.hosts = `http://${location.hostname}:4000/api/fileupload`;
				 self.handleCurrentChange();
		}
	}
</script>
