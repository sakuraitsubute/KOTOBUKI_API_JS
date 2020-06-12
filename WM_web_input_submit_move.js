//送信ボタンを押したときにダイアログを出して送信していいかどうか確認する
//OKならAjax通信を行ってデータベースに値を登録する

$(function(){
  $('#submit_button').on('click', function ShowConfirmDialog(){
    if(confirm("本当に送信しますか？")){
      var qr01 = document.forms.php.id_qr01.value;
      var tana = document.forms.php.tana.value;
      //var tant = document.forms.php.tant.value;
      var inout = document.forms.php.inout.value;
      var case01 = document.forms.php.case01.value;
      var move = document.forms.php.move.value;
      
      
      
      

      $.ajax({
        type:'POST',
        url:'WM_web_input_receive_test.php',
        data:{
          'qr01':qr01,
          'tana':tana,
          //'tant':tant,
          'inout':inout,
          'case01':case01,
          'move':move
        },
        dataType:'JSON'
      })
      .done( function(data){
        if(data.success){
          alert(data.success);
          console.log(data.success);
          $('#id_qr01').val("");
          $('#case01').val("");
          $('#id_qr01').trigger('focus');
        }else{
          alert(data.fail);
          console.log(data.fail);
        }
        

    })
    .fail( function(data){
         console.log('通信失敗');
         
    });

    }else{
      console.log('キャンセルしました')
      return false;
    }
  })
})


//ボタンをクリックしたとき（今はCSSで非表示にしてる）
//データベースと通信して該当の整理番号の商品情報を表示する
$(function(){
  $('#ajax_button').on('click', function(){ 
 
    var $qr = document.forms.php.id_qr01.value;
    var $find_word = $qr.split(" ");
    var $seiri = $find_word[0];
    var $eda = $find_word[1];
    var $order = $find_word[2];
    $.ajax({
      type : "POST",
      url : "WM_web_input_find.php",
      data : {'seiri' : $seiri,
              'eda' : $eda,
              'order' : $order
      },
      datatype : "html"
    })
    .done( function(data){
      $('#result').html(data);
      console.log(data);

    })
    .fail( function(data){
      $('#result').html(data);
      console.log('通信失敗');
    });

   
   

 });
  });

//QRコードの入力フォームでエンター押したらボタンクリックしたとみなす
//ついでにケース数の入力フォームにフォーカスを動かす
$(function(){
  $('#id_qr01').on('keydown', function(e){
    if(e.keyCode === 13){
       $('#ajax_button').trigger('click');
       $('#case01').trigger('focus');
    };
 })
})

$(function(){
  $('#id_qr01').on('focus', function(){
    $(this).select()
  })
})

$(function(){
  $('.close').on('click', function(close){
    window.close()
  })
})