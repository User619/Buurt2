/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

           
    
        
$(document).ready(
        
function()
{
    
    function loadTmpMelding() {
        var hr = new XMLHttpRequest();
         hr.open("GET","res/situatie/tmp",true);  //hr.open("GET", "res/situatie/tmp2", true);
        hr.onreadystatechange = function() {
            if (hr.readyState == 4 && hr.status == 200) { 
                tempMelding = JSON.parse(hr.responseText);
              
            }
        }
        hr.send(null);
    }  
    function saveTmpMelding(marker , straat, gemeente, plaats, land) {
        var hr = new XMLHttpRequest();
        hr.open("POST","res/situatie/tmp",true);
        hr.setRequestHeader("Content-type","application/json"); //tempMelding = JSON.parse('{"noorderbreedte":' + marker.getPosition().lat() + ', "oosterlengte2":' + marker.getPosition().lng() + ', "straat":"' + straat + '", "gemeente":"' + gemeente + '"}');
         var jsonstring=
                 '{'+                
                 '"straat":"'+straat+'", '+
                 '"gemeente":"'+gemeente+'", '+
                 '"plaats":"'+plaats+'", '+
                 '"land":"'+land+'", '+
                 '"noorderbreedte":'+marker.getPosition().lat()+', '+
                 '"oosterlengte":'+marker.getPosition().lng()+
                '}';
        hr.send(jsonstring);
   } 
   function laadMeldingen(){
       laadSituaties();
   }
   function laadSituaties(){
        alert("laad situatie controle 1");
       var hr = new XMLHttpRequest();
         hr.open("GET","res/situatie",true);  //hr.open("GET", "res/situatie/tmp2", true);
        hr.onreadystatechange = function() {
            if (hr.readyState == 4 && hr.status == 200) { 
                situaties = JSON.parse(hr.responseText);
                //point = new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
                //alert (new google.maps.LatLng(50.1213, 40.45645));
//                alert(userMarker.getPosition().lat())
                for( var situatie in situaties){
                    //alert(situaties[situatie].titel)
                  placeMarker(new google.maps.LatLng(situaties[situatie].noorderbreedte, situaties[situatie].oosterlengte)); 
                }
                
              
            }
        }
        hr.send(null);
   }
    var straat;
    var gemeente;
    var postcode;
    var plaats;
    var land;
    var datumString;
    var map;
    var mapOptions;
    var point;
    var markerTmp;
    var userMarker;
    var userMakerOpties;
    var infoWindow;
    var infoWindowOptions;
    var tempMelding;
    var maand;
    var dag;
    var jaar;
    var uur;
    var min;
    var sec;
    var situaties;
    
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
                icon:"green-dot.png",
                title:"leme see"
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
            laadMeldingen();
     }//einde hasposition
     navigator.geolocation.getCurrentPosition(hasPosition);
      
         function placeMarker(location) {
            var marker = new google.maps.Marker({
                position: location,
            });
            marker.setMap(map);
            getPlaceNames(marker.getPosition().lat(),marker.getPosition().lng(), marker);
            
        }
        
        function getPlaceNames(lat, lng, marker){
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
                                                       if(data[result][addressComponets][addresArray][someArray][type][type2]=="country"){
                                                           //land
                                                           //alert(JSON.stringify( data[result][addressComponets][addresArray][someArray]));
                                                           //JSON.stringify( data[result][addressComponets][addresArray][someArray].long_name)
                                                           //alert(land);
                                                          land=data[result][addressComponets][addresArray][someArray].long_name;
                                                          
                                                       }
                                                      if(data[result][addressComponets][addresArray][someArray][type][type2]=="administrative_area_level_2"){
                                                           //plaats
                                                           //alert(JSON.stringify( data[result][addressComponets][addresArray][someArray]));
                                                           //JSON.stringify( data[result][addressComponets][addresArray][someArray].long_name)
                                                           //alert(plaats);
                                                          plaats=data[result][addressComponets][addresArray][someArray].long_name;
                                                       }
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
                                  
                                  
                               }//einde result loop
                      
                    var infoWindowOptions = {
                        content: ' ' + straat + '<br>\n\
                             ' + gemeente + '<br>\n\
                             ' + postcode + '<br>\
                            <a href="post.jsp">Melding plaatsen </a><br>'
                    };
                    infoWindow.close();
                    infoWindow = new google.maps.InfoWindow(infoWindowOptions);
                    
                    infoWindow.open(map, marker);
                    google.maps.event.addListener(marker, 'click', function(e) {
                        infoWindow.close();
                        infoWindow = new google.maps.InfoWindow(infoWindowOptions);
                        infoWindow.open(map, marker);

                        saveTmpMelding(marker, straat, gemeente, plaats, land);//tijdelijke info over straat, gemeente...longitute opslaan on server backend 
                        loadTmpMelding();
                    });
                    saveTmpMelding(marker, straat,gemeente, plaats, land);//tijdelijke info over straat, gemeente...longitute opslaan on server backend 
                    loadTmpMelding();
                }//eind if (hr.readyState == 4 && hr.status == 200)
            }  //einde hr.onreadystate                         
            hr.send(null);
        }//einde get place names
    
    
    
    
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
            postOpslaan();
        
    });
    function postOpslaan(){
        loadTmpMelding();
              alert("controlle 1 pass");
        var hr= new XMLHttpRequest();
        hr.open("POST","res/situatie",true);  
        hr.setRequestHeader("Content-type","application/json");
         var datum=jaar+"-"+maand+"-"+dag+" "+uur+":"+min+":"+sec
         var titel= $("#titel").val()==""?"geen titel gegeven":$("#titel").val();
         var inhoud= $("#inhoud").val()==""?"geen beschrijving gegeven":$("#inhoud").val(); 
         //beschrijving=beschrijving.value.replace(/^\s*|\s*$/g,'');
         var type=$('#type').find(":selected").val();
         var soort=$('#soort').find(":selected").text();
         var jsonstring=
                 '{'+
                 '"datum":"'+datum+'", '+                 
                 //'"type":'+type+', '+ //er is geen type in de klas situatie, we weten de type gewoon door de naam van de klas
                 '"soort":"'+soort+'", '+
                 '"titel":"'+titel+'", '+ 
                 '"inhoud":"'+inhoud+'", '+
                 //hier komt de afbelding code
                 '"straat":"'+tempMelding.straat+'", '+
                 '"gemeente":"'+tempMelding.gemeente+'", '+
                 '"plaats":"'+tempMelding.plaats+'", '+
                 '"land":"'+tempMelding.land+'", '+
                 '"noorderbreedte":'+tempMelding.noorderbreedte+', '+
                 '"oosterlengte":'+tempMelding.oosterlengte+', '+
                 '"gebruiker":{"gebruikerID":1}'+
                '}';
         //hr.send();
         //var data= JSON.parse(jsonstring);
        //
//        alert(jsonstring);
//         var data= JSON.parse(jsonstring);
//         alert("controlle 2 pass");
//         alert(JSON.stringify(jsonstring));   
//          
         hr.send(jsonstring); 
      }           
    }//end if(navigator.geolocation

 
}) ;
       
	
