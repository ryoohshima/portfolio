// opening
$(document).ready(function() {
    var arrey = [
        "hello",
        "name",
        "job",
        "title"
    ]
    $(".opening p").hide();
    // 文字を順番に表示
    var i = 0;
    $(".opening-" + arrey[i]).fadeIn();
    var openingShow = function() {
        if($(".opening-" + arrey[i]).css("display") === "none") {
            $(".opening-" + arrey[i]).fadeIn();
            console.log("baka");
        } else {
            $(".opening-" + arrey[i]).fadeOut();
            i ++;
            console.log("hoge");
            if(i > arrey.length) {
                i = "";
                clearInterval(setIntervalShow);
                $(".opening").fadeOut();
                $(".home").fadeIn(1500);
                $("header").fadeIn(1500);
                $("header").css("display", "flex");
            }
        }
    }
    var setIntervalShow = setInterval(openingShow, 2000);
});
