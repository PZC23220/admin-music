<template>
	<div class="">
		<p class="pages_tab">当前页：歌单管理<i class="el-icon-arrow-right"></i>热门歌单</p>
		<!-- 筛选区域 -->
        <el-form label-width="80px" :inline="true">
          <el-form-item label="搜索歌单">
            <el-input placeholder="搜索歌单" v-model="Sname"></el-input>
          </el-form-item>
			<el-button type="primary" icon="search" @click="handleCurrentChange()">搜索</el-button>
        </el-form>
		<el-table
		    :data="transactionsList"
		    height="calc(100vh - 310px)">
		    <el-table-column
		      prop="id"
		      label="id">
		    </el-table-column>
		     <el-table-column label="标题" prop="user_type"></el-table-column>
		     <el-table-column label="标签" prop="user_type"></el-table-column>
		     <el-table-column label="播放次数" prop="user_type"></el-table-column>
		     <el-table-column
		      label="状态">
		      	<template slot-scope="scope">
		    		<span v-if="scope.row.active == 0">已上线</span>
		    		<span v-if="scope.row.active == 0">已下线</span>
		    		<span v-if="scope.row.active == 0">收录失败</span>
		    		<span v-if="scope.row.active == 0">收录中</span>
		    	</template>
		    </el-table-column>
		    <el-table-column
		      fixed="right"
		      label="处理"
		      width="200">
		      <template slot-scope="scope">
		         <span v-if="scope.row.active == 0">不可操作</span>
		         <el-button type="success" style="margin-bottom: 10px;" @click="addGift(scope.row.id)">下 线</el-button>
		         <el-button type="danger" style="margin-bottom: 10px;" @click="delIdol(scope.row.id,0)" v-if="scope.row.active == 1">上 线</el-button>
		         <el-button type="danger" style="margin-bottom: 10px;" @click="delIdol(scope.row.id,0)" v-if="scope.row.active == 1">删 除</el-button>
		         <el-button type="warning" style="margin-bottom: 10px;" @click="delIdol(scope.row.id,1)" v-if="scope.row.active == 0">修 改</el-button>
		      </template>
		    </el-table-column>
	    </el-table>
	    <!-- 分页信息 -->
	    <div class="block">
		  <el-pagination
		  	:current-page="currentPage"
		  	@current-change="handleCurrentChange"
		    layout="prev, pager, next"
		    :total="total">
		  </el-pagination>
		</div>
		<!-- 查看头像 -->
	    <el-dialog
          title="查看大图"
          :visible.sync="dialogVisible" :modal-append-to-body="false">
          <img :src="dialogImg" style="width: 100%;">
          <span slot="footer" class="dialog-footer">
            <el-button type="danger" @click="dialogVisible = false">关 闭</el-button>
          </span>
        </el-dialog>
	</div>
</template>
<style type="text/css" lang="scss" scoped>
	.avatar {
		width: 30px;height: 30px;border-radius: 50%;
	}
	.total_number {
		overflow: hidden;
		span {
			display: inline-block;
			padding: 20px;
			background: #eee;
			border-radius: 6px;
			min-width: 150px;
			text-align: center;
			margin: 10px;
		}
	}
</style>
<script type="text/javascript">
	import http from '../../utils/http.js';
	require('../../utils/common.js');
	export default {
		data() {
			return {
				Sname: '',
				transactionsList:[],
				summaries: {},
				dialogVisible: false,
				dialogImg: '',
				addVisible: false,
				currentPage: 1,
				total: 0,
                Sidol: '',
                Sfans: '',
                targetType: ''
			}
		},
		methods: {
	        handleCurrentChange(val) {
	        	var self = this;
	        	if(val) {
	        		self.currentPage = val;
	        	}else {
	        		self.currentPage = 1;
	        	}
	        	http.get('/api/transactions', {
	                params:{
	                    page: self.currentPage,
	                    idolId: self.Sidol,
	                    fansId: self.Sfans,
	                    targetType: self.targetType
	                }
	            }).then(function(res){
	                self.transactionsList = res.data;
	                self.total = res.total;
	            });
	        },
	        formatTime(key) {
                  let timer = new Date(key);
                  return timer.Format('yyyy.MM.dd hh:mm:ss');
            },
            showBigImg(avatar) {
            	this.dialogImg = avatar;
            	this.dialogVisible = true
            }
		},
		created: function(){
			var self = this;
		}
	}
</script>