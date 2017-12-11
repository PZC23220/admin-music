<template>
	<div class="">
		<p class="pages_tab">当前页：用户管理<i class="el-icon-arrow-right"></i>爱豆管理</p>
        <!-- 筛选区域 -->
        <el-form label-width="80px" :inline="true">
          <el-form-item label="爱豆昵称">
            <el-input placeholder="爱豆昵称" v-model="Snickname"></el-input>
          </el-form-item>
		  <el-form-item label="爱豆类型">
			  <el-select v-model="SidolType" clearable placeholder="视频状态筛选">
			    <el-option
			      key="groupy"
			      label="Groupy内测"
			      value="groupy">
			    </el-option>
			    <el-option
			      key="idol"
			      label="真·爱豆"
			      value="idol">
			    </el-option>
			    <el-option
			      key="passerby"
			      label="路人甲"
			      value="passerby">
			    </el-option>
			  </el-select>
			</el-form-item>
			<el-button type="primary" icon="search" @click="handleCurrentChange()">搜索</el-button>
        </el-form>
		<el-table
			:default-sort = "{prop: 'date', order: 'descending'}"
		    :data="idolList"
		    :row-class-name="tableRowClassName"
		    height="calc(100vh - 310px)">
		    <el-table-column
		      fixed
		      prop="id"
		      label="id"
		      width="80">
		    </el-table-column>
		    <el-table-column
		      prop="nickname"
		      label="昵称">
		    </el-table-column>
		    <el-table-column
		      label="头像"
		      width="120">
		      <template slot-scope="scope">
	              <img :src="scope.row.avatar" @click="showBigImg(scope.row.avatar)" style="padding: 5px 5px 0 0;width: 100%;box-sizing: border-box;">
	            </template>
		    </el-table-column>
		    <el-table-column
		      label="idol类型">
		      	<template slot-scope="scope">
		    		<el-button type="primary" @click="editIdolType(scope.row.id,scope.row.branch_office)" v-if="scope.row.branch_office == 'groupy'">Groupy内测</el-button>
		    		<el-button type="primary" @click="editIdolType(scope.row.id,scope.row.branch_office)" v-if="scope.row.branch_office == 'idol'">真·爱豆</el-button>
		    		<el-button type="primary" @click="editIdolType(scope.row.id,scope.row.branch_office)" v-if="scope.row.branch_office == 'passerby'">路人甲</el-button>
		    		<el-button type="primary" @click="editIdolType(scope.row.id,scope.row.branch_office)" v-if="scope.row.branch_office == 'N/A'">添加标识</el-button>
		    	</template>
		    </el-table-column>
		    <el-table-column label="所属团体" prop="organizationName"></el-table-column>
		    <!-- <el-table-column label="会费（月／季／半年）(✔️️首月免费)">
		    	<template slot-scope="scope">
		    		<span v-if="scope.row.gprice_month">{{scope.row.gprice_month}}／</span>
		    		<span v-if="scope.row.gprice_season">{{scope.row.gprice_season}}／</span>
		    		<span v-if="scope.row.gprice_halfyear">{{scope.row.gprice_halfyear}}</span>
		    		&nbsp;<i v-if="scope.row.free_first_month == 1" title="首页免费" alt="首页免费" class="el-icon-check" style="color: #13CE66"></i>
		    	</template>
		    </el-table-column> -->
		    <el-table-column label="粉丝总数 real／fake">
		    	<template slot-scope="scope">
		    		<el-button type="primary" @click="seeFans(scope.row.id)">{{scope.row.fans_count_real}}／{{scope.row.fans_count_fake}}</el-button>
		    	</template>
		    </el-table-column>
		    <el-table-column label="关注总数 real／fake">
		    	<template slot-scope="scope">
		    		<el-button type="primary" @click="seeAttention(scope.row.id)">{{scope.row.fans_attention_real}}／{{scope.row.fans_attention_fake}}</el-button>
		    	</template>
		    </el-table-column>
		    <el-table-column label="SNS">
		    	<template slot-scope="scope">
		    		<a :href="'https://twitter.com/intent/user?user_id='+scope.row.sns_uid_tw" target="_block" v-if="scope.row.sns_uid_tw">twitter</a>&nbsp;&nbsp;
		    		<a :href="'https://facebook.com/'+scope.row.sns_uid_fb" target="_block" v-if="scope.row.sns_uid_fb">facebook</a>
		    	</template>
		    </el-table-column>
		    <el-table-column
		      fixed="right"
		      label="处理"
		      width="200">
		      <template slot-scope="scope">
		         <el-button type="warning" style="margin-bottom: 10px;margin-top: 10px;" @click="addFans(scope.row.id,scope.row.free_first_month)">加&nbsp;&nbsp;粉</el-button>
		         <el-button type="warning" style="margin-bottom: 10px;margin-top: 10px;background:#9C0DA4;border-color: #9C0DA4;" @click="addAttention(scope.row.id)">关&nbsp;&nbsp;注</el-button>
		         <el-button type="primary" style="margin-bottom: 10px;margin-left: 0px;margin-top: 10px;" @click="addMessage(scope.row.id)">留&nbsp;&nbsp;言</el-button>
		         <el-button type="success" style="margin-bottom: 10px;" @click="addGift(scope.row.id)">应&nbsp;&nbsp;援</el-button>
		         <el-button type="danger" style="margin-bottom: 10px;" @click="delIdol(scope.row.id,0)" v-if="scope.row.active == 1">禁&nbsp;&nbsp;用</el-button>
		         <el-button type="warning" style="margin-bottom: 10px;" @click="delIdol(scope.row.id,1)" v-if="scope.row.active == 0">启&nbsp;&nbsp;用</el-button>
		         <!-- <span v-if="scope.row.active == 0">已下线</span> -->
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
		<!-- 加粉 -->
	    <el-dialog :title="'添加虚拟粉丝'" top="80px" :modal-append-to-body="false" width="70%" :visible.sync="addVisible">
          <el-input placeholder="爱豆ID" v-model="fansInfo.id" :disabled="true">
            <template slot="prepend">爱豆ID</template>
          </el-input>
          <div>
          	选择虚拟粉丝：
          	<el-select multiple v-model="fansInfo.fans" placeholder="请选择粉丝">
			    <el-option
			      v-for="item in fansListFree"
			      :key="item.id"
			      :label="item.nickname"
			      :value="item.id">
			    </el-option>
			  </el-select>
          </div>
          <div>
          	选择入会时间：
          	<el-select v-model="fansInfo.time" placeholder="请选择入会时间">
			    <el-option
			      key="0"
			      label="7天限免"
			      value="0"
			      v-if="free_first_month">
			    </el-option>
			    <el-option
			      key="1"
			      label="一个月"
			      value="1">
			    </el-option>
			    <el-option
			      key="2"
			      label="三个月"
			      value="2">
			    </el-option>
			    <el-option
			      key="3"
			      label="六个月"
			      value="3">
			    </el-option>
			  </el-select>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button type="success" @click="pushFans()" :loading="loading2">加 粉</el-button>
            <el-button type="danger" @click="addVisible = false">取 消</el-button>
          </span>
        </el-dialog>
        <!-- 添加关注 -->
	    <el-dialog :title="'添加关注'" top="80px" :modal-append-to-body="false" width="70%" :visible.sync="addVisible2">
          <el-input placeholder="爱豆ID" v-model="fansInfo2.id" :disabled="true">
            <template slot="prepend">爱豆ID</template>
          </el-input>
          <div>
          	选择虚拟粉丝：
          	<el-select multiple v-model="fansInfo2.fans" placeholder="请选择粉丝">
			    <el-option
			      v-for="item in fansListFree"
			      :key="item.id"
			      :label="item.nickname"
			      :value="item.id">
			    </el-option>
			  </el-select>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button type="success" @click="pushAttention()" :loading="loading2">关 注</el-button>
            <el-button type="danger" @click="addVisible2 = false">取 消</el-button>
          </span>
        </el-dialog>
		<!-- 添加留言 -->
	    <el-dialog
          title="添加留言"
          width="70%"
          top="80px"
          :visible.sync="dialogVisible" :modal-append-to-body="false" :before-close="handleClose">
          <p>如果idol没有虚拟粉丝，那么你应该先去给她加粉，有了虚拟粉丝才能在这留言</p>
          <el-input placeholder="爱豆ID" v-model="messageInfo.id" :disabled="true">
            <template slot="prepend">爱豆ID</template>
          </el-input>
          <div v-for="(item,idx) in myFansList" v-if="idx < 5">
          	<img :src="item.avatar" width="50px">
          	<textarea class="msg" :data-id="item.id" placeholder="请输入内容" style="width: calc(100% - 70px);float: right;border: 1px solid rgb(191, 203, 217); border-radius: 4px;height: 50px;padding: 5px;"></textarea>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button type="danger" @click="handleClose()">关 闭</el-button>
            <el-button type="success" @click="pushMessage()" :disabled="fake" :loading="loading2">提交留言</el-button>
          </span>
        </el-dialog>
        <!-- 应援 -->
        <el-dialog
          title="应援"
          top="80px"
          :visible.sync="visible2" :modal-append-to-body="false">
          <p>如果idol没有虚拟粉丝，那么你应该先去给她加粉，有了虚拟粉丝才能在这应援</p>
          <el-input placeholder="爱豆ID" v-model="giftInfo.id" :disabled="true">
            <template slot="prepend">爱豆ID</template>
          </el-input>
          <div>
	          	选择粉丝：
	          	<el-select v-model="giftInfo.fans" placeholder="请选择粉丝">
				    <el-option
				      v-for="item in myFansList"
				      :key="item.id"
				      :label="item.nickname"
				      :value="item.id">
				    </el-option>
				</el-select>
			</div>
			<div>
				选择礼物：
				<el-select v-model="giftInfo.gift" placeholder="请选择礼物">
				    <el-option
				      v-for="item in giftList"
				      :key="item.id"
				      :label="item.name"
				      :value="item.id">
				    </el-option>
				</el-select>
			</div>
			<div>
				礼物数量：
				<el-input-number v-model="giftInfo.nums" :min="1"></el-input-number>
			</div>
          <span slot="footer" class="dialog-footer">
            <el-button type="danger" @click="visible2 = false">关 闭</el-button>
            <el-button type="success" @click="pushGift()" :disabled="fake" :loading="loading2">应 援</el-button>
          </span>
        </el-dialog>
        <!-- 下线爱豆 -->
	    <el-dialog
		  title="你点了禁用idol"
		  top="80px"
		  :visible.sync="visible"
		  :modal-append-to-body="false">
		  <span>你确定要下线这个idol(idolID{{idolId}})吗？？？</span>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="visible = false">取 消</el-button>
		    <el-button type="danger" @click="sureDelIdol()" :loading="loading2">确 定</el-button>
		  </span>
		</el-dialog>
		<!-- 查看头像 -->
	    <el-dialog
          title="查看大图"
          top="80px"
          width="500px"
          :visible.sync="visible3" :modal-append-to-body="false">
          <img :src="dialogImg" style="width: 100%;">
          <span slot="footer" class="dialog-footer">
            <el-button type="danger" @click="visible3 = false">关 闭</el-button>
          </span>
        </el-dialog>
        <!-- 修改idol标识 -->
	    <el-dialog
          title="修改idol标识"
          :visible.sync="visible4" :modal-append-to-body="false">
          <template>
			  <el-radio class="radio" v-model="idolType" label="idol">真·爱豆</el-radio>
			  <el-radio class="radio" v-model="idolType" label="groupy">Groupy内测</el-radio>
			  <el-radio class="radio" v-model="idolType" label="passerby">路人甲</el-radio>
		  </template>
          <span slot="footer" class="dialog-footer">
            <el-button type="danger" @click="visible4 = false">关 闭</el-button>
            <el-button type="success" @click="pushIdolType()">提 交</el-button>
          </span>
        </el-dialog>
        <!-- 查看idol真假粉 -->
	    <el-dialog
          title="查看idol真假粉"
          :visible.sync="visible5" :modal-append-to-body="false">
          <div style="overflow:hidden;">
	          <ul style="float: left;width:47%;line-height: 30px;border-right: 1px solid #000;">
	          	<h3>真粉</h3>
	          	<li v-for="fans in realFansList">{{fans.id}}&nbsp;&nbsp;&nbsp;&nbsp;{{fans.nickname}}</li>
	          </ul>
	          <ul style="float: right;width:47%;line-height: 30px;list-style: none;">
	          	<h3>假粉</h3>
	          	<li v-for="fans in fakeFansList">{{fans.id}}&nbsp;&nbsp;&nbsp;&nbsp;{{fans.nickname}}</li>
	          </ul>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button type="danger" @click="visible5 = false">关 闭</el-button>
          </span>
        </el-dialog>
	</div>
</template>
<script type="text/javascript">
	import http from '../../utils/http.js';
	require('../../utils/common.js');
	import $ from 'n-zepto';
	export default {
		data() {
			return {
				idolList:[],
				dialogVisible: false,
				dialogImg :'',
				dialogH5: false,
				dialogURL: '',
				addVisible: false,
				addVisible2: false,
				loading2: false,
				currentPage: 1,
				visible: false,
				visible2: false,
				visible3: false,
				visible4: false,
				visible5: false,
				fake: true,
				total: 0,
				idolId: '',
				active: 0,
				free_first_month: false,
				idolType: '',
				giftList: [],
				fansList: [],
				fansList2: [],
				myFansList: [],
				fansListFree: [],
				host_: 'http://admin.groupy.cn/',
				fansInfo: {
	                id: '',
	                time: '1',
	                fans: [],
	                gprice: 0
                },
                fansInfo2: {
	                id: '',
	                fans: []
                },
                messageInfo: {
                	id: ''
                },
                giftInfo: {
                	id: '',
                	fans: '',
                	gift: '',
                	nums: 1
                },
                Snickname: '',
                SidolType: '',
                fakeFansList:[],
                realFansList:[]
			}
		},
		methods: {
			seeFans(idolId) {
				var self = this;
				http.get(`/api/group_fans_item/list?type=fake&idol_id=${idolId}`).then(function(res){
		        	if(res.length > 0) {
		        		self.fakeFansList = res;
		        	}else {
		        		self.fakeFansList = [];
		        	}
		      	})
		      	http.get(`/api/group_fans_item/list?type=real&idol_id=${idolId}`).then(function(res){
		        	if(res.length > 0) {
		        		self.realFansList = res;
		        	}else {
		        		self.realFansList = [];
		        	}
		      	})
		      	self.visible5 = true;
			},
			seeAttention(idolId) {
				var self = this;
				http.get(`/api/idol_follows/list?type=fake&idol_id=${idolId}`).then(function(res){
		        	if(res.length > 0) {
		        		self.fakeFansList = res;
		        	}else {
		        		self.fakeFansList = [];
		        	}
		      	})
		      	http.get(`/api/idol_follows/list?type=real&idol_id=${idolId}`).then(function(res){
		        	if(res.length > 0) {
		        		self.realFansList = res;
		        	}else {
		        		self.realFansList = [];
		        	}
		      	})
		      	self.visible5 = true;
			},
			tableRowClassName({row, index}) {
		        if (row.active != 1) {
		            return 'del-row';
		        }
		          return '';
		    },
		    updataStatus(val,id) {
	          var self = this;
	          self.loading2 = true;
	          var nums;
	          if(val == 0) {
	            nums = 1;
	          }else {
	            nums = 0;
	          }
	          http.get('/api/shows/edit_status',{
	            params: {
	              id: id,
	              active: nums
	            }
	          }).then(function(res){
	            self.loading2 = false;
	            if(res.success){
	              self.$message({
	                message: '好了，已经帮你加到数据库了，上线/下线活动成功',
	                type: 'success'
	              });
	              // 刷新当前页面数据
	              http.get('/api/shows/list').then(function(data){
	                console.log(data);
	                self.activityList = data;
	              })
	            }else{
	                self.$message.error('不知道为什么，上线/下线活动失败了');
	            }
	          }).catch(function(err){
	            self.loading2 = false;
	            self.$message.error('可能是你的破网断了，也可能是服务器重启了，等一下再试好吗？');
	          });
	        },
	        addFans(val,free_first_month) {
	        	var self = this;
	            self.addVisible = true;
	            self.fansInfo.id = val;
	            if(free_first_month == 1) {
	            	self.free_first_month = true;
	            }else {
	            	self.free_first_month = false;
	            }
	            http.get('/api/group_fans_item/select',{
	            	params: {
	            		idol_id: val
	            	}
	            }).then(function(res){
		        	if(res.length > 0) {
		        		for(let i in self.fansListFree) {
		        			for(let j in res) {
		        				if(self.fansListFree[i].id == res[j]) {
		        					self.fansListFree.splice(i, 1);
		        				}
		        			}
		        		}
		        	}
		      	})
	        },
	        addAttention(val) {
	        	var self = this;
	            self.addVisible2 = true;
	            self.fansInfo2.id = val;
	        },
	        addMessage(val) {
	        	var self = this;
	            this.dialogVisible = true;   
	            this.messageInfo.id = val;
	             $('.msg').val('');
	            http.get(self.host_ + 'api/v1/idols/'+ val +'/fans?type=fake').then(function(res){
		        	if(res.length > 0) {
		        		self.fake = false;
		        		var arr = res.sort(function(){ return 0.5 - Math.random(); }); 
		        		self.myFansList = arr;
		        		console.log(self.myFansList)
		        	}
		      	}).catch(function(err){
		        	console.log(err);
		      	});
	        },
	        addGift(val) {
	        	var self = this;
	            this.visible2 = true;
	            this.giftInfo.id = val;
	            http.get(self.host_ + 'api/v1/idols/'+ val +'/fans?type=fake').then(function(res){
		        	console.log(res);
		        	if(res.length > 0) {
		        		self.fake = false;
		        		self.myFansList = res;
		        	}
		      	})
		      	http.get('/api/gift/list').then(function(res){
		        	console.log(res);
		        	self.giftList = res;
		      	}).catch(function(err){
		        	console.log(err);
		      	})
	        },
	        delIdol(val,num) {
	        	this.visible=true;
	        	this.idolId = val;
	        	this.active = num;
	        },
	        sureDelIdol() {
	        	var self = this;
		    	self.loading2 = true;
		    	http.get('/api/idol/del',{
		    		params: {
		    			id: self.idolId,
		    			active: self.active
		    		}
		    	}).then(function(res){
		    		self.loading2 = false;
		    		if(res.success){
	                    self.$message({
	                      message: '爱豆下线／启用成功了！',
	                      type: 'success'
	                    });
	                    self.visible = false
	                    // 刷新当前页面数据
	                    http.get('/api/idol/list').then(function(res){
				        	console.log(res);
				        	self.idolList = res;
				      	})
				      	self.currentPage = 1;
	                  }else{
	                      self.$message.error(res.msg);
	                }
		    	}).catch(function(){
		    		self.$message.error('可能是你的破网断了，也可能是服务器重启了，等一下再试好吗？');
                	self.loading2 = false;
		    	});
	        },
	        pushFans() {
				var self = this;
				var fakeFans = self.fansInfo.fans;
				if(fakeFans.length > 0) {
					self.loading2 = true;
					for(var i in fakeFans) {
					  http.get(self.host_ + 'api/v1/idols/'+ self.fansInfo.id + '/fans/'+ fakeFans[i]+ '/'+ self.fansInfo.time).then(function(res){
					      if(res) {
					      	if(!res.body) {
					      		console.log(res)
						      	self.loading2 = false;
						  		self.$message.error('服务器或者网络错误'+ res);
					      	}
					      }else{
						        self.$message({
						          message: '成功添加粉丝',
						          type: 'success'
						        });
						        self.addVisible = false
						      	self.loading2 = false;
						        self.handleCurrentChange();
					      }
					  })
					}
				}else {
					self.$message({
					  message: '你还没有选择虚拟粉丝',
					  type: 'warning'
					});
				}
	        },
	        pushAttention() {
				var self = this;
				var fakeFans = self.fansInfo2.fans;
				if(fakeFans.length > 0) {
					self.loading2 = true;
					for(var i in fakeFans) {
					  http.get('/api/idol_follows/add',{
					  	params: {
					  		fans_id: fakeFans[i],
					  		idol_id: self.fansInfo2.id
					  	}
					  }).then(function(res){
					      if(res.success) {
					        self.$message({
					          message: '成功添加粉丝',
					          type: 'success'
					        });
					        self.addVisible2 = false
					      	self.loading2 = false;
					        self.handleCurrentChange();
					      }else{
					      	self.loading2 = false;
					  		self.$message.error('服务器或者网络错误'+ res);
					      }
					  })
					}
				}else {
					self.$message({
					  message: '你还没有选择虚拟粉丝',
					  type: 'warning'
					});
				}
	        },
	        pushGift() {
	          var self = this;
              if(self.giftInfo.fans && self.giftInfo.gift) {
              	self.loading2 = true;
	              http.get(self.host_ + 'api/v1/gifts/buy',{
	              	params: {
	              		giftId: self.giftInfo.gift,
	              		fansId: self.giftInfo.fans,
	              		idolId: self.giftInfo.id,
	              		count: self.giftInfo.nums

	              	}
	              }).then(function(res){
	                  if(res) {
				      	if(!res.body) {
				      		console.log(res)
					      	self.loading2 = false;
					  		self.$message.error('服务器或者网络错误'+ res);
				      	}
				      }else{
					        self.$message({
					          message: '成功应援爱豆！',
					          type: 'success'
					        });
					        self.visible2 = false
					      	self.loading2 = false;
					      	self.handleCurrentChange();
				      }
	              })
              }else {
              	self.$message({
	              message: '没有选择虚拟粉丝或者礼物都不能应援',
	              type: 'warning'
	            });
              }
	        },
	        pushMessage() {
	        	var self = this;
	        	var msg = $('.msg');
	        	msg.each(function(){
	        		if($(this).val()) {
	        			self.loading2 = true;
	        			var obj = {
	        				targetType: 3,
	        				content:$(this).val()
	        			}
	        			http.post(self.host_ + 'api/v1/idols/'+ self.messageInfo.id + '/comments/' + $(this).attr('data-id'),JSON.stringify(obj)).then(function(res){
							if(res) {
								if(!res.body) {
									console.log(res)
									self.loading2 = false;
									self.$message.error('服务器或者网络错误，'+ res);
								}
							}else{
								self.$message({
								  message: '发布留言成功！',
								  type: 'success'
								});
								self.handleClose();
							}
						})
	        		}
	        	})
	        },
	        handleClose() {
	        	$('.msg').val('');
	        	this.dialogVisible = false;
				this.loading2 = false;
	        },
	        editIdolType(id,type) {
	        	this.idolId = id;
        		this.idolType = type;
	        	this.visible4 = true;
	        },
	        pushIdolType() {
	        	let self = this;
	        	self.loading2 = false;
	        	if(self.idolType && self.idolType != 'N/A') {

		        	http.get('/api/user_idol_detail/edit_branch_office',{
			        	params: {
			        		id: self.idolId,
			        		branch_office: self.idolType
			        	}
			        }).then(function(res){
			        	if(res.success) {
					      	self.loading2 = false;
					      	self.visible4 = false;
					      	http.get('/api/idol/list').then(function(res){
					        	self.idolList = res;
					      	})
					      	self.$message({
					          message: '修改idol标识成功！',
					          type: 'success'
					        });
			        	}else {
			        		self.$message.error('服务器或者网络错误，'+ res);
			        	}
			      	})
	        	}else {
	        		self.$message({
					  message: '你还没有选idol类型标识呢！！！！',
					  type: 'warning'
					});
	        	}
	        },
	        handleCurrentChange(val) {
	        	var self = this;
	        	if(val) {
	        		self.currentPage = val;
	        	}else {
	        		self.currentPage = 1;
	        	}
	        	http.get('/api/idol/list', {
	                params:{
	                    page: self.currentPage,
	                    pageNum: 10,
	                    nickname: self.Snickname,
	                    branch_office: self.SidolType
	                }
	            }).then(function(res){
	                self.idolList = res;
	            });

	            http.get('/api/idol/count',{
	            	params: {
						nickname: self.Snickname
	            	}
	            }).then(function(res){
		        	console.log(res);
		        	self.total = res[0].count;
		      	}).catch(function(err){
		        	console.log(err);
		      	})
	        },
	        showBigImg(avatar) {
	        	this.visible3 = true;
	        	this.dialogImg = avatar;
	        }
		},
		created: function(){
			var self = this;
			if(location.host == 'opt.groupy.cn') {
				 self.host_ = 'http://admin.groupy.cn/'
			}else {
				 self.host_ = 'http://admin.groupy.cn/test/'
			}
	      	http.get('/api/idol/list').then(function(res){
	      		console.log(res)
	        	self.idolList = res;
	      	}).catch(function(err){
	        	console.log(err);
	      	})
	      	http.get('/api/idol/count').then(function(res){
	        	self.total = res[0].count;
	      	}).catch(function(err){
	        	console.log(err);
	      	})
	      	http.get('/api/virtual_user/list').then(function(res){
	        	self.fansList = res;
	        	self.fansListFree = self.fansList;
	      	}).catch(function(err){
	        	console.log(err);
	      	})
		}
	}
</script>