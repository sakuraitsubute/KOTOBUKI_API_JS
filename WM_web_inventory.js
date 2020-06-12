//送信ボタンを押したときにダイアログを出して送信していいかどうか確認する
//OKならAjax通信を行ってデータベースに値を登録する

$(function(){
  $('#submit_button').on('click', function ShowConfirmDialog(){
    if(confirm("本当に送信しますか？")){
      var qr01 = document.forms.php.qrcode_input.value;
      var tana = document.forms.php.tana.value;
      //var tant = document.forms.php.tant.value;
      var amount = document.forms.php.amount.value;
      var case_amount = document.forms.php.case.value;
      var extra = document.forms.php.extra.value;
      var order = document.forms.php.order.value;
      
      
      

      $.ajax({
        type:'POST',
        url:'WM_web_inventory_test.php',
        data:{
          'qr01':qr01,
          'tana':tana,
          //'tant':tant,
          'amount':amount,
          'case_amount':case_amount,
          'extra':extra,
          'order':order
          
        },
        dataType:'JSON'
      })
      .done( function(data){
        if(data.success){
          alert(data.success);
          console.log(data.success);
          $('#qrcode_input').val("");
          $('#case').val("");
          $('#amount').val("");
          $('#order').val("");
          $('#extra').val("");
          $('#tokui').empty();
          $('#user').empty();
          $('#title').empty();
          $('#qrcode_input').trigger('focus');

        }else{
          alert(data.fail);
          console.log(data.fail);
        }
        

    })
    .fail( function(data){
         console.log('通信失敗');
         alert('通信に失敗しました');
    });

    }else{
      console.log('キャンセルしました')
      return false;
    }
  })
})



$(function(){
  $('#ajax_button').on('click', function(){
   
 
    
    var $qr = document.forms.php.qrcode_input.value;
    var $find_word = $qr.split(" ");
    var $seiri = $find_word[0];
    var $eda = $find_word[1];
    var $order = $find_word[2] + '-' + $find_word[3];
    var $amount = $find_word[4];
    $.ajax({
      type : "POST",
      url : "WM_web_inventory_display.php",
      data : {'seiri' : $seiri,
              'eda' : $eda,
             },
      datatype : "json"
    })
    .done( function(data){
      if(data.title){
        $('#amount').val($amount);
      $('#order').val($order);
      $('#seiri').val($seiri);
      $('#eda').val($eda);
      $('#tokui').html(data.tokui);
      $('#user').html(data.user);
      $('#title').html(data.title);
      $('#result').empty();
      //$('#qrcode').val("");
      }else{
        $('#result').html(data.fail);
      console.log(data.fail);
      $('#qrcode_input').val("");

      }
     
        })
    .fail( function(data){
      alert('通信失敗')
      console.log('通信失敗');
      $('#qrcode_input').val("")
    });
  });
});


$(function(){
  $('#qrcode_input').on('keydown', function(e){
    if(e.keyCode === 13){
       $('#ajax_button').trigger('click');
       $('#case').trigger('focus');
    };
 })
})
$(function(){
  $('.close').on('click', function(){
    window.close();
  })
})
             
$(function(){
  $('#tana').on('focus', function(){
    $(this).select();
  })  
  })

    