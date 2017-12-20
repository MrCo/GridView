## GridView是什么？

##### GridView是由<a href="http://www.mrco.cn/?gridview=gridview" target="_blank">Mr.Co</a>开发的一套开源的多功能表格插件，主要用于让页面开发者在开发中节省拼接Table表格和操作Table表格相关复杂操作的开发成本与时间。开发人员可以用GridView快速开发出带有集成编辑、组合表头、分页、表行列操作等一系列功能的GridView。GridView依赖于jQuery类库开发而成，它可以使用在任何Web页面中，比较适合后端项目使用。

### 主要特点

<ul>
    <li>快速：体积小，加载速度快</li>
    <li>开源：开放源代码，高品质</li>
    <li>扩展：基于对象库的设计，可根据需求增减功能</li>
    <li>风格：修改GridView风格非常容易，只需修改一个 CSS 文件</li>
    <li>兼容：支持大部分主流浏览器，比如 IE、Firefox、Safari、Chrome、Opera</li>
</ul>

### 开源日志
<ul>
    <li>2016-06：GridView正式开源</li>
</ul>

### 快速使用

```
/**引入皮肤样式**/
<link href="css/gridview.css" rel="stylesheet"/>
/**引入jQuery类库**/
<script src="scripts/jquery.js"></script>
/**引入gridview类库**/
<script src="scripts/gridview.js"></script>

/**页面中新增一个容器元素**/
<div id="grid"></div>

/**初始化gridview**/
GridView({
    container: $('#grid'),
    dataSource: [
        { id: '006', name: "张三", age: "47", sex: '男', address: "重庆市", income: '100W' },
        { id: '007', name: "张三", age: "47", sex: '男', address: "重庆市", income: '100W' },
        { id: '008', name: "张三", age: "47", sex: '男', address: "重庆市", income: '100W' },
        { id: '009', name: "张三", age: "47", sex: '男', address: "重庆市", income: '100W' },
        { id: '010', name: "张三", age: "47", sex: '男', address: "重庆市", income: '100W' },
        { id: '006', name: "张三", age: "47", sex: '男', address: "重庆市", income: '100W' },
        { id: '007', name: "张三", age: "47", sex: '男', address: "重庆市", income: '100W' },
        { id: '008', name: "张三", age: "47", sex: '男', address: "重庆市", income: '100W' },
        { id: '009', name: "张三", age: "47", sex: '男', address: "重庆市", income: '100W' },
        { id: '010', name: "张三", age: "47", sex: '男', address: "重庆市", income: '100W' },
        { id: '011', name: "张三", age: "47", sex: '男', address: "重庆市", income: '100W' }
    ],
    columns: [
        { name: '系统编号', field: 'id', order: 0, width: 100, titleAlign: 'center', contentAlign: 'left', display: '' },
        { name: '年龄', field: 'age', order: 2, width: 60, titleAlign: 'center', contentAlign: 'center', link: '/main.html?key={id}' },
        { name: '性别', field: 'sex', order: 4, width: 120, titleAlign: 'center', contentAlign: 'center' },
        { name: '地址', field: 'address', order: 3, width: 160, titleAlign: 'center', contentAlign: 'center' },
        { name: '姓名', field: 'name', order: 1, width: 120, titleAlign: 'center', contentAlign: 'center' },
        { name: '收入', field: 'income', order: 5, width: 180, titleAlign: 'center', contentAlign: 'center' }
    ]
});
```

### 初始化参数配置
```
//表格容器
container: $('body')

//表格唯一ID
id: 'gridView' + parseInt(100000000 * Math.random())

//是否隐藏表格头部
hidenHead: false

//是否为组合表头
groupHead: {
    //如果为组合表头必须设置为true
    isGroup: false,
    template: $('#gridview_head').html()
},

//表格行checkbox是否为单选,false : 非单选  true : 单选
singleSeleted: false

//表格默认样式名称
className: 'gridView'

//行间隔-高亮变色行样式名称
columnHighClassName: 'highBack'

//主键ID，如果不设置将会导致行更新操作时获取不到主键ID
dataKeyID: 'id'

//当数据不够分页条数行的时候填充空白行
columnFilling: false

//是否需要显示表格行checkbox可选功能, false : 不显示  true : 显示
selectedColumn: true

//是否添加行序号, false : 不显示  true : 显示
columnNo: true

//行合并,默认为全部不合并
mergeRows: {
    //是否合并  false : 不合并  true : 合并
    isMerge: false,
    //需要合并的列索引,不给此属性，默认合并所有列
    index: [0, 1, 2, 3, 4, 5]
}

//数据表格格式设置，表格数据显示规则就靠它了
columns:[
    {
        //需要映射的字段Key
        field:'name',
        //表格头部标题
        name:'姓名'，
        //表格列排序，数字越小越靠前
        order:1,
        //表格宽度
        width:200,
        //表格头部标题显示位置,属性与CSS中的text-align属性一致
        titleAlign:'center',
        //表格内容部分显示位置,属性与CSS中的text-align属性一致
        contentAlign:'center',
        //控制该列是否显示 block 显示 none 不显示
        display:'none',
        //当该属性存在,clickCallback不存在的时候，当前元素会变成一个超链接
        link:'http://www.baidu.com',
        //监听当前元素的点击事件
        clickCallback:function(){
            //当前元素对象
            var _$this = $(this);
        },
        //返回格式化后的数据信息显示到表格中
        formatCallback: function ($this) {
            return $this.text() == '张三' ? '张三好帅' : '王五好帅';
        }
    }
]

//编辑列设置属性配置
editColumn:[
    {
        //操作名称
        name: '删除',
        //操作类型，预定义类型有 delete(删除)、update(表格编辑)、common(自定义)三种类型
        type: 'delete',
        //当type为delete、update时候需要设置action的ajax请求地址,传参方式在{}括号中填写相对于的数据源中所映射的Key名称便可
        action: '/main.ashx?key={id}',
        //是否显示操作项
        visible: true,
        //在操作名称后面追加其它HTML元素，这里我用于做间隔
        after: '<span>|</span>',
        //在当前操作项中追加一个ICON操作图片,也可以追加其它HTML元素
        append: '<img src="btn_save.gif" />',
        //监听当前编辑元素的点击事件
        clickCallback:function (actionType, actionURL) {
            //actionType 获取当前的操作type, 比如delete或者update
            //actionURL 获取到解析后的action地址，用于ajax请求
            //this为当前编辑元素对象,你拿到它可以做其它相关DOM操作
            var _$this = this;
        },
        //返回格式化后的数据信息替换操作名称
        formatCallback:function (data) {
            //data 当前一行的data数据
            if (data.id == '001')
                return '恢复';
            else
                return '删除';
        }
    },
    {
        //操作名称
        name: '更新',
        //操作类型，预定义类型有 delete(删除)、update(表格编辑)、common(自定义)三种类型
        type: 'update',
        //定义编辑时显示的表单类型
        columns: [
            {
                //现在的列索引位置
                rowIndex: 1,
                //表单类型,可以是所以表单类型,比如select、text、passwod等等
                type: 'hidden',
                //表单名称
                name: 'hidID'
            },
            {
                //现在的列索引位置
                rowIndex: 2,
                //表单类型,可以是所以表单类型,比如select、text、passwod等等
                type: 'select',
                //表单名称
                name: 'ddlCity',
                //select异步请求数据源的ajax地址
                action: '/main.ashx',
                //数据对象
                dataSource: [
                    { id: '010', name: '北京市' },
                    { id: '023', name: '重庆市' }
                ],
                //select绑定的value
                dataKeyID: 'id',
                //select绑定的text
                dataKeyText: 'name'
            }
        ],
        after: '<span>|</span>',
        append: '<img src="xg.gif" width="48" height="22" />',
        saveAppend: '<img src="btn_save.gif" width="48" height="22" />',
        clickCallback: function (actionType, actionURL) {
            alert('点击更新');
            //返回true时，行内会执行colums配置的编辑样式，false时将会被忽略
            return true;
        }
    }
]

//分页属性配置
pages:{
    //是否显示分页, block或者不设置display属性 = 显示  none = 不显示
    display: 'none',
    //默认页码
    index: 0,
    //每页显示条数
    size: 8,
    //总条数
    count: 24,
    pageClickEvent: function (index/*当前页码*/, grid/*GridView引用对象,用于再次调用绑定表格数据,不调用绑定方法则表格数据不会更新*/) {
        //在这里写请求后台拿数据的Ajax调用
        //然后再次调用
        grid.ResetBindData([{ id: '001', name: "张三", age: "32", sex: '男', address: "北京市", income: '100W' }, { id: '002', name: "王老五", age: "23", sex: '男', address: "重庆市", income: '100W' }]);
    }
}

//行单击监听方法
columnClickHandle:function(){
    var _$this = $(this)
}

//行双击监听方法
columnDBClickHandle:function(){
    var _$this = $(this)
}

//行复选框的change事件监听方法
checkboxChangeHandle:function(){
    var _checked = data.checked,
        _value = data.value;
}
```

### GridView表格支持以下多种功能
- 基本表格
- 编辑表格
- 分页表格
- 树状表格
- 组合头表格
- 参数配置

> 详情配置请移步[GridView](http://gridview.mrco.cn)主页查看

