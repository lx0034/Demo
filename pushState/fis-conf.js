/*
*
* didi release -D //添加大写 D 参数生效
* 所有的资源引入都加入域名
*
*/
var domain = '//static.didialift.com';


/**
 *
 * 打包设置 didi release -p //这里的p参数
 *
 */
var pack = {

	//将 /lib/lib.js 打包成 /pkg/lib.js
	'/pkg/lib.js': [
		'/lib/lib.js',
	],
	//将 /css文件夹 下所有的css打包成 /pkg/lib.css
	'/pkg/lib.css': [
		'/css/**.css',
	],
	// 打包成 /pkg/pop.css
	'/pkg/pop.css': [
		// 选择page/pop 文件夹下所有CSS
		'/page/pop/**.css',
		// 选择components/first 文件夹下所有的CSS
		'/components/first/**.css',
		'/components/second/**.css',
		'/components/third/**.css'
	],

	//打包成 /pkg/pop.js
	'/pkg/pop.js': [
		// 选择page/pop 文件夹下所有JS
		'/page/pop/**.js',
		// 选择components/first 文件夹下所有的JS
		'/components/first/**.js',
		'/components/second/**.js',
		'/components/third/**.js'
	]
	// 将
};


 
/**
*
* 非HTML文件发布到的路径
*
*/
var releaseDir = '/static/release/';
// var releaseDir = '/s';


/*
 *发布设置 
 *
 * didi release -d [这里的参数]
 *
 */

var deploy = {
	//上线时用的不要删除哦
	local: [{

		from: '/',
		subOnly: true,
		to: '../output',
		replace: {
			from: releaseDir,
			to: '/pinche/release/'
		}
	}],
	// 所有人可以用
	remote: [
		{
			receiver: 'http://10.10.34.74:8456/receiver',
			//将发布结果的/page文件夹内的文件
			from: '/',
			subOnly: true,
			// 发布到这个路径
			to: '/home/xiaoju/.fis-didi-tmp/www',
		}
	],

	//顺风车 172 机器
	test: [
		{
			receiver: 'http://10.10.8.172:8014/receiver',
			//将发布结果的/page文件夹内的文件
			from: '/page',
			subOnly: true,
			// 发布到这个路径
			to: '/home/xiaoju/webroot/pinche_recruit/v1/views/app-pages/',
			replace: {
				//将资源的路径替换一下
				from: releaseDir,
				to: '/static/pinche/release/'
			}
		}, {
			receiver: 'http://10.10.8.172:8014/receiver',
			//将发布结果的/page文件夹内的文件
			from: '/static',
			subOnly: true,
			// 发布到这个路径
			to: '/home/webroot/webroot/static/pinche/',
			replace: {
				//将资源的路径替换一下
				from: releaseDir,
				to: '/static/pinche/release/'
			}
		}
	]
};

fis.util.read

/**
 *
 * 给各种源文件添加发布(release)属性
 * 优先级最高
 */
var userBeforeRoadMap = [
];

/**
 *
 * 给各种源文件添加发布(release)属性
 * 优先级最低
 */

var userAfterRoadMap = [
	{
		reg: '/config/**',
		release: false
	},
	//其他文件不发布
	{
		reg: '**',
		release: false
	}
];


/**
 * fis-didi插件扩展
 *
 *
 */
var modules = {
};

/**
 *
 * 资源地址配置
 *
 */

var roadmap = {

	domain: {
		'**': [domain]
	},

}
/*
* modules插件参数配置
*
*
*
*/

var settings = {
    optimizer : {
        'png-compressor' : {
        	type: 'pngquant',
        	//min & max
        	//png 最小压缩质量
        	quality: [60, 80]
        }
    },
	spriter: {
		csssprites: {
		    //图之间的边距
		    margin: 50,
		    //使用矩阵排列方式，默认为线性`linear`
		    layout: 'matrix'
		}
	}
};
/**
 *
 * 让以上设置生效
 *
 */

fis.config.merge({
	releaseDir: releaseDir,
	modules: modules,
	roadmap: roadmap,
	deploy: deploy,
	pack: pack,
	settings: settings
});

var defPostpackager = fis.config.get('modules.postpackager', [])
defPostpackager.push('testalert');
fis.config.set('modules.postpackager', defPostpackager);

var defaultRoadmap = fis.config.get('roadmap.path');
var newRoadmap = userBeforeRoadMap.concat(defaultRoadmap.concat(userAfterRoadMap));
fis.config.set('roadmap.path', newRoadmap);



