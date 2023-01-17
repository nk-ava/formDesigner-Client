<template>
	<div class="right-board">
		<el-scrollbar style="height: 100%;">
			<div class="conf-header">
				属性配置
				<div class="line"></div>
			</div>
			<template v-for="(item,index) in cmps">
				<component v-if="item.name === activeItem.compIcon" :itemConf="activeItem" :is="item.content">
				</component>
			</template>
		</el-scrollbar>
	</div>
</template>

<script>
	import reg from "./configs/index.js";

	export default {
		name: "configPanel",
		data() {
			return {
				cmps: reg
			}
		},
		props: {
			activeItem: {
				type: Object,
				default: {}
			}
		},
		created() {
			this.cmps.forEach(c => {
				c.content = require(`./configs/${c.name}`).default;
			});
		},
	}
</script>

<style>
</style>
