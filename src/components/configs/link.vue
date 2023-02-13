<template>
	<el-form size="small" :model="itemConf" label-width="100px" style="margin-right: 10%">
		<el-form-item label="ID">
			<el-input v-model="itemConf.id" disabled></el-input>
		</el-form-item>
		<el-form-item label="链接文字">
			<el-input v-model="itemConf.child"></el-input>
		</el-form-item>
		<el-form-item label="类型">
			<el-select  v-model="itemConf.type">
				<el-option label="primary" value="primary"></el-option>
				<el-option label="success" value="success"></el-option>
				<el-option label="warning" value="warning"></el-option>
				<el-option label="danger" value="danger"></el-option>
				<el-option label="info" value="info"></el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="对齐方式">
			<el-radio-group v-model="itemConf.compAlign">
				<el-radio-button label="start">左对齐</el-radio-button>
				<el-radio-button label="center">居中</el-radio-button>
				<el-radio-button label="end">右对齐</el-radio-button>
			</el-radio-group>
		</el-form-item>
		<el-form-item label="下划线">
			<el-switch v-model="itemConf.underline"></el-switch>
		</el-form-item>
		<el-form-item label="是否禁用">
			<el-switch v-model="itemConf.disabled"></el-switch>
		</el-form-item>
		<el-form-item label="链接地址">
			<el-input v-model="itemConf.href"></el-input>
		</el-form-item>
		<el-form-item label="图标">
			<el-input v-model="itemConf.icon" placeholder="请选择图标">
				<el-button slot="append" icon="el-icon-picture" @click="showIconDialog=true"></el-button>
			</el-input>
		</el-form-item>
		<icon-dialog v-model="itemConf.icon" :visible.sync="showIconDialog" />
	</el-form>
</template>

<script>
	export default {
		name: 'linkConf',
		props: {
			itemConf: {
				type: Object,
				default: () => ({})
			}
		},
		data() {
			return{
				showIconDialog:false
			}
		}
	}
</script>

<style>
</style>
