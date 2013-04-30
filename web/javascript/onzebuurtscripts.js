/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */




$(document).ready(
        function()
        {
//            function test() {
//                var hr = new XMLHttpRequest();
//                var stingParam = point.lat() + ':' + point.lng();
//                hr.open("GET", "res/situatie/10km/" + stingParam, true);
//                hr.onreadystatechange = function() {//alert(hr.responseText);
//                    //alert(hr.responseText); 
//                    if (hr.readyState == 4 && hr.status == 200) {
//                        var s = JSON.parse(hr.responseText);
//
//
//
//                    }
//                }
//                hr.send(null);
//                ;
//            }

            $("#datumDiv").hide();
            $("#facebook").click(function() {
                var fb = new window.fbAsyncInit();
                fb.status();
            });
            $("#bevestigKnop").click(function() {
                $.mobile.changePage("#page1", "slideup");
            });
            $("#melden").click(function() {
                meldingOpslaan();
            });
            var gebruiker;
            var type = 0; //melding type -->0 voor situatie 1 voor evenement
            var bdatum, edatum;
            var titel = $("#titel").val() == "" ? "geen titel gegeven" : $("#titel").val();
            var inhoud = $("#inhoud").val() == "" ? "geen beschrijving gegeven" : $("#inhoud").val();
            var soort = 1;
            var jsonstring;

            function meldingOpslaan() {
                var hr = XMLHttpRequest();
                if (type == 0) {
                    hr.open("POST", "res/situatie", true);
                    hr.setRequestHeader("Content-type", "application/json");
                    titel = $("#titel").val() == "" ? "geen titel gegeven" : $("#titel").val();
                    inhoud = $("#inhoud").val() == "" ? "geen beschrijving gegeven" : $("#inhoud").val();
                    jsonstring =
                            '{' +
                            //datum wordt automatisch via sql query gegeven met --> now()
                            //'"type":'+type+', '+ //er is geen type in de klas situatie, we weten de type gewoon door de naam van de klas
                            '"soort":' + soort + ', ' +
                            '"titel":"' + titel + '", ' +
                            '"inhoud":"' + inhoud + '", ' +
                            //hier komt de afbelding code
                            '"straat":"' + straat + '", ' +
                            '"gemeente":"' + gemeente + '", ' +
                            '"plaats":"' + plaats + '", ' +
                            '"land":"' + land + '", ' +
                            '"noorderbreedte":' + markerTmp.getPosition().lat() + ', ' +
                            '"oosterlengte":' + markerTmp.getPosition().lng() + ', ' +
                            '"gebruiker":{"gebruikerID":' + gebruiker.gebruikerID + '}' +
                            '}';
//                    alert(JSON.stringify(JSON.parse(jsonstring)));
                    hr.send(jsonstring);
                    laadSituaties();
                    laadEvenementen();
                }
                if (type == 1) {
                    //alert(jsonstring + "Melding Opgeslaan");
                    hr.open("POST", "res/evenement", true);
                    hr.setRequestHeader("Content-type", "application/json");

                    bdatum = $("#beginDatum").val();
                    edatum = $("#eindDatum").val();
//                    alert(bdatum + edatum);
                    titel = $("#titel").val() == "" ? "geen titel gegeven" : $("#titel").val();
                    inhoud = $("#inhoud").val() == "" ? "geen beschrijving gegeven" : $("#inhoud").val();

                    jsonstring =
                            '{' +
                            '"titel":"' + titel + '", ' +
                            '"inhoud":"' + inhoud + '", ' +
                            //hier komt de afbelding code
                            '"straat":"' + straat + '", ' +
                            '"gemeente":"' + gemeente + '", ' +
                            '"plaats":"' + plaats + '", ' +
                            '"land":"' + land + '", ' +
                            '"noorderbreedte":' + markerTmp.getPosition().lat() + ', ' +
                            '"oosterlengte":' + markerTmp.getPosition().lng() + ', ' +
                            '"beginDatum":"' + bdatum + '", ' +
                            '"eindDatum":"' + edatum + '", ' +
                            '"gebruiker":{"gebruikerID":' + gebruiker.gebruikerID + '}' +
                            '}';
                    hr.send(jsonstring);
                    laadSituaties();
                    laadEvenementen();


                }
    }//eind melding opslaan
//            Soort Meldingen
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

                var opties = '';
                var eersteSelect = true;
                for (var soortmelding in data) {
                    //$("#select-choice-1").append("lqjsmf");
                    if (eersteSelect) {
                        opties += "<option value=" + data[soortmelding].id + " selected >" + data[soortmelding].naam + " </option>";
                        eersteSelect = false;
                    } else {
                        opties += "<option value=" + data[soortmelding].id + ">" + data[soortmelding].naam + " </option>";
                    }
                    //alert(data[soortmelding].naam );
                }
                $("#situatieSoort").append(opties).selectmenu('refresh', true);
            }
        }
        hr.send(null);
    }
    function typeMeldingAnimatie(callback) {
        $("#situatieSoort").change(function() {
            $("#situatieSoort option:selected").each(function() {
                soort = $(this).val();
            });

        });
        $("#meldingType").change(function() {
            //alert( $("#meldingType option:selected").val());
            $("#meldingType option:selected").each(function() {

                type = $(this).val();
                // $(this).attr('selected', true);
                //alert(type);
                if ($(this).val() == 0) {
                    $("#melding").slideUp(150).next(
                            $("#datumDiv").slideUp(150).next(
                            $("#situatieSoortDiv").slideDown(100).next(
                            $("#melding").slideDown(200))));
                } else if ($(this).val() == 1) {
                    $("#melding").slideUp(150).next(
                            $("#situatieSoortDiv").slideUp(150).next(
                            $("#datumDiv").slideDown(100).next(
                            $("#melding").slideDown(200))));


                }
            });
        });
    }
    function laadMeldingen() {
        laadGebruiker();
        laadSituaties();
        laadEvenementen();
    }

    function laadGebruiker() {
        var hr = new XMLHttpRequest();
        hr.open("GET", "res/gebruikers/tmpGebruiker", true);

        hr.onreadystatechange = function() {
//            alert("laad gebruiker"+hr.responseText); 
            if (hr.readyState == 4 && hr.status == 200) {
                gebruiker = JSON.parse(hr.responseText);
//                        alert(hr.responseText+"Temp gebruiker");
                if (gebruiker.gebruikerID == 0) {
                    $.mobile.changePage("#login", "slideup");
                } else {
//                         alert("Welkom " + gebruiker.gebruikersnaam);
                    var beheerder = gebruiker.beheerder == 9999 ? 'Nee' : 'Ja';
                    var lijst = '<table> \n\
                                           <tr><td>Gebruikersnaam</td><td>' + gebruiker.gebruikersnaam + '</td></tr>\n\
                                            <tr><td>Naam</td><td>' + gebruiker.naam + '</td></tr>\n\
                                            <tr><td>Voornaam</td><td>' + gebruiker.voornaam + '</td></tr>\n\
                                            <tr><td>E-mail</td><td>' + gebruiker.email + '</td></tr>\n\
                                            <tr><td>Beheerder</td><td>' + beheerder + '</td></tr></table>';
                    $("#gegevensContentDivs").html(lijst).append('<a  data-role="button" href="#page1"  data-prefetch data-rel="dialog" data-transition="pop" >Wijzigen</a>');
                }

            }
        }
        hr.send(null);
    }
    function laadSituaties() {
        //alert("laad situatie controle 1");
        var hr = new XMLHttpRequest();
        hr.open("GET", "res/situatie", true);  //hr.open("GET", "res/situatie/tmp2", true);
        hr.onreadystatechange = function() {
            //alert(hr.responseText);
            if (hr.readyState == 4 && hr.status == 200) {
                situaties = JSON.parse(hr.responseText);
                for (var situatie in situaties) {
                    //alert(situaties[situatie].titel)                    
                    maakInfoSchermEnMarker(situaties[situatie]);
                }
            }
        }
        hr.send(null);
    }//laadSituaties
    function maakInfoSchermEnMarker(situatie) {

        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(situatie.noorderbreedte, situatie.oosterlengte),
            icon: "images/warning.png",
        });
        marker.setMap(map);

        var infoWindowOptions = {
            content: ' <strong>' + situatie.titel + '</strong><br>\n\
                                 <a  href="#meldinginfo.html">Meer over</a><br>\
                                 <a href="reactie.html">Reageer</a><br>'

        };
        google.maps.event.addListener(marker, 'click', function(e) {

            infoWindow.close();
            infoWindow = new google.maps.InfoWindow(infoWindowOptions);
            infoWindow.open(map, marker);




        });//alert(situaties.noorderbreedte);


    }
    function laadEvenementen() {
        //alert("laad situatie controle 1");
        var hr = new XMLHttpRequest();
        hr.open("GET", "res/evenement", true);  //hr.open("GET", "res/situatie/tmp2", true);
        hr.onreadystatechange = function() {
            //alert(hr.responseText);
            if (hr.readyState == 4 && hr.status == 200) {
                evenementen = JSON.parse(hr.responseText);
                for (var evenement in evenementen) {
                    //alert(situaties[situatie].titel)                    
                    maakInfoSchermEnMarkerEvenement(evenementen[evenement]);
                }


            }
        }
        hr.send(null);
    }
    function maakInfoSchermEnMarkerEvenement(evenement) {

        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(evenement.noorderbreedte, evenement.oosterlengte),
            icon: "images/event.png",
        });
        marker.setMap(map);

        var infoWindowOptions = {
            content: ' <strong>' + evenement.titel + '</strong><br>\n\
                                 <a  href="meldinginfo.html">Meer over</a><br>\
                                 <a href="reactie.html">Reageer</a><br>'

        };
        google.maps.event.addListener(marker, 'click', function(e) {
            infoWindow.close();
            infoWindow = new google.maps.InfoWindow(infoWindowOptions);
            infoWindow.open(map, marker);

        });//alert(situaties.noorderbreedte);


    }

    var straat = '';
    var gemeente = '';
    var postcode = '';
    var plaats = '';
    var land = '';
    var map;
    var point;
    var markerTmp;
    var userMarker;
    var infoWindow;

    var situaties;
    var evenementen;

    if (navigator.geolocation) {
        function hasPosition(position) {
            point = new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
            mapOptions = {
                center: point,
                zoom: 17,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            map = new google.maps.Map(document.getElementById('map'), mapOptions);
            userMakerOpties = {
                position: point,
                icon: "images/green-dot.png",
            };
            userMarker = new google.maps.Marker(userMakerOpties);
            userMarker.setMap(map);
            infoWindowOptions = {
                content: 'Je Bent Hier<br>\n\
                           <a href="#melding"  >Melding plaatsen </a><br>'
            };
            infoWindow = new google.maps.InfoWindow(infoWindowOptions);
            google.maps.event.addListener(userMarker, 'click', function(e) {
                placeMarker(e.latLng, true);
            });
            google.maps.event.addListener(map, 'click', function(event) {
                if (markerTmp) {
                    markerTmp.setMap(null);
                }
                placeMarker(event.latLng, true);
            });
            laadMeldingen();
            soortMelingenLaden();
            typeMeldingAnimatie();
            test();
        }//einde hasposition
        navigator.geolocation.getCurrentPosition(hasPosition);

        function placeMarker(location, isNewMarker) {
            var marker = new google.maps.Marker({
                position: location,
            });
            marker.setMap(map);
            markerTmp = marker;
            getPlaceNames(marker.getPosition().lat(), marker.getPosition().lng(), marker, isNewMarker);
        }

        function getPlaceNames(lat, lng, marker, isNewMarker) {
            var hr = new XMLHttpRequest();
            hr.open("GET",
                    "http://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lng + "&sensor=false"
                    , true);
            hr.onreadystatechange = function() {

                if (hr.readyState == 4 && hr.status == 200) {
                    var data = JSON.parse(hr.responseText);
                    for (var result in data) {
                        for (var addressComponets in data[result])
                            for (var addresArray in data[result][addressComponets])
                                for (var someArray in data[result][addressComponets][addresArray]) {
                                    //alert(JSON.stringify( data[result][addressComponets][addresArray][someArray]));
                                    for (var type in data[result][addressComponets][addresArray][someArray]) {

                                        for (var type2 in data[result][addressComponets][addresArray][someArray][type]) {
                                            if (data[result][addressComponets][addresArray][someArray][type][type2] == "country") {
                                                //land
                                                //alert(JSON.stringify( data[result][addressComponets][addresArray][someArray]));
                                                //JSON.stringify( data[result][addressComponets][addresArray][someArray].long_name)
                                                //alert(land);
                                                land = data[result][addressComponets][addresArray][someArray].long_name;

                                            }
                                            if (data[result][addressComponets][addresArray][someArray][type][type2] == "administrative_area_level_2") {
                                                //plaats
                                                //alert(JSON.stringify( data[result][addressComponets][addresArray][someArray]));
                                                //JSON.stringify( data[result][addressComponets][addresArray][someArray].long_name)
                                                //alert(plaats);
                                                plaats = data[result][addressComponets][addresArray][someArray].long_name;
                                            }
                                            if (data[result][addressComponets][addresArray][someArray][type] == "postal_code") {
                                                //postcoe
                                                //alert(JSON.stringify( data[result][addressComponets][addresArray][someArray]));
                                                //JSON.stringify( data[result][addressComponets][addresArray][someArray].long_name)
                                                postcode = data[result][addressComponets][addresArray][someArray].long_name;
                                                //alert(postcode);
                                            }
                                            if (data[result][addressComponets][addresArray][someArray][type][type2] == "locality") {
                                                //gemeente naam
                                                //alert(JSON.stringify( data[result][addressComponets][addresArray][someArray]));
                                                //JSON.stringify( data[result][addressComponets][addresArray][someArray].long_name)
                                                //alert(JSON.stringify( data[result][addressComponets][addresArray][someArray]));
                                                gemeente = data[result][addressComponets][addresArray][someArray].long_name;

                                            }
                                            if (data[result][addressComponets][addresArray][someArray][type][type2] == "route") {
                                                //straat naam
                                                //alert(JSON.stringify( data[result][addressComponets][addresArray][someArray]));
                                                //JSON.stringify( data[result][addressComponets][addresArray][someArray].long_name)
                                                // alert(JSON.stringify( data[result][addressComponets][addresArray][someArray]));
                                                straat = data[result][addressComponets][addresArray][someArray].long_name;
                                            }

                                        }//straat naam loop
                                    }//geemeente loop
                                }//


                    }//einde result loop
                    $(".situatie").click(function() {
                        alert("mqlsjdfjsf");
                    });
                    var infoWindowOptions = {
                        content: ' ' + straat + '<br>\n\
                             ' + gemeente + '<br>\n\
                             ' + postcode + '<br>\
                            <div><a data-rel="popup" href="#situatie">Melden</a><br></div> ',
                        enableEventPropagation: true

                    };
                    $("#situatie").click(function() {
                        marker.setMap(null);
                    });
                    if (isNewMarker) {
                        infoWindow.close();
                        infoWindow = new google.maps.InfoWindow(infoWindowOptions);
                        infoWindow.open(map, marker);

                        //tijdelijke info over straat, gemeente...longitute opslaan on server backend 
                        //loadTmpMelding();
                    }
                    google.maps.event.addListener(marker, 'click', function(e) {
                        infoWindow.close();
                        infoWindow = new google.maps.InfoWindow(infoWindowOptions);
                        infoWindow.open(map, marker);

                    });

                }//eind if (hr.readyState == 4 && hr.status == 200)
            }  //einde hr.onreadystate                         
            hr.send(null);
        }//einde get place names
    } else {
        laadGebruiker();
    }//end if(navigator.geolocation


});


