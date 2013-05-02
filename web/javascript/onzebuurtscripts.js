/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */




$(document).ready(
        function()
        {
            window.fbAsyncInit = function() {


                // init the FB JS SDK
                FB.init({
                    appId: '236439906495493', // App ID from the app dashboard
                    channelUrl: '//localhost:8080/onzebuurt/login.html', // Channel file for x-domain comms
                    status: true, // Check Facebook Login status
                    xfbml: true                                  // Look for social plugins on the page
                });
            }

            function facebook() {
                FB.getLoginStatus(function(response) {
                    if (response.status === 'connected') {
//                        alert("authenticated25");

                        FB.api('/me', function(response) {
                            //alert(JSON.stringify(response));
                            var hr = new XMLHttpRequest();
                            hr.open("POST", "res/gebruikers/gebruiker", true);
                            hr.setRequestHeader("Content-type", "application/json");
                            var jsonstring = '{"facebookID":' + response.id + '}';
                            hr.onreadystatechange = function() {

                                if (hr.readyState == 4 && hr.status == 200) { // alert("dsfgsg"+hr.responseText);
                                    gebruiker = JSON.parse(hr.responseText);
                                    if (gebruiker.gebruikerID == 0) {
                                        var hr2 = new XMLHttpRequest();
                                        hr2.open("POST", "res/gebruikers/newgebruiker", true);
                                        hr2.setRequestHeader("Content-type", "application/json");
                                        jsonstring = '{"facebookID":"' + response.id + '", "gebruikersnaam":"' + response.name + '", "naam":"' + response.last_name + '", "voornaam":"' + response.first_name + '"}';
                                        hr2.send(jsonstring);
                                        // alert(JSON.stringify(JSON.parse(jsonstring) )+ "ok");
                                        $.mobile.changePage("#page1", "slideup");
                                    } else {


                                        var lijst = '<table> \n\
                                           <tr><td>Gebruikersnaam</td><td>' + gebruiker.gebruikersnaam + '</td></tr>\n\
                                            <tr><td>Naam</td><td>' + gebruiker.naam + '</td></tr>\n\
                                            <tr><td>Voornaam</td><td>' + gebruiker.voornaam + '</td></tr>\n\
                                            <tr><td>E-mail</td><td>' + gebruiker.email + '</td></tr></table>'
                                        var posts = gebruiker.mijnPosts;
                                        var postString="";
                                        for (var post in posts) {
                                            var datum = new Date(posts[post].datum);
                                            var datumFormat = datum.getDate() + "-" + datum.getMonth() + "-" + datum.getFullYear() + " " + datum.getHours() + ":" + datum.getMinutes()
                                            postString += ' <li data-role="list-divider" role="heading">Mijn posts</li><li><a href="#page1" data-transition="slide" data-icon="false">' + posts[post].titel + '</a><span class="ui-li-aside">' + datumFormat + '</span> </li>'
                                        }
                                        $("#wnaam").val(gebruiker.naam);
                                        $("#wvoornaam").val(gebruiker.voornaam);
                                        $("#wgebruikdernaam").val(gebruiker.gebruikersnaam);

                                        $("#bevestigKnop").click(function() {
                                           $("#page1").trigger("pagecreate");
//                                          $("input[type='checkbox']").attr("checked",true).checkboxradio("refresh");
                                        });

                                        $("#gegevensContentDivs").html(lijst).append('<a  data-role="button" href="#gevevenswijzigen"  data-prefetch data-rel="dialog" data-transition="pop" >Wijzigen</a>');
                                        $("#mijnmeldingenLijst").append(postString).listview('refresh');
                                        var filters = gebruiker.filters;

                                        filters.situaties == 0 ? $("#ssituatiesKeuze").attr("checked", false).checkboxradio("refresh") :
                                                $("#ssituatiesKeuze").attr("checked", true).checkboxradio("refresh");
                                        filters.evenementen == 0 ? $("#sevenementenKeuze").attr("checked", false).checkboxradio("refresh") :
                                                $("#ssituatiesKeuze").attr("checked", true).checkboxradio("refresh");
                                        filters.goedgekeurdSituaties == 0 ? $("#gsituatiesKeuze").attr("checked", false).checkboxradio("refresh") :
                                                $("#gsituatiesKeuze").attr("checked", true).checkboxradio("refresh");
                                        filters.goedgekeurdEvenementen == 0 ? $("#gevenementenKeuze").attr("checked", false).checkboxradio("refresh") :
                                                $("#gevenementenKeuze").attr("checked", true).checkboxradio("refresh");
                                        if (filters.km == 0) {
                                            $("#km5").attr("checked", true).checkboxradio("refresh");
                                        }
                                        if (filters.km == 1) {
                                            $("#km10").attr("checked", true).checkboxradio("refresh");
                                        }
                                        if (filters.km == 2) {
                                            $("#km20").attr("checked", true).checkboxradio("refresh");
                                        }

                                    }

                                }
                            }
                            hr.send(jsonstring);
                        });
                    } else if (response.status === 'not_authorized') {
                        $.mobile.changePage("#login", "slideup");
                    } else {
                        $.mobile.changePage("#login", "slideup");
                    }
                });
            }
            function login() {
                FB.login(function(response) {
                    if (response.authResponse) {
                        facebook();
                        $.mobile.changePage("#page1", "slideup");
                    } else { // cancelled  
                        alert("cancelled")
//                           $.mobile.changePage("#login", "slideup");

                    }
                });
            }
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
                login();
            });
            $("#loginKnop").click(function() {

            });
            $("#wopslaanKnop").click(function() {
                gebruikerWijzigingenOpslaan();
            });
            $("#registreerKnop").click(function() {
                gebruikerInfoOpslaan();
            });
            $("#loginKnop").click(function() {
                $.mobile.changePage("#aanmelden", {
                    transition: "pop", role: "dialog"});
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
            var titel = $("#titelInput").val() == "" ? "geen titel gegeven" : $("#titelInput").val();
            var inhoud = $("#inhoudInput").val() == "" ? "geen beschrijving gegeven" : $("#inhoud").val();
            var soort = 1;
            var jsonstring;
            var meerinfoString;
            function aanmelden() {

            }
            function gebruikerWijzigingenOpslaan() {


                gebruiker.gebruikersnaam = $("#wgebruikdernaam").val();
                gebruiker.naam = $("#wnaam").val();
                gebruiker.voornaam = $("#wvoornaam").val();
                gebruiker.wachtwoord = $("#wnewwachtwoord1").val();
                var hr = new XMLHttpRequest();
                hr.open("POST", "res/gebruikers/updategebruiker", true);
                hr.setRequestHeader("Content-type", "application/json");

                hr.send(JSON.stringify(gebruiker));
//                $.mobile.changePage("#page1","slideLeft");
               $("#page1").trigger('pagecreate');
            }
            function gebruikerInfoOpslaan() {
                var hr = new XMLHttpRequest();
                hr.open("POST", "res/gebruikers/newgebruiker", true);
                hr.setRequestHeader("Content-type", "application/json");
                var gebNaam = $('#tgebruikersnaam').val();
                var naam = $('#tnaam').val();
                var voornaam = $('#tvoornaam').val();
                var email = $('#temail').val();
                jsonstring = '{"gebruikersnaam":"' + gebNaam + '", "naam":"' + naam + '", "voornaam":"' + voornaam + '", "email":"' + email + '"}';
//                alert(JSON.stringify(JSON.parse(jsonstring)));
                hr.onreadystatechange = function() {
                    //alert(hr.responseText);
                    if (hr.readyState == 4 && hr.status == 200) {
                        gebruiker = JSON.parse(hr.responseText);
                        if (gebruiker.gebruikerID == 0) {
                            $.mobile.changePage("#page1", "slideup");
                        } else {
                            alert("JSON.stringify(gebruiker.mijnPosts)");
//                             alert(gebruiker.gebruikersnaam);
                            var gebruikerInfo = '<table> \n\
                                           <tr><td>Gebruikersnaam</td><td>' + gebruiker.gebruikersnaam + '</td></tr>\n\
                                            <tr><td>Naam</td><td>' + gebruiker.naam + '</td></tr>\n\
                                            <tr><td>Voornaam</td><td>' + gebruiker.voornaam + '</td></tr>\n\
                                            <tr><td>E-mail</td><td>' + gebruiker.email + '</td></tr></table>'


                            $("#gegevensContentDivs").html(gebruikerInfo).append('<a  data-role="button" href="#page1"  data-prefetch data-rel="page" data-transition="pop" >Wijzigen</a>');
                            $.mobile.changePage("#page1", "slideup");
                        }
                    }
                }


                hr.send(jsonstring);
            }
            function meldingOpslaan() {
                var hr = new XMLHttpRequest();
                if (type == 0) {
                    hr.open("POST", "res/situatie", true);
                    hr.setRequestHeader("Content-type", "application/json");
                    titel = $("#titelInput").val() == "" ? "geen titel gegeven" : $("#titelInput").val();
                    inhoud = $("#inhoudInput").val() == "" ? "geen beschrijving gegeven" : $("#inhoudInput").val();
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
                    titel = $("#titelInput").val() == "" ? "geen titel gegeven" : $("#titelInput").val();
                    inhoud = $("#inhoudInput").val() == "" ? "geen beschrijving gegeven" : $("#inhoudInput").val();
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
        var tel = 0; //zo dat hij geen twee keer de lijst maakt
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
//        laadGebruiker();
        facebook();
        laadSituaties();
        laadEvenementen();
    }

    function setCookie(c_name, value, exdays)
    {
        var exdate = new Date();
        exdate.setDate(exdate.getDate() + exdays);
        var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
        document.cookie = c_name + "=" + c_value;
    }
    function getCookie(c_name)
    {
        var c_value = document.cookie;
        var c_start = c_value.indexOf(" " + c_name + "=");
        if (c_start == -1)
        {
            c_start = c_value.indexOf(c_name + "=");
        }
        if (c_start == -1)
        {
            c_value = null;
        }
        else
        {
            c_start = c_value.indexOf("=", c_start) + 1;
            var c_end = c_value.indexOf(";", c_start);
            if (c_end == -1)
            {
                c_end = c_value.length;
            }
            c_value = unescape(c_value.substring(c_start, c_end));
        }
        return c_value;
    }
    function checkCookie(c_name)
    {
        var user = getCookie(c_name);
        if (user != null && user != "")
        {
        }
        else
        {
//            alert("facebook");
        }
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
                    var lijst = '<table  data-role="table" data-mode="reflow"> \n\
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
        hr.open("GET", "res/situatie", true); //hr.open("GET", "res/situatie/tmp2", true);
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
                                 <a  data-role="button" href="#meldinginfo"  data-prefetch data-rel="dialog" data-transition="pop" > Meer over</a><br>\
                                 <a href="reactie.html">Reageer</a><br>'

        };
        google.maps.event.addListener(marker, 'click', function(e) {
            var datum = new Date(situatie.datum);
            var datumFormat = datum.getDate() + "-" + datum.getMonth() + "-" + datum.getFullYear() + " " + datum.getHours() + ":" + datum.getMinutes()
            var localSituatieString = '<div data-role="content"><table data-role="table"  data-mode="reflow">  <thead> <tr><th>Datum</th><th>Titel</th><th>Inhoud</th></tr></thead><tbody><tr><td>' + datumFormat + '</td><td>' + situatie.titel + '</td><td>' + situatie.inhoud + '</td></tr></tbody></table><a  data-role="button" data-inline="true" href="#page1"  data-rel="page" data-transition="pop" >Reageren</a><a  data-role="button" data-inline="true" href="#"  data-rel="page" data-transition="pop" >+</a><a  data-role="button" data-inline="true" href="#"  data-rel="page" data-transition="pop" >-</a></div>';
            $("#meldinginfo").html(localSituatieString);
            infoWindow.close();
            infoWindow = new google.maps.InfoWindow(infoWindowOptions);
            infoWindow.open(map, marker);
        }); //alert(situaties.noorderbreedte);


    }
    function laadEvenementen() {
//alert("laad situatie controle 1");
        var hr = new XMLHttpRequest();
        hr.open("GET", "res/evenement", true); //hr.open("GET", "res/situatie/tmp2", true);
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


        }); //alert(situaties.noorderbreedte);


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
                backgroundColor: "green",
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
        alert("Geo locatie geweigerd");
//        laadGebruiker();
    }//end if(navigator.geolocation


})(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
        return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/en_US/all.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


