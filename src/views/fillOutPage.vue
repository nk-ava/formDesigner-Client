<template>
	<div class="fillContainer">
		<el-row type="flex" justify="end"><i class="el-icon-close" @click="goBack"></i></el-row>
		<preview @success="goBack" :listOrigin="list" :tempId="temp_id" :showSub="true" :look="false" :formId="form_id" :save="form_id==null?true:false"></preview>
	</div>
</template>

<script>
	import preview from "../components/preview.vue";

	export default {
		name: 'fillOut',
		props: {
			list: {
				type: Array,
				default: () => ([])
			},
			temp_id: {
				type: String,
				default: null
			},
			form_id:{
				type:String,
				default: null
			}
		},
		components: {
			preview
		},
		methods:{
			goBack(){
				this.$router.back();
			}
		},
		created() {
			let loader = this.$loading({
				text: '正在请求key',
				target: '.fillContainer'
			})
			this.$axios({
				url: 'https://demo.tduckapp.com/user/form/create',
				method: 'post',
				data: {
					"description": "表单模板",
					"name": "表单模板"
				},
				headers: {
					// Cookie:'Hm_lvt_4dbdbc5421c41984499f878628d60f2f=1675925180,1676217850; Hm_lpvt_4dbdbc5421c41984499f878628d60f2f=1676254309',
					token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxNDUxOSIsImlhdCI6MTY3NTkyNTIwNiwiZXhwIjoxNjc2NTMwMDA2fQ.uiIPe_htgktQAkbNa-5jVVdsOT1CI-qth62nJMraZYaauEyQvnwmvciXXCvQCClSclbqaL6-LGA0hSmF2GIT0A"
				}
			}).then(res => {
				loader.close();
				res = res.data;
				if (res.code == 200) {
					this.$root.key = res.data;
				} else {
					this.$message.warning({
						message: '获取key失败，可能无法正常使用附件',
						duration: 1500
					})
				}
			}).catch(err => {
				loader.close();
				this.$message.warning({
					message: '获取key失败，可能无法正常使用附件',
					duration: 1500
				})
			})
		}
	}
</script>

<style>
	.fillContainer {
		position: absolute;
		left: 15%;
		width: 70%;
		border: 1px solid #000;
		margin: 10px 0px;
		padding-bottom: 10px;
		box-shadow: 0px 0px 5px 3px #c0ccda;
	}
	.fillContainer .el-icon-close{
		margin-right: 5px;
		margin-top: 5px;
	}
	.fillContainer .el-icon-close:hover{
		color:red;
	}
</style>
