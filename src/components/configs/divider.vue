<template>
	<el-form size="small" :model="itemConf" label-width="100px" style="margin-right: 10%">
		<el-form-item label="ID">
			<el-input v-model="itemConf.id" disabled></el-input>
		</el-form-item>
		<el-form-item label="提示信息">
			<el-input v-model="itemConf.child"></el-input>
		</el-form-item>
		<el-form-item label="位置">
			<el-select v-model="itemConf['content-position']">
				<el-option label="左边" value="left"></el-option>
				<el-option label="中间" value="center"></el-option>
				<el-option label="右边" value="right"></el-option>
			</el-select>
		</el-form-item>
	</el-form>
</template>

<script>
	export default{
		name:"dividerConf",
		props:{
			itemConf:{
				type: Object,
				default: {}
			}
		}
	}
</script>

<style>
</style>
