var lastScroll = 0;
var loadFinished = true;
$(window).scroll(function(event){
  var $header = $("#header").outerHeight();
  var st = $(this).scrollTop();
  if (loadFinished && st > $header) {
    loadFinished = false;
  } else if (st > $header-$header/2) {
    $('body').css('paddingTop',$header);
    $('body').addClass('pinning');
    if (st > lastScroll){
      $('body').addClass('hidden');
    } else {
      $('body').removeClass('hidden');
    }
    lastScroll = st;
  } else if (st < 2) {
    $('body').removeClass('pinning').removeAttr('style');
    loadFinished = true;
  }
  var bottom_height = ($('#bottom').outerHeight() != null) ? $(document).height() - $('#bottom').outerHeight() : $(document).height() - $('#bottom1').outerHeight();
  if($(window).scrollTop() + $(window).height() > bottom_height){
    $('body').addClass('end');
    $('body, #bottom1').removeClass('hidden');
    loadFinished = true;
  }else{
    $('body').removeClass('end');
  }
});

// landscape 대체 콘텐츠
function readDeviceOrientation() {
  if (window.orientation === 90 || window.orientation === -90) {
    $('head').append('<style>*{display:none} html, body{overflow:hidden;display:block;height:100%} .lsc_txt{position:absolute;left:0;top:50%;overflow:hidden;display:block;width:100%;margin-top:-10px;text-align:center;color:#009BFA;font-weight:normal} .lsc_img{position:absolute;left:0;bottom:0;overflow:hidden;display:block;width:100%;text-align:center} .lsc_img img{display:inline-block}</style>');
    $('<div class="lsc_txt">L.POINT 모바일 웹은 세로 화면에 최적화되어 있습니다.</div><div class="lsc_img"><img src="../img/error/img_landscape.png" width="108" height="92" alt=""></div>').appendTo('body');
  }
  else {
    if($('body').find('iframe').length < -1){
      $('head style').remove()
      $(".lsc_txt, .lsc_img").remove();
    }
  }
}

$(function(){
  $(window).on("load orientationchange",function(){
    readDeviceOrientation();
  });
});
