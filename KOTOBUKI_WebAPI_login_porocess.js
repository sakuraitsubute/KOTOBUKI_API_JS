$(function(){
  $('#ajax_button').on('click', function(){
    let username = $('#userid').val();
    let password = $('#password').val();

    $.ajax({
      type:'POST',
      url:'KOTOBUKI_WebAPI_login_process.php',
      data:{
        'userid':username,
        'password':password
      },
      dataType:'JSON'
    })
    .done(function(data){
      if(data.success){
        console.log(data.success);
        window.location.href = "KOTOBUKI_WebAPI_menu_ver1.php"
      }else{
        alert(data.fail)
      }
      
    })
    .fail(function(){
      alert('通信失敗')
    })
  })
})
$(function(){
  $('#password').on('keydown', function(e){
    if(e.keyCode === 13){
       $('#ajax_button').trigger('click');
    };
 })
})
$(function(){
  $('#back').on('click', function(){
    history.back();
  })
})