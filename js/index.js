var layer ;
var element ;
var form;
var baidu = 'baidu;;https://www.baidu.com/s?wd=';
var guge = 'guge;;https://www.google.com/search?ie=utf-8&q=';
var biying = 'biying;;https://cn.bing.com/search?isource=infinity&iname=bing&itype=web&q=';
var bilibili = 'bilibili;;https://search.bilibili.com/all?from_source=banner_search&keyword=';
var youku = 'youku;;http://www.soku.com/search_video/q_';
var aiqiyi = 'aiqiyi;;http://so.iqiyi.com/so/q_';
var lianmengkong = 'lianmengkong;;http://www.gaoqingkong.com/?s=';
var zggqw = 'zggqw;;http://gaoqing.la/?s=';
var csdn = 'csdn;;http://so.csdn.net/so/search/s.do?q=';
var jianshu = 'jianshu;;http://www.jianshu.com/search?page=1&type=note&q=';
var juejin = 'jianshu;;https://juejin.im/search?query=';
var muke = 'muke;;http://www.imooc.com/search/?words=';
var flag = true;
var arr = new Array();




var alert_html = '<div class="layui-row layui-col-xs12" style="position: absolute;height: 210px;width: 900px;"><div class="lay-col-xs5" style="position:relative;height: 200px;width: 400px;left: 0px;">'+
						'<textarea style="height: 100%;width: 100%;resize: none;" lay-verify="required" placeholder="请输入" class="layui-textarea"></textarea></div><div class="lay-col-xs5" style="position:relative;top:-200px;height: 200px;width: 400px;float: right;">'+
						'<pre style="height: 100%;width: 100%;background: #FFE4B5;">此处为翻译内容</pre></div></div>';
$(function  () {
	layui.use('element', function(){
		element = layui.element
	});
	layui.use('form', function(){
		form = layui.form;
	});
	
	layui.use('layer',function(){
		layer = layui.layer
		layer.open({
	        type: 1,
	        title: false, //不显示标题栏
	        closeBtn: false,
	        moveOut:false,
	        shadeClose :true,
	        area: ['300px'],
	        closeBtn :true,
	        shade: 0.8,
	        id: 'LAY_layuipro', //设定一个id，防止重复弹出
	        btnAlign: 'c',
	        moveType: 1, //拖拽模式，0或者1
	        content: '<div style="padding: 50px; line-height: 22px; background-color: #393D49; color: #fff; font-weight: 300;">作者 : @TB<br><br>layer只是作为Layui的一个弹层模块，由于其用户基数较大，所以常常会有人以为layui是layerui<br><br>layer虽然已被 Layui 收编为内置的弹层模块，但仍然会作为一个独立组件全力维护、升级。<br><br>我们此后的征途是星辰大海 ^_^</div>'
	      });
	});
});

function keyDown (e){
	if(flag){
		arr = [];
		arr.push(baidu);
		arr.push(guge);
		arr.push(biying);
		arr.push(bilibili);
		arr.push(youku);
		arr.push(aiqiyi);
		arr.push(lianmengkong);
		arr.push(zggqw);
		arr.push(csdn);
		arr.push(jianshu);
		arr.push(juejin);
		arr.push(muke);
		flage = false;
	}
	var keydwn= window.event||e;
	if(keydwn.keyCode == 13){
		
		var selectVal = $("#select").val();
		var content = $("#content").val();
		//console.log(arr);
		for(var i in arr){
			var select_msg = arr[i].split(";;");
			if(select_msg[0] == selectVal){
				window.open(select_msg[1] + content);
			}
		}
	}
	
}

function CN2EN(){
	html = '';
	
	layui.use('layer',function(){
		layer = layui.layer
		var index = layer.open({
		  type: 1,
		  title:'中译英',
		  maxmin :false,
		  btn: ['翻译'],
		  skin: 'layui-layer-rim', //加上边框
		  area: ['915px', '310px'], //宽高
		  resize :true,
		  content: alert_html,
		  yes: function(index, layer){
		  },
		  success: function(layer){
	          var btn = layer.find('.layui-layer-btn');
	          btn.find('.layui-layer-btn0').attr({
	            onclick: 'ok_down("CN2EN");'
	          });
	      }
		});
	})
}

function EN2CN(){
	html = '';
	
	layui.use('layer',function(){
		layer = layui.layer
		layer.open({
		  type: 1,
		  title:'英译中',
		  maxmin :false,
		  btn: ['翻译'],
		  skin: 'layui-layer-rim', //加上边框
		  area: ['915px', '310px'], //宽高
		  resize :true,
		  content: alert_html,
		  yes: function(index, layer){
		  },
		  success: function(layer){
	          var btn = layer.find('.layui-layer-btn');
	          btn.find('.layui-layer-btn0').attr({
	            onclick: 'ok_down("EN2CN");'
	          });
	      }
		});
	})
}

function ok_down(e){
	if(e == 'CN2EN'){
		var index = $('textarea').val();
		//console.log(index);
		var salt = Math.floor(Math.random()*100)+"";
		//console.log(salt);
		var md5_code = "4f949a8ba927095b"+ index + salt + "bxJ48AZgEwUIRNAYF2a1AGZFghyl1FUw";
		var MD5 = $.md5(md5_code);
		/*consloe.log(MD5);*/
		$.ajax({
	        type:"GET",//默认是GET
	        url:"http://openapi.youdao.com/api",
	        dataType:"jsonp",
	        data: {"q":index,"from":"zh-CHS","to":"EN","appKey":"6ba1db80a973e9e8","salt": salt,"sign" : MD5}, 
	        success:function(data){
	          //console.log(data);
	        },
	        error:function(jqXHR){
	          console.log(jqXHR);
	        }
	    })
	}else if(e == 'EN2CN'){
		
	}
}


