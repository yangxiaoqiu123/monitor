/** v3.1.8 date:2020-05-04 */
layui.config({
    version: '318',   // 更新组件缓存，设为true不缓存，也可以设一个固定值
    base: 'assets/module/'
}).extend({
    cascader: 'cascader/cascader',
    dropdown: 'dropdown/dropdown',
    tagsInput: 'tagsInput/tagsInput',
    zTree: 'zTree/zTree'
}).use(['layer', 'setter', 'index', 'admin'], function () {
    var $ = layui.jquery;
    var layer = layui.layer;
    var setter = layui.setter;
    var index = layui.index;
    var admin = layui.admin;

    /* 检查是否登录 */
    if (!setter.getToken()) {
        return location.replace('login.html');
    }

});
