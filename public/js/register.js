// check database to see if unique fields exist in the database
function checkExists(field, value) {
   var data = {};
   data[field] = value;
   var helpContainer = $('#'+field).parent().find('span');
   var thisDiv = $('#'+field).parents('.control-group');

   $.ajax({
      url: '/checkExists',
      type: 'GET',
      data: data
   })
   .done(function (reply) {
      // decode the reply and act accordingly
      helpContainer.text('That '+field+' is available!');
      thisDiv.addClass('success');
      setTimeout(function(){
         thisDiv.removeClass('success');
         helpContainer.text('');
      }, 1000);
      return true;
   })
   .fail(function (xhr, err) {
      // decode the error, clear out the field, display message accordingly
      switch(xhr.status) {
         case 409:
            thisDiv.addClass('error');
            helpContainer.text('Oops! That '+field+' is already taken!');
            $('#'+field).focus();
            break;
         default:
            thisDiv.addClass('error');
            helpContainer.text('Something went wrong, please try again.');
            $('#'+field).focus();
            break;
      }
      return false;
   });
}


$(function(){

   // once form is completly filled out, registration button becomes clickable
   $(':input[required]').change(function() {
      var thisField = $(this).attr('name');
      var readyToGo = true;
      if (thisField === 'username') {
         $(this).parents('.control-group').removeClass('error');
         readyToGo = checkExists('username', $(this).val());
      } else if (thisField === 'email') {
         $(this).parents('.control-group').removeClass('error');
         readyToGo = checkExists('email', $(this).val());
      }
      var inputCount = $(':input[required]').length;
      $(':input[required]').each(function(i){
         if ($(this).val() === '') {
            readyToGo = false;
         }
         if ($(this).parents('.control-group').hasClass('error')) {
            readyToGo = false;
         }
         if (i == (inputCount-1)){
            if (readyToGo) {
               $(':submit').removeAttr('disabled').focus();
            } else {
               $(':submit').attr('disabled', true);
            }
         }
      });

   });
});