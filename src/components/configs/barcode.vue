<template>
	<el-form size="small" :model="itemConf" label-width="100px" style="margin-right: 10%">
		<el-form-item label="ID">
			<el-input v-model="itemConf.id" disabled></el-input>
		</el-form-item>
		<el-form-item label="显示标签">
			<el-switch v-model="itemConf.showLabel"></el-switch>
		</el-form-item>
		<el-form-item v-show="itemConf.showLabel" label="标签">
			<el-input v-model="itemConf.title"></el-input>
		</el-form-item>
		<el-form-item label='条码值'>
			<el-input v-model="itemConf.text"></el-input>
		</el-form-item>
		<el-form-item label="条码颜色">
			<el-color-picker v-model="itemConf.lineColor"></el-color-picker>
		</el-form-item>
		<el-form-item label="背景色">
			<el-color-picker v-model="itemConf.background"></el-color-picker>
		</el-form-item>
		<el-form-item label="宽度">
			<el-input-number v-model="itemConf.barWidth" :min="1"></el-input-number>
		</el-form-item>
		<el-form-item label="高度">
			<el-input-number v-model="itemConf.barHeight" :min='10' :max="100"></el-input-number>
		</el-form-item>
		<el-form-item label="展示值">
			<el-switch v-model="itemConf.displayValue"></el-switch>
		</el-form-item>
		<el-form-item v-show="itemConf.displayValue" label="字体大小">
			<el-input-number v-model="itemConf.fontSize"></el-input-number>
		</el-form-item>
	</el-form>
</template>

<script>
	export default {
		name: 'barcodeConf',
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
