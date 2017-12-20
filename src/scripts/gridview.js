/*
 * 通用数据表格视图
 * CodeBy:Zhongke
 * Date:2013/11/12
 * LastDate:2014/07/09
 * Version:2.0
 */
(function (win) {
    /*
     * 数据表格视图对象
     * @opts 数据参数对象,包含设置的分页，数据源，列样式等等
     */
    var _GridView = function (opts) {
        //初始化数据表格基本参数设置
        this.settings = $.extend({
            container: $('body'),
            id: 'gridView' + parseInt(100000000 * Math.random()),
            //是否隐藏表格头部
            hidenHead: false,
            //是否为组合表头
            groupHead: {
                isGroup: false,
                template: $('#gridview_head').html()
            },
            //checkbox是否为单选
            singleSeleted: false,
            className: 'gridView',
            //高亮、变色行
            columnHighClassName: 'highBack',
            //主键ID，如果不设置将会导致行更新操作时获取不到主键ID
            dataKeyID: 'name',
            //当数据不够分页条数行的时候填充空白行
            columnFilling: false,
            //第一列是否需要checkbox可选功能
            selectedColumn: true,
            //是否添加行序号
            columnNo: true,
            //行合并,默认为全部不合并
            mergeRows: {
                //是否合并
                isMerge: false,
                //需要合并的列索引,不给此属性，默认合并所有列
                index: [0, 1, 2, 3, 4, 5]
            },
            //dataSource: [
            //    {
            //        id: {
            //            text: '001',                        
            //            childSize: 5,
            //            group:'001',
            //            level: 0
            //        }, name: "张三", age: "", sex: '', address: "", income: ''
            //    },
            //    {
            //        id: {
            //            text: '002',                        
            //            childSize: 4,
            //            group:'001',
            //            level: 1
            //        }, name: "张三", age: "", sex: '', address: "", income: ''
            //    },
            //    {
            //        id: {
            //            text: '003',                        
            //            childSize: 3,
            //            group:'001',
            //            level: 2
            //        }, name: "张三", age: "", sex: '', address: "", income: ''
            //    },
            //    {
            //        id: {
            //            text: '004',                        
            //            childSize: 0,
            //            group:'001',
            //            level: 3
            //        }, name: "张三", age: "40", sex: '男', address: "北京市", income: '100W'
            //    },
            //    {
            //        id: {
            //            text: '005',                        
            //            childSize: 0,
            //            group:'001',
            //            level: 3
            //        }, name: "张三", age: "40", sex: '男', address: "北京市", income: '100W'
            //    },
            //    {
            //        id: {
            //            text: '006',                        
            //            childSize: 0,
            //            group:'001',
            //            level: 3
            //        }, name: "张三", age: "40", sex: '男', address: "北京市", income: '100W'
            //    },


            //    {
            //        id: {
            //            text: '001',                        
            //            childSize: 5,
            //            group:'002',
            //            level: 0
            //        }, name: "张三", age: "", sex: '', address: "", income: ''
            //    },
            //    {
            //        id: {
            //            text: '002',                        
            //            childSize: 4,
            //            group:'002',
            //            level: 1
            //        }, name: "张三", age: "", sex: '', address: "", income: ''
            //    },
            //    {
            //        id: {
            //            text: '003',                        
            //            childSize: 3,
            //            group:'002',
            //            level: 2
            //        }, name: "张三", age: "", sex: '', address: "", income: ''
            //    },
            //    {
            //        id: {
            //            text: '004',                        
            //            childSize: 0,
            //            group:'002',
            //            level: 3
            //        }, name: "张三", age: "40", sex: '男', address: "北京市", income: '100W'
            //    },
            //    {
            //        id: {
            //            text: '005',                        
            //            childSize: 0,
            //            group:'002',
            //            level: 3
            //        }, name: "张三", age: "40", sex: '男', address: "北京市", income: '100W'
            //    },
            //    {
            //        id: {
            //            text: '006',                        
            //            childSize: 0,
            //            group:'002',
            //            level: 3
            //        }, name: "张三", age: "40", sex: '男', address: "北京市", income: '100W'
            //    }
                //{ id: {
                //    text: '001',
                //    child: '002',
                //    childSize: 5,
                //    group:'001',
                //    level: 0
                //}, name: "王五", age: "47", sex: '男', address: "重庆市", income: '100W' },
                //{ id: '006', name: "张三", age: "47", sex: '男', address: "重庆市", income: '100W' },
                //{ id: '007', name: "张三", age: "47", sex: '男', address: "重庆市", income: '100W' },
                //{ id: '008', name: "张三", age: "47", sex: '男', address: "重庆市", income: '100W' },
                //{ id: '009', name: "张三", age: "47", sex: '男', address: "重庆市", income: '100W' },
                //{ id: '010', name: "张三", age: "47", sex: '男', address: "重庆市", income: '100W' },
                //{ id: '011', name: "张三", age: "47", sex: '男', address: "重庆市", income: '100W' }
            //],
            columns: [
                { name: '项目分期', field: 'id', order: 0, width: 100, titleAlign: 'center', contentAlign: 'left', display: '' },
                {
                    name: '年龄', field: 'age', order: 2, width: 60, titleAlign: 'center', contentAlign: 'center', link: '/main.html?key={id}', clickCallback: function () {
                        var _$this = $(this);
                        //alert(_$this.attr('link'));
                        //alert('进来了....');
                        return false;
                    }, formatCallback: function ($this) {
                        //return $this.text().length > 0 ? '2014年01月12日' : '';
                    }
                },
                {
                    name: '性别', field: 'sex', order: 4, width: 120, titleAlign: 'center', contentAlign: 'center', clickCallback: function () {
                        var _$this = $(this);
                        //alert('又进来了...');
                    }
                },
                {
                    name: '地址', field: 'address', order: 3, width: 160, titleAlign: 'center', contentAlign: 'center', formatCallback: function ($this) {
                        // return $this.text().length > 0 ? '中国重庆市江津区' : '';
                    }, clickCallback: function () {
                        var _$this = $(this);
                        //alert(_$this.html());
                    }
                },
                { name: '姓名', field: 'name', order: 1, width: 120, titleAlign: 'center', contentAlign: 'center' },
                { name: '收入', field: 'income', order: 5, width: 180, titleAlign: 'center', contentAlign: 'center' },
                { name: '编辑', order: 6, width: 120, titleAlign: 'center', contentAlign: 'center' }
            ],
            //editColumn: [
            //    { name: '删除', type: 'delete', action: '/main.ashx?key={id}', after: '<span>|</span>', visible: true, append: '<img src="/skin/images/btn_save.gif" />' },
            //    {
            //        name: '通过', type: 'common', action: '/main.ashx?key={id}', after: '<span>|</span>', clickCallback: function (actionType, actionURL) {
            //            var _$this = this;
            //            alert(_$this.attr('action'));
            //        }
            //    },
            //    {
            //        name: '更新',
            //        type: 'update',
            //        action: '/main.ashx',
            //        columns: [
            //            { rowIndex: 1, type: 'hidden', name: '' },
            //            //{ rowIndex: 1, type: 'text', name: '' },
            //            { rowIndex: 2, type: 'text', name: '' },
            //            { rowIndex: 3, type: 'text', name: '' },
            //            { rowIndex: 4, type: 'select', name: '', action: '/main.ashx', dataSource: [{ id: '010', name: '北京市' }, { id: '023', name: '重庆市' }], dataKeyID: 'id', dataKeyText: 'name' },
            //            { rowIndex: 6, type: 'checkbox', name: '', action: '/main.ashx', dataSource: [{ id: '010', name: '5W' }, { id: '010', name: '10W' }, { id: '010', name: '20W' }, { id: '010', name: '30W' }], dataKeyID: 'id', dataKeyText: 'name' },
            //            { rowIndex: 5, type: 'radio', name: '', action: '/main.ashx', dataSource: [{ id: '1', name: '男' }, { id: '2', name: '女' }], dataKeyID: 'id', dataKeyText: 'name' }
            //        ],
            //        after: '<span>|</span>',
            //        append: '<img src="/skin/images/xg.gif" width="48" height="22" />',
            //        saveAppend: '<img src="/skin/images/btn_save.gif" width="48" height="22" />',
            //        clickCallback: function (actionType, actionURL) {
            //            alert('点击更新');            
            //            return true;  //返回true时，行内会执行colums配置的编辑样式，false时将会被忽略
            //        }
            //    },
            //    {
            //        name: '详情', type: 'common', action: '/detial.html?key={id}&name={name}', visible: function (data) {
            //            //console.log(data);
            //            return false;
            //        }, formatCallback: function (data) {
            //            if (data.id == '001')
            //                return '批准';
            //            else
            //                return '退回';
            //        }, clickCallback: function (actionType, actionURL) {
            //            var _$this = this;
            //            alert(_$this.text());
            //        }
            //    }
            //],
            ////行编辑时的回调事件
            //editUpdateCallback: function (datakey, editData, dataSource) {
            //    console.log(dataSource)
            //    //console.log(datakey);
            //},
            pages: {
                display: 'none',
                index: 0,
                size: 8,
                count: 24,
                pageClickEvent: function (index/*当前页码*/, grid/*GridView引用对象,用于再次调用绑定表格数据,不调用绑定方法则表格数据不会更新*/) {
                    //在这里写请求后台拿数据的Ajax调用
                    //然后再次调用
                    grid.ResetBindData([{ id: '001', name: "张三", age: "32", sex: '男', address: "北京市", income: '100W' }, { id: '002', name: "王老五", age: "23", sex: '男', address: "重庆市", income: '100W' }]);
                }
            }
            ////行单机事件
            //columnClickHandle: function () {
            //    var _$this = $(this)
            //    //alert('我是单击....' + _$this.attr('idx'));                
            //},
            ////行双击事件
            //columnDBClickHandle: function (e) {
            //    var _$this = $(this)
            //    //alert('我是双击...' + _$this.children('td').eq(2).html());
            //},
            ////行复选框的change事件
            //checkboxChangeHandle: function (data) {
            //    var _checked = data.checked,
            //        _value = data.value;

            //    console.log(data);
            //}
        }, opts);

        //初始化表格到指定的容器中
        var _gridHTML = '<table id="' + this.settings.id + '" class="' + this.settings.className + '">' +
                        '    <thead></thead>' +
                        '    <tbody></tbody>' +
                        '    <tfoot></tfoot>' +
                        '</table>';
        this.settings.container.html(_gridHTML);
    }

    /*
     * 绑定组合表头 -暂时未实现- 
     */
    _GridView.prototype.BindGroupHead = function () {
        var _this = this,
            _$grid = $('#' + _this.settings.id),
            _source = _this.settings.dataSource,
            _columns = _this.settings.columns,
            _theadList = '',
            _childHead = [];
        
        for (var i = 0, _count = _columns.length; i < _count; i++) {
            var _column = _columns[i],
                _thAttrs = '';

            if (!_column) continue;

            if (_column.group) {
                var _rowspan = _column.group.rowspan;                
            }

            if (_column.width)
                _thAttrs += ' width:' + _column.width + 'px;';

            if (_column.titleAlign)
                _thAttrs += ' text-align:' + _column.titleAlign + ';';

            if (_column.display)
                _thAttrs += 'display:' + _column.display + ';';

            _theadList += '<th style="' + _thAttrs + '">' + _column.name + '</th>';
        }
    }

    /*
     * 表格视图数据绑定
     */
    _GridView.prototype.BindDataSource = function () {
        var _this = this,
            _$grid = $('#' + _this.settings.id),
            _source = _this.settings.dataSource,
            _columns = _this.settings.columns,
            _theadList = '',
            _tbodyList = '';
        
        _columns.sort(function (a, b) {
            var _order1 = a.order,
                _order2 = b.order;
            if (_order1 < _order2) return -1;
            else if (_order1 == _order2) return 0;
            else return 1;
        });

        //是否为组合表头
        if (_this.settings.groupHead && _this.settings.groupHead.isGroup === true) {
            _theadList = _this.settings.groupHead.template;
        } else {
            //表格标头
            _theadList = '<tr>';
            for (var i = 0, _count = _columns.length; i < _count; i++) {
                var _column = _columns[i],
                    _thAttrs = '';

                if (!_column) continue;

                if (_column.width)
                    _thAttrs += ' width:' + _column.width + 'px;';

                if (_column.titleAlign)
                    _thAttrs += ' text-align:' + _column.titleAlign + ';';

                if (_column.display)
                    _thAttrs += 'display:' + _column.display + ';';

                _theadList += '<th style="' + _thAttrs + '">' + _column.name + '</th>';
            }
            _theadList += '</tr>';
        }

        //是否显示表头
        if (_this.settings.hidenHead) {
            _$grid.children('thead').hide().html(_theadList);
        }
        else {
            _$grid.children('thead').html(_theadList);
        }

        //表格内容
        for (var j = 0, _count2 = !!_this.settings.columnFilling && _this.settings.pages ? _this.settings.pages.size : _source.length; j < _count2; j++) {

            var _data = _source[j],
                _trClass = _this.settings.columnHighClassName && (j + 1) % 2 == 0 ? ' class="' + _this.settings.columnHighClassName + '"' : '';

            _tbodyList += '<tr idx="' + (_data ? _data[_this.settings.dataKeyID] : '') + '" ' + _trClass + '>';

            for (i = 0, _count = _columns.length; i < _count; i++) {
                _column = _columns[i];

                if (!_column) continue;

                //列属性
                if (_column.contentAlign)
                    _thAttrs = 'text-align:' + _column.contentAlign + ';';

                if (_column.display)
                    _thAttrs += 'display:' + _column.display + ';';

                if (_column.width)
                    _thAttrs += ' width:' + _column.width + 'px;';

                //如果没有field即为编辑列
                if (_column.field) {
                    _tbodyList += '<td idx="' + i + '" style="' + _thAttrs + '">';

                    if (!_data) {
                        _tbodyList += '</td>';
                    }
                    else if (_column.link) {
                        _tbodyList += '<a href="' + _this.ReplaceData(_column.link, _data) + '" target="_blank">' + _data[_column.field] + '</a></td>';
                    }
                    else {
                        _tbodyList += _this.TreeRow(_data[_column.field]) + '</td>';
                    }
                }
                else {
                    _tbodyList += '<td style="' + _thAttrs + '"></td>';
                }
            }
            _tbodyList += '</tr>';
        }
        _$grid.children('tbody').html(_tbodyList);

        _this.MergeRowspan();

        _this.BindTreeRowEvent();

        //绑定自定义点击回调事件
        _$grid.children('tbody').find('td').each(function (i) {
            var _$this = $(this),
                _index = _$this.attr('idx'),
                _column = _columns[_index];

            //点击回调事件
            if (_column && typeof _column.clickCallback == 'function') {
                _$this.bind('click', function (e) {
                    _column.clickCallback.call(this);
                    if (e.stopPropagation) {
                        e.stopPropagation();
                    } else {
                        e.cancelBubble = true;
                    }
                    e.preventDefault();
                });
            };

            //绑定格式化内容事件
            if (_column && typeof _column.formatCallback == 'function') {
                if (_column.link) {
                    _$this.find('a').html(_column.formatCallback(_$this));
                } else {
                    _$this.html(_column.formatCallback(_$this));
                }
            }
        });

        _this.RemoveLoading();

        return _this;
    }

    /*
     * 树形表格
     * @fieldData 当前列的对象值,如果是object对象就是一个tree对象
     */
    _GridView.prototype.TreeRow = function (fieldData) {
        if (typeof fieldData == 'object') {
            var _level = fieldData.level,
                _group = fieldData.group,
                _childSize = fieldData.childSize,
                _text = fieldData.text,
                _icon = '';            
            return '<span style="margin-left:' + (_level * 15) + 'px; cursor:pointer;">' + (_childSize < 1 ? '<b style="margin-right:5px;" group="' + _group + '" level="' + _level + '"></b>' : '<b class="grid_tree" style="margin-right:5px;" group="' + _group + '"  level="' + _level + '">[-]</b>') + _text + '</span>';
        }
        return fieldData;
    }

    /*
     * 树形表格点击事件
     */
    _GridView.prototype.BindTreeRowEvent = function () {
        var _this = this;
        $('b.grid_tree').bind('click', function () {
            var _$this = $(this),
                _text = _$this.text(),
                _group = _$this.attr('group'),
                _level = parseInt(_$this.attr('level')),
                _tr = _$this.parents('tr'),
                _status = false;

            _tr.nextAll().each(function () {
                var _$this = $(this),
                    _$b = _$this.find('b[group=' + _group + ']');

                if (_level == parseInt(_$b.attr('level')) || _status) {
                    _status = true;
                    return;
                }

                if (_text == '[-]')
                    _$b.parents('tr').hide();
                else {                    
                    _$b.text(_$b.text() != '' ? '[-]' : '').parents('tr').show();
                }
            });

            _$this.text(_text == '[-]' ? '[+]' : '[-]');
        });
    }

    /*
     * 行合并
     */
    _GridView.prototype.MergeRowspan = function () {
        if (!this.settings.mergeRows.isMerge) return;

        var _this = this,
            _$grid = $('#' + _this.settings.id),
            _settings = _this.settings,
            _$that,
            _rows = _settings.mergeRows.index || (function () {
                var _size = _$grid.find('tbody tr:eq(0)').children('td').size(),
                    _rows = [];
                for (var i = 0; i < _size; i++) {
                    _rows.push(i);
                }
                return _rows;
            })();

        //循环需要合并的td列
        $.each(_rows, function (o, i) {
            _$that = null;
            //循环gridview中的tr行，跟上一行tr中的td内容做比较。
            _$grid.find('tbody tr').each(function (rowIndex) {
                var _$this = $(this),
                    //获取当前行的td
                    _$td = _$this.children('td').eq(i),
                    //获取上一行合并td的前面一个td中的rowspan,如果当前已经是第一个td将返回-1。
                    _prevRowspan = _$that && _$that.prev().attr('rowspan') ? _$that.prev().attr('rowspan') : -1,
                    //_prevRowspan = _$that && _$that.prev().size() < 1 ? -1 : _$that && _$that.prev().attr('rowspan') ? _$that.prev().attr('rowspan') : -1,
                    //获取上一行合并td的rowspan,如果没有合并过就返回1
                    _rowspan = _$that && _$that.attr('rowspan') ? _$that.attr('rowspan') : 1;

                //如果已经合并过td了，而且上一次合并td中的内容和当前这个td的内容一样，并且上一个合并的td的分组td内容跟当前td的分组内容一致，那么进行下面的代码                
                if (_$that && _$that.text() == _$td.text() && _$that.parent().children('td').first().text() == _$td.parent().children('td').first().text()) {

                    //合并td的前面一个td中的rowspan
                    _prevRowspan = parseInt(_prevRowspan);

                    //合并td中的rowspan + 1
                    _rowspan = parseInt(_rowspan) + 1;

                    //if (_$td.text() == '0.00')
                    //    console.log(_rowspan + ' - ' + _prevRowspan);

                    //如果前面一个td中的rowspan不等于-1,那么说明当前的td不是为第一个，这样就需要验证合并td中的rowspan是否大于前面一个td的rowspan，如果大于就不能再继续合并了，否则td就错乱了
                    if (_prevRowspan != -1 && _rowspan > _prevRowspan) {
                        //将当前td交付给_$that,再继续往下面的td循环匹对
                        _$that = _$td;
                        return;
                    }

                    //到了这里，就正常开始给合并td累加rowspan
                    _$that.attr('rowspan', _rowspan);
                    //因为内容都一样，所以当前td隐藏
                    _$td.hide();
                }
                else {
                    _$that = _$td;
                }
            });
        });
    }

    /*
     * 加载状态 
     */
    _GridView.prototype.Loading = function () {
        var _this = this,
            _$grid = $('#' + _this.settings.id),
            _$gridContainer = _$grid.parent(),
            _headHeight = _$grid.children('thead').height(),
            _loadingHtml = '<div id="girdviewLoading" style="position:absolute; background:#fff; text-align:center; filter:alpha(opacity=60); opacity:0.6; width:' + _$grid.width() + 'px; height:' + (_$grid.height() - _headHeight) + 'px; top:' + _headHeight + 'px; left:0px;"><img title="数据加载中..." src="/SCRIPTS/pagekage/utils/widget/gridview/loading.gif" style="position:absolute; width:15px; height:15px; left:50%; top:50%; margin-left:-7.5px; margin-top:-' + (_headHeight + 7.5) + 'px; " /></div>';

        _$gridContainer.css({ 'position': 'relative' }).append(_loadingHtml);
    }

    /*
     * 干掉加载中....
     */
    _GridView.prototype.RemoveLoading = function () {
        $('#girdviewLoading').remove();
        return this;
    }

    /*
     * 分页回调函数再次数据绑定
     */
    _GridView.prototype.ResetBindData = function (data) {
        this.settings.dataSource = data;
        this.BindDataSource()
            .BindColumnNo()
            .SelectedColumn()
            .AddEditColumn()
            .BindColumnClickListener()
            .BindCheckboxChangeListener();
    }

    /*
     * 表格视图是否需要Checkbox选择框
     */
    _GridView.prototype.SelectedColumn = function () {
        var _this = this,
            _$grid = $('#' + _this.settings.id),
            _source = _this.settings.dataSource,
            _eisabled = _this.settings.selectedColumn,
            _chkAllID = _this.settings.id + '_ChkAll';

        if (_eisabled !== true) return _this;

        _$grid.children('thead').children('tr:eq(0)').prepend('<th style="width:20px;" rowspan="' + _$grid.children('thead').children('tr').size() + '"><input id="' + _chkAllID + '" type="checkbox"/></th>');        
        _$grid.children('tbody').children('tr').prepend('<td></td>')

        for (var j = 0, _sourceCount = _source.length; j < _sourceCount; j++) {
            _$grid.children('tbody').children('tr').eq(j).children('td:first').attr('style', 'text-align:center;').html('<input type="checkbox"/>')
        }

        $('#' + _chkAllID).change(function () {
            var _$chkbox = _$grid.children('tbody').children('tr').children('td').children('input[type=checkbox]'),
                _chkStatus = $(this).attr('checked');
            _$chkbox.attr('checked', _chkStatus ? true : false);
        });

        _$grid.children('tbody').children('tr').children('td').children('input[type=checkbox]').change(function () {
            var _$chkbox = _$grid.children('tbody').children('tr').children('td').children('input[type=checkbox]'),
                _chkStatus = $(this).attr('checked');
            if (_this.settings.singleSeleted === true) {
                _$chkbox.removeAttr('checked');
            }
            $(this).attr('checked', _chkStatus ? true : false)
        });

        return _this;
    }

    /*
     * 表格行的序号
     */
    _GridView.prototype.BindColumnNo = function () {
        var _this = this,
            _$grid = $('#' + _this.settings.id),
            _source = _this.settings.dataSource;

        if (!_this.settings.columnNo || !!!_this.settings.columnNo) return _this;

        _$grid.children('thead').children('tr:eq(0)').prepend('<th style="width:30px;" rowspan="'+ _$grid.children('thead').children('tr').size() +'">序号</th>');
        _$grid.children('tbody').children('tr').prepend('<td style="text-align:center;"></td>');

        for (var j = 0, _sourceCount = _source.length; j < _sourceCount; j++) {
            _$grid.children('tbody').children('tr').eq(j).children('td:first').html(j + 1);
        }

        return _this;
    }

    /*
     * 替换字符串中的关键字为对象值，并返回新字符串
     * @str  字符串
     * @data 对象
     */
    _GridView.prototype.ReplaceData = function (str, data) {
        return str.replace(/(\{(.*?)\})/g, function (a, b, c) {
            return data[c];
        });
    }

    /*
     * 修改状态下的编辑行
     * @index 当前选中行索引
     * @keyID 当前行的数据唯一ID(数据库中的主键编号)
     */
    _GridView.prototype.EditRow = function (index, keyID) {
        var _this = this,
            _editColumn = _this.settings.editColumn,
            _$grid = $('#' + _this.settings.id),
            _$row = _$grid.children('tbody').children('tr').eq(index),
            _updateColumn;

        for (var i = 0, _count = _editColumn.length; i < _count; i++) {
            _updateColumn = _editColumn[i];
            if (_updateColumn.type == 'update') {
                break;
            }
        }

        if (!_updateColumn.columns) {
            alert('温馨提示：您未设置columns属性');
            return;
        }

        for (i = 0, _count = _updateColumn.columns.length; i < _count; i++) {
            var _columnData = _updateColumn.columns[i],
                _column = _$row.children('td').eq(_columnData.rowIndex),
                _tempVal = _column.text(),
                _tempHtml = '',
                _tempData;

            switch (_columnData.type) {
                case 'hidden':
                    _column.append('<input type="hidden" name="' + _columnData.name + '" value="' + _tempVal + '" />');
                    break;
                case 'text':
                    _column.html('<input type="text" name="' + _columnData.name + '" value="' + _tempVal + '" />');
                    break;
                case 'select':
                    _column.html('<select name="' + _columnData.name + '"><option>加载中...</option></select>');
                    var _$select = _column.children('select');
                    if (_columnData.dataSource) {
                        for (var j = 0, _length = _columnData.dataSource.length; j < _length; j++) {
                            _tempData = _columnData.dataSource[j];
                            _tempHtml += '<option value="' + _tempData[_columnData.dataKeyID] + '">' + _tempData[_columnData.dataKeyText] + '</option>';
                        }
                        _$select.html(_tempHtml);
                    } else {
                        $.post(_column.action, { key: keyID }, function (result) {
                            for (var j = 0, _length = result.length; j < _length; j++) {
                                _tempData = result[j];
                                _tempHtml += '<option value="' + _tempData[_columnData.dataKeyID] + '">' + _tempData[_columnData.dataKeyText] + '</option>';
                            }
                            _$select.html(_tempHtml);
                        });
                    }
                    break;
                case 'checkbox':
                    _column.html('加载中...');
                    if (_columnData.dataSource) {
                        for (var j = 0, _length = _columnData.dataSource.length; j < _length; j++) {
                            _tempData = _columnData.dataSource[j];
                            _tempHtml += '<label><input type="checkbox" name-data="' + _columnData.name + '" name="' + _columnData.name + '_' + index + '" value="' + _tempData[_columnData.dataKeyID] + '" />' + _tempData[_columnData.dataKeyText] + '</label>';
                        }
                        _column.html(_tempHtml);
                    } else {
                        $.post(_column.action, { key: keyID }, function (result) {
                            for (var j = 0, _length = result.length; j < _length; j++) {
                                _tempData = result[j];
                                _tempHtml += '<label><input type="checkbox" value="' + _tempData[_columnData.dataKeyID] + '" />' + _tempData[_columnData.dataKeyText] + '</label>';
                            }
                            _column.html(_tempHtml);
                        });
                    }
                    break;
                case 'radio':
                    _column.html('加载中...');
                    if (_columnData.dataSource) {
                        for (var j = 0, _length = _columnData.dataSource.length; j < _length; j++) {
                            _tempData = _columnData.dataSource[j];
                            _tempHtml += '<label><input type="radio" name-data="' + _columnData.name + '" name="' + _columnData.name + '_' + index + '" value="' + _tempData[_columnData.dataKeyID] + '" />' + _tempData[_columnData.dataKeyText] + '</label>';
                        }
                        _column.html(_tempHtml);
                    } else {
                        $.post(_column.action, { key: keyID }, function (result) {
                            for (var j = 0, _length = result.length; j < _length; j++) {
                                _tempData = result[j];
                                _tempHtml += '<label><input type="radio" value="' + _tempData[_columnData.dataKeyID] + '" />' + _tempData[_columnData.dataKeyText] + '</label>';
                            }
                            _column.html(_tempHtml);
                        });
                    }
                    break;
                default:
                    return;

            }
        }
    }

    /*
     * 获取编辑列中的新值
     * @editRow 当前编辑列DOM对象
     */
    _GridView.prototype.GetEditColumnValue = function (editRow) {
        var _values = {};

        editRow.children('td').each(function () {
            var _$this = $(this),
                _$hide = _$this.children('input[type=hidden]'),
                _$txt = _$this.children('input[type=text]'),
                _$select = _$this.children('select'),
                _$chkbox = _$this.find('input[type=checkbox]'),
                _$radio = _$this.find('input[type=radio]'),
                _tempValue = '',
                _tempText = '';

            if (_$hide.size() > 0) {
                _values[_$hide.attr('name')] = _$hide.val();
                _$this.children('input[type=hidden]').remove();
            }

            if (_$txt.size() > 0) {
                _values[_$txt.attr('name')] = _$txt.val();
                _$this.html(_$txt.val());
            }

            if (_$select.size() > 0) {
                _values[_$select.attr('name')] = _$select.val();
                _$this.html(_$select.children('option').eq(_$select[0].selectedIndex).text());
            }

            if (_$chkbox.size() > 0 && !_$chkbox.attr('select')) {
                _$chkbox.each(function () {
                    if ($(this).attr('checked')) {
                        _tempValue += $(this).val() + ',';
                        _tempText += $(this).parent().text() + ',';
                    }
                });
                _values[_$chkbox.eq(0).attr('name-data')] = _tempValue.substring(0, _tempValue.length - 1);
                _$this.html(_tempText.substring(0, _tempText.length - 1));
            }

            if (_$radio.size() > 0) {
                _$radio.each(function () {
                    if ($(this).attr('checked')) {
                        _tempValue += $(this).val();
                        _tempText += $(this).parent().text();
                    }
                });
                _values[_$radio.eq(0).attr('name-data')] = _tempValue;
                _$this.html(_tempText);
            }
        });

        return _values;
    }

    /*
     * 向表格视图中增加编辑列
     */
    _GridView.prototype.AddEditColumn = function () {
        var _this = this,
            _$grid = $('#' + _this.settings.id),
            _editColumn = _this.settings.editColumn,
            _source = _this.settings.dataSource,
            _actionHTML = '';

        if (!_editColumn || _editColumn.length < 1) return _this;

        //绑定编辑列到表格视图中
        for (var j = 0, _sourceCount = _source.length; j < _sourceCount; j++) {
            var _sourceData = _source[j];
            for (var i = 0, _count = _editColumn.length; i < _count; i++) {
                var _data = _editColumn[i],
                    _visible,
                    _editName = '';

                if (!_data) continue;

                if (typeof _data.formatCallback == 'function') {
                    _editName = _data.formatCallback(_sourceData);
                }

                if (typeof _data.visible == 'function') {
                    _visible = _data.visible(_sourceData);
                }

                if (!!!_data.visible || !!!_visible) {
                    _data.display = _data.display ? _data.display : 'inline-block';
                    if (_data.append && _data.append != '') {
                        var _saveAppend = _data.saveAppend ? ' saveAppend="' + _data.saveAppend.replace(/"/g, '\'') + '"' : '';
                        _actionHTML += '<span style="display:' + _data.display + ';" class="gridView_edit"><a idx="' + i + '" type="' + _this.ReplaceData(_data.type, _sourceData) + '" action="' + _this.ReplaceData(_data.action, _sourceData) + '" ' + _saveAppend + '>' + _data.append + '</a></span>';
                    } else {
                        _actionHTML += '<span style="display:' + _data.display + ';" class="gridView_edit"><a idx="' + i + '" type="' + _this.ReplaceData(_data.type, _sourceData) + '" action="' + _this.ReplaceData(_data.action, _sourceData) + '">' + (_editName != '' ? _editName : _this.ReplaceData(_data.name, _sourceData)) + '</a></span>';
                    }
                }

                if (_data.after) {
                    _actionHTML += _data.after;
                }
            }

            _$grid.children('tbody').children('tr').eq(j).children('td:last').html(_actionHTML);
            _actionHTML = '';
        }

        //绑定编辑项的点击事件
        _$grid.children('tbody').find('a[type!=""]').bind('click', function () {
            var _$this = $(this),
                _actionType = _$this.attr('type'),
                _actionURL = _$this.attr('action'),
                _editIndex = _$this.attr('idx'),
                _thisRow = _$this.parent().parent().parent(),
                _keyID = _thisRow.attr('idx'),
                _saveAppend = _$this.attr('saveappend') || '',
                _index = _thisRow.index();

            //验证是否有自己处理的回调函数属性,如果有就不执行下面系统的处理方式
            var _clickCallback = _editColumn && _editColumn[_editIndex] ? _editColumn[_editIndex].clickCallback : undefined,
                _callbackStatus = true;

            if (typeof _clickCallback == 'function') {
                _callbackStatus = _clickCallback.call(_$this, _actionType, _actionURL);                
            }

            if (!_callbackStatus) return;

            switch (_actionType && _actionType.toLowerCase()) {
                case 'delete':
                    if (!confirm('温馨提示：您确定要删除吗？')) return;
                    $.ajax({
                        type: 'get',
                        url: _actionURL,
                        async: false,
                        cache: false,
                        success: function (result) {
                            result = eval('(' + result + ')');
                            if (result.status == '200') {
                                alert('温馨提示：删除成功!');
                                location = location;
                            } else {
                                alert('温馨提示：删除失败,请稍后再试！');
                            }
                        }
                    });
                    break;
                case 'common':
                    $.ajax({
                        type: 'get',
                        url: _actionURL,
                        async: false,
                        cache: false,
                        success: function (result) {
                            result = eval('(' + result + ')');
                            if (result.status == '200') {
                                alert('温馨提示：操作成功!');
                                location = location;
                            } else {
                                alert('温馨提示：操作失败,请稍后再试！');
                            }
                        }
                    });
                    break;
                case 'update':
                    var _actionStatus = _$this.attr('action_status');
                    if (_actionStatus && _actionStatus == 'edit') {
                        if (!confirm('温馨提示：您确定要保存吗？')) return;

                        var _resultData = _this.GetEditColumnValue(_thisRow);
                        if (typeof _this.settings.editUpdateCallback == 'function') {
                            _this.settings.editUpdateCallback(_keyID, _resultData, _source[_index]);
                        }

                        _$this.removeAttr('action_status');
                        if (_saveAppend != '') {
                            _$this.html(_$this.attr('old_name'));
                        } else {
                            _$this.text(_$this.attr('old_name'));
                        }
                    } else {
                        _this.EditRow(_index, _keyID);
                        if (_saveAppend != '') {
                            _$this.attr('old_name', _$this.html()).html(_saveAppend).attr('action_status', 'edit');
                        } else {
                            _$this.attr('old_name', _$this.text()).text('保存').attr('action_status', 'edit');
                        }
                    }
                    break;
                case 'link':
                    window.open(_actionURL);
                    break;
                default:
                    return;
            }
        });

        return _this;
    }

    /*
     * 表格视图分页
     */
    _GridView.prototype.DataPager = function () {
        var _this = this,
            _$grid = $('#' + _this.settings.id),
            _pages = _this.settings.pages,
            _pageCount = 1,
            _pageHtml = '<span>共<b>' + _pages.count + '</b>条记录</span><a action="home">首页</a><a action="prev">上一页</a><a action="next">下一页</a><a action="last">尾页</a><span><label>跳转至</label><select>@</select>页</span>',
            _colspan = !!_this.settings.selectedColumn && !!_this.settings.columnNo ? _this.settings.columns.length + 2 : !!_this.settings.selectedColumn || !!_this.settings.columnNo ? _this.settings.columns.length + 1 : _this.settings.columns.length,
            _tempHtml = '';

        if (!_pages) return _this;

        //快速跳转下拉框分页数绑定
        //_pageCount = _pages.count % _pages.size == 0 ? _pages.count / _pages.size : _pages.count / _pages.size + 1;
        _pageCount = parseInt(_pages.count % _pages.size == 0 ? _pages.count / _pages.size : _pages.count > _pages.size ? _pages.count / _pages.size + 1 : 1);
        for (var i = 1; i <= _pageCount; i++) {
            _tempHtml += '<option value="' + i + '">' + i + '</option>';
        }
        _pageHtml = _pageHtml.replace(/@/g, _tempHtml);

        if (_this.settings.pages.display == 'none')
            return _this;


        _$grid.children('tfoot').html('<tr><td colspan="' + _colspan + '">' + _pageHtml + '</td></tr>');

        //分页点击事件
        _$grid.children('tfoot').find('td').bind('click', function (e) {
            if (e.target.nodeName.toLowerCase() == 'a') {
                var _action = $(e.target).attr('action');
                switch (_action) {
                    case 'home':
                        _pages.index = 1;
                        break;
                    case 'prev':
                        if (_pages.index == 1) {
                            alert('温馨提示：已经是第一页了!');
                            return;
                        }
                        _pages.index--;
                        break;
                    case 'next':
                        if (_pages.index == _pageCount) {
                            alert('温馨提示：已经是最后一页了！');
                            return;
                        }
                        _pages.index++;
                        break;
                    case 'last':
                        _pages.index = _pageCount;
                        break;
                    default:
                        return;
                }
                var _$select = $(this).find('select');
                _$select.children('option').eq(_pages.index - 1).attr('selected', 'selected');

                _this.Loading();
                _pages.pageClickEvent(_pages.index, _this);
            }
        }).find('select').bind('change', function () {
            _pages.index = parseInt($(this).children('option').eq($(this)[0].selectedIndex).text());
            _this.Loading();
            _pages.pageClickEvent(_pages.index, _this);
        });

        return _this;
    }

    /*
     * 绑定GirdView列单击、双击点击事件
     */
    _GridView.prototype.BindColumnClickListener = function () {
        var _this = this,
            _$grid = $('#' + _this.settings.id),
            _$trList = _$grid.children('tbody').children('tr'),
            _clickCount = 0,
            _clickEvent = {};

        if (typeof _this.settings.columnClickHandle == 'function') {
            _$trList.bind('click', function () {
                var _$this = this;
                _clickCount++;
                _clickEvent['click' + _clickCount] = setTimeout(function () {
                    _this.settings.columnClickHandle.call(_$this);
                }, 200);
            });
        }

        if (typeof _this.settings.columnDBClickHandle == 'function') {
            _$trList.bind('dblclick', function () {
                for (var e in _clickEvent) {
                    clearTimeout(_clickEvent[e]);
                }
                _clickEvent = {};
                _this.settings.columnDBClickHandle.call(this);
            });
        }

        return _this;
    }

    /*
     * 获取Checkbox被选中的value
     */
    _GridView.prototype.GetSelectedValue = function () {
        var _this = this,
            _$grid = $('#' + _this.settings.id),
            _$trList = _$grid.children('tbody').children('tr'),
            _result = [],
            _chkStatus = $(this).attr('checked');

        if (!_this.settings.selectedColumn)
            return _result;

        _$trList.each(function () {
            var _$this = $(this),
                _$checkbox = _$this.children('td').eq(0).children('input[type=checkbox]');
            if (_$checkbox.size() > 0 && _$checkbox[0].checked) {
                _result.push(_$checkbox.parent().parent().attr('idx'));
            }
        });

        return _result;
    }

    /*
     * 获取GirdView中所有的KeyID
     */
    _GridView.prototype.GetAllValue = function () {
        var _this = this,
            _$grid = $('#' + _this.settings.id),
            _$trList = _$grid.children('tbody').children('tr'),
            _result = [];

        _$trList.each(function () {
            _result.push($(this).attr('idx'));
        });

        return _result;
    }

    /*
     * 获取一行数据，续提供当前行的KeyID
     * @keyID string 设置的KeyID
     */
    _GridView.prototype.GetColumnByKeyID = function (keyID) {
        var _this = this,
            _$grid = $('#' + _this.settings.id),
            _$tr = _$grid.children('tbody').children('tr[idx="' + keyID + '"]');
        return _$tr.children('td');
    }

    /*
     * 设置指定的行默认被选中
     * @columnIndex 行索引
     */
    _GridView.prototype.SelectedCheckBox = function (columnIndex) {
        var _this = this,
            _$grid = $('#' + _this.settings.id);

        if (!_this.settings.selectedColumn || !!!_this.settings.selectedColumn) return;

        var _$checkbox = _$grid.children('tbody').children('tr').eq(columnIndex).children('td').eq(0).children('input[type=checkbox]');
        if (_$checkbox)
            _$checkbox[0].checked = true;
    }

    /*
     * 绑定checkbox的change事件
     */
    _GridView.prototype.BindCheckboxChangeListener = function () {
        var _this = this,
            _$grid = $('#' + _this.settings.id);

        //单个点击
        _$grid.children('tbody').children('tr').each(function () {
            $(this).children('td').eq(0).children('input[type=checkbox]').bind('change', function () {
                var _$this = $(this),
                    _id = _$this.parent().parent().attr('idx');
                if (typeof _this.settings.checkboxChangeHandle == 'function') {
                    _this.settings.checkboxChangeHandle({ checkbox: _$this, checked: _$this[0].checked, value: _id });
                }
            });
        });

        //全选
        _$grid.children('thead').children('tr').eq(0).children('th').eq(0).children('input[type=checkbox]').bind('change', function () {
            var _data = [];
            _$grid.children('tbody').children('tr').each(function () {
                var _$chkbox = $(this).children('td').eq(0).children('input[type=checkbox]'),
                    _id = _$chkbox.parent().parent().attr('idx');
                if (_$chkbox.size() > 0)
                    _data.push({ checkbox: $(this), checked: _$chkbox[0].checked, value: _id });
            });
            if (typeof _this.settings.checkboxChangeHandle == 'function') {
                _this.settings.checkboxChangeHandle(_data);
            }
        });

        return _this;
    }

    /*
     * 初始化表格视图
     */
    _GridView.prototype.Init = function () {
        return this.BindDataSource()
                    .BindColumnNo()
                    .SelectedColumn()
                    .AddEditColumn()
                    .BindColumnClickListener()
                    .DataPager()
                    .BindCheckboxChangeListener();
    }

    /*
     * 插件初始化入口
     */
    win.GridView = function (opts) {
        var _gridView = new _GridView(opts).Init();
        return {
            GetSelectedValue: function () {
                return _gridView.GetSelectedValue();
            },
            GetAllValue: function () {
                return _gridView.GetAllValue();
            },
            GetColumnByKeyID: function (keyID) {
                return _gridView.GetColumnByKeyID(keyID);
            },
            SelectedCheckBox: function (columnIndex) {
                _gridView.SelectedCheckBox(columnIndex);
            }
        }
    };
})(window);