<template>
	<el-form size="small" :model="itemConf" label-width="100px" style="margin-right: 10%">
		<el-form-item label="ID">
			<el-input v-model="itemConf.id" disabled></el-input>
		</el-form-item>
		<el-form-item label="标签">
			<el-input v-model="itemConf.title"></el-input>
		</el-form-item>
		<el-form-item label="是否显示标签">
			<el-switch v-model="itemConf.showLabel"></el-switch>
		</el-form-item>
		<el-form-item label="是否必填">
			<el-switch v-model="itemConf.required"></el-switch>
		</el-form-item>
		<el-form-item label="是否只读">
			<el-switch v-model="itemConf.readonly"></el-switch>
		</el-form-item>
		<el-form-item label="是否禁用">
			<el-switch v-model="itemConf.disabled"></el-switch>
		</el-form-item>
		<el-form-item label="范围">
			<el-switch v-model="itemConf['is-range']"></el-switch>
		</el-form-item>
		<el-form-item v-show="itemConf['is-range']" label="开始占位符">
			<el-input v-model="itemConf['start-placeholder']"></el-input>
		</el-form-item>
		<el-form-item v-show="itemConf['is-range']" label="结束占位符">
			<el-input v-model="itemConf['end-placeholder']"></el-input>
		</el-form-item>
		<el-form-item v-show="itemConf['is-range']" label="分隔符">
			<el-input v-model="itemConf['range-separator']"></el-input>
		</el-form-item>
		<el-form-item v-show="!itemConf['is-range']" label="占位符">
			<el-input v-model="itemConf.placeholder"></el-input>
		</el-form-item>
		<el-form-item label="文本可编辑">
			<el-switch v-model="itemConf.editable"></el-switch>
		</el-form-item>
		<el-form-item label="可清空">
			<el-switch v-model="itemConf.clearable"></el-switch>
		</el-form-item>
	</el-form>
</template>

<script>
	export default {
		name: 'timePickerConf',
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
