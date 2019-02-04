// const Croppie = require('croppie');
document.addEventListener('DOMContentLoaded', () => {
  $('[data-toggle="tooltip"]').tooltip(); 

  function removeBook(id,element){
    element.removeClass('clicked');
    axios.post('/search' , { action: {
      remove:true,
      book: id
    } 
    });
  }
  function addBook(id,element){
    element.removeClass('clicked');
    axios.post('/search' , { action: {
      add:true,
      book: id
    } 
    });
  }
  function favBook(id,element){
    element.toggleClass('clicked');
    axios.post('/search' , { action: {
        star:true,
        book: id
      } 
    });
  }


  $('.star-book').click(function(e) {   
    const bookId = $(this).parent().attr('id');
    const that = $(this);
    favBook(bookId,that);
  });
  $('.add-book').click(function(e) {   
    const bookId = $(this).parent().attr('id');
    const that = $(this);
    $(this).hasClass('clicked') ? removeBook(bookId,that): addBook(bookId,that);
  });



  //book icons event handlers end
   
  // var el = document.getElementById('my-image');
  // console.log(el);
  // var vanilla = new Croppie(el, {
  //           viewport: { width: 150, height: 150, type:'circle' },
  //           boundary: { width: 200, height: 200 },
  //           showZoomer: false,
  //           enableOrientation: true,
  //         });
  // vanilla.bind({
  //     url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUup0JA8sbw8KjEGKQUvpYfpYW-fayrqqbXXBatatSIAB7_f33',
  //     // orientation: 4
  // });
  // //on button click
  // vanilla.result('blob').then(function(blob) {
  //     // do something with cropped blob
  // });
  
  var resize;
  $('#my-image').toggle();
  function readURL(input) {
    
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function(e) {
        console.log('my image:',$('#my-image').attr('src'));

        if(resize instanceof Croppie){
          console.log('instance!');
          
          resize.destroy();
          resize = null;
        }

        $('#my-image').attr('src', e.target.result);

        resize = new Croppie($('#my-image')[0], {
          viewport: { width: 150, height: 150, type:'circle' },
          boundary: { width: 200, height: 200 },
          showZoomer: false,
          enableOrientation: true
        });

        $('#use').on('click', function() {
          
          if($('#result').attr('src').length > 0){
            $('#result').attr('src','');
          }
          
          resize.result('base64')
          .then(function(dataImg) {
            console.log('dataImg',dataImg);
            var data = [{ image: dataImg }, { name: 'profilePic.jpg' }];
            $('#result').attr('src', dataImg);
            $('#input-profilePic').val(dataImg) ;
            var myIm = $('#my-image')[0].outerHTML;
          $('.croppie-container').remove();
          $('#my-image').remove();
          $('#croppie-upload').append('<img id="my-image" src="#" />');
          $('#my-image').toggle();
          })
        })
      }
      reader.readAsDataURL(input.files[0]);
    }
  }
  
  $("#imgInp").change(function() {
    readURL(this);
  });  

}, false);




