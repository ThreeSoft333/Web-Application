function navbarminimalize() {

   $('body').toggleClass('mini-sidebar');

  }

  function dropify(){     
   $('.dropify').dropify();
  }

  function setdropify(){     
   $("#input-file-now").attr("data-default-file", "https://localhost:44304/Resources/Images/download.png");
   $('.dropify').dropify();
  }

  function alertSuccess(message){
  $.toast({
   heading: 'success',
   text: message,
   position: 'top-right',
   loaderBg:'#ff6849',
   icon: 'success',
   hideAfter: 3500, 
   stack: 6
 });
}

function alertError(message){
 $.toast({
   heading: 'error',
   text: message,
   position: 'top-right',
   loaderBg:'#ff6849',
   icon: 'error',
   hideAfter: 3500
 });
}

// function switcher() {
//   $('.js-switch').each(function () {
//     new Switchery($(this)[0], $(this).data());
// });
// }

function colorpicker(){
  $(".colorpicker").asColorPicker();

  $(".complex-colorpicker").asColorPicker({
    mode: 'complex'
});

$(".gradient-colorpicker").asColorPicker({
  mode: 'gradient',
  width:'100%'
});
}