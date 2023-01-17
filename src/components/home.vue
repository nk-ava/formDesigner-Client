<template>
	<div>
		<router-link :to="{
			name:'formDesigner',
			params:{
				dataList:[]
			}
		}">新表单</router-link>
		<router-link :to="{
			name:'tempManager'
		}">模板管理</router-link>
	</div>
</template>

<script>
	export default {
		name: 'home'
	}
</script>

<style>
</style>
