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
            "title"
        ]
        $(".opening p").hide();
        var i = 0;
        $(".opening-" + array[i]).show().shuffleLetters();
        var openingShow = function() {
            if($(".opening-" + array[i]).css("display") === "none") {
                $(".opening-" + array[i - 1]).hide();
                $(".opening-" + array[i]).show();
                $(".opening-" + array[i]).shuffleLetters();
            } else {
                i ++;
                if(i > array.length) {
                    $(".opening-" + array[i - 2]).text("I am the most omniscient and omnipotent").shuffleLetters().animate({"font-size": "25em"}, 2000);
                    $(".opening").fadeOut(1000);
                    $(".home").fadeIn(3000);
                    $(".home-wrapper").fadeIn(3000);
                    $("header").fadeIn(3000);
                    clearInterval(setIntervalShow);
                    i = "";
                }
            }
        }
        var setIntervalShow = setInterval(openingShow, 1500);
    }

    // Cookieの確認
    var name = $.cookie("visited");
    if(name === "true") {
        $(".opening").hide();
        $(".home").fadeIn(3000);
        $(".home-wrapper").fadeIn(3000);
        $("header").fadeIn(3000);
    } else {
        // Cookieを作成
        $.cookie("visited", "true", {
            expires: 1
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
        $(".menu-button").text("CLOSE");
    // メニューボタンをクリックしてメニューを閉じる
    } else {
        $(".menu-list button").css("bottom", "100px");
        $(".hide-button").css("opacity", "0");
        $(".menu-button").text("MENU");
    }
});

// 項目ボタンがクリックされた時
$(".menu-list button").on("click", function() {
    var array = [
        "about",
        "skills",
        "works",
        "contact"
    ]
    var length = array.length;
    for(var i = 0; i < length; i++) {
        if($(this).data("id") === array[i]) {
            $(".home").fadeOut();
            $(".header-wrapper p").fadeOut();
            $(".home-button").fadeIn();
            $("." + array[i] + "-wrap").fadeIn(1500);
        }
    }
});

// ホームボタンがクリックされた時
$(".home-button").on("click", function() {
    var array = [
        "about",
        "skills",
        "works",
        "contact"
    ]
    var length = array.length;
    for(var i = 0; i < length; i++) {
        $("." + array[i] + "-wrap").fadeOut(1000);
        $(".home").fadeIn(1500);
    }
    // メニューを閉じる
    $(".menu-list button").css("bottom", "100px");
    $(".hide-button").css("opacity", "0");
    $(".menu-button").text("MENU");
    // メニューボタンの非表示とタイトル表示
    $(".header-wrapper p").fadeIn();
    $(".home-button").fadeOut();
});

// ============================
//            works
// ============================
// 小さい画像がクリックされた時
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
