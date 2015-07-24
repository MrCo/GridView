/*
 * 通用数据表格视图
 * CodeBy:Zhongke
 * Date:2013/11/12
 * Version:1.0
 */
(function ($) {
    /*
     * 数据表格视图对象
     * @opts 数据参数对象,包含设置的分页，数据源，列样式等等
     */
    var _GridView = function (opts) {
        //初始化数据表格基本参数设置
        this.settings = $.extend(true, {
            container: $('body'),
            id: 'gridView' + parseInt(100000000 * Math.random()),
            fucid: "",
            data: "",
            className: 'default_grid',
            dataKeyID: 'id',
            sort: {
                sortorder: "asc",
                sortname: "id",
                sortable: false,
                sortEven: function (sortorder, sortname) {
                    console.log("order by " + sortname + " " + sortorder);
                }
            },
            groupHeaders: [/*{ startColumnName: 'amount', numberOfColumns: 3, titleText: 'Price' }*/],
            dataSource: [],
            columns: [],
            selectedColumn: false,
            editColumn: [
                //{ name: '删除', type: 'delete', action: '/main.ashx?key={id}' },
                //{
                //    name: '更新',
                //    type: 'update',
                //    action: '/main.ashx',
                //    columns: []
                //},
                //{ name: '详情', type: 'link', action: '/detial.html?key={id}&name={name}' }
            ],
            pages: {
                index: 0,
                size: 8,
                count: 24,
                pageClickEvent: function (index/*当前页码*/, grid/*GridView引用对象,用于再次调用绑定表格数据,不调用绑定方法则表格数据不会更新*/) {
                    //在这里写请求后台拿数据的Ajax调用
                    //然后再次调用
                    //grid.ResetBindData([{ id: '001', name: "张三", age: "32", sex: '男', address: "北京市", income: '100W' }, { id: '002', name: "王老五", age: "23", sex: '男', address: "重庆市", income: '100W' }]);                    
                }
            }
        }, opts);

        var _this = this;

        //初始化表格到指定的容器中
        var _gridHTML = '<table id="' + this.settings.id + '" class="' + this.settings.className + '">' +
                        '    <thead></thead>' +
                        '    <tbody></tbody>' +
                        '    <tfoot></tfoot>' +
                        '</table>';
        this.settings.container.html(_gridHTML);
        if (_this.settings.fucid) {

            var _sort = _this.settings.sort;

            var data = _sort.sortable ? (_this.settings.data ? "," + _this.settings.data : "") + _sort.sortname + "," + _sort.sortorder : _this.settings.data;
            var _pagebase = GLOBAL.pagebase;
            var _paths = [
               '/scripts/pagekage/datastore/dataHandle.js',
            ];
            GLOBAL.load(_paths, '', function () {
                var _dataHandle = GLOBAL.dataStore.dataHandle;
                _dataHandle.getData({
                    //服务端通用请求地址
                    url: _pagebase.ServiceURL,
                    //处理类型，data为数据库数据处理，perm为扩展功能数据处理
                    handler: 'data',
                    //请求参数,fucid为SqlConfig中的sql标记的ID
                    parame: '{fucid:"' + _this.settings.fucid + '",data:"' + data + '"}',
                    success: function (data) {
                        _this.settings.dataSource = data;
                        _this.Init();
                    }
                });
            });
        } else {
            _this.Init();
        }

    }

    _GridView.prototype.BindGridHead = function () {
        var _this = this,
           _$grid = $('#' + _this.settings.id),
           _source = _this.settings.dataSource,
           _columns = _this.settings.columns,
           _theadList = '',
           _sort = _this.settings.sort,
           _groupHeaders = _this.settings.groupHeaders,
           _tbodyList = '';

        _columns.sort(function (a, b) {
            if (a.order < b.order) return -1;
            else if (a.order == b.order) return 0;
            else return 1;
        });




        //表格标头
        _theadList = '<tr>';

        console.log(_groupHeaders.length)

        if (_groupHeaders.length > 0) {

            for (var i = 0, _count = _columns.length; i < _count; i++) {
                var _column = _columns[i],
                   _thAttrs = '';
                if (_column.width) _thAttrs += ' width:' + _column.width + 'px;';
                if (_column.titleAlign) _thAttrs += ' text-align:' + _column.titleAlign + ';';
                var header = null;
                for (var j = 0; j < _groupHeaders.length; j++) {
                    if (_groupHeaders[j].startColumnName == _column.field) {
                        header = _groupHeaders[i];
                    }
                }
                if (header != null) {
                    _theadList += '<th colspan="' + header.numberOfColumns + '"> ' + header.titleText + ' </th>';
                    i += header.numberOfColumns - 1;
                } else {
                    _theadList += '<th ></th>';
                }

            }
            _theadList += '</tr><tr>';
        }

        var headerTop = [], headerContent = [];


        for (var i = 0, _count = _columns.length; i < _count; i++) {
            var _column = _columns[i],
                _thAttrs = '';
            if (_column.width) _thAttrs += ' width:' + _column.width + 'px;';
            if (_column.titleAlign) _thAttrs += ' text-align:' + _column.titleAlign + ';';
            var sortClass = "";
            // debugger
            if (_sort.sortable && (_column.sortable)) {
                sortClass = "sortClass";
            }
            _theadList += '<th style="' + _thAttrs + '" id="' + _column.field + '"  class="' + sortClass + '" >' + _column.name + '</th>';


        }
        _theadList += '</tr>';

        _$grid.children('thead').html(_theadList);



        _$grid.on("click", ".sortClass", function () {
            _sort.sortname = this.id;
            $(".sortIcon").remove();
            $(this).find("span").length > 0 || $(this).append("<span class='sortIcon'><span>");
            if (_sort.sortorder == "asc") {
                _sort.sortorder = "desc";
                $(this).find("span").html("▼");
            } else {
                _sort.sortorder = "asc";
                $(this).find("span").html("▲");
            }

            _this.settings.dataSource = _sort.sortEven(_sort.sortname, _sort.sortorder, _this);
            //debugger
            //_this.BindDataSource();

        });
        return _this;
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


        //表格内容
        for (var j = 0, _count2 = _source.length; j < _count2; j++) {
            var _data = _source[j];
            _tbodyList += '<tr idx="' + _data[_this.settings.dataKeyID] + '">';
            for (i = 0, _count = _columns.length; i < _count; i++) {
                _column = _columns[i];
                //列属性
                if (_column.contentAlign) _thAttrs = 'text-align:' + _column.contentAlign;
                //如果没有field即为编辑列
                if (_column.field) {
                    _tbodyList += '<td style="' + _thAttrs + '">';
                    if (_column.link)
                        _tbodyList += '<a href="' + _this.ReplaceData(_column.link, _data) + '" target="_blank">' + _data[_column.field] + '</a></td>';
                    else
                        _tbodyList += _data[_column.field] + '</td>';
                }
                else
                    _tbodyList += '<td style="' + _thAttrs + '"></td>';
            }
            _tbodyList += '</tr>';
        }


        _$grid.children('tbody').html(_tbodyList);


        return _this;
    }

    /*
     * 分页回调函数再次数据绑定
     */
    _GridView.prototype.ResetBindData = function (data) {
        this.settings.dataSource = data;
        this.BindDataSource().SelectedColumn().AddEditColumn();
    }

    /*
     * 表格视图是否需要Checkbox选择框
     */
    _GridView.prototype.SelectedColumn = function () {
        var _this = this,
            _$grid = $('#' + _this.settings.id),
            _eisabled = _this.settings.selectedColumn,
            _chkAllID = _this.settings.id + '_ChkAll';

        if (_eisabled !== true) return _this;

        _$grid.children('thead').children('tr').prepend('<th><input id="' + _chkAllID + '" type="checkbox"/></th>');
        _$grid.children('tbody').children('tr').prepend('<td><input type="checkbox" select="select"/></td>');

        $('#' + _chkAllID).change(function () {
            var _$chkbox = _$grid.children('tbody').children('tr').children('td').children('input[type=checkbox]'),
                _chkStatus = $(this).attr('checked');
            _$chkbox.attr('checked', _chkStatus ? true : false);
        });

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
                _$txt = _$this.children('input[type=text]'),
                _$select = _$this.children('select'),
                _$chkbox = _$this.find('input[type=checkbox]'),
                _$radio = _$this.find('input[type=radio]'),
                _tempValue = '',
                _tempText = '';

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
                var _data = _editColumn[i];
                _actionHTML += '<span><a type="' + _data.type + '" action="' + _this.ReplaceData(_data.action, _sourceData) + '">' + _data.name + '</a></span>';
            }
            _$grid.children('tbody').children('tr').eq(j).children('td:last').html(_actionHTML);
            _actionHTML = '';
        }

        //绑定编辑项的点击事件
        _$grid.find('a[type!=""]').bind('click', function () {
            var _$this = $(this),
                _actionType = _$this.attr('type'),
                _actionURL = _$this.attr('action'),
                _thisRow = _$this.parent().parent().parent(),
                _keyID = _thisRow.attr('idx'),
                _index = _thisRow.index();

            switch (_actionType) {
                case 'delete':
                    if (!confirm('温馨提示：您确定要删除吗？')) return;
                    $.post(_actionURL, { key: _keyID }, function (result) {
                        if (result == '200') {
                            alert('温馨提示：删除成功!');
                            _this.Init();
                        } else {
                            alert('温馨提示：删除失败,请稍后再试！');
                        }
                    });
                    break;
                case 'update':
                    var _actionStatus = _$this.attr('action_status');
                    if (_actionStatus && _actionStatus == 'edit') {
                        if (!confirm('温馨提示：您确定要保存吗？')) return;
                        var _resultData = _this.GetEditColumnValue(_thisRow);
                        console.log(_resultData);
                        //这里写入库的Code..待续
                        //$.post(_actionURL['delete'].action, { key: _keyID }, function (result) {
                        //    if (result == '200') {
                        //        alert('温馨提示：删除成功!');
                        //        _this.Init();
                        //    } else {
                        //        alert('温馨提示：删除失败,请稍后再试！');
                        //    }
                        //});                        
                        _$this.removeAttr('action_status');
                        _$this.text(_$this.attr('old_name'));
                    } else {
                        _this.EditRow(_index, _keyID);
                        _$this.attr('old_name', _$this.text()).text('保存').attr('action_status', 'edit');
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
            _pageCount = 0,
            _pageHtml = '<a action="home">首页</a><a action="prev">上一页</a><a action="next">下一页</a><a action="last">尾页</a><span><label>跳转至</label><select>@</select>页</span>',
            _colspan = _this.settings.selectedColumn ? _this.settings.columns.length + 1 : _this.settings.columns.length,
            _tempHtml = '';

        if (!_pages) return _this;

        //快速跳转下拉框分页数绑定
        _pageCount = _pages.count % _pages.size == 0 ? _pages.count / _pages.size : _pages.count / _pages.size + 1;
        for (var i = 1; i <= _pageCount; i++) {
            _tempHtml += '<option value="' + i + '">' + i + '</option>';
        }
        _pageHtml = _pageHtml.replace(/@/g, _tempHtml);
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
                _pages.pageClickEvent(_pages.index, _this);
            }
        }).find('select').bind('change', function () {
            _pages.index = parseInt($(this).children('option').eq($(this)[0].selectedIndex).text());
            _pages.pageClickEvent(_pages.index, _this);
        });

        return _this;
    }

    /*
     * 初始化表格视图
     */
    _GridView.prototype.Init = function () {
        return this.BindGridHead().BindDataSource().SelectedColumn().AddEditColumn().DataPager();
    }

    /*
     * 插件初始化入口
     */
    //win.GridView = function (opts) { return new _GridView(opts).Init(); };

    $.fn.GridView = function (opts) {
        opts.container = this;
        return new _GridView(opts);
    }

})(jQuery);