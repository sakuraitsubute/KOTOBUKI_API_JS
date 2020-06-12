$(document).ready(function(){
  $('#mytable').tablesorter();
});

/*
$(document).ready(function(){
  $('#mytable').paginate();
});
*/
$(function(){
  $('#close').on('click', function(close){
    window.close()
  })
});

$(function(){
  $('#order_select').change(function(){
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
})

$(function(){
  $('#mytable tbody tr').on('click', function editinventory(e){
    location.href = $(this).data('href');
  });



//$(function(){
 
    $('.delete_button').on('click', function rowdelete(e){
      e.stopPropagation();
      let row = $(this).closest("tr");
      let delete_index = $('.delete_button').index(this);
      let recordid = $('.recordid').eq(delete_index).val();
      console.log(recordid);
      if(confirm('このレコードを削除してよろしいですか？')){
        
  
        $.ajax({
          type:'POST',
          url:'WM_web_inventory_delete.php',
          data:{
            'recordid':recordid
          },
          dataType:'JSON'
        })
        .done(function(data){
          if(data.success){
            console.log(data.success);
           $(row).remove();
           e.stopPropagation();
           
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
       return false;
      }
      
    })
  //})
});
