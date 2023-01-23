<template>
	<div id="app">
		<router-view v-if="isRouterAlive" />
	</div>
</template>

<script>
	import editForm from "../src/components/editFormPage.vue";
	export default {
		name: 'App',
		provide() {
			return {
				reload: this.reload
			}
		},
		data() {
			return {
				isRouterAlive: true
			}
		},
		methods: {
			reload() {
				this.isRouterAlive = false;
				this.$nextTick(function() {
					this.isRouterAlive = true;
				})
			}
		}
	}
</script>
<style>
	html,
	body {
		width: 100%;
		height: 100%;
	}

	#app {
		width: 100%;
		height: 100%;
	}
</style>
