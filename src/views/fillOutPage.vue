<template>
	<div class="fillContainer">
		<el-row type="flex" justify="end"><i class="el-icon-close" @click="goBack"></i></el-row>
		<preview @success="goBack" :listOrigin="list" :tempId="temp_id" :showSub="true" :look="false" :formId="form_id"
			:save="form_id==null?true:false"></preview>
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
			form_id: {
				type: String,
				default: null
			}
		},
		components: {
			preview
		},
		methods: {
			goBack() {
				this.$router.back();
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
