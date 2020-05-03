// ============================
//            top
// ============================
// 画面が読み込まれた時
$(function() {
    // 文字を順番に表示する
    var opening = function() {
        var array = [
            "hello",
            "name",
            "job",
            "title"
        ]
        $(".opening p").hide();
        var i = 0;
        $(".opening-" + array[i]).fadeIn();
        var openingShow = function() {
            if($(".opening-" + array[i]).css("display") === "none") {
                $(".opening-" + array[i]).fadeIn();
            } else {
                $(".opening-" + array[i]).fadeOut();
                i ++;
                if(i > array.length) {
                    i = "";
                    clearInterval(setIntervalShow);
                    $(".opening").fadeOut();
                    $(".home").fadeIn(1500);
                    $(".home-wrapper").fadeIn(5000);
                    $("header").fadeIn(5000);
                    $("header").css("display", "flex");
                }
            }
        }
        var setIntervalShow = setInterval(openingShow, 2500);
    }
    // Cookieの確認
    var name = $.cookie("visited");
    if(name === "true") {
        $(".opening").hide();
        $(".home").fadeIn(1500);
        $(".home-wrapper").fadeIn(5000);
        $("header").fadeIn(5000);
        $("header").css("display", "flex");
    } else {
        // Cookieを作成
        $.cookie("visited", "true", {
            exprires: 1
        });
        //openingを実行
        opening();
    }

});
// ============================
//            home
// ============================
// メニューボタンがクリックされた時
$(".menu-button").on("click", function() {
    if($(".hide-button").css("opacity") === "0") {
        $(".hide-button").css("opacity", "1");
        var array = [
            ".menu",
            ".about",
            ".skills",
            ".works",
            ".contact",
            ".close"
        ]
        var length = array.length;
        var height = length * 30;
        for(var i = 0; i < length; i++) {
            $(array[i] + "-button").css("bottom", function() {
                return height - i * 30;
            });
        }
    // メニューボタンをクリックしてメニューを閉じる
    } else {
        $(".menu-list button").css("bottom", "100px");
        $(".hide-button").css("opacity", "0");
    }
});

// 項目ボタンがクリックされた時
$(".menu-list button").on("click", function() {
    array = [
        "about",
        "skills",
        "works",
        "contact"
    ]
    var length = array.length;
    for(var i = 0; i < length; i++) {
        if($(this).data("id") === array[i]) {
            $(".home").fadeOut(1000);
            $(".header-wrapper").css("visibility", "hidden");
            $(".home-button").fadeIn(1000);
            $("." + array[i]).css("display", "flex");
        }
    }
});

// ホームボタンがクリックされた時
$(".home-button").on("click", function() {
   location.reload();
});

// ============================
//            works
// ============================
$(".works-list li").on("click", function() {
    var image = $(this).find("img").attr("src");
    var id = $(this).find("img").attr("alt");
    if(id === "comingsoon") {
        $(".works-display-inner").html('<img src="' + image + '">');
        console.log("baka");
    } else {
        $(".works-display-inner").html('<a href="./' + id + '/index.html" target="_blank" rel="noopener noreferrer"><img src="' + image + '">');
        console.log("hoge");
    }
});
