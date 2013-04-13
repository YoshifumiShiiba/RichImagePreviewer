
var $window = $(window);
var $doc = $(document);

var zoomSize = 100; 

$doc.ready( function(){
  var $body = $('body')
  var $img = $('img')
  if($body.children().length == 1 && $img.length == 1){
    $body.css('background-color', 'black');

    var winWidth = $window.width();
    var winHeight = $window.height();
    var imgWidth = $img.width();
    var imgHeight = $img.height();
    $img.remove();

    if(imgWidth > imgHeight){
      imgHeight = (imgHeight/imgWidth) * winWidth;
      imgWidth = winWidth;
    }else{
      imgWidth = (imgWidth/imgHeight) * winHeight;
      imgHeight = winHeight;
    }

    $body.append('<img src="'+$img.attr('src')+'">');
    $img = $('img')

    $img.css({
      "width": imgWidth + 'px',
      "left": (winWidth/2)-(imgWidth/2),
      "top": (winHeight/2)-(imgHeight/2)
    });

    $img.draggable();

    var zoom = function(mode){
      var width = $img.width();
      var changeSize = zoomSize;
      if(mode=='in'){
        changeSize = -1 * zoomSize;
      }
      $img.css('left', $img.offset().left + (changeSize/2));
      $img.css('top', $img.offset().top + (changeSize/2));
      $img.width( width - changeSize);
    };

    $img.on('mousewheel',function(e){
      if(e.originalEvent.wheelDelta > 0){
        zoom('in');
      }else{
        zoom('out');
      }
    });

    $body.append(
      '<div id="zoomButtons">' +
      '<button id="zoomIn">+</button>' +
      '<button id="zoomOut">-</button>' +
      '</div>'
    );
    $('#zoomIn').on('click',function(){
      zoom('in');
    });
    $('#zoomOut').on('click',function(){
      zoom('out');
    });
  }
});
