$(function(){
  var reloadMessages = function() {
    last_message_id = $('.main-chat__message-list__id:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.main-chat__message-list').append(insertHTML);
        $('.main-chat__message-list').animate({ scrollTop: $('.main-chat__message-list')[0].scrollHeight});
      }
    })
    .fail(function() {
      console.log('error');
    });
  };

    function buildHTML(message){
      if (message.image) {
        var html = `<div class="main-chat__message-list__id" data-message-id=`+ message.id + `>
          <div class= "main-chat__message-list" >
            <div class= "main-chat__message-list__name">
              ${message.user_name}
              <div class="main-chat__message-list__name__date">
                ${message.time}
              </div>
            </div>
            <div class= "main-chat__message-list__mesage">
              <p class="main-chat__message-list__message__content">
                ${message.body}
              </p>
            </div>
            <img src=${message.image} >
          </div>`
        return html;
      } else{
        var html = `<div class="main-chat__message-list__id" data-message-id=`+ message.id + `>
        <div class= "main-chat__message-list">
          <div class= "main-chat__message-list__name">
            ${message.user_name}
            <div class="main-chat__message-list__name__date">
              ${message.time}
            </div>
          </div>
          <div class= "main-chat__message-list__mesage">
            <p class="main-chat__message-list__message__content">
              ${message.body}
            </p>
          </div>
        </div>`
      return html;
    };
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax ({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
      .done(function(data){
        var html = buildHTML(data);
        $('.main-chat__message-list').append(html);
        $('form')[0].reset();
        $('.main-chat__message-list').animate({ scrollTop: $('.main-chat__message-list')[0].scrollHeight});
      })
      .fail(function() {
        alert("メッセージ送信に失敗しました");
    });
  });
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});