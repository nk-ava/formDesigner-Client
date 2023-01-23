<script>
	let isAttr = makeMap(
		'accept,accept-charset,accesskey,action,align,alt,async,autocomplete,' +
		'autofocus,autoplay,autosave,bgcolor,border,buffered,challenge,charset,' +
		'checked,cite,class,code,codebase,color,cols,colspan,content,http-equiv,' +
		'name,contenteditable,contextmenu,controls,coords,data,datetime,default,' +
		'defer,dir,dirname,disabled,download,draggable,dropzone,enctype,method,for,' +
		'form,formaction,headers,height,hidden,high,href,hreflang,http-equiv,' +
		'icon,id,ismap,itemprop,keytype,kind,label,lang,language,list,loop,low,' +
		'manifest,max,maxlength,media,method,GET,POST,min,multiple,email,file,' +
		'muted,name,novalidate,open,optimum,pattern,ping,placeholder,poster,' +
		'preload,radiogroup,readonly,rel,required,reversed,rows,rowspan,sandbox,' +
		'scope,scoped,seamless,selected,shape,size,type,text,password,sizes,span,' +
		'spellcheck,src,srcdoc,srclang,srcset,start,step,style,summary,tabindex,' +
		'target,title,type,usemap,value,width,wrap'
	)

	let childEle = {
		'el-select': ['el-option'],
		'el-checkbox-group': ['el-checkbox', 'el-checkbox-button'],
		'el-radio-group': ['el-radio', 'el-radio-button'],
		'el-collapse': ['el-collapse-item']
	}

	function makeMap(str, expectsLowerCase) {
		const map = Object.create(null)
		const list = str.split(',')
		for (let i = 0; i < list.length; i++) {
			map[list[i]] = true
		}
		return expectsLowerCase ?
			val => map[val.toLowerCase()] :
			val => map[val]
	}

	function vModel(self, dataObject) {
		dataObject.on.input = val => {
			self.$emit('input', val)
		}
	}

	export default {
		name: "render",
		render(h) {
			let conf = JSON.parse(JSON.stringify(this.confs));
			let dataObject = {
				attrs: {},
				props: {},
				on: {},
				style: {}
			}
			let child = conf.child;
			delete conf.child;
			Object.keys(conf).forEach(key => {
				const val = conf[key]
				if (dataObject[key]) {
					dataObject[key] = val
				} else if (!isAttr(key)) {
					dataObject.props[key] = val
				} else if (key === 'width') {
					dataObject.style = 'width:' + val;
				} else {
					dataObject.attrs[key] = val
				}
			})
			vModel(this, dataObject);
			if (typeof child !== "string" && child != null) {
				let ans = [];
				for (let ele of child) {
					let data = {
						attrs: {},
						props: {},
						on: {},
						style: {}
					}
					data.attrs = ele;
					if (conf.childAttr) data.attrs = Object.assign(data.attrs, conf.childAttr);
					let childs = [];
					if(ele.child){
						for(let element of ele.child) childs.push(h(element.ele,null,element.child));
					}
					ans.push(h(childEle[conf.ele][conf.childIndex], data, childs));
				}
				child = ans;
			}
			return h(conf.ele, dataObject, child);
		},
		props: {
			confs: {
				type: Object,
				default: {}
			}
		}
	}
</script>
