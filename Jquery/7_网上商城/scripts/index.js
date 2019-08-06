$(function () {
    //搜索框点击事件
    $('#inputSearch').focus(function () {
        $(this).addClass('focus');

    }).keyup(function (e) {
        if (e.which == 13) {
            alert('回车提交表单!');
        }
    });

    //主题色点击改变
    var $li = $("#skin li");
    $li.click(function () {
        switchSkin(this.id);
    });
    var cookie_skin = $.cookie("MyCssSkin"); //
    if (cookie_skin) {
        switchSkin(cookie_skin);
    }
    function switchSkin(skinName) {
        $("#" + skinName).addClass("selected") //当前<li>元素选中
            .siblings().removeClass("selected"); //去掉其它同辈<li>元素的选中
        $("#cssfile").attr("href", "styles/skin/" + skinName + ".css"); //设置不同皮肤
        $.cookie("MyCssSkin", skinName, {path: '/',expires: 10});
    }


    //菜单

    $("#nav li").hover(function () {
        $(this).find(".jnNav").show();
    }, function () {
        $(this).find(".jnNav").hide();
    });


    //hot
    $(".jnCatainfo .promoted").append('<s class="hot"></s>');

    //轮播图
    var idx = 0;
    $('#jnImageroll div a').mouseover(function () {
        idx = $(this).index();
        $('#jnImageroll img').eq($(this).index()).stop(true, true).fadeIn().siblings().fadeOut();
        $(this).addClass('chos').siblings().removeClass('chos');
    });
    $('#jnImageroll').hover(function () {
        if (adTimer) {
            clearInterval(adTimer);
        }
    }, function () {
        adTimer = setInterval(function () {
            $('#jnImageroll img').eq(idx).stop(true, true).fadeIn().siblings().fadeOut();
            $('#jnImageroll div a').eq(idx).addClass('chos').siblings().removeClass('chos');
            idx++;
            if (idx == 5) {
                idx = 0;
            }
        }, 1000);
    }).trigger("mouseleave");


    //超链接文字提示
    // $('#jnNoticeInfo ul li a').attr('title',$(this).html());
    $('#jnNoticeInfo ul li a').hover(function () {
        var con = $(this).html();
        $(this).attr('title', $(this).html());
        // console.log($(this).html());
    });




// 品牌滑入动画

$("#jnBrandList  li").each(function(index){
    var $img = $(this).find("img");
    var img_w = $img.width();
    console.log(img_w);
    var img_h = $img.height();
    var spanHtml = '<span style="position:absolute;top:0;left:5px;width:'+img_w+'px;height:'+img_h+'px;" class="imageMask"></span>';
    $(spanHtml).appendTo($(this));
});
//delegate事件委托
$("#jnBrandList").on("hover", ".imageMask", function(){
    $(this).toggleClass("imageOver");//toggleClass类切换
});   


 //品牌活动横向滚动
    var inx = 0;
    $('#jnBrandTab li a').click(function () {
        $(this).parent().addClass("chos").siblings().removeClass("chos");
        inx = $(this).parent().index();
        // console.log(inx);
        var rollWidth = $('#jnBrandList li').outerWidth(true);
        // console.log(rollWidth);
        $('#jnBrandList').stop(true, false).animate({
            left: -rollWidth * inx*4
        }, 1000);
    });
}).eq(0).click();