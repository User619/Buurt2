
//----------------------meldingen script------------------------------------    
//----------------------situaties halen -------------------------
$(document).ready(
        function() {

            var tempMelding;
            var type = 0; //melding type -->0 voor situatie 1 voor evenement
            var maand;
            var dag;
            var jaar;
            var uur;
            var min;
            var sec;
           


            $("#datumDiv").hide();
            var datum = new Date();
            maand = datum.getUTCMonth() + 1;
            dag = datum.getDate();
            jaar = datum.getFullYear();
            uur = datum.getHours();
            min = datum.getMinutes();
            sec = datum.getSeconds();

            $("#melden").click(function() {
//               alert( tempMelding.straat);
          
loadTmpMelding(postOpslaan() );;
               
            });
            function postOpslaan() {
//              loadTmpMelding();
               
                var hr = new XMLHttpRequest();

                if (type == 0) { 
                   
                    hr.open("POST", "res/situatie", true);
                    hr.setRequestHeader("Content-type", "application/json");

                    datum = jaar + "-" + maand + "-" + dag + " " + uur + ":" + min + ":" + sec; 
                    titel = $("#titel").val() == "" ? "geen titel gegeven" : $("#titel").val();
                    inhoud = $("#inhoud").val() == "" ? "geen beschrijving gegeven" : $("#inhoud").val();alert("controlle 1 pass");   alert(tempMelding.noorderbreedte);
                    jsonstring =
                            '{' +
                            '"datum":"' + datum + '", ' +
                            //'"type":'+type+', '+ //er is geen type in de klas situatie, we weten de type gewoon door de naam van de klas
                            '"soort":' + soort + ', ' +
                            '"titel":"' + titel + '", ' +
                            '"inhoud":"' + inhoud + '", ' +
                            //hier komt de afbelding code
                            '"straat":"' + tempMelding.straat + '", ' +
                            '"gemeente":"' + tempMelding.gemeente + '", ' +
                            '"plaats":"' + tempMelding.plaats + '", ' +
                            '"land":"' + tempMelding.land + '", ' +
                            '"noorderbreedte":' + tempMelding.noorderbreedte + ', ' +
                            '"oosterlengte":' + tempMelding.oosterlengte + ', ' +
                            '"gebruiker":{"gebruikerID":' + tempMelding.gebruiker.gebruikerID + '}' +
                            '}';
                  
                    hr.send(jsonstring);
                    
                   var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(tempMelding.noorderbreedte, tempMelding.oosterlengte),
                    icon: "images/warning.png",
                });
                marker.setMap(map);
                
                var infoWindowOptions = {
                    content: ' <strong>' + titel + '</strong><br>\n\
                                 <a  href="#meldinginfo.html">Meer over</a><br>\
                                 <a href="reactie.html">Reageer</a><br>'

                };
                google.maps.event.addListener(marker, 'click', function(e) {
                    
                    infoWindow.close();
                    infoWindow = new google.maps.InfoWindow(infoWindowOptions);
                    infoWindow.open(map, marker);
                      
                
                    

                });//alert(situaties.noorderbreedte);
                }
                if (type == 1) {
                    //alert(jsonstring + "Melding Opgeslaan");
                    hr.open("POST", "res/evenement", true);
                    hr.setRequestHeader("Content-type", "application/json");

//    alert($("#bdatum").val());
                    datum = jaar + "-" + maand + "-" + dag + " " + uur + ":" + min + ":" + sec;
//    alert(tempMelding.straat );
//     alert(datum);
                    bdatum = $("#beginDatum").val();
                    edatum = $("#eindDatum").val();
//                    alert(bdatum + edatum);
                    titel = $("#titel").val() == "" ? "geen titel gegeven" : $("#titel").val();
                    inhoud = $("#inhoud").val() == "" ? "geen beschrijving gegeven" : $("#inhoud").val();

                    jsonstring =
                            '{' +
                            '"datum":"' + datum + '", ' +
                            //'"type":'+type+', '+ //er is geen type in de klas situatie, we weten de type gewoon door de naam van de klas
//                        '"soort":' + soort + ', ' +
                            '"titel":"' + titel + '", ' +
                            '"inhoud":"' + inhoud + '", ' +
                            //hier komt de afbelding code
                            '"straat":"' + tempMelding.straat + '", ' +
                            '"gemeente":"' + tempMelding.gemeente + '", ' +
                            '"plaats":"' + tempMelding.plaats + '", ' +
                            '"land":"' + tempMelding.land + '", ' +
                            '"noorderbreedte":' + tempMelding.noorderbreedte + ', ' +
                            '"oosterlengte":' + tempMelding.oosterlengte + ', ' +
                            '"beginDatum":"' + bdatum + '", ' +
                            '"eindDatum":"' + edatum + '", ' +
                            '"gebruiker":{"gebruikerID":' + tempMelding.gebruiker.gebruikerID + '}' +
                            '}';alert(jsonstring);
                    hr.send(jsonstring);
                  
                    alert("Melding Opgeslaan");

                }
    }

    var datum = jaar + "-" + maand + "-" + dag + " " + uur + ":" + min + ":" + sec;
    var bdatum, edatum;
    var titel = $("#titel").val() == "" ? "geen titel gegeven" : $("#titel").val();
    var inhoud = $("#inhoud").val() == "" ? "geen beschrijving gegeven" : $("#inhoud").val();
    //beschrijving=beschrijving.value.replace(/^\s*|\s*$/g,'');
    //var type = type;
  var soort = 1;
//                alert("controlle 2 pass");
    var jsonstring;
//        alert(jsonstring);
//         var data= JSON.parse(jsonstring);
//         alert("controlle 2 pass");
//         alert(JSON.stringify(jsonstring));   
//        
//                hr.send(jsonstring);
//                alert("controlle 3 pass");
  function soortMelingenLaden() {

                var hr = new XMLHttpRequest();
                hr.open("GET", "res/situatie/soortMeldingen/", true);
                var data;
                var tel = 0;//zo dat hij geen twee keer de lijst maakt
                hr.onreadystatechange = function() {
                    //alert("soort")
                    if (hr.readyState == 4 && hr.status == 200) {
                        //alert(hr.responseText);
                        data = JSON.parse(hr.responseText);
                       
                           var opties='';
                           var eersteSelect=true;
                            for (var soortmelding in data) {
                                //$("#select-choice-1").append("lqjsmf");
                                if(eersteSelect){
                                     opties+="<option value=" +data[soortmelding].id + " selected >" + data[soortmelding].naam + " </option>"; 
                                     eersteSelect=false;
                                }else{
                                   opties+="<option value=" +data[soortmelding].id + ">" + data[soortmelding].naam + " </option>"; 
                                }
                               
                                //alert(data[soortmelding].naam );
                            }
                            $("#situatieSoort").append(opties).selectmenu('refresh', true);
                        } 
                    }
                hr.send(null);
                
            }

    function loadTmpMelding(callbackmethode) {
        var hr = new XMLHttpRequest();
        hr.open("GET", "res/situatie/tmp", true);  //hr.open("GET", "res/situatie/tmp2", true);
        hr.send(null);
        hr.onreadystatechange = function() {alert(JSON.stringify(hr.responseText));
            if (hr.readyState == 4 && hr.status == 200) {
                tempMelding = JSON.parse(hr.responseText);
                
            }
        }
        hr.send(null);
    }
    ;
    loadTmpMelding(typeMeldingAnimatie(soortMelingenLaden()));
//-----------------------------------------------------------------------------------------------------------------------------------



});//eind documnet

        