//スクロールするとheaderの色を標示する
$(function(){
    $(window).scroll(function(){
        if ($(this).scrollTop() > 500) {
            $('header').css('background-color', 'rgba(090, 121, 186, 0.2)');
        } else {
            $('header').css('background', 'none');
        }
    });
});

//aタグクリックで別タブを開く
function navigateTargetUrl() {
    window.open(this.event.target.href, null, "noopener");
  }
