/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

           
    
        
$(document).ready(
        
function()
{
    function getStraat(){
            return "straat";
        }
    var straat;
    var gemeente;
    var postcode;
    var map;
    var mapOptions;
    var point;
    var marker;
    var userMarker;
    var userMakerOpties;
    var infoWindow;
    var infoWindowOptions;
    if (navigator.geolocation) {
        
        function hasPosition(position) {
            point = new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
            mapOptions = {
                center:point,
                zoom: 17,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            map = new google.maps.Map(document.getElementById('map'), mapOptions);
            userMakerOpties = {
                position: point,
                icon:"green-dot.png"                
            };
            userMarker = new google.maps.Marker(userMakerOpties);
            userMarker.setMap(map);
            infoWindowOptions = {
                content: 'Je Bent Hier<br>\n\
                           <a href="" id="situatieAanmelden">Melding plaatsen </a><br>'
            };
            infoWindow = new google.maps.InfoWindow(infoWindowOptions);
            google.maps.event.addListener(userMarker, 'click', function(e) {
                infoWindow.open(map, userMarker);
            });
             google.maps.event.addListener(map, 'click', function(event) {
             placeMarker(event.latLng);
            });  
       
        
       
     }//einde hasposition
     navigator.geolocation.getCurrentPosition(hasPosition);
      
         function placeMarker(location) {
            
           marker = new google.maps.Marker({
                position: location,

            });
            marker.setMap(map);
            getPlaceNames(marker.getPosition().lat(),marker.getPosition().lng());
            
            
            google.maps.event.addListener(marker, 'click', function(e) {
                infoWindow.open(map, marker);
            });
        }
        
        function getPlaceNames(lat, lng){
           
             var hr= new XMLHttpRequest();
                    hr.open("GET",
            "http://maps.googleapis.com/maps/api/geocode/json?latlng="+ lat+","+lng+"&sensor=false"
            ,true);                    
                    hr.onreadystatechange = function() {
                       
                           if (hr.readyState == 4 && hr.status == 200) {
                               var data = JSON.parse(hr.responseText); 
                               for( var result in data){
                                   for(var addressComponets in data[result])
                                       for( var addresArray in data[result][addressComponets])
                                           for(var someArray in data[result][addressComponets][addresArray]){
                                               //alert(JSON.stringify( data[result][addressComponets][addresArray][someArray]));
                                               for(var type in data[result][addressComponets][addresArray][someArray]){
                                                    
                                                   for(var type2 in data[result][addressComponets][addresArray][someArray][type] ){
                                                     
                                                      if(data[result][addressComponets][addresArray][someArray][type]=="postal_code"){
                                                           //postcoe
                                                           //alert(JSON.stringify( data[result][addressComponets][addresArray][someArray]));
                                                           //JSON.stringify( data[result][addressComponets][addresArray][someArray].long_name)
                                                           postcode=data[result][addressComponets][addresArray][someArray].long_name;
                                                           //alert(postcode);
                                                       }
                                                      if(data[result][addressComponets][addresArray][someArray][type][type2]=="locality"){
                                                           //gemeente naam
                                                           //alert(JSON.stringify( data[result][addressComponets][addresArray][someArray]));
                                                           //JSON.stringify( data[result][addressComponets][addresArray][someArray].long_name)
                                                           //alert(JSON.stringify( data[result][addressComponets][addresArray][someArray]));
                                                           gemeente=data[result][addressComponets][addresArray][someArray].long_name;
                                                           
                                                       }
                                                       if(data[result][addressComponets][addresArray][someArray][type][type2]=="route"){
                                                           //straat naam
                                                           //alert(JSON.stringify( data[result][addressComponets][addresArray][someArray]));
                                                           //JSON.stringify( data[result][addressComponets][addresArray][someArray].long_name)
                                                          // alert(JSON.stringify( data[result][addressComponets][addresArray][someArray]));
                                                           straat=data[result][addressComponets][addresArray][someArray].long_name;
                                                       }
                                                        
                                                   }//straat naam loop
                                               }//geemeente loop
                                            }//
                                  
                                  
                               }
                    infoWindowOptions = {
                        content: ' ' + straat + '<br>\n\
                             ' + gemeente + '<br>\n\
                             ' + postcode + '<br>\
                            <a href="melding.jsp">Melding plaatsen </a><br>'

                    };
                       infoWindow = new google.maps.InfoWindow(infoWindowOptions);
            infoWindow.open(map, marker);    
                           }
                          
                       }                           
                       hr.send(null);        
            
        }

       
    }  
//----------------------meldingen script------------------------------------    
//----------------------situaties halen -------------------------
         var hr= new XMLHttpRequest();
         hr.open("GET","res/meldingen/soortMeldingen",true);                    
         hr.onreadystatechange = function() { 
               
            if (hr.readyState == 4 && hr.status == 200) {
                //alert(hr.responseText);
                var data = JSON.parse(hr.responseText); 
                    
                    for(var soortmelding in data){
                        $("#soort").append("<option value='"+data[soortmelding].id +"'>"+data[soortmelding].naam  + "</option>" )
                       //alert(data[soortmelding].naam );
                    }
                       }
         }      
                       hr.send(null);
                  
                $("#datumDiv").hide();
                $("#type").change
                (
                    function (){
                      if($(this).val()== 1){                    
                        $("#situatieSoortDiv").slideUp(300,
                            function(){
                                $("#datumDiv").slideDown(300,
                                    function (){
                                        $("#datum").attr("value", new Date() );
                                    }
                                );                            
                            }
                       
                         );
                      }else{
                         $("#datumDiv").slideUp(300, function(){                             
                             $("#situatieSoortDiv").slideDown(300)
                         });
                          ;
                      }               
                     }
                 );
 
}) ;
       
	
