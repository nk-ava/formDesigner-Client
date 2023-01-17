<template>
	<el-form size="small" :model="itemConf" label-width="100px" style="margin-right: 10%">
		<el-form-item label="ID">
			<el-input v-model="itemConf.id" disabled></el-input>
		</el-form-item>
		<el-form-item label="标签">
			<el-input v-model="itemConf.title"></el-input>
		</el-form-item>
		<el-form-item label="最小值">
			<el-input-number v-model="itemConf.min" size="small"></el-input-number>
		</el-form-item>
		<el-form-item label="最大值">
			<el-input-number v-model="itemConf.max" size="small"></el-input-number>
		</el-form-item>
		<el-form-item label="是否禁用">
			<el-switch v-model="itemConf.disabled"></el-switch>
		</el-form-item>
		<el-form-item label="步长">
			<el-input-number v-model="itemConf.step" :min="1"></el-input-number>
		</el-form-item>
		<el-form-item label="显示断点">
			<el-switch v-model="itemConf['show-stops']"></el-switch>
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
	export default {
		name: "sliderConf",
		props: {
			itemConf: {
				type: Object,
				default: {}
			}
		}
	}
</script>

<style>
</style>
