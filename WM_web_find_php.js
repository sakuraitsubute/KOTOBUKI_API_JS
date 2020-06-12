  
    // 出庫入力数が現在ケース数を上回っていたら警告
    $(function() {
      $('.case_amount').on('blur',function(){
        let index00 = $('.case_amount').index(this)
        let case_amount00 = parseInt($('.case_now').eq(index00).text(),10);
        if($(this).val() > case_amount00){
          alert('出庫ケース数が現在庫数を超えています')
        }
      })
      
      $(".ajax_button").click(function() {
        
         let index01 = $(".ajax_button").index(this);
         let seiri = $('.seiri').eq(index01).val();
         let order = $('.order').eq(index01).val();
         let tana = $('.tana').eq(index01).val();
         let amount = $('.amount').eq(index01).text();
         let case_amount = $('.case_amount').eq(index01).val();
         
         if(confirm(order + "を" + case_amount + "ケース出庫登録します。よろしいですか？")){

        
         $.ajax({
          type:'POST',
          url:'WM_web_find_picking.php',
          data:{
            'seiri':seiri,
            'order':order,
            'tana':tana,
            'amount':amount,
            'case_amount':case_amount
          },
          dataType:'JSON'
         })
         .done(function(data){
          if(data.success){
            
            console.log(data.success);
            $('#tr' + index01).css('background-color','#a5d1f4')
          }else{
            alert(data.fail);
          }
         })
         .fail(function(data){
          console.log('通信失敗');
         
         })
        
        }else{
          console.log('キャンセルしました')
          return false;
        }
      });
      

      
    });
    
    $(document).ready(function(){
      $('#mytable').tablesorter();
    });
    $(document).ready(function(){
      $('#mytable').paginate();
    })
   