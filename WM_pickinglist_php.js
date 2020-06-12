$(function(){

  $('.qr').on('focus', function(){
    $(this).select();
  })
/*
  $('.qr').on('blur',function(){
    let index00 = $('.qr').index(this);
    let qr_split = $('.qr').eq(index00).val().split(" ");
    let seiri = $('.seiri').eq(index00).text();
    let order = $('.order').eq(index00).text();
    let amount = $('.amount').eq(index00).text();

    
  })
  */
})



  $(function(){

    $('#order_select').change(function orderchange(){
      let select_val = $('#order_select option:selected').val();
      $.each($('#mytable tbody tr'), function(index, element){
        if(select_val == ""){
          $(element).css("display", "table-row");
          return true;
        }
        let row_text = $(element).text();
        
        if(row_text.indexOf(select_val) != -1){
          $(element).css("display", "table-row");
        }else{
          $(element).css("display", "none");
        }
      })
    })

  $('.ajax_button').on('click', function(){
    let row2 = $(this).closest("tr");
    let index01 = $('.ajax_button').index(this);
    console.log(index01)
    let qr_split = $('.qr').eq(index01).val().split(" ");
    console.log(qr_split);
    let seiri = $('.seiri').eq(index01).text();
    let order = $('.order').eq(index01).text();
    let amount = $('.amount').eq(index01).text();
    let tana = $('.tana').eq(index01).text();
    let case_amount = $('.case_amount').eq(index01).text();
    let recordid = $('.recordid').eq(index01).val();

    if($('.qr').eq(index01).val() == ""){
      console.log('空だよ')
    }else if(qr_split[0] != seiri){
     alert('整理番号が異なります');
   }else if(qr_split[2] + '-' + qr_split[3] != order){
     alert('受注番号が異なります');
   }else if(qr_split[4] != amount){
     alert('入数が異なります');
    
   }else{

   

    
    if(confirm('出庫を確定します。よろしいですか？')){
      $.ajax({
        type:'POST',
        url:'WM_pickinglist_enter.php',
        data:{
          'seiri':qr_split[0],
          'order':qr_split[2] + '-' + qr_split[3],
          'amount':qr_split[4],
          'tana':tana,
          'case_amount':case_amount,
          'recordid':recordid
        },
        dataType:'JSON'
      })
      .done(function(data){
        if(data.success){
          console.log(data.success);
          //$('#tr' + index01).css('background-color','#a5d1f4')
          $(row2).remove();
        }else if(data.fail){
          alert(data.fail);
          console.log(data.fail)
        }else{
          console.log('何も帰ってきてないよ')
        }
      })
      .fail(function(data){
        alert('通信失敗')
      })
    }else{
      alert('キャンセルしました');
      return false;
    }
  }
  })
})
$(function(){
  $('.delete_button').on('click', function(){
    let row = $(this).closest("tr");
    let delete_index = $('.delete_button').index(this);
    let recordid = $('.recordid').eq(delete_index).val();
    console.log(recordid)
    if(confirm('このレコードを削除してよろしいですか？')){
      

      $.ajax({
        type:'POST',
        url:'WM_pickinglist_enter.php',
        data:{
          'recordid':recordid
        },
        dataType:'JSON'
      })
      .done(function(data){
        if(data.success){
          console.log(data.success);
         $(row).remove();
         
        }else if(data.fail){
          alert(data.fail)
        }else{
          alert('なにも返ってきてないよ')
        }
      })
      .fail(function(data){
        alert('通信失敗');
        console.log('通信失敗');
      })
    }else{
      alert('キャンセルしました')
      return false
    }
  })
})

$(function(){
  $('#close').on('click', function(close){
    window.close()
  })
})
$(document).ready(function(){
  $('#mytable').tablesorter();
});
/*
$(document).ready(function(){
  $('#mytable').paginate();
})
*/

