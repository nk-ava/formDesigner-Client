<script>
	import render from "./render";
	
	export default {
		name:"itemPresent",
		components:{
			render
		},
		props:{
			model:{
				type:Object,
				default:{}
			},
			activeItem:{
				type: Object,
				default:{}
			}
		},
		render(){
			let className = this.model.id===this.activeItem.id?'drawing-item active-from-item':'drawing-item';
			let {copyItem,deleteItem,activeItemChange} = this.$listeners;
			let rowType = this.model.compAlign==undefined?"":"flex";
			let align = this.model.compAlign||"";
			return (
			    <el-row class={className} nativeOnClick={event=>{activeItemChange(this.model);event.stopPropagation();}}>
					<el-col span={24}>
			      <span class="component-id">{this.model.id}</span>
						<el-row type={rowType} justify={align} class="form-item">
			      <el-form-item label={this.model.showLabel?this.model.title:''}
					required={this.model.required}
					style="margin-bottom:5px;" 
					label-width={this.model.showLabel?'80px':'10px'}>
			        <render confs={this.model} onInput={ event => {this.$set(this.model, 'value', event)}}/>
						</el-form-item>
			      </el-row>
				  <span class="drawing-item-copy" title="复制" onClick={event => {copyItem(this.model); event.stopPropagation();}}>
				    <i class="el-icon-copy-document" />
				  </span>
				  <span class="drawing-item-delete" title="删除" onClick={event => {deleteItem(this.model); event.stopPropagation();}}>
				    <i class="el-icon-delete" />
				  </span>
				  </el-col>
			    </el-row>
			)
		}
	}
</script>