//Document ready jquery (select query from JSON server)
$(document).ready(function(){
    
    var dataResults = ''
    var catResults = ''
    var categories = []

    var _url = "https://my-json-server.typicode.com/rivalmsr/pwaapi/products"

    $.get(_url, function(data){
        $.each(data, function(key, items){
            _cat = items.category

            dataResults +="<div>"
                            +"<h3>"+ items.name + "</h3>"
                            + "<p>" + _cat + "</p>"
                        "<div>";

                if($.inArray(_cat, categories) == -1){
                    categories.push(_cat)
                    catResults +="<option value'"+ _cat +"'>" + _cat + "</option>"
                }
        })

        $('#products').html(dataResults)
        $('#cat_select').html("<option value='all'>semua</option>" + catResults)
    })

    // function filter 
    $("#cat_select").on('change', function(){
        updateProduct($(this).val())
    })

    function updateProduct(cat){
        var dataResults = ''
        var _newUrl = _url 
        
        if(cat != 'all')
            _newUrl = _url + "?category=" + cat
        
        $.get(_newUrl, function(data){

            $.each(data, function(key, items){
                _cat = items.category

                dataResults += "<div>"
                        + "<h3>" + items.name + "</h3>"
                        +"<p>" + _cat + "</p>"
                    "<div>";
            })

            $('#products').html(dataResults)
        })

    }

}) //End document ready jquery

//Register a Service Worker
if('serviceWorker' in navigator){
  window.addEventListener('load', function(){
      navigator.serviceWorker.register('/serviceWorker.js').then(function(registration){
        //Register was Successful
        console.log('ServiceWorker registraion successful with scope: ', registration.scope);
      }, function(err){
        //Register failed :(
            console.log('ServiceWoker registration failde', err);
      });
  });  

} //End service worker
