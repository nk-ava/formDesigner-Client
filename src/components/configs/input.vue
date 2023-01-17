<template>
	<el-form size="small" :model="itemConf" label-width="100px" style="margin-right: 10%">
		<el-form-item label="ID">
			<el-input v-model="itemConf.id" disabled></el-input>
		</el-form-item>
		<el-form-item label="类型">
			<el-select v-model="itemConf.type">
				<el-option label="文本" value="text"></el-option>
				<el-option label="按钮" value="button"></el-option>
				<el-option label="日期" value="date"></el-option>
				<el-option label="邮箱" value="email"></el-option>
				<el-option label="文件" value="file"></el-option>
				<el-option label="年月" value="month"></el-option>
				<el-option label="数字" value="number"></el-option>
				<el-option label="密码" value="password"></el-option>
				<el-option label="电话" value="tel"></el-option>
				<el-option label="时间" value="time"></el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="标签">
			<el-input v-model="itemConf.title"></el-input>
		</el-form-item>
		<el-form-item label="是否禁用">
			<el-switch v-model="itemConf.disabled"></el-switch>
		</el-form-item>
		<el-form-item label="提示信息">
			<el-input v-model="itemConf.placeholder"></el-input>
		</el-form-item>
		<el-form-item label="是否可清除">
			<el-switch v-model="itemConf.clearable"></el-switch>
		</el-form-item>
		<el-form-item label="是否必填">
			<el-switch v-model="itemConf.required"></el-switch>
		</el-form-item>
		<el-form-item label="是否显示标签">
			<el-switch v-model="itemConf.showLabel"></el-switch>
		</el-form-item>
	</el-form>
</template>

<script>
	export default{
		name:"inputConf",
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
