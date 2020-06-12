$(function(){
  $('.close').on('click', function(){
    window.open('about:blank','_self').close()
  })
})
$(function(){
  $('.logout').on('click', function(){
    if(confirm('ログアウトしてもよろしいですか？')){
      $.ajax({
        type:'POST',
        url:'KOTOBUKI_WebAPI_menu_logout.php',
        dataType:'html'
      })
      .done(function(data){
        alert(data)
        location.reload();
      })
      .fail(function(){
        alert('エラーが発生しました')
      })
    }
  })
})