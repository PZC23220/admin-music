<template>
	<div class="">
		<p class="pages_tab">当前页：歌单管理<i class="el-icon-arrow-right"></i>添加歌单</p>
    <!-- 添加歌单 -->
    <div class="main-content-form">
	    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
	    	<el-form-item label="歌单类型" prop="resource">
			    <el-radio-group v-model="ruleForm.resource">
			      <el-radio label="热门歌单"></el-radio>
			      <el-radio label="人气歌手"></el-radio>
			      <el-radio label="全部歌单"></el-radio>
			    </el-radio-group>
			  </el-form-item>
			  <div class="list-type" v-if="false">
				  <el-form-item label="歌单名称" prop="name">
				    <el-input v-model="ruleForm.name"></el-input>
				  </el-form-item>
				  <el-form-item label="歌单链接" prop="name">
				    <el-input v-model="ruleForm.name"></el-input>
				  </el-form-item>
				  <el-form-item label="封面图链接" prop="name">
				    <el-input v-model="ruleForm.name"></el-input>
				  </el-form-item>
				  <el-form-item label="分类标签">
				    <el-button type="primary" plain @click="outerVisible = true">编辑标签</el-button>
				  </el-form-item>
				  <el-form-item label="语种:" prop="resource">
				    <el-radio-group v-model="ruleForm.resource">
				      <el-radio label="日语"></el-radio>
				      <el-radio label="欧美"></el-radio>
				      <el-radio label="韩语"></el-radio>
				    </el-radio-group>
				  </el-form-item>
				  <el-form-item label="风格:" prop="resource">
				    <el-radio-group v-model="ruleForm.resource">
				      <el-radio label="流行"></el-radio>
				      <el-radio label="摇滚"></el-radio>
				      <el-radio label="电音"></el-radio>
				      <el-radio label="说唱"></el-radio>
				      <el-radio label="轻音乐"></el-radio>
				    </el-radio-group>
				  </el-form-item>
				  <el-form-item label="情感:" prop="resource">
				    <el-radio-group v-model="ruleForm.resource">
				      <el-radio label="伤感"></el-radio>
				      <el-radio label="兴奋"></el-radio>
				      <el-radio label="治愈"></el-radio>
				      <el-radio label="浪漫"></el-radio>
				    </el-radio-group>
				  </el-form-item>
				  <el-form-item label="主题:" prop="resource">
				    <el-radio-group v-model="ruleForm.resource">
				      <el-radio label="经典"></el-radio>
				      <el-radio label="动漫"></el-radio>
				    </el-radio-group>
				  </el-form-item>
				  <el-form-item>
				    <el-button type="primary" style="width: 250px;height: 50px;font-size:18px;" @click="submitForm('ruleForm')">添&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;加</el-button>
				  </el-form-item>
			  </div>
			  <div class="list-type">
				  <el-form-item label="歌手名称" prop="name">
				    <el-input v-model="ruleForm.name"></el-input>
				  </el-form-item>
				  <el-form-item label="头像链接" prop="name">
				    <el-input v-model="ruleForm.name"></el-input>
				  </el-form-item>
				  <el-form-item label="歌单链接" prop="name">
				    <el-input v-model="ruleForm.name"></el-input>
				  </el-form-item>
				  <el-form-item label="封面图链接" prop="name">
				    <el-input v-model="ruleForm.name"></el-input>
				  </el-form-item>
				  <el-form-item label="分类标签">
				    <!-- <el-button type="primary" plain @click="outerVisible = true">编辑标签</el-button> -->
				  </el-form-item>
				  <el-form-item label="国籍:" prop="resource">
				    <el-radio-group v-model="ruleForm.resource">
				      <el-radio label="日本"></el-radio>
				      <el-radio label="欧美"></el-radio>
				      <el-radio label="韩国"></el-radio>
				      <el-radio label="其他"></el-radio>
				    </el-radio-group>
				  </el-form-item>
				  <el-form-item label="类别:" prop="resource">
				    <el-radio-group v-model="ruleForm.resource">
				      <el-radio label="男歌手"></el-radio>
				      <el-radio label="女歌手"></el-radio>
				      <el-radio label="组合/乐队"></el-radio>
				    </el-radio-group>
				  </el-form-item>
				  <el-form-item>
				    <el-button type="primary" style="width: 250px;height: 50px;font-size:18px;" @click="submitForm('ruleForm')">添&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;加</el-button>
				  </el-form-item>
			  </div>
			</el-form>
			<el-dialog title="编辑标签" :visible.sync="outerVisible" width="70%">
				<p class="tips">操作提示：点击可以修改标签名称，点"X"可以删除标签</p>
				<div class="tag-edit">
					<span class="tag-edit-span">语种:</span>
					<el-button round>日语<i class="el-icon-close el-icon--right"></i></el-button>
					<el-button round>欧美<i class="el-icon-close el-icon--right"></i></el-button>
					<el-button round>韩语<i class="el-icon-close el-icon--right"></i></el-button>
					<el-button round @click="innerVisible = true"><i class="el-icon-plus"></i></el-button>
			  </div>
			  <div class="tag-edit">
					<span class="tag-edit-span">风格:</span>
					<el-button round>流行<i class="el-icon-close el-icon--right"></i></el-button>
					<el-button round>摇滚<i class="el-icon-close el-icon--right"></i></el-button>
					<el-button round>电音<i class="el-icon-close el-icon--right"></i></el-button>
					<el-button round>说唱<i class="el-icon-close el-icon--right"></i></el-button>
					<el-button round>轻音乐<i class="el-icon-close el-icon--right"></i></el-button>
					<el-button round @click="innerVisible = true"><i class="el-icon-plus"></i></el-button>
			  </div>
			  <div class="tag-edit">
					<span class="tag-edit-span">情感:</span>
					<el-button round>伤感<i class="el-icon-close el-icon--right"></i></el-button>
					<el-button round>兴奋<i class="el-icon-close el-icon--right"></i></el-button>
					<el-button round>治愈<i class="el-icon-close el-icon--right"></i></el-button>
					<el-button round>浪漫<i class="el-icon-close el-icon--right"></i></el-button>
					<el-button round @click="innerVisible = true"><i class="el-icon-plus"></i></el-button>
			  </div>
			  <div class="tag-edit">
					<span class="tag-edit-span">主题:</span>
					<el-button round>经典<i class="el-icon-close el-icon--right"></i></el-button>
					<el-button round>动漫<i class="el-icon-close el-icon--right"></i></el-button>
					<el-button round @click="innerVisible = true"><i class="el-icon-plus"></i></el-button>
			  </div>
		    <el-dialog
		      width="30%"
		      title="内层 Dialog"
		      :visible.sync="innerVisible"
		      append-to-body>
		       <div class="tag-edit">
		       	<el-input placeholder="名称" v-model="ruleForm.name">
					    <template slot="prepend">名称:</template>
					  </el-input>
				  </div>
				    <div slot="footer" class="dialog-footer">
		      <el-button @click="innerVisible = false">取 消</el-button>
		      <el-button @click="innerVisible = false">完 成</el-button>
		    </div>
		    </el-dialog>
		    <div slot="footer" class="dialog-footer">
		      <el-button @click="outerVisible = false">取 消</el-button>
		      <el-button @click="outerVisible = false">完 成</el-button>
		    </div>
		  </el-dialog>
    </div>
	</div>
</template>
<script type="text/javascript">
	import http from '../../utils/http.js';
	require('../../utils/common.js');
	import $ from 'n-zepto';
	export default {
		data() {
			return {
				ruleForm: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          date2: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
          type: [
            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          ],
          resource: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ]
        },
        outerVisible: false,
        innerVisible: false
			}
		},
		methods: {
	    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
		},
		created: function(){
			var self = this;
		}
	}
</script>