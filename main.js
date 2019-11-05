//チェック部分

//オートコンプリート
//このfirstが0のあいだはテキストボックスが空白にならない
var first = 0;
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
        //オートコンプリート無効化
        if (first == 1) {
            $("#text").val('');
            //文字変更
            $(".circle").css('opacity', '1.0');
            $(".circle").animate({ 'opacity': '0.0' }, 500);
            changemoji();
            point = point + quesmoji.length;
            first = 0;

        } else {
            first = 1;
        }	
    }
    
    $("#point").html(point);
}
//プレカウントダウン部分
function precountdown(){
	$(".instruction_start_shift").css('visibility','hidden');
	countdown_func_moving = 1;
	$("#count_pre").css('visibility','visible');
	//カウントダウン　文字拡大
	$(".precount_div").css({
		position:'relative'
	});
	$("#count_pre").css({
		position:'absolute',
		margin:'auto',
		top:0,
		left:0,
		right:0,
		bottom:0
	});
	$("#count_pre").css('font-size','1em');
	$("#count_pre").animate({'font-size':'2em'},500);

	var presec = $("#count_pre").html();
	var precount = setInterval(function(){
		presec--;

		$("#count_pre").css('font-size','1em');
		$("#count_pre").html(presec);
		$("#count_pre").animate({'font-size':'2em'},500);
		if(presec <= 0){
			clearInterval(precount);
			$("#count_pre").html(3);
			//拡大した文字を戻す
			$("#count_pre").css('font-size','1em');

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
		//プログレスバー　色変更
		if(cnt == 45){
			$('.bar').css('background','yellow');
		}else if(cnt == 30){
			$('.bar').css('background','orange');
		}else if(cnt == 15){
			$('.bar').css('background','red');
		}
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
			$('.bar').css('background','springgreen');
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
    $("#count_pre").css('visibility', 'hidden');
//円表示
    $(".circle").css('opacity', '0.0');

	$("button").attr('disabled', true);
});
//入力時の処理
$(function () {
    $('#text').on('keyup', function () {
        mojicheck();
    });
});
//スペース入力で開始する処理
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
	$(".bar").animate({'width':'0%'},60000,'linear',);
}


