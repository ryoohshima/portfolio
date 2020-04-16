// opening
$(document).ready(function() {
    // 文字を順番に表示
    var arrey = [
        "hello",
        "name",
        "job",
        "title"
    ]
    var i = 0;
    var opening = function() {
        if($(".opening-" + arrey[i]).hide()) {
            $(".opening-" + arrey[i]).show();
            i ++;
        }
        if(i > arrey.length) {
            i = "";
            $(".opening").hide();
            $(".home").show();
            clearInterval(opening);
        }
    }
    setInterval(opening, 1000);


});
