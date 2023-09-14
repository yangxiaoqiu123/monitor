﻿
layui.define(["layer","setter","layRouter"],function(f){var h=layui.jquery;var k=layui.layer;var d=layui.setter;var o=layui.layRouter;var b=".layui-layout-admin>.layui-body";var l=b+">.layui-tab";var e=".layui-layout-admin>.layui-side>.layui-side-scroll";var j=".layui-layout-admin>.layui-header";var c="admin-side-nav";var n={version:"3.1.8",layerData:{}};n.flexible=function(i){var r=h(".layui-layout-admin");var q=r.hasClass("admin-nav-mini");if(i===undefined){i=q}if(q===i){if(i){n.hideTableScrollBar();r.removeClass("admin-nav-mini")}else{r.addClass("admin-nav-mini")}layui.event.call(this,"admin","flexible({*})",{expand:i});n.resizeTable(600)}};n.activeNav=function(q){if(!q){q=location.hash}if(!q){return console.warn("active url is null")}h(e+">.layui-nav .layui-nav-item .layui-nav-child dd.layui-this").removeClass("layui-this");h(e+">.layui-nav .layui-nav-item.layui-this").removeClass("layui-this");var t=h(e+'>.layui-nav a[href="#'+q+'"]');if(t.length===0){return console.warn(q+" not found")}var s=h(".layui-layout-admin").hasClass("admin-nav-mini");if(h(e+">.layui-nav").attr("lay-shrink")==="_all"){var i=t.parent("dd").parents(".layui-nav-child");if(!s){h(e+">.layui-nav .layui-nav-itemed>.layui-nav-child").not(i).css("display","block").slideUp("fast",function(){h(this).css("display","")})}h(e+">.layui-nav .layui-nav-itemed").not(i.parent()).removeClass("layui-nav-itemed")}t.parent().addClass("layui-this");var u=t.parent("dd").parents(".layui-nav-child").parent();if(!s){var v=u.not(".layui-nav-itemed").children(".layui-nav-child");v.slideDown("fast",function(){if(h(this).is(v.last())){v.css("display","");var w=t.offset().top+t.outerHeight()+30-n.getPageHeight();var x=50+65-t.offset().top;if(w>0){h(e).animate({"scrollTop":h(e).scrollTop()+w},300)}else{if(x>0){h(e).animate({"scrollTop":h(e).scrollTop()-x},300)}}}})}u.addClass("layui-nav-itemed");h('ul[lay-filter="'+c+'"]').addClass("layui-hide");var r=t.parents(".layui-nav");r.removeClass("layui-hide");h(j+">.layui-nav>.layui-nav-item").removeClass("layui-this");h(j+'>.layui-nav>.layui-nav-item>a[nav-bind="'+r.attr("nav-id")+'"]').parent().addClass("layui-this")};n.popupRight=function(i){i.anim=-1;i.offset="r";i.move=false;i.fixed=true;if(i.area===undefined){i.area="336px"}if(i.title===undefined){i.title=false}if(i.closeBtn===undefined){i.closeBtn=false}if(i.shadeClose===undefined){i.shadeClose=true}if(i.skin===undefined){i.skin="layui-anim layui-anim-rl layui-layer-adminRight"}return n.open(i)};n.open=function(s){if(s.content&&s.type===2){s.url=undefined}if(s.url&&(s.type===2||s.type===undefined)){s.type=1}if(s.area===undefined){s.area=s.type===2?["360px","300px"]:"360px"}if(s.offset===undefined){s.offset="70px"}if(s.shade===undefined){s.shade=0.1}if(s.fixed===undefined){s.fixed=false}if(s.resize===undefined){s.resize=false}if(s.skin===undefined){s.skin="layui-layer-admin"}var q=s.end;s.end=function(){k.closeAll("tips");q&&q()};if(s.url){var r=s.success;s.success=function(t,u){h(t).data("tpl",s.tpl||"");n.reloadLayer(u,s.url,r)}}else{if(s.tpl&&s.content){s.content=n.util.tpl(s.content,s.data,d.tplOpen,d.tplClose)}}var i=k.open(s);if(s.data){n.layerData["d"+i]=s.data}return i};n.getLayerData=function(i,q){if(i===undefined){i=parent.layer.getFrameIndex(window.name);if(i===undefined){return null}else{return parent.layui.admin.getLayerData(parseInt(i),q)}}else{if(isNaN(i)){i=n.getLayerIndex(i)}}if(i===undefined){return}var r=n.layerData["d"+i];if(q&&r){return r[q]}return r};n.putLayerData=function(q,s,i){if(i===undefined){i=parent.layer.getFrameIndex(window.name);if(i===undefined){return}else{return parent.layui.admin.putLayerData(q,s,parseInt(i))}}else{if(isNaN(i)){i=n.getLayerIndex(i)}}if(i===undefined){return}var r=n.getLayerData(i);if(!r){r={}}r[q]=s;n.layerData["d"+i]=r};n.reloadLayer=function(q,i,s){if(typeof i==="function"){s=i;i=undefined}if(isNaN(q)){q=n.getLayerIndex(q)}if(q===undefined){return}var r=h("#layui-layer"+q);if(i===undefined){i=r.data("url")}if(!i){return}r.data("url",i);n.showLoading(r);n.ajax({url:i,dataType:"html",success:function(w){n.removeLoading(r,false);if(typeof w!=="string"){w=JSON.stringify(w)}var u=r.data("tpl");if(u===true||u==="true"){var y=n.getLayerData(q)||{};y.layerIndex=q;var t=h("<div>"+w+"</div>"),v={};t.find("script,[tpl-ignore]").each(function(z){var A=h(this);v["temp_"+z]=A[0].outerHTML;A.after("${temp_"+z+"}").remove()});w=n.util.tpl(t.html(),y,d.tplOpen,d.tplClose);for(var x in v){w=w.replace("${"+x+"}",v[x])}}r.children(".layui-layer-content").html(w);n.renderTpl("#layui-layer"+q+" [ew-tpl]");s&&s(r[0],q)}})};n.alert=function(q,i,r){if(typeof i==="function"){r=i;i={}}if(i.skin===undefined){i.skin="layui-layer-admin"}if(i.shade===undefined){i.shade=0.1}return k.alert(q,i,r)};n.confirm=function(r,i,s,q){if(typeof i==="function"){q=s;s=i;i={}}if(i.skin===undefined){i.skin="layui-layer-admin"}if(i.shade===undefined){i.shade=0.1}return k.confirm(r,i,s,q)};n.prompt=function(i,q){if(typeof i==="function"){q=i;i={}}if(i.skin===undefined){i.skin="layui-layer-admin layui-layer-prompt"}if(i.shade===undefined){i.shade=0.1}return k.prompt(i,q)};n.req=function(i,r,s,t,q){if(typeof r==="function"){q=t;t=s;s=r;r={}}if(t!==undefined&&typeof t!=="string"){q=t;t=undefined}if(!t){t="GET"}if(typeof r==="string"){if(!q){q={}}if(!q.contentType){q.contentType="application/json;charset=UTF-8"}}else{if(d.reqPutToPost){if("put"===t.toLowerCase()){t="POST";r._method="PUT"}else{if("delete"===t.toLowerCase()){t="GET";r._method="DELETE"}}}}return n.ajax(h.extend({url:(d.baseServer||"")+i,data:r,type:t,dataType:"json",success:s},q))};n.ajax=function(u){var r=n.util.deepClone(u);if(!u.dataType){u.dataType="json"}if(!u.headers){u.headers={}}var t=d.getAjaxHeaders(u.url);if(t){for(var q=0;q<t.length;q++){if(u.headers[t[q].name]===undefined){u.headers[t[q].name]=t[q].value}}}var s=u.success;u.success=function(i,v,x){var w=d.ajaxSuccessBefore(n.parseJSON(i),u.url,{param:r,reload:function(y){n.ajax(h.extend(true,r,y))},update:function(y){i=y},xhr:x});if(w!==false){s&&s(i,v,x)}else{u.cancel&&u.cancel()}};u.error=function(v,i){u.success({code:v.status,msg:v.statusText},i,v)};if(layui.cache.version&&(!d.apiNoCache||u.dataType.toLowerCase()!=="json")){if(u.url.indexOf("?")===-1){u.url+="?v="}else{u.url+="&v="}if(layui.cache.version===true){u.url+=new Date().getTime()}else{u.url+=layui.cache.version}}return h.ajax(u)};n.parseJSON=function(q){if(typeof q==="string"){try{return JSON.parse(q)}catch(i){}}return q};n.showLoading=function(t,s,q,r){if(t!==undefined&&(typeof t!=="string")&&!(t instanceof h)){s=t.type;q=t.opacity;r=t.size;t=t.elem}if(s===undefined){s=d.defaultLoading||1}if(r===undefined){r="sm"}if(t===undefined){t="body"}var i=['<div class="ball-loader '+r+'"><span></span><span></span><span></span><span></span></div>','<div class="rubik-loader '+r+'"></div>','<div class="signal-loader '+r+'"><span></span><span></span><span></span><span></span></div>','<div class="layui-loader '+r+'"><i class="layui-icon layui-icon-loading layui-anim layui-anim-rotate layui-anim-loop"></i></div>'];h(t).addClass("page-no-scroll");h(t).scrollTop(0);var u=h(t).children(".page-loading");if(u.length<=0){h(t).append('<div class="page-loading">'+i[s-1]+"</div>");u=h(t).children(".page-loading")}if(q!==undefined){u.css("background-color","rgba(255,255,255,"+q+")")}u.show()};n.removeLoading=function(q,s,i){if(q===undefined){q="body"}if(s===undefined){s=true}var r=h(q).children(".page-loading");if(i){r.remove()}else{if(s){r.fadeOut("fast")}else{r.hide()}}h(q).removeClass("page-no-scroll")};n.putTempData=function(r,s,q){var i=q?d.tableName:d.tableName+"_tempData";if(s===undefined||s===null){if(q){layui.data(i,{key:r,remove:true})}else{layui.sessionData(i,{key:r,remove:true})}}else{if(q){layui.data(i,{key:r,value:s})}else{layui.sessionData(i,{key:r,value:s})}}};n.getTempData=function(r,q){if(typeof r==="boolean"){q=r;r=undefined}var i=q?d.tableName:d.tableName+"_tempData";var s=q?layui.data(i):layui.sessionData(i);if(!r){return s}return s?s[r]:undefined};n.rollPage=function(s){var q=h(l+">.layui-tab-title");var r=q.scrollLeft();if("left"===s){q.animate({"scrollLeft":r-120},100)}else{if("auto"===s){var i=0;q.children("li").each(function(){if(h(this).hasClass("layui-this")){return false}else{i+=h(this).outerWidth()}});q.animate({"scrollLeft":i-120},100)}else{q.animate({"scrollLeft":r+120},100)}}};n.refresh=function(i){o.refresh(i)};n.closeThisTabs=function(i){n.closeTabOperNav();var q=h(l+">.layui-tab-title");if(!i){if(q.find("li").first().hasClass("layui-this")){return k.msg("主页不能关闭",{icon:2})}q.find("li.layui-this").find(".layui-tab-close").trigger("click")}else{if(i===q.find("li").first().attr("lay-id")){return k.msg("主页不能关闭",{icon:2})}q.find('li[lay-id="'+i+'"]').find(".layui-tab-close").trigger("click")}};n.closeOtherTabs=function(i){if(!i){h(l+">.layui-tab-title li:gt(0):not(.layui-this)").find(".layui-tab-close").trigger("click")}else{h(l+">.layui-tab-title li:gt(0)").each(function(){if(i!==h(this).attr("lay-id")){h(this).find(".layui-tab-close").trigger("click")}})}n.closeTabOperNav()};n.closeAllTabs=function(){h(l+">.layui-tab-title li:gt(0)").find(".layui-tab-close").trigger("click");h(l+">.layui-tab-title li:eq(0)").trigger("click");n.closeTabOperNav()};n.closeTabOperNav=function(){h(".layui-icon-down .layui-nav .layui-nav-child").removeClass("layui-show")};n.changeTheme=function(w,v,q,u){if(!q){n.putSetting("defaultTheme",w)}if(!v){v=top}n.removeTheme(v);if(w){try{var s=v.layui.jquery("body");s.addClass(w);s.data("theme",w)}catch(t){}}if(u){return}var x=v.frames;for(var r=0;r<x.length;r++){n.changeTheme(w,x[r],true,false)}};n.removeTheme=function(i){if(!i){i=window}try{var q=i.layui.jquery("body");var s=q.data("theme");if(s){q.removeClass(s)}q.removeData("theme")}catch(r){}};n.closeThisDialog=function(){return n.closeDialog()};n.closeDialog=function(i){if(i){k.close(n.getLayerIndex(i))}else{parent.layer.close(parent.layer.getFrameIndex(window.name))}};n.getLayerIndex=function(i){if(!i){return parent.layer.getFrameIndex(window.name)}var q=h(i).parents(".layui-layer").first().attr("id");if(q&&q.length>=11){return q.substring(11)}};n.iframeAuto=function(){return parent.layer.iframeAuto(parent.layer.getFrameIndex(window.name))};n.getPageHeight=function(){return document.documentElement.clientHeight||document.body.clientHeight};n.getPageWidth=function(){return document.documentElement.clientWidth||document.body.clientWidth};n.modelForm=function(q,t,i){var s=h(q);s.addClass("layui-form");if(i){s.attr("lay-filter",i)}var r=s.find(".layui-layer-btn .layui-layer-btn0");r.attr("lay-submit","");r.attr("lay-filter",t)};n.btnLoading=function(q,r,s){if(r!==undefined&&(typeof r==="boolean")){s=r;r=undefined}if(r===undefined){r="&nbsp;加载中"}if(s===undefined){s=true}var i=h(q);if(s){i.addClass("ew-btn-loading");i.prepend('<span class="ew-btn-loading-text"><i class="layui-icon layui-icon-loading layui-anim layui-anim-rotate layui-anim-loop"></i>'+r+"</span>");i.attr("disabled","disabled").prop("disabled",true)}else{i.removeClass("ew-btn-loading");i.children(".ew-btn-loading-text").remove();i.removeProp("disabled").removeAttr("disabled")}};n.openSideAutoExpand=function(){var i=h(".layui-layout-admin>.layui-side");i.off("mouseenter.openSideAutoExpand").on("mouseenter.openSideAutoExpand",function(){if(!h(this).parent().hasClass("admin-nav-mini")){return}n.flexible(true);h(this).addClass("side-mini-hover")});i.off("mouseleave.openSideAutoExpand").on("mouseleave.openSideAutoExpand",function(){if(!h(this).hasClass("side-mini-hover")){return}n.flexible(false);h(this).removeClass("side-mini-hover")})};n.openCellAutoExpand=function(){var i=h("body");i.off("mouseenter.openCellAutoExpand").on("mouseenter.openCellAutoExpand",".layui-table-view td",function(){h(this).find(".layui-table-grid-down").trigger("click")});i.off("mouseleave.openCellAutoExpand").on("mouseleave.openCellAutoExpand",".layui-table-tips>.layui-layer-content",function(){h(".layui-table-tips-c").trigger("click")})};n.parseLayerOption=function(r){for(var s in r){if(!r.hasOwnProperty(s)){continue}if(r[s]&&r[s].toString().indexOf(",")!==-1){r[s]=r[s].toString().split(",")}}var i={"success":"layero,index","cancel":"index,layero","end":"","full":"","min":"","restore":""};for(var q in i){if(!i.hasOwnProperty(q)||!r[q]){continue}try{if(/^[a-zA-Z_]+[a-zA-Z0-9_]+$/.test(r[q])){r[q]+="()"}r[q]=new Function(i[q],r[q])}catch(t){r[q]=undefined}}if(r.content&&(typeof r.content==="string")&&r.content.indexOf("#")===0){if(h(r.content).is("script")){r.content=h(r.content).html()}else{r.content=h(r.content)}}if(r.type===undefined&&r.url===undefined){r.type=2}return r};n.strToWin=function(t){var s=window;if(!t){return s}var q=t.split(".");for(var r=0;r<q.length;r++){s=s[q[r]]}return s};n.hideTableScrollBar=function(){if(n.getPageWidth()<=768){return}var i=d.pageTabs?h(l+">.layui-tab-content>.layui-tab-item.layui-show"):h(b);if(window.hsbTimer){clearTimeout(window.hsbTimer)}i.find(".layui-table-body.layui-table-main").addClass("no-scrollbar");window.hsbTimer=setTimeout(function(){i.find(".layui-table-body.layui-table-main").removeClass("no-scrollbar")},600)};n.resizeTable=function(i){setTimeout(function(){var q=d.pageTabs?h(l+">.layui-tab-content>.layui-tab-item.layui-show"):h(b);q.find(".layui-table-view").each(function(){var r=h(this).attr("lay-id");layui.table&&layui.table.resize(r)})},i===undefined?0:i)};n.hasPerm=function(t){var s=d.getUserAuths();if(s){for(var q=0;q<s.length;q++){if(t==s[q]){return true}}}return false};n.renderPerm=function(){h("[perm-show]").each(function(){if(!n.hasPerm(h(this).attr("perm-show"))){h(this).remove()}})};n.events={flexible:function(){n.strToWin(h(this).data("window")).layui.admin.flexible()},refresh:function(){n.strToWin(h(this).data("window")).layui.admin.refresh()},back:function(){n.strToWin(h(this).data("window")).history.back()},theme:function(){var i=n.util.deepClone(h(this).data());n.strToWin(i.window).layui.admin.popupRight(h.extend({id:"layer-theme",url:i.url||"components/tpl/theme.html"},n.parseLayerOption(i)))},note:function(){var i=n.util.deepClone(h(this).data());n.strToWin(i.window).layui.admin.popupRight(h.extend({id:"layer-note",url:i.url||"components/tpl/note.html"},n.parseLayerOption(i)))},message:function(){var i=n.util.deepClone(h(this).data());n.strToWin(i.window).layui.admin.popupRight(h.extend({id:"layer-notice",url:i.url||"components/tpl/message.html"},n.parseLayerOption(i)))},psw:function(){var i=n.util.deepClone(h(this).data());n.strToWin(i.window).layui.admin.open(h.extend({id:"layer-psw",title:"修改密码",shade:0,url:i.url||"components/tpl/password.html"},n.parseLayerOption(i)))},logout:function(){var q=n.util.deepClone(h(this).data());n.unlockScreen();function i(){if(q.ajax){var r=k.load(2);n.req(q.ajax,function(t){k.close(r);if(q.parseData){try{var s=new Function("res",q.parseData);t=s(t)}catch(u){console.error(u)}}if(t.code==(q.code||0)){d.removeToken&&d.removeToken();location.replace(q.url||"/")}else{k.msg(t.msg,{icon:2})}},q.method||"delete")}else{d.removeToken&&d.removeToken();location.replace(q.url||"/")}}if(false===q.confirm||"false"===q.confirm){return i()}n.strToWin(q.window).layui.layer.confirm(q.content||"确定要退出登录吗？",h.extend({title:"温馨提示",skin:"layui-layer-admin",shade:0.1},n.parseLayerOption(q)),function(){i()})},open:function(){var i=n.util.deepClone(h(this).data());n.strToWin(i.window).layui.admin.open(n.parseLayerOption(i))},popupRight:function(){var i=n.util.deepClone(h(this).data());n.strToWin(i.window).layui.admin.popupRight(n.parseLayerOption(i))},fullScreen:function(){var x="layui-icon-screen-full",q="layui-icon-screen-restore";var w=h(this).find("i");var t=document.fullscreenElement||document.msFullscreenElement||document.mozFullScreenElement||document.webkitFullscreenElement||false;if(t){var s=document.exitFullscreen||document.webkitExitFullscreen||document.mozCancelFullScreen||document.msExitFullscreen;if(s){s.call(document)}else{if(window.ActiveXObject){var u=new ActiveXObject("WScript.Shell");u&&u.SendKeys("{F11}")}}w.addClass(x).removeClass(q)}else{var i=document.documentElement;var r=i.requestFullscreen||i.webkitRequestFullscreen||i.mozRequestFullScreen||i.msRequestFullscreen;if(r){r.call(i)}else{if(window.ActiveXObject){var v=new ActiveXObject("WScript.Shell");v&&v.SendKeys("{F11}")}}w.addClass(q).removeClass(x)}},leftPage:function(){n.strToWin(h(this).data("window")).layui.admin.rollPage("left")},rightPage:function(){n.strToWin(h(this).data("window")).layui.admin.rollPage()},closeThisTabs:function(){var i=h(this).data("url");n.strToWin(h(this).data("window")).layui.admin.closeThisTabs(i)},closeOtherTabs:function(){n.strToWin(h(this).data("window")).layui.admin.closeOtherTabs()},closeAllTabs:function(){n.strToWin(h(this).data("window")).layui.admin.closeAllTabs()},closeDialog:function(){if(h(this).parents(".layui-layer").length>0){n.closeDialog(this)}else{n.closeDialog()}},closeIframeDialog:function(){n.closeDialog()},closePageDialog:function(){n.closeDialog(this)},lockScreen:function(){n.strToWin(h(this).data("window")).layui.admin.lockScreen(h(this).data("url"))}};n.chooseLocation=function(u){var q=u.title;var y=u.onSelect;var s=u.needCity;var z=u.center;var C=u.defaultZoom;var v=u.pointZoom;var x=u.keywords;var B=u.pageSize;var t=u.mapJsUrl;if(q===undefined){q="选择位置"}if(C===undefined){C=11}if(v===undefined){v=17}if(x===undefined){x=""}if(B===undefined){B=30}if(t===undefined){t="https://webapi.amap.com/maps?v=1.4.14&key=006d995d433058322319fa797f2876f5"}var D=false,A;var w=function(F,E){AMap.service(["AMap.PlaceSearch"],function(){var H=new AMap.PlaceSearch({type:"",pageSize:B,pageIndex:1});var G=[E,F];H.searchNearBy(x,G,1000,function(J,I){if(J==="complete"){var M=I.poiList.pois;var N="";for(var L=0;L<M.length;L++){var K=M[L];if(K.location!==undefined){N+='<div data-lng="'+K.location.lng+'" data-lat="'+K.location.lat+'" class="ew-map-select-search-list-item">';N+='     <div class="ew-map-select-search-list-item-title">'+K.name+"</div>";N+='     <div class="ew-map-select-search-list-item-address">'+K.address+"</div>";N+='     <div class="ew-map-select-search-list-item-icon-ok layui-hide"><i class="layui-icon layui-icon-ok-circle"></i></div>';N+="</div>"}}h("#ew-map-select-pois").html(N)}})})};var i=function(){var E={resizeEnable:true,zoom:C};z&&(E.center=z);var G=new AMap.Map("ew-map-select-map",E);G.on("complete",function(){var H=G.getCenter();w(H.lat,H.lng)});G.on("moveend",function(){if(D){D=false}else{h("#ew-map-select-tips").addClass("layui-hide");h("#ew-map-select-center-img").removeClass("bounceInDown");setTimeout(function(){h("#ew-map-select-center-img").addClass("bounceInDown")});var H=G.getCenter();w(H.lat,H.lng)}});h("#ew-map-select-pois").off("click").on("click",".ew-map-select-search-list-item",function(){h("#ew-map-select-tips").addClass("layui-hide");h("#ew-map-select-pois .ew-map-select-search-list-item-icon-ok").addClass("layui-hide");h(this).find(".ew-map-select-search-list-item-icon-ok").removeClass("layui-hide");h("#ew-map-select-center-img").removeClass("bounceInDown");setTimeout(function(){h("#ew-map-select-center-img").addClass("bounceInDown")});var J=h(this).data("lng");var K=h(this).data("lat");var I=h(this).find(".ew-map-select-search-list-item-title").text();var H=h(this).find(".ew-map-select-search-list-item-address").text();A={name:I,address:H,lat:K,lng:J};D=true;G.setZoomAndCenter(v,[J,K])});h("#ew-map-select-btn-ok").click(function(){if(A===undefined){k.msg("请点击位置列表选择",{icon:2,anim:6})}else{if(y){if(s){var H=k.load(2);G.setCenter([A.lng,A.lat]);G.getCity(function(I){k.close(H);A.city=I;n.closeDialog("#ew-map-select-btn-ok");y(A)})}else{n.closeDialog("#ew-map-select-btn-ok");y(A)}}else{n.closeDialog("#ew-map-select-btn-ok")}}});var F=h("#ew-map-select-input-search");F.off("input").on("input",function(){var H=h(this).val();var I=h("#ew-map-select-tips");if(!H){I.html("");I.addClass("layui-hide")}AMap.plugin("AMap.Autocomplete",function(){var J=new AMap.Autocomplete({city:"全国"});J.search(H,function(M,L){if(L.tips){var K=L.tips;var O="";for(var N=0;N<K.length;N++){var P=K[N];if(P.location!==undefined){O+='<div data-lng="'+P.location.lng+'" data-lat="'+P.location.lat+'" class="ew-map-select-search-list-item">';O+='     <div class="ew-map-select-search-list-item-icon-search"><i class="layui-icon layui-icon-search"></i></div>';O+='     <div class="ew-map-select-search-list-item-title">'+P.name+"</div>";O+='     <div class="ew-map-select-search-list-item-address">'+P.address+"</div>";O+="</div>"}}I.html(O);if(K.length===0){h("#ew-map-select-tips").addClass("layui-hide")}else{h("#ew-map-select-tips").removeClass("layui-hide")}}else{I.html("");I.addClass("layui-hide")}})})});F.off("blur").on("blur",function(){var H=h(this).val();var I=h("#ew-map-select-tips");if(!H){I.html("");I.addClass("layui-hide")}});F.off("focus").on("focus",function(){var H=h(this).val();if(H){h("#ew-map-select-tips").removeClass("layui-hide")}});h("#ew-map-select-tips").off("click").on("click",".ew-map-select-search-list-item",function(){h("#ew-map-select-tips").addClass("layui-hide");var H=h(this).data("lng");var I=h(this).data("lat");A=undefined;G.setZoomAndCenter(v,[H,I])})};var r=['<div class="ew-map-select-tool" style="position: relative;">','     搜索：<input id="ew-map-select-input-search" class="layui-input icon-search inline-block" style="width: 190px;" placeholder="输入关键字搜索" autocomplete="off" />','     <button id="ew-map-select-btn-ok" class="layui-btn icon-btn pull-right" type="button"><i class="layui-icon">&#xe605;</i>确定</button>','     <div id="ew-map-select-tips" class="ew-map-select-search-list layui-hide">',"     </div>","</div>",'<div class="layui-row ew-map-select">','     <div class="layui-col-sm7 ew-map-select-map-group" style="position: relative;">','          <div id="ew-map-select-map"></div>','          <i id="ew-map-select-center-img2" class="layui-icon layui-icon-add-1"></i>','          <img id="ew-map-select-center-img" src="https://3gimg.qq.com/lightmap/components/locationPicker2/image/marker.png" alt=""/>',"     </div>",'     <div id="ew-map-select-pois" class="layui-col-sm5 ew-map-select-search-list">',"     </div>","</div>"].join("");n.open({id:"ew-map-select",type:1,title:q,area:"750px",content:r,success:function(E,G){var F=h(E).children(".layui-layer-content");F.css("overflow","visible");n.showLoading(F);if(undefined===window.AMap){h.getScript(t,function(){i();n.removeLoading(F)})}else{i();n.removeLoading(F)}}})};n.cropImg=function(s){var q="image/jpeg";var x=s.aspectRatio;var y=s.imgSrc;var v=s.imgType;var t=s.onCrop;var u=s.limitSize;var w=s.acceptMime;var r=s.exts;var i=s.title;if(x===undefined){x=1}if(i===undefined){i="裁剪图片"}if(v){q=v}layui.use(["Cropper","upload"],function(){var A=layui.Cropper,z=layui.upload;function B(){var E,F=h("#ew-crop-img");var G={elem:"#ew-crop-img-upload",auto:false,drag:false,choose:function(H){H.preview(function(J,K,I){q=K.type;F.attr("src",I);if(!y||!E){y=I;B()}else{E.destroy();E=new A(F[0],D)}})}};if(u!==undefined){G.size=u}if(w!==undefined){G.acceptMime=w}if(r!==undefined){G.exts=r}z.render(G);if(!y){return h("#ew-crop-img-upload").trigger("click")}var D={aspectRatio:x,preview:"#ew-crop-img-preview"};E=new A(F[0],D);h(".ew-crop-tool").on("click","[data-method]",function(){var I=h(this).data(),J,H;if(!E||!I.method){return}I=h.extend({},I);J=E.cropped;switch(I.method){case"rotate":if(J&&D.viewMode>0){E.clear()}break;case"getCroppedCanvas":if(q==="image/jpeg"){if(!I.option){I.option={}}I.option.fillColor="#fff"}break}H=E[I.method](I.option,I.secondOption);switch(I.method){case"rotate":if(J&&D.viewMode>0){E.crop()}break;case"scaleX":case"scaleY":h(this).data("option",-I.option);break;case"getCroppedCanvas":if(H){t&&t(H.toDataURL(q));n.closeDialog("#ew-crop-img")}else{k.msg("裁剪失败",{icon:2,anim:6})}break}})}var C=['<div class="layui-row">','     <div class="layui-col-sm8" style="min-height: 9rem;">','          <img id="ew-crop-img" src="',y||"",'" style="max-width:100%;" alt=""/>',"     </div>",'     <div class="layui-col-sm4 layui-hide-xs" style="padding: 15px;text-align: center;">','          <div id="ew-crop-img-preview" style="width: 100%;height: 9rem;overflow: hidden;display: inline-block;border: 1px solid #dddddd;"></div>',"     </div>","</div>",'<div class="text-center ew-crop-tool" style="padding: 15px 10px 5px 0;">','     <div class="layui-btn-group" style="margin-bottom: 10px;margin-left: 10px;">','          <button title="放大" data-method="zoom" data-option="0.1" class="layui-btn icon-btn" type="button"><i class="layui-icon layui-icon-add-1"></i></button>','          <button title="缩小" data-method="zoom" data-option="-0.1" class="layui-btn icon-btn" type="button"><span style="display: inline-block;width: 12px;height: 2.5px;background: rgba(255, 255, 255, 0.9);vertical-align: middle;margin: 0 4px;"></span></button>',"     </div>",'     <div class="layui-btn-group layui-hide-xs" style="margin-bottom: 10px;">','          <button title="向左旋转" data-method="rotate" data-option="-45" class="layui-btn icon-btn" type="button"><i class="layui-icon layui-icon-refresh-1" style="transform: rotateY(180deg) rotate(40deg);display: inline-block;"></i></button>','          <button title="向右旋转" data-method="rotate" data-option="45" class="layui-btn icon-btn" type="button"><i class="layui-icon layui-icon-refresh-1" style="transform: rotate(30deg);display: inline-block;"></i></button>',"     </div>",'     <div class="layui-btn-group" style="margin-bottom: 10px;">','          <button title="左移" data-method="move" data-option="-10" data-second-option="0" class="layui-btn icon-btn" type="button"><i class="layui-icon layui-icon-left"></i></button>','          <button title="右移" data-method="move" data-option="10" data-second-option="0" class="layui-btn icon-btn" type="button"><i class="layui-icon layui-icon-right"></i></button>','          <button title="上移" data-method="move" data-option="0" data-second-option="-10" class="layui-btn icon-btn" type="button"><i class="layui-icon layui-icon-up"></i></button>','          <button title="下移" data-method="move" data-option="0" data-second-option="10" class="layui-btn icon-btn" type="button"><i class="layui-icon layui-icon-down"></i></button>',"     </div>",'     <div class="layui-btn-group" style="margin-bottom: 10px;">','          <button title="左右翻转" data-method="scaleX" data-option="-1" class="layui-btn icon-btn" type="button" style="position: relative;width: 41px;"><i class="layui-icon layui-icon-triangle-r" style="position: absolute;left: 9px;top: 0;transform: rotateY(180deg);font-size: 16px;"></i><i class="layui-icon layui-icon-triangle-r" style="position: absolute; right: 3px; top: 0;font-size: 16px;"></i></button>','          <button title="上下翻转" data-method="scaleY" data-option="-1" class="layui-btn icon-btn" type="button" style="position: relative;width: 41px;"><i class="layui-icon layui-icon-triangle-d" style="position: absolute;left: 11px;top: 6px;transform: rotateX(180deg);line-height: normal;font-size: 16px;"></i><i class="layui-icon layui-icon-triangle-d" style="position: absolute; left: 11px; top: 14px;line-height: normal;font-size: 16px;"></i></button>',"     </div>",'     <div class="layui-btn-group" style="margin-bottom: 10px;">','          <button title="重新开始" data-method="reset" class="layui-btn icon-btn" type="button"><i class="layui-icon layui-icon-refresh"></i></button>','          <button title="选择图片" id="ew-crop-img-upload" class="layui-btn icon-btn" type="button" style="border-radius: 0 2px 2px 0;"><i class="layui-icon layui-icon-upload-drag"></i></button>',"     </div>",'     <button data-method="getCroppedCanvas" data-option="{ &quot;maxWidth&quot;: 4096, &quot;maxHeight&quot;: 4096 }" class="layui-btn icon-btn" type="button" style="margin-left: 10px;margin-bottom: 10px;"><i class="layui-icon">&#xe605;</i>完成</button>',"</div>"].join("");n.open({title:i,area:"665px",type:1,content:C,success:function(D,E){h(D).children(".layui-layer-content").css("overflow","visible");B()}})})};n.util={Convert_BD09_To_GCJ02:function(q){var s=(3.141592653589793*3000)/180;var i=q.lng-0.0065,u=q.lat-0.006;var t=Math.sqrt(i*i+u*u)-0.00002*Math.sin(u*s);var r=Math.atan2(u,i)-0.000003*Math.cos(i*s);return{lng:t*Math.cos(r),lat:t*Math.sin(r)}},Convert_GCJ02_To_BD09:function(q){var s=(3.141592653589793*3000)/180;var i=q.lng,u=q.lat;var t=Math.sqrt(i*i+u*u)+0.00002*Math.sin(u*s);var r=Math.atan2(u,i)+0.000003*Math.cos(i*s);return{lng:t*Math.cos(r)+0.0065,lat:t*Math.sin(r)+0.006}},animateNum:function(u,q,s,v){q=q===null||q===undefined||q===true||q==="true";s=isNaN(s)?500:s;v=isNaN(v)?100:v;var t=function(y){var w="";for(var x=0;x<y.length;x++){if(!isNaN(y.charAt(x))){return w}else{w+=y.charAt(x)}}},i=function(y){var w="";for(var x=y.length-1;x>=0;x--){if(!isNaN(y.charAt(x))){return w}else{w=y.charAt(x)+w}}},r=function(x,w){if(!w){return x}if(!/^[0-9]+.?[0-9]*$/.test(x)){return x}x=x.toString();return x.replace(x.indexOf(".")>0?/(\d)(?=(\d{3})+(?:\.))/g:/(\d)(?=(\d{3})+(?:$))/g,"$1,")};h(u).each(function(){var C=h(this);var z=C.data("num");if(!z){z=C.text().replace(/,/g,"");C.data("num",z)}var B="INPUT,TEXTAREA".indexOf(C.get(0).tagName)>=0;var I=t(z.toString()),F=i(z.toString());var H=z.toString().replace(I,"").replace(F,"");if(isNaN(H*1)||H==="0"){B?C.val(z):C.html(z);return console.error("not a number")}var w=H.split(".");var D=w[1]?w[1].length:0;var y=0,E=H;if(Math.abs(E*1)>10){y=parseFloat(w[0].substring(0,w[0].length-1)+(w[1]?".0"+w[1]:""))}var A=(E-y)/v,G=0;var x=setInterval(function(){var J=I+r(y.toFixed(D),q)+F;B?C.val(J):C.html(J);y+=A;G++;if(Math.abs(y)>=Math.abs(E*1)||G>5000){J=I+r(E,q)+F;B?C.val(J):C.html(J);clearInterval(x)}},s/v)})},deepClone:function(t){var i;var q=n.util.isClass(t);if(q==="Object"){i={}}else{if(q==="Array"){i=[]}else{return t}}for(var s in t){if(!t.hasOwnProperty(s)){continue}var u=t[s],r=n.util.isClass(u);if(r==="Object"){i[s]=arguments.callee(u)}else{if(r==="Array"){i[s]=arguments.callee(u)}else{i[s]=t[s]}}}return i},isClass:function(i){if(i===null){return"Null"}if(i===undefined){return"Undefined"}return Object.prototype.toString.call(i).slice(8,-1)},fullTextIsEmpty:function(t){if(!t){return true}var r=["img","audio","video","iframe","object"];for(var q=0;q<r.length;q++){if(t.indexOf("<"+r[q])>-1){return false}}var s=t.replace(/\s*/g,"");if(!s){return true}s=s.replace(/&nbsp;/ig,"");if(!s){return true}s=s.replace(/<[^>]+>/g,"");return !s},removeStyle:function(r,s){if(typeof s==="string"){s=[s]}for(var q=0;q<s.length;q++){h(r).css(s[q],"")}},scrollTop:function(i){if(!i){var q=h(".layui-layout-admin>.layui-body");i=q.children(".layui-tab").children(".layui-tab-content").children(".layui-tab-item.layui-show");if(i.length===0){i=q.children(".layui-body-header.show+div");if(i.length===0){i=q}}}else{i=h(i)}i.animate({scrollTop:0},300)},tpl:function(r,s,i,t){if(r===undefined||r===null||typeof r!=="string"){return r}if(!s){s={}}if(!i){i="{{"}if(!t){t="}}"}var q={exp:function(u){return new RegExp(u,"g")},query:function(w,u,x){var v=["#([\\s\\S])+?","([^{#}])*?"][w||0];return q.exp((u||"")+i+v+t+(x||""))},escape:function(u){return String(u||"").replace(/&(?!#?[a-zA-Z0-9]+;)/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/'/g,"&#39;").replace(/"/g,"&quot;")},error:function(v,u){console.error("Laytpl Error："+v+"\n"+(u||""))},parse:function(v,w){var u=v;try{var y=q.exp("^"+i+"#"),z=q.exp(t+"$");v=v.replace(q.exp(i+"#"),i+"# ").replace(q.exp(t+"}"),"} "+t).replace(/\\/g,"\\\\").replace(q.exp(i+"!(.+?)!"+t),function(A){A=A.replace(q.exp("^"+i+"!"),"").replace(q.exp("!"+t),"").replace(q.exp(i+"|"+t),function(B){return B.replace(/(.)/g,"\\$1")});return A}).replace(/(?="|')/g,"\\").replace(q.query(),function(A){A=A.replace(y,"").replace(z,"");return'";'+A.replace(/\\/g,"")+';view+="'}).replace(q.query(1),function(A){var B='"+(';if(A.replace(/\s/g,"")===i+t){return""}A=A.replace(q.exp(i+"|"+t),"");if(/^=/.test(A)){A=A.replace(/^=/,"");B='"+_escape_('}return B+A.replace(/\\/g,"")+')+"'}).replace(/\r\n/g,'\\r\\n" + "').replace(/\n/g,'\\n" + "').replace(/\r/g,'\\r" + "');v='"use strict";var view = "'+v+'";return view;';v=new Function("d, _escape_",v);return v(w,q.escape)}catch(x){q.error(x,u);return u}}};return q.parse(r,s)},render:function(q){if(typeof q.url==="string"){q.success=function(r){n.util.render(h.extend({},q,{url:r}))};if(q.ajax==="ajax"){n.ajax(q)}else{n.req(q.url,q.where,q.success,q.method,q)}return}var i=n.util.tpl(q.tpl,q.url,q.open||d.tplOpen,q.close||d.tplClose);h(q.elem).next("[ew-tpl-rs]").remove();h(q.elem).after(i);h(q.elem).next().attr("ew-tpl-rs","");q.done&&q.done(q.url)}};n.lockScreen=function(r){if(!r){r="components/tpl/lock-screen.html"}var i=h("#ew-lock-screen-group");if(i.length>0){i.fadeIn("fast");n.isLockScreen=true;n.putTempData("isLockScreen",n.isLockScreen,true)}else{var q=k.load(2);n.ajax({url:r,dataType:"html",success:function(s){k.close(q);if(typeof s==="string"){h("body").append('<div id="ew-lock-screen-group">'+s+"</div>");n.isLockScreen=true;n.putTempData("isLockScreen",n.isLockScreen,true);n.putTempData("lockScreenUrl",r,true)}else{console.error(s);k.msg(JSON.stringify(s),{icon:2,anim:6})}}})}};n.unlockScreen=function(q){var i=h("#ew-lock-screen-group");q?i.remove():i.fadeOut("fast");n.isLockScreen=false;n.putTempData("isLockScreen",null,true)};n.tips=function(i){return k.tips(i.text,i.elem,{tips:[i.direction||1,i.bg||"#191a23"],tipsMore:i.tipsMore,time:i.time||-1,success:function(q){var r=h(q).children(".layui-layer-content");if(i.padding||i.padding===0){r.css("padding",i.padding)}if(i.color){r.css("color",i.color)}if(i.bgImg){r.css("background-image",i.bgImg).children(".layui-layer-TipsG").css("z-index","-1")}if(i.fontSize){r.css("font-size",i.fontSize)}if(!i.offset){return}var u=i.offset.split(",");var t=u[0],s=u.length>1?u[1]:undefined;if(t){h(q).css("margin-top",t)}if(s){h(q).css("margin-left",s)}}})};n.renderTpl=function(q){if(!layui.admin){layui.admin=n}function i(r){if(!r){return}try{return new Function("return "+r+";")()}catch(s){console.error(s+"\nlay-data: "+r)}}h(q||"[ew-tpl]").each(function(){var t=h(this);var r=n.util.deepClone(h(this).data());r.elem=t;r.tpl=t.html();r.url=i(t.attr("ew-tpl"));r.headers=i(r.headers);r.where=i(r.where);if(r.done){try{r.done=new Function("res",r.done)}catch(s){console.error(s+"\nlay-data:"+r.done);r.done=undefined}}n.util.render(r)})};n.on=function(i,q){return layui.onevent.call(this,"admin",i,q)};n.putSetting=function(i,q){d[i]=q;n.putTempData(i,q,true)};n.recoverState=function(){if(n.getTempData("isLockScreen",true)){n.lockScreen(n.getTempData("lockScreenUrl",true))}if(d.defaultTheme){n.changeTheme(d.defaultTheme,window,true,true)}if(d.closeFooter){h("body").addClass("close-footer")}if(d.navArrow!==undefined){var i=h(e+">.layui-nav-tree");i.removeClass("arrow2 arrow3");if(d.navArrow){i.addClass(d.navArrow)}}if(d.pageTabs&&d.tabAutoRefresh=="true"){h(l).attr("lay-autoRefresh","true")}};n.on=function(i,q){return layui.onevent.call(this,"admin",i,q)};var m=".layui-layout-admin.admin-nav-mini>.layui-side .layui-nav .layui-nav-item";h(document).on("mouseenter",m+","+m+" .layui-nav-child>dd",function(){if(n.getPageWidth()>768){var i=h(this),r=i.find(">.layui-nav-child");if(r.length>0){i.addClass("admin-nav-hover");r.css("left",i.offset().left+i.outerWidth());var q=i.offset().top;if(q+r.outerHeight()>n.getPageHeight()){q=q-r.outerHeight()+i.outerHeight();if(q<60){q=60}r.addClass("show-top")}r.css("top",q);r.addClass("ew-anim-drop-in")}else{if(i.hasClass("layui-nav-item")){n.tips({elem:i,text:i.find("cite").text(),direction:2,offset:"12px"})}}}}).on("mouseleave",m+","+m+" .layui-nav-child>dd",function(){k.closeAll("tips");var q=h(this);q.removeClass("admin-nav-hover");var i=q.find(">.layui-nav-child");i.removeClass("show-top ew-anim-drop-in");i.css({"left":"auto","top":"auto"})});h(document).on("click","*[ew-event]",function(){var i=n.events[h(this).attr("ew-event")];i&&i.call(this,h(this))});h(document).on("mouseenter","*[lay-tips]",function(){var i=h(this);n.tips({elem:i,text:i.attr("lay-tips"),direction:i.attr("lay-direction"),bg:i.attr("lay-bg"),offset:i.attr("lay-offset"),padding:i.attr("lay-padding"),color:i.attr("lay-color"),bgImg:i.attr("lay-bgImg"),fontSize:i.attr("lay-fontSize")})}).on("mouseleave","*[lay-tips]",function(){k.closeAll("tips")});h(document).on("click",".form-search-expand,[search-expand]",function(){var s=h(this);var q=s.parents(".layui-form").first();var r=s.data("expand");var t=s.attr("search-expand");if(r===undefined||r===true){r=true;s.data("expand",false);s.html('收起 <i class="layui-icon layui-icon-up"></i>');var i=q.find(".form-search-show-expand");i.attr("expand-show","");i.removeClass("form-search-show-expand")}else{r=false;s.data("expand",true);s.html('展开 <i class="layui-icon layui-icon-down"></i>');q.find("[expand-show]").addClass("form-search-show-expand")}if(!t){return}new Function("d",t)({expand:r,elem:s})});h(document).on("click.ew-sel-fixed",".ew-select-fixed .layui-form-select .layui-select-title",function(){var w=h(this),s=w.parent().children("dl"),u=w.offset().top;var t=w.outerWidth(),y=w.outerHeight(),i=h(document).scrollTop();var v=s.outerWidth(),r=s.outerHeight();var x=u+y+5-i,q=w.offset().left;if(x+r>n.getPageHeight()){x=x-r-y-10}if(q+v>n.getPageWidth()){q=q-v+t}s.css({"left":q,"top":x,"min-width":t})});n.hideFixedEl=function(){h(".ew-select-fixed .layui-form-select").removeClass("layui-form-selected layui-form-selectup");h("body>.layui-laydate").remove()};h(document).on("click",".layui-nav-tree>.layui-nav-item a",function(){var s=h(this),q=s.siblings(".layui-nav-child"),r=s.parent();if(q.length===0){return}if(r.hasClass("admin-nav-hover")){return}if(r.hasClass("layui-nav-itemed")){q.css("display","none").slideDown("fast",function(){h(this).css("display","")})}else{q.css("display","block").slideUp("fast",function(){h(this).css("display","")})}if(s.parents(".layui-nav").attr("lay-shrink")==="_all"){var i=s.parent().siblings(".layui-nav-itemed");i.children(".layui-nav-child").css("display","block").slideUp("fast",function(){h(this).css("display","")});i.removeClass("layui-nav-itemed")}});h('.layui-nav-tree[lay-shrink="all"]').attr("lay-shrink","_all");h(document).on("click",".layui-collapse>.layui-colla-item>.layui-colla-title",function(){var t=h(this),i=t.siblings(".layui-colla-content"),r=t.parent().parent(),q=i.hasClass("layui-show");if(q){i.removeClass("layui-show").slideDown("fast").addClass("layui-show")}else{i.css("display","block").slideUp("fast",function(){h(this).css("display","")})}t.children(".layui-colla-icon").html("&#xe602;").css({"transition":"all .3s","transform":"rotate("+(q?"90deg":"0deg")+")"});if(r.attr("lay-shrink")==="_all"){var s=r.children(".layui-colla-item").children(".layui-colla-content.layui-show").not(i);s.css("display","block").slideUp("fast",function(){h(this).css("display","")});s.removeClass("layui-show");s.siblings(".layui-colla-title").children(".layui-colla-icon").html("&#xe602;").css({"transition":"all .3s","transform":"rotate(0deg)"})}});h(".layui-collapse[lay-accordion]").attr("lay-shrink","_all").removeAttr("lay-accordion");k.oldTips=k.tips;k.tips=function(s,i,r){var q;if(h(i).length>0&&h(i).parents(".layui-form").length>0){if(h(i).is("input")||h(i).is("textarea")){q=h(i)}else{if(h(i).hasClass("layui-form-select")||h(i).hasClass("layui-form-radio")||h(i).hasClass("layui-form-checkbox")||h(i).hasClass("layui-form-switch")){q=h(i).prev()}}}if(!q){return k.oldTips(s,i,r)}r.tips=[q.attr("lay-direction")||3,q.attr("lay-bg")||"#ff4c4c"];setTimeout(function(){r.success=function(t){h(t).children(".layui-layer-content").css("padding","6px 12px")};k.oldTips(s,i,r)},100)};var a=n.getTempData(true);if(a){var p=["pageTabs","cacheTab","defaultTheme","navArrow","closeFooter","tabAutoRefresh"];for(var g=0;g<p.length;g++){if(a[p[g]]!==undefined){d[p[g]]=a[p[g]]}}}n.recoverState();n.renderTpl();f("admin",n)});
