<template>
	<div>
		<el-form size="small" :model="itemConf" label-width="100px" style="margin-right: 10%">
			<el-form-item label="ID">
				<el-input v-model="itemConf.id" disabled></el-input>
			</el-form-item>
			<el-form-item label="标签">
				<el-input v-model="itemConf.title"></el-input>
			</el-form-item>
			<el-form-item label="是否多选">
				<el-switch v-model="itemConf.multiple"></el-switch>
			</el-form-item>
			<el-form-item label="是否禁用">
				<el-switch v-model="itemConf.disabled"></el-switch>
			</el-form-item>
			<el-form-item label="尺寸">
				<el-select v-model="itemConf.size">
					<el-option label="中" value="medium"></el-option>
					<el-option label="小" value="small"></el-option>
					<el-option label="迷你" value="mini"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="是否可清除">
				<el-switch v-model="itemConf.clearable"></el-switch>
			</el-form-item>
			<el-form-item label="提示信息">
				<el-input v-model="itemConf.placeholder"></el-input>
			</el-form-item>
			<el-form-item label="是否必填">
				<el-switch v-model="itemConf.required"></el-switch>
			</el-form-item>
			<el-form-item label="是否显示标签">
				<el-switch v-model="itemConf.showLabel"></el-switch>
			</el-form-item>
		</el-form>
		<el-divider>选项</el-divider>
		<div v-for="(item, index) in itemConf.child" :key="index" style="overflow: hidden;margin-left: 10px;">
			<div style="float: left;margin-top: 5px;">
				<i class="el-icon-s-operation" />
			</div>
			<el-input v-model="item.label" placeholder="选项名" size="small" style="float: left;width: 42%;margin: 3px;" />
			<el-input placeholder="选项值" size="small" :value="item.value" @input="setOptionValue(item, $event)"
				style="float: left;width: 42%;margin: 3px;" />
			<div style="float: left;margin-top: 5px;" @click="itemConf.child.splice(index, 1)">
				<i class="el-icon-remove-outline" />
			</div>
		</div>
		<div style="margin-left: 20px;">
			<el-button style="padding-bottom: 0" icon="el-icon-circle-plus-outline" type="text" @click="addSelectItem">
				添加选项
			</el-button>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'selectConf',
		props: {
			itemConf: {
				type: Object,
				default: {}
			}
		},
		methods: {
			setOptionValue(item, val) {
				item.value = ""+val;
			},
			addSelectItem() {
				this.itemConf.child.push({
					label: '',
					value: ''
				})
			}
		}
	}
</script>

<style>
</style>
