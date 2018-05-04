<template>
	<div class="">
		<p class="pages_tab">当前页：歌单管理<i class="el-icon-arrow-right"></i>全部歌曲</p>
		<!-- 筛选区域 -->
    <el-form label-width="80px" :inline="true">
      <el-form-item label="歌曲状态">
        <el-select v-model="Sstatus" clearable placeholder="歌曲状态筛选">
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
  		<el-form-item label="关键词">
  			<el-input placeholder="关键词" v-model="Stitle"></el-input>
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
	      prop="keyword"
	      label="关键词">
	    </el-table-column>
      <el-table-column
        prop="sum"
        label="搜索次数">
      </el-table-column>
	    <el-table-column
	      prop="position"
	      label="位置">
	    </el-table-column>
      <el-table-column
        label="创建时间">
        <template slot-scope="scope">
          <span>{{formatTime(scope.row.create_time)}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="更新时间">
        <template slot-scope="scope">
          <span>{{formatTime(scope.row.update_time)}}</span>
        </template>
      </el-table-column>
	    <el-table-column
	      prop="icon"
	      width="120px"
	      label="封面图">
	      <template slot-scope="scope">
	    		<img :src="scope.row.icon" alt="" @click="showBigImg(scope.row.icon)" class="song_img">
	    	</template>
	    </el-table-column>
      <el-table-column
        label="状态">
        <template slot-scope="scope">
          <span v-if="scope.row.active == 1">已上线</span>
           <span v-else style="color: #f00;">已下线</span>
        </template>
      </el-table-column>
	    <!-- <el-table-column
		      fixed="right"
		      label="处理"
		      width="220">
		      <template slot-scope="scope">
		         <el-button plain type="success" v-if="scope.row.active == 1" @click="editStatus(0,scope.row.id)">已上线</el-button>
		         <el-button plain type="danger" v-if="scope.row.active == 0" @click="editStatus(1,scope.row.id)">已下线</el-button>
		         <el-button plain type="warning" @click="editSong(scope.row)">修 改</el-button>
		      </template>
		    </el-table-column> -->
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
          channel_title: '',
        },
			}
		},
		methods: {
      formatTime(value) {
        let timer = new Date(value);
        return timer.Format('yyyy.MM.dd hh:mm');
      },
			handleImg(res, file) {
            this.song.img = res.url;
          },
			tableRowClassName({row, index}) {
        console.log(row)
        if(row.active == '0') {
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
      handleCurrentChange(val) {
        var self = this;
        if(!val) {
          self.currentPage = 1;
        }else{
          self.currentPage = val;
        }
        console.log(self.Stitle)
        http.get('/api/search_keywords/list',{
          params: {
            pageNum: 10,
            page: self.currentPage,
            keyword: self.Stitle,
            active: self.Sstatus
          }
        }).then(function(res){
          console.log(res)
            self.songList = res.rows;
          self.total = res.count;
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
