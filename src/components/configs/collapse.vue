<template>
	<div>
		<el-form size="small" :model="itemConf" label-width="100px" style="margin-right: 10%">
			<el-form-item label="ID">
				<el-input v-model="itemConf.id" disabled></el-input>
			</el-form-item>
			<el-form-item label="样式">
				<el-radio-group v-model="itemConf.accordion">
					<el-radio-button :label="false">默认</el-radio-button>
					<el-radio-button :label="true">手风琴</el-radio-button>
				</el-radio-group>
			</el-form-item>
		</el-form>
		<el-divider>选项</el-divider>
		<div v-for="(item, index) in itemConf.child" :key="index" style="overflow: hidden;margin-left: 10px;">
			<div style="float: left;margin-top: 5px;">
				<i class="el-icon-s-operation" />
			</div>
			<el-input v-model="item.title" placeholder="标题" size="small" style="float: left;width: 42%;margin: 3px;" />
			<el-input placeholder="选项值" size="small" v-model="item.name" style="float: left;width: 42%;margin: 3px;" />
			<div style="float: left;margin-top: 5px;" @click="itemConf.child.splice(index,1)">
				<i class="el-icon-remove-outline" />
			</div>
			<el-input type="textarea" rows="6" :value="dealContent(item.child)" @input="putDate($event,index)"></el-input>
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
		name: 'collapseConf',
		props: {
			itemConf: {
				type: Object,
				default: () => ({})
			}
		},
		methods: {
			dealContent(arr) {
				let str = '';
				for (var i in arr) {
					if (i != 0) str += '\n';
					str += arr[i].child;
				}
				return str;
			},
			putDate(val, index) {
				let arr = val.split("\n");
				arr = arr.map(item => {
					return {
						ele: 'div',
						child: item
					}
				})
				this.itemConf.child[index].child=arr;
			},
			addSelectItem() {
				this.itemConf.child.push({
					title:'',
					name:'',
					child:[]
				})
			}
		}
	}
</script>

<style>
</style>
