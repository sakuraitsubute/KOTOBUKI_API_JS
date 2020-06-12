$(function(){
  $('#back').on('click', function(){
    history.back();
  })


    $('#ajax_button').on('click', function ShowConfirmDialog(){
      if(confirm("本当に送信しますか？")){
    let param = location.search
    let reparam = param.replace("?id=","")
    let seiri = $('#seiri').val();
    let order = $('#order').val();
    let amount = $('#amount').val();
    let case_amount = $('#case_amount').val();
    let tana = $('#tana').val();
    let extra = $('#extra').val();

    
    $.ajax({
      type:'POST',
      url:'WM_web_inventory_revision.php',
      data:{
        'recordid':reparam,
        'seiri':seiri,
        'order':order,
        'amount':amount,
        'case_amount':case_amount,
        'tana':tana,
        'extra':extra
      },
      dataType:'JSON'
    })
    .done(function(data){
      if(data.success){
        alert(data.success)
        window.location.href = "WM_web_inventory_find.php"
      }else{
        alert(data.fail)
      }
      
    })
    .fail(function(data){
      alert('エラーが発生しました');
      console.log('通信失敗');
    })
  }else{
    alert('キャンセルしました');
  }
})
  })
