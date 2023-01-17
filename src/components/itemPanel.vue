<template>
	<div class="component-block">
		<el-scrollbar style="height: 100%;">
			<div>
				<div class="textMsg">常用组件</div>
				<draggable
				class="item-container"
				:list="alwaysList"
				:group="{name:'genComponents',pull:'clone',put:false}"
				:clone="cloneElement"
				:sort="false"
				@start="onStart"
				@end="onEnd">
					<div v-for="(item,index) in alwaysList" :class="{'miniItem_o':index%2==0,'miniItem_j':index%2!=0}">
						<icon :code="item.compIcon" :text="item.compName"/>
					</div>
				</draggable>
				<div class="textMsg">辅助组件</div>
				<draggable
				class="item-container"
				:list="supportList"
				:group="{name:'genComponents',pull:'clone',put:false}"
				:clone="cloneElement"
				:sort="false"
				@start="onStart"
				@end="onEnd">
					<div v-for="(item,index) in supportList" :class="{'miniItem_o':index%2==0,'miniItem_j':index%2!=0}">
						<icon :code="item.compIcon" :text="item.compName"/>
					</div>
				</draggable>
			</div>
		</el-scrollbar>
	</div>
</template>
<script>
	import draggable from "vuedraggable";
	import icon from "./icon.vue";
	import {formComp, supportComp} from "./items/index.js";
	
	export default {
		name: "itemPanel",
		components:{
			draggable,
			icon
		},
		data() {
			return{
				alwaysList:formComp,
				supportList:supportComp,
				itemInfo:{}
			}
		},
		methods:{
			cloneElement(origin){
				let cloneItem = JSON.parse(JSON.stringify(origin));
				cloneItem.id="fm_"+(new Date()).getTime();
				this.$emit('input',cloneItem);
				delete cloneItem['compName'];
				return cloneItem;
			},
			onStart(){
				
			},
			onEnd(obj){
				if(obj.from==obj.to){
					this.$emit('input',{});
				}
			}
		}
	}
</script>

<style>
</style>
