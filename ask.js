/**
 * 共同库
 */
module.exports = function(options){
	return [
		{
			type: 'input',
			name: 'name',
			message: '项目名称',
			default: options.name || ''
		},
		// {
		// 	type: 'input',
		// 	name: 'description',
		// 	message: '项目描述,可不填',
		// 	default: options.name || ''
		// },
		// {
		// 	type: 'input',
		// 	name: 'author',
		// 	message: '作者,可不填',
		// 	default: ''
		// }
	];
};
