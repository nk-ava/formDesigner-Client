<template>
	<el-form size="small" :model="itemConf" label-width="100px" style="margin-right: 10%">
		<el-form-item label="ID">
			<el-input v-model="itemConf.id" disabled></el-input>
		</el-form-item>
		<el-form-item label="标签">
			<el-input v-model="itemConf.title"></el-input>
		</el-form-item>
		<el-form-item label="最小值">
			<el-input-number v-model="itemConf.min"></el-input-number>
		</el-form-item>
		<el-form-item label="最大值">
			<el-input-number v-model="itemConf.max"></el-input-number>
		</el-form-item>
		<el-form-item label="步长">
			<el-input-number v-model="itemConf.step"></el-input-number>
		</el-form-item>
		<el-form-item label="是否禁用">
			<el-switch v-model="itemConf.disabled"></el-switch>
		</el-form-item>
		<el-form-item label="尺寸">
			<el-select v-model="itemConf.size">
				<el-option label="小" value="small"></el-option>
				<el-option label="大" value="large"></el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="精度">
			<el-input-number v-model="itemConf.precision" :min="0"></el-input-number>
		</el-form-item>
		<el-form-item label="是否使用控制器">
			<el-switch v-model="itemConf.controls"></el-switch>
		</el-form-item>
		<el-form-item label="控制器位置">
			<el-select v-model="itemConf['controls-position']">
				<el-option label="默认" value="default"></el-option>
				<el-option label="右边" value="right"></el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="是否显示标签">
			<el-switch v-model="itemConf.showLabel"></el-switch>
		</el-form-item>
		<el-form-item label="是否必填">
			<el-switch v-model="itemConf.required"></el-switch>
		</el-form-item>
	</el-form>
</template>

<script>
	export default {
		name: 'inputNumberConf',
		props: {
			itemConf: {
				type: Object,
				default: () => ({})
			}
		}
	}
</script>

<style>
</style>
