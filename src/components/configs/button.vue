<template>
	<el-form size="small" :model="itemConf" label-width="100px" style="margin-right: 10%">
		<el-form-item label="ID">
			<el-input v-model="itemConf.id" disabled></el-input>
		</el-form-item>
		<el-form-item label="值">
			<el-input v-model="itemConf.child"></el-input>
		</el-form-item>
		<el-form-item label="尺寸">
			<el-select v-model="itemConf.size" placeholder="请选择尺寸">
				<el-option label="大" value=""></el-option>
				<el-option label="中" value="medium"></el-option>
				<el-option label="小" value="small"></el-option>
				<el-option label="迷你" value="mini"></el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="类型">
			<el-select v-model="itemConf.type">
				<el-option label="primary" value="primary"></el-option>
				<el-option label="success" value="success"></el-option>
				<el-option label="warning" value="warning"></el-option>
				<el-option label="danger" value="danger"></el-option>
				<el-option label="info" value="info"></el-option>
				<el-option label="text" value="text"></el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="对齐方式">
			<el-radio-group v-model="itemConf.compAlign">
				<el-radio-button label="start">左对齐</el-radio-button>
				<el-radio-button label="center">居中</el-radio-button>
				<el-radio-button label="end">右对齐</el-radio-button>
			</el-radio-group>
		</el-form-item>
		<el-form-item label="是否朴素">
			<el-switch v-model="itemConf.plain"></el-switch>
		</el-form-item>
		<el-form-item label="是否圆角">
			<el-switch v-model="itemConf.round"></el-switch>
		</el-form-item>
		<el-form-item label="是否圆形">
			<el-switch v-model="itemConf.circle"></el-switch>
		</el-form-item>
		<el-form-item label="是否禁用">
			<el-switch v-model="itemConf.disabled"></el-switch>
		</el-form-item>
		<el-form-item label="图标">
			<el-input v-model="itemConf.icon" placeholder="请选择图标" readonly>
				<template slot="append">
					<i class="el-icon-picture" style="cursor: pointer;" @click="handlerSelectIcon" />
				</template>
			</el-input>
		</el-form-item>
		<icon-dialog v-model="itemConf.icon" :visible.sync="iconDialogVisible" />
	</el-form>
</template>
<script>
	export default {
		name: "buttonConf",
		props: {
			itemConf: Object,
			default: {}
		},
		data(){
			return {
				iconDialogVisible: false
			}
		},
		methods: {
			handlerSelectIcon() {
				this.iconDialogVisible = true
			}
		}
	}
</script>

<style>
</style>
