export let collapse = {
	id: '',
	compIcon: 'collapse',
	compName: '折叠面板',
	ele: 'el-collapse',
	showLabel: false,
	accordion: false,
	child: [{
		title: '内容一',
		name: '1',
		child: [{
			ele: 'div',
			child: '1.选项一'
		}, {
			ele: 'div',
			child: '2.选项二'
		}]
	}, {
		title: '内容一',
		name: '2',
		child: [{
			ele: 'div',
			child: "1.选项一"
		}, {
			ele: 'div',
			child: "2.选项二"
		}]
	}],
	childIndex: 0
}
