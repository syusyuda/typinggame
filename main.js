//チェック部分
function mojicheck(){
    var miss = 0;
    var point = parseInt($("#point").html(),10);
    console.log(point);
    console.log("現在のポイント" + point);
	var ansmoji = $("#text").val().split('');
	var quesmoji =$("#moji").html().split('');

	//var miss = new Array(quesmoji.length);
    for (var i = 0; i < quesmoji.length; i++){
        if (ansmoji[i] != quesmoji[i]) {
            miss++;
        }
    }

    if (miss == 0) {
        changemoji();
        //alert("good!");
		//$("#text").val("<br>");
        $("#text").val("");
        point = point + quesmoji.length;
    }
    
    $("#point").html(point);
}
//プレカウントダウン部分
function precountdown(){
	countdown_func_moving = 1;
	$("#count_pre").css('visibility','visible');
	var presec = $("#count_pre").html();
	var precount = setInterval(function(){
		presec--;
		$("#count_pre").html(presec);
		if(presec <= 0){
			clearInterval(precount);
			$("#count_pre").html(3);
			$("#count_pre").css('visibility','hidden');
			countdown();
		}
	},1000);
};
//カウントダウン部分
function countdown() {

	$("#point").html("0");
	$("#moji").css('visibility','visible');
    //ボタンを押せなくする
	$(".count_div").css('visibility','visible');
    $("button").attr('disabled', true);
    $("#text").attr('disabled', false);
    $("#text").focus();
	$(".instruction_start_shift").css('visibility','hidden');
	//プログレスバー
		progressbar(cnt,sec);
	var sec = 60;
	var dt = new Date();
	console.log('Start: ',dt);
	var endDt = new Date(dt.getTime() + sec * 1000);
	console.log('End: ',endDt);
	
	var cnt = sec;
 	var id = setInterval(function(){
		cnt--;
	

		$("#count").html(cnt)
		console.log($("#count").html());
		dt = new Date();
		if(dt.getTime() >= endDt.getTime()){
			//タイムアップ部分
            clearInterval(id);
            $("button").attr('disabled', false);
            $("#text").attr('disabled', true);
            $("#text").val("");
			$(".instruction_start_shift").css('visibility','visible');
			$(".count_div").css('visibility','hidden');
			$("#moji").css('visibility','hidden');
			countdown_func_moving = 0;
			//プログレスバーを戻す処理
			$(".bar").animate({'width':'99%'},{duration:500});
			
		}
	},1000);
};
//問題を変更する処理
function changemoji() {
	var word =["アフガニスタン","アルバニア","オーストラリア","ブルキナファソ","コロンビア","コートジボアール","エストニア","フィンランド","ニュージーランド","インドネシア","ウズベキスタン","サウジアラビア","トルクメニスタン"] 
	var random = Math.floor(Math.random() * word.length);
	console.log(word[random]);
    $("#moji").html(word[random]);
}
//html読み込み時に実行される部分
var countdown_func_moving = 0;
$(window).on('load', function () {
    changemoji();
    $("#text").attr('disabled', true);
	$("#moji").css('visibility','hidden');
	$(".count_div").css('visibility','hidden');
	$("#count_pre").css('visibility','hidden');
	$("button").attr('disabled', true);
});
//入力時の処理
$(function () {
    $('#text').on('keyup', function () {
        mojicheck();
    });
});
//シフト入力で開始する処理
$(function () {
    $(window).on('keyup',function (e) {
		if (e.keyCode == "32" && countdown_func_moving == 0) {
            precountdown();
        }
        console.log(e.keyCode);
    });
});
//ページ遷移の処理
function nextpage(){
	location.href = "result.php?result="+$("#point").html();
}

//プログレスバー
function progressbar(time,count){
	$(".bar").animate({'width':'0%'},{duration:60000});
}


