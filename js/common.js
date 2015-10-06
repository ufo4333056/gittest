var crmUrl = "http://crm.gongsibao.com";
//document.domain = 'gongsibao.com';
$(document).ready(function($){	//懒加载
	$(".lazy").scrollLoading();

	//公共tab调用 hover
	$(".fade-tab").tabso({
		cntSelect:".fade-tab-cont",
		tabEvent:"mouseover",
		tabStyle:"fade"
	})

	//公共tab调用 click
	$(".click-fade-tab").tabso({
		cntSelect:".click-fade-tab-cont",
		tabEvent:"click",
		tabStyle:"fade"
	})

	//首页百科切换
	$('.hot-baike h4').click(function(){
		$('.hot-baike').find('h4').removeClass('on');
		$(this).addClass('on');
		$('.hot-baike .cont').find('ul').hide();
		$('.hot-baike .cont').find("ul:eq("+$(this).attr('i')+")").show();
	})

	//首页侧栏banner
	$('.index-aside .banner').slide({mainCell:'.bd ul',interTime:3000,autoPlay:0});
	var tempTimer;
    var bannerHTML = $(".index-banner").html();
    window.onresize=function(){
       clearTimeout(tempTimer);
       tempTimer = setTimeout(function(){
            $(".index-banner").html(bannerHTML);
	        $('.index-banner').slide({mainCell:'.bd ul',interTime:4000,autoPlay:true,effect:"fold"});
       },500);

    }
	//首页主banner
	$('.index-banner').slide({mainCell:'.bd ul',interTime:4000,autoPlay:true,effect:"fold"});


	//首页客户声音
	$(".index-voice .scroll").slide({mainCell:".bd ul",effect:"left",vis:3,trigger:"click",effect:"leftLoop",switchLoad:"_src"});

	//首页热门单品
	$(".hot-product .scroll").slide({mainCell:".bd ul",effect:"left",vis:3,trigger:"click",effect:"leftLoop",switchLoad:"_src"});

	//产品下拉菜单
	$('.product-menu').hover(function(){
		if(!$(this).hasClass('index-product-menu')){
			$(this).find('.sub-menu').show();
			$('.full-nav .icon em').css({'background':'#3F3B3A'});
		}
	},function(){
		if(!$(this).hasClass('index-product-menu')){
			$(this).find('.sub-menu').hide();
			$('.full-nav .icon em').css({'background':'#fff'});
		} 
	})


	//产品页面 tab 口碑
	$('.product-page .main-tab .koubei').click(function(){
		$('.product-page .main-tab-cont').find(".hide:eq(0)").show();
		var top = $(".product-page .comment h3").offset().top;
		if($('.product-page .scroll-tab-hide').hasClass('scroll-tab')){
			$("html,body").animate({scrollTop:(top-80)}, 350);
		}else{
			$("html,body").animate({scrollTop:(top-148)}, 350);
		}
	 	
	})

	$('.product-page .scroll-tab li').live('click',function(){
		if(!$(this).hasClass('koubei')){
			var top = $(".product-page .mark").offset().top;
	 		$("html,body").stop(true).animate({scrollTop:(top-50)}, 350);
		}
	})

	$('.product-list .list article').hover(function(){
		$(this).find('.m1').hide();
		$(this).find('.m2').show().stop(true).animate({'bottom':'-54px','left':'-44px'}, 350);
	},function(){

		$(this).find('.m2').stop(true).animate({'bottom':'-64px','left':'-50px'},200,function(){
    		$(this).hide();
    		$(this).prev().show();
		});

	})

	// 产品页浮动导航
	$(window).scroll(function (){
		if($(".product-page").length > 0){
			var top = $(".product-page .mark").offset().top;
			if($(window).scrollTop() > (top - 60) ) {
			   	$(".product-page .scroll-tab-hide").addClass('scroll-tab');
			}else if($(window).scrollTop() < (top - 20) ){
				$(".product-page .scroll-tab-hide").removeClass('scroll-tab');
			}
		}
	})

	//加载点击量
	setTimeout(loadHits,1000);

	//加载评论量
	setTimeout(loadCommons,1000);

	//加减
	$('.nums em').live('click',function(){
		var name = $(this).attr('class');
		var input = $(this).parent().find('input');
		var v = parseInt(input.val());
		if(name == 'jian' && v > 1){
			input.val(parseInt(input.val()) - 1);
		}
		if(name == 'jia' && v < 10){
			input.val(parseInt(input.val()) + 1);
		}
	})

	$('.nums input').live('blur',function(){
		var v = parseInt($(this).val());
		if(v < 1 || isNaN(v)) $(this).val(1);
	})

	//表单相关
	$('.form .placeholder').live('click',function(){
		var parent = $(this).parent();
		$(this).css({display:'none'});
		parent.find('input').focus();
	})

	$('.form .input-text').live('focus',function(){
		var parent = $(this).parent();
		parent.find('.placeholder').hide();
	})

	$('.form .input-text').live('blur',function(){
		if($.browser.msie){
			var parent = $(this).parent();
			var val = $.trim($(this).val());
			var oldVal = $.trim(parent.find('.placeholder').text());
			if(val == oldVal || !val){
				$(this).val('');
				parent.find('.placeholder').show();
			}
		}
	})

	//列表页筛选
	$('.filter .cate').each(function(){
		var filterCateWidth = 10;
		$(this).find('a').each(function(){
			filterCateWidth += $(this).outerWidth() + 8;
		})
		
		if(filterCateWidth > 900){
			$(this).parent().addClass('cate-height');
			$(this).next('.more').show();
			$(this).prev('.title').height($(this).height()).css({'line-height':$(this).height()+'px'}).attr({'h':$(this).height()});

			$('.filter .more').click(function(){
				
				if($(this).parent().hasClass('cate-height')){
					$(this).parent().removeClass('cate-height');
					$(this).parent().find('.title').css({'height':'40px','line-height':'40px'})
				}else{
					h = $(this).parent().find('.title').attr('h');
					$(this).parent().addClass('cate-height');
					$(this).parent().find('.title').css({'height':h+'px','line-height':h+'px'})
				}
			})
		}
	})

	//搜索相关
	var q = getPageUrlParm('q');
	var typeid = getPageUrlParm('typeid');
	if(typeid && q){
		var _text = '';
		$('.search .hide-sel li').show();
		$('.search .hide-sel a').each(function(){
			if($(this).attr('typeid') == typeid){
				_text = $(this).text();
				$(this).parent().hide();
			}
		})
		$('.search .cat').text(_text);
		$('#search_typeid').val(typeid);
	}

	$('.search .hide-sel a').click(function(){
		var typeid = $(this).attr('typeid');
		var q = $(this).text();
		$('.search .cat').text(q);
		$('#search_typeid').val(typeid);
		$('.search .hide-sel li').show();
		$(this).parent().hide();
	})

	// 加入我们
    $(".join-box p a").live("click",function(){
        $(".join-box ul").hide();
        $(".join-box p a").removeClass();
        $(this).addClass("on");
        $(this).parent().parent().find("ul").show("500");
    });

    $(".join-box ul li a").live("click",function(){
        
        $(".join-box").find("li").removeClass("cur");
        $(this).parent("li").addClass("cur");
        $(".join-r").hide();
        var index = parseInt($(this).parent("li").attr('myindex'),10);
        $(".join-t"+index).show();
    });

       $(".kfleft").click(function(){
		var i=$(".kefu").css("right");
		if (i=='0px'){
			$('.kefu').animate({right:-82}, 200);
		} else {
			$('.kefu').animate({right:0}, 200);
		}
	});

    // 关于我们-兼容
    $('.product-menu').hover(function(){
        $('.about-intro-r .line').css({'z-index':'-1'});
    },function(){
        $('.about-intro-r .line').css({'z-index':'9'});
    });   
	
    $(".about-cont").hover(function(){
        $(".about-hover",$(this)).toggle();
    })

    getCartNums();

    //返回顶部
	var $backToTopTxt = "", $backToTopEle = $('<div class="backToTop"></div>').appendTo($("body"))
        .text($backToTopTxt).attr("title", $backToTopTxt).click(function() {
            $("html, body").animate({ scrollTop: 0 }, {duration: 1200,easing: "easeOutCirc"});  
    }), $backToTopFun = function() {
        var st = $(document).scrollTop(), winh = $(window).height();
        (st > 200)? $backToTopEle.show(): $backToTopEle.hide();      
        //IE6下的定位
        if (!window.XMLHttpRequest) {
            $backToTopEle.css("top", st + winh - 166);    
        }
        // alert('e')
        setKefuPos();
    };
    $(window).bind("scroll", $backToTopFun);
    $(function() { $backToTopFun(); });





    function setKefuPos(){
    	var st = $(document).scrollTop();
    	if(st > 200){
    		// $('.kefu').css({'top':'10px'})
    	}else{
    		// $('.kefu').css({'top':'200px'})
    	}

    }

    setKefuPos();


})


//获取购物车商品数量
function getCartNums(){
	$.ajax({
        url: '/?m=content&c=index&a=get_cart_nums',
        type: 'get',
        dataType: 'json',
        success: function (data) {
           	$('.topbar .cart em').text(data.data);
        }
    });
}

//public function
//刷新当前页面
function reload(){
	location.reload();
}


//加载点击量
function loadHits(){
	var json = '';
	$(".hits").each(function(){
		var _this = $(this);
		var id = _this.attr('ids');
		var mid = _this.attr('mid');
		json += id + ','+ mid + '|';
	})
	
	if(json){
		$.ajax({
	        url: '/api.php?op=count&isajax=1&ids='+json,
	        type: 'get',
	        dataType: 'json',
	        success: function (data) {
	           	for(var ids in data){
				    $("#hits-" + ids).html(data[ids]);
				}
	        }
	    });
	}
}

//加载评论量
function loadCommons(){
	var json = '';
	$(".comment").each(function(){
		var _this = $(this);
		var id = _this.attr('ids');
		json += id + '|';
	})
	
	if(json){
		$.ajax({
	        url: '/api.php?op=product_common&isajax=1&ids='+json,
	        type: 'get',
	        dataType: 'json',
	        success: function (data) {

	           	for(var ids in data){
	           		var html = '<div class="star">';
           			for($i=0; $i<data[ids]['star'] ;$i++ ){
           				html += '<i></i>'
           			}
		            html += '</div>'
                    html += '<span>('+data[ids]['count']+'个评论)</span>';
				    $("#comment-" + ids).html(html);
				}
	        }
	    });
	}
}


//验证邮箱
function isEmail(email){
	return (/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(email));
}

//验证手机号
function isMobile(mobile){
	return (/^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8]))\d{8}$/.test(mobile));
}

//验证密码
function isPassword(password){
	if(password.length > 5 && password.length < 27){
		if(passwordLevel(password) > 1) return true;
		return false;
	}
	return false;
}

//密码等级
function passwordLevel(password) {
    var Modes = 0;
    for (i = 0; i < password.length; i++) {
        Modes |= CharMode(password.charCodeAt(i));
    }
    return bitTotal(Modes);
 
    //CharMode函数
    function CharMode(iN) {
        if (iN >= 48 && iN <= 57)//数字
            return 1;
        if (iN >= 65 && iN <= 90) //大写字母
            return 2;
        if ((iN >= 97 && iN <= 122) || (iN >= 65 && iN <= 90)) //大小写
            return 4;
        else
            return 8; //特殊字符
    }
 
    //bitTotal函数
    function bitTotal(num) {
        modes = 0;
        for (i = 0; i < 4; i++) {
            if (num & 1) modes++;
            num >>>= 1;
        }
        return modes;
    }
}

//获取当前页面URL参数
function getPageUrlParm(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}

//发送crm数据请求
function getProxyData(url,action,data){
	if($("#proxyFrame").length > 0) $("#proxyFrame").remove();
	var iframe 	= document.createElement('iframe'); 
	iframe.id 	= "proxyFrame";
	iframe.name = "proxyFrame";
	iframe.style.display = "none";
	iframe.src 	= crmUrl+"/proxy.html";
	document.body.appendChild(iframe);

	$("#proxyFrame").load(function () {
		$("#proxyFrame")[0].contentWindow.getData(url,action,data);
	});
}

//接收数据
function backProxyData(data){
	var json = JSON.stringify(data.data);
	eval(data.action+"Back({data:'"+json+"',status:'"+data.status+"',action:'"+data.action+"'})");
}
