<template>
	<el-form size="small" :model="itemConf" label-width="100px" style="margin-right: 10%">
		<el-form-item label="ID">
			<el-input v-model="itemConf.id" disabled></el-input>
		</el-form-item>
		<el-form-item label="标签">
			<el-input v-model="itemConf.title"></el-input>
		</el-form-item>
		<el-form-item label="显示标签">
			<el-switch v-model="itemConf.showLabel"></el-switch>
		</el-form-item>
		<el-form-item label="必填">
			<el-switch v-model="itemConf.required"></el-switch>
		</el-form-item>
		<el-form-item label="最大值">
			<el-input-number v-model="itemConf.max"></el-input-number>
		</el-form-item>
		<el-form-item label="是否禁用">
			<el-switch v-model="itemConf.disabled"></el-switch>
		</el-form-item>
		<el-form-item label="允许半角">
			<el-switch v-model="itemConf['allow-half']"></el-switch>
		</el-form-item>
		<el-form-item label="显示分数">
			<el-switch v-model="itemConf['show-score']"></el-switch>
		</el-form-item>
	</el-form>
</template>

<script>
	export default {
		name: 'rateConf',
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
