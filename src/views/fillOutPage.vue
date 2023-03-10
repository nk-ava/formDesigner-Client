<template>
	<div class="fillContainer">
		<el-row type="flex" justify="end"><i class="el-icon-close" @click="goBack"></i></el-row>
		<preview v-if="ready" @success="goBack" :listOrigin="list" :tempId="temp_id" :showSub="true" :look="false"
			:formId="form_id" :save="form_id==null?true:false"></preview>
	</div>
</template>

<script>
	import preview from "../components/preview.vue";

	export default {
		name: 'fillOut',
		created() {
			this.getList();
		},
		data() {
			return {
				list: [],
				temp_id: null,
				form_id: null,
				ready: false
			}
		},
		components: {
			preview
		},
		methods: {
			goBack() {
				this.$router.back();
			},
			getList() {
				if (this.$route.query.tempId) {
					this.temp_id = this.$route.query.tempId;
					let loader = this.$loading({
						text: "请稍后"
					});
					this.$axios({
						url: `/FORM/getTempById?id=${this.temp_id}`,
						method: 'get'
					}).then(res => {
						loader.close();
						res = res.data;
						this.list = res;
						this.ready = true;
					}).catch(err => {
						loader.close();
						this.$confirm(err.toString()).then();
					});
				} else if (this.$route.query.formId) {
					this.form_id = this.$route.query.formId;
					let loader = this.$loading({
						text: "请稍后"
					});
					this.$axios({
						url: `/FORM/getFormById?id=${this.form_id}`,
						method: 'get'
					}).then(res => {
						loader.close();
						this.list = res.data;
						this.ready = true;
					}).catch(err => {
						loader.close();
						this.$confirm(err.toString()).then();
					});
				}
			}
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

	.fillContainer .el-icon-close {
		margin-right: 5px;
		margin-top: 5px;
	}

	.fillContainer .el-icon-close:hover {
		color: red;
	}
</style>
