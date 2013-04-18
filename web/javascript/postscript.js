
//----------------------meldingen script------------------------------------    
//----------------------situaties halen -------------------------
$(document).ready(
        function() {

            var tempMelding;
            var type=0; //melding type -->0 voor situatie 1 voor evenement
            var maand;
            var dag;
            var jaar;
            var uur;
            var min;
            var sec;
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
                        if (tel < 1) {
                            var oneven=1;
                            for (var soortmelding in data) {
                                if(oneven%2!=0){
                                     $("#drodownListDiv").append("<div class='itemDiv' key='" + data[soortmelding].id + "'>" + data[soortmelding].naam + "</div>");
                                      $(".itemDiv").click(function (){                                    
                                    $("#selectedSituatie").attr("value",""+$(this).text()+"").attr(("key",""+$(this).key+""));
                                     $("#drodownListDiv").slideUp();
                                });
                                }else{
                                     $("#drodownListDiv").append("<div class='itemDiv2' key='" + data[soortmelding].id + "'>" + data[soortmelding].naam + "</div>");
                                      $(".itemDiv2").click(function (){                                    
                                    $("#selectedSituatie").attr("value",""+$(this).text()+"").attr(("key",""+$(this).key+""));
                                     $("#drodownListDiv").slideUp();
                                });
                                }
                                oneven++;
                                
                               
                                //alert(data[soortmelding].naam );
                            }
                             $("#drodownListDiv").hide();
                        }
                        tel++;

                    }
                }

                hr.send(null);

            }
            ;


            $("#datumDiv").hide();
            var datum = new Date();
            maand = datum.getUTCMonth() + 1;
            dag = datum.getDate();
            jaar = datum.getFullYear();
            uur = datum.getHours();
            min = datum.getMinutes();
            sec = datum.getSeconds();

            $("#meldenBtn").click(function() {
//               alert( tempMelding.straat);
                postOpslaan();
            });
            function postOpslaan() {
//              loadTmpMelding();
//                alert("controlle 1 pass"); 
             var hr = new XMLHttpRequest();
             
if(type==0 ){ 
     hr.open("POST", "res/situatie", true); hr.setRequestHeader("Content-type", "application/json") ;
     
      datum = jaar + "-" + maand + "-" + dag + " " + uur + ":" + min + ":" + sec;
      titel = $("#titel").val() == "" ? "geen titel gegeven" : $("#titel").val(); 
     inhoud = $("#inhoud").val() == "" ? "geen beschrijving gegeven" : $("#inhoud").val();
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
                        '"gebruiker":{"gebruikerID":'+tempMelding.gebruiker.gebruikerID+'}' +
                        '}';
    
        hr.send(jsonstring);
        alert(jsonstring+"Melding Opgeslaan"); 
    }
if(type==1){
    hr.open("POST", "res/evenement", true);
    hr.setRequestHeader("Content-type", "application/json") ;
     
//    alert($("#bdatum").val());
     datum = jaar + "-" + maand + "-" + dag + " " + uur + ":" + min + ":" + sec;
//    alert(tempMelding.straat );
//     alert(datum);
     bdatum=$("#bdatum").val();
     edatum=$("#edatum").val();
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
                        '"plaats":"' +tempMelding.plaats +'", ' +
                        '"land":"' + tempMelding.land +'", ' +
                        '"noorderbreedte":' + tempMelding.noorderbreedte + ', ' +
                        '"oosterlengte":' + tempMelding.oosterlengte + ', ' +
                        '"beginDatum":"' + bdatum + '", ' +
                        '"eindDatum":"' + edatum + '", ' +
                        '"gebruiker":{"gebruikerID":'+tempMelding.gebruiker.gebruikerID+'}' +
                        
                        '}';
                 hr.send(jsonstring);
                // alert(jsonstring);
                 alert("Melding Opgeslaan"); 
               
}  
            }
             
                var datum = jaar + "-" + maand + "-" + dag + " " + uur + ":" + min + ":" + sec;
                var bdatum,edatum;
                var titel = $("#titel").val() == "" ? "geen titel gegeven" : $("#titel").val();
                var inhoud = $("#inhoud").val() == "" ? "geen beschrijving gegeven" : $("#inhoud").val();
                //beschrijving=beschrijving.value.replace(/^\s*|\s*$/g,'');
                //var type = type;
                var soort = $("#selectedSituatie").attr("key");
//                alert("controlle 2 pass");
                var jsonstring ;
//        alert(jsonstring);
//         var data= JSON.parse(jsonstring);
//         alert("controlle 2 pass");
//         alert(JSON.stringify(jsonstring));   
//        
//                hr.send(jsonstring);
//                alert("controlle 3 pass");
       
    function typeMeldingAnimatie(callback) {
        $("#leftArrow,#rightArrow").mousedown(function() {
            $(this).addClass("mousedown")
        });
        $("#leftArrow,#rightArrow").mouseup(function() {
            $(this).addClass("typeMeldingSelected")
        });

        $("#leftArrow,#rightArrow").click
                (
                        function() {
                            if ($(this).attr("id") == "rightArrow") {
                                $("#situatieSoortDiv").slideUp(300,
                                        function() {
                                            $("#datumDiv").slideDown(300,
                                                    function() {
                                                        var datumString = dag + "-" + maand + "-" + jaar + " " + uur + ":" + min 
                                                        $("#bdatum").attr("value", datumString);
                                                        $("#edatum").attr("value", datumString);
                                                        $("#leftArrow").removeClass();

                                                        type = 1;

                                                    }
                                            ),
                                                    $("#meldingDiv").text("Evenement")

                                        }

                                );
                            } else {
                                $("#datumDiv").slideUp(300, function() {
                                    $("#situatieSoortDiv").slideDown(300)
                                    $("#rightArrow").removeClass();
                                    type = 0;
                                }), $("#meldingDiv").text("Situatie")

                            }
                        }
                );

    }
    function dropdownDiv(){
        $("#selectedSituatie").click(function (){
          
            $("#drodownListDiv").css({
                top:$("#selectedSituatie").offset().top+$("#selectedSituatie").offset().height +'px',
                left:$("#selectedSituatie").offset().left+'px',
                width:$("#selectedSituatie").offset().width+'px'});
                
          $("#drodownListDiv").slideToggle()
        })
    }

            function loadTmpMelding(callbackmethode) {
                var hr = new XMLHttpRequest();
                hr.open("GET", "res/situatie/tmp", true);  //hr.open("GET", "res/situatie/tmp2", true);
                hr.send(null);
                hr.onreadystatechange = function() {
                    if (hr.readyState == 4 && hr.status == 200) {
                        tempMelding = JSON.parse(hr.responseText); 
                    }
                   
                }
                hr.send(null);        
            }
            ;
            loadTmpMelding(typeMeldingAnimatie(soortMelingenLaden(), dropdownDiv()));
//-----------------------------------------------------------------------------------------------------------------------------------
           


        });//eind documnet

        