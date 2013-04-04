/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

           
    
        
$(document).ready(
        
function()
{
    function loadTmpMelding() {
        var hr = new XMLHttpRequest();
        hr.open("GET", "res/meldingen/tmp2", true);
        hr.onreadystatechange = function() {
            if (hr.readyState == 4 && hr.status == 200) {
                tempMelding = JSON.parse(hr.responseText);

            }
        }
        hr.send(null);
    }  
    function saveTmpMelding() {
        var hr = new XMLHttpRequest();
        hr.open("POST", "res/meldingen/tmp", true);
        hr.setRequestHeader("Content-type", "application/json");
        hr.send('{"latitude":' + marker.getPosition().lat() + ', "longitude":' + marker.getPosition().lng() + ', "straat":"' + straat + '", "postcode":"' + postcode + '"}');

    }   
    var straat;
    var gemeente;
    var postcode;
    var datumString;
    var map;
    var mapOptions;
    var point;
    var marker;
    var userMarker;
    var userMakerOpties;
    var infoWindow;
    var infoWindowOptions;
    var tempMelding;
    var maand;
    var dag  ;
    var jaar ;
    var uur ;
    var min ;
    var sec ;
    
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
                    saveTmpMelding();//tijdelijke info over straat, gemeente...longitute opslaan on server backend
                       infoWindow = new google.maps.InfoWindow(infoWindowOptions);
                       
                      
                    infoWindow.open(map, marker);
                    
                           }//eind if (hr.readyState == 4 && hr.status == 200)
                          
                       }  //einde hr.onreadystate                         
                       hr.send(null);
                       
            
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
                var datum = new Date();
                maand = datum.getUTCMonth() + 1;
                dag = datum.getDate();
                jaar = datum.getFullYear();
                uur = datum.getHours();
                min = datum.getMinutes();
                sec = datum.getSeconds();
                $("#type").change
                (
                    function (){
                      if($(this).val()== 1){                    
                        $("#situatieSoortDiv").slideUp(300,
                            function(){
                                $("#datumDiv").slideDown(300,
                                    function() {
                                        
                                        var datumString = dag + "/" + maand + "/" + jaar + " " + uur + ":" + min + ":" + sec
                        $("#datum").attr("value", datumString);
                    }
                                );                            
                            }
                       
                         );
                      }else{
                         $("#datumDiv").slideUp(300, function(){                             
                             $("#situatieSoortDiv").slideDown(300)
                         });
                      }               
                     }
                 );
//------------------------------------------melden knop-----------------------------                     
    $("#meldenBtn").click(function(){
            meldingOpslaan();
        
    });
    function meldingOpslaan(){
        loadTmpMelding();
        var hr= new XMLHttpRequest();
        hr.open("POST","res/meldingen/meldingopslaan",true);  
        hr.setRequestHeader("Content-type","application/json");
         var datum=jaar+"-"+maand+"-"+dag+" "+uur+":"+min+":"+sec
         var titel= $("#titel").val()==""?"geen titel gegeven":$("#titel").val();
         var beschrijving= $("#bechrijving").val()==""?"geen beschrijving gegeven":$("#beschrijving").val(); 
         //beschrijving=beschrijving.value.replace(/^\s*|\s*$/g,'');
         var type=$('#type').find(":selected").val();
         var soort=$('#soort').find(":selected").val();
         var jsonstring='{"latitude":'+tempMelding.latitude+', "longitude":'+tempMelding.longitude+', "accountid":1, "straat":"'+tempMelding.straat+'", "postcode":'+tempMelding.postcode+', "datum":"'+datum+'", "soort":'+soort+', "type":'+type+', "titel":"'+titel+'", "beschrijving":"'+beschrijving+'"}';
         //hr.send();
         //var data= JSON.parse(jsonstring);
        //
        //alert(jsonstring);
        // var data= JSON.parse(jsonstring);
        // alert(JSON.stringify(jsonstring));   
          
         hr.send(jsonstring); 
      }            
    }//end if(navigator.geolocation

 
}) ;
       
	
