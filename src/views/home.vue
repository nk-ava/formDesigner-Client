<template>
	<div style="width: 100%;height: 100%;box-sizing: border-box;">
		<el-carousel class="carouselView" indicator-position="inside" :height="carouselHeight">
			<el-carousel-item>
				<img src='../assets/1.jpg' style="object-fit: cover;width:100%;height: 100%;" />
			</el-carousel-item>
			<el-carousel-item>
				<img src="../assets/2.jpg" style="object-fit: cover;width:100%;height: 100%;" />
			</el-carousel-item>
			<el-carousel-item>
				<img src="../assets/3.jpg" style="object-fit: cover;width:100%;height: 100%;" />
			</el-carousel-item>
			<el-carousel-item>
				<img src="../assets/4.jpg" style="object-fit: cover;width:100%;height: 100%;" />
			</el-carousel-item>
			<el-carousel-item>
				<img src="../assets/5.jpg" style="object-fit: cover;width:100%;height: 100%;" />
			</el-carousel-item>
			<el-carousel-item>
				<img src="../assets/6.jpg" style="object-fit: cover;width:100%;height: 100%;" />
			</el-carousel-item>
			<el-carousel-item>
				<img src="../assets/7.jpg" style="object-fit: cover;width:100%;height: 100%;" />
			</el-carousel-item>
			<el-carousel-item>
				<img src="../assets/8.jpg" style="object-fit: cover;width:100%;height: 100%;" />
			</el-carousel-item>
		</el-carousel>
		<!-- <img src="../assets/1.jpg" /> -->
		<div style="width: 100%;height: 50%;display: flex;position: absolute;background:linear-gradient(#abffff,#fff);">
			<div style="position: inherit;width: 50%;text-align: center;left: 25%;color: #2d2d2d;font-family: badaokaishu;font-size: 50px;margin-top: 10px;">Form Designer</div>
			<div style="margin: auto;">
				<div class="link_container" @click="newForm">
					<div class="box">
						<div class="new_div">new</div>
						<div class="add_icon">
							<svg class="icon" aria-hidden="true">
								<use href="#iconadd"></use>
							</svg>
						</div>
					</div>
					新表单
				</div>
				<div class="link_container" style="margin-left: 90px;" @click="manager">
					<div class="box">
						<div class="new_div" style="font-size: 45px;">temp</div>
						<div class="manager_icon">
							<svg class="icon" aria-hidden="true">
								<use href="#icondialog"></use>
							</svg>
						</div>
					</div>
					模板管理
				</div>
			</div>
			<a style="position: inherit;bottom: 10px;right: 10px;"
				href="https://github.com/zlh-debug/formDesigner-Server">后端地址:https://github.com/zlh-debug/formDesigner-Server</a>
		</div>
	</div>
</template>

<script>
	import icon from "./icon.vue";

	export default {
		name: 'home',
		data() {
			return {
				carouselHeight: document.documentElement.clientHeight * 0.5 + "px"
			}
		},
		components: {
			icon
		},
		methods: {
			newForm() {
				this.$router.push("/edit");
			},
			manager() {
				this.$router.push("/temp");
			}
		}
	}
</script>

<style>
	@font-face {
		font-family: 'badaokaishu';
		src: url('../assets/font/霸道楷书字体.ttf');
	}
	@font-face {
		font-family: 'dianyinghaibao';
		src: url('../assets/font/电影海报字体.ttf');
	}

	.el-carousel__item h3 {
		color: #475669;
		font-size: 18px;
		opacity: 0.75;
		line-height: 300px;
		margin: 0;
	}

	.el-carousel__item:nth-child(2n) {
		background-color: #99a9bf;
	}

	.el-carousel__item:nth-child(2n+1) {
		background-color: #d3dce6;
	}

	.new_div {
		margin: auto;
		font-size: 50px;
		font-family: dianyinghaibao;
		color: #000;
		transition: 0.4s;
	}

	.link_container {
		text-align: center;
		float: left;
		transition: 0.1s;
	}

	.link_container:hover .new_div {
		transform: rotateX(90deg)
	}

	.box {
		position: relative;
		background-color: #d0ffff;
		width: 100px;
		height: 100px;
		border-radius: 10px;
		display: flex;
		box-shadow: 0px 0px 10px 0 #000;
	}

	.box:hover {
		transform: scale(0.9, 0.9);
	}

	.add_icon {
		position: absolute;
		right: 5px;
		bottom: 15px;
	}

	.add_icon .icon {
		width: 20px;
		height: 20px;
		vertical-align: -5px;
		transition: 0.5s;
		transform-origin: 100% 100%;
		fill: #000;
	}
	.box:hover .add_icon .icon{
		margin-right: 10px;
		transform: scale(3.5,3.5);
		fill: #18aeff;
	}
	.manager_icon{
		position: absolute;
		top: 20px;
		right: 20px;
	}
	.manager_icon .icon{
		width: 60px;
		height: 60px;
		vertical-align: -5px;
		transition: 0.5s;
		fill: #000;
		transform: rotateX(90deg);
	}
	.box:hover .manager_icon .icon{
		transform: rotateX(0deg);
		fill: #18aeff;
	}
</style>
