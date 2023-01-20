<template>
	<div class="tempMng">
		<div class="action-bar">
			<el-button icon="el-icon-s-home" type="text" class="home" @click="goBack">返回</el-button>
			<el-input v-model="searchName" clearable style="width: 20%;" placeholder="请输入模板名字" @change="searchTempName">
				<i slot="prefix" class="el-input__icon el-icon-search"></i>
			</el-input>
		</div>
		<temp-manager-list :key="item" :formList="formList"></temp-manager-list>
	</div>
</template>

<script>
	import tempManagerList from "./tempManagerList.vue";

	export default {
		name: 'tempManager',
		components: {
			tempManagerList
		},
		data() {
			return {
				formList: [],
				searchName: '',
				item: ''
			}
		},
		mounted() {
			this.getFormList();
		},
		methods: {
			getFormList() {
				let loader = this.$loading({
					text: "请稍后",
					target: ".tempMng"
				});
				this.$axios({
					url: `${this.host}/example/getAllForm`,
					method: 'get'
				}).then(res => {
					this.formList = res.data;
					loader.close();
				}).catch(err => {
					loader.close();
					this.$confirm(err.toString()).then();
				});
			},
			searchTempName() {
				let loader = this.$loading({
					text: "正在搜索",
					target: ".showForm"
				});
				this.$axios({
					url: `${this.host}/example/getTempByName?name=${this.searchName}`,
					method: 'get'
				}).then(res => {
					loader.close();
					this.item=(new Date).getTime();
					this.formList = res.data;
				}).catch(err => {
					loader.close();
					this.$confirm(err.toString()).then();
				})
			},
			goBack() {
				this.$router.back();
			}
		}
	}
</script>

<style>
</style>
