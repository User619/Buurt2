/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */




$(document).ready(
        function()
        {
            var straat = '';
            var gemeente = '';
            var gemeenten = '';
            var postsVanEenGemeente = '';
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
            var gebruiker;
            var type = 0; //melding type -->0 voor situatie 1 voor evenement
            var bdatum, btijd, edatum, etijd;
            var titel = $("#titelInput").val() == "" ? "geen titel gegeven" : $("#titelInput").val();
            var inhoud = $("#inhoudInput").val() == "" ? "geen beschrijving gegeven" : $("#inhoud").val();
            var soort = 1;
            var jsonstring;
            var meerinfoString;

//            $.extend(  $.mobile , {
//	ajaxEnabled		 : false,
//	hashListeningEnabled: false
//});
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
                                        alert(JSON.stringify(JSON.parse(jsonstring)) + "ok");
                                        $.mobile.changePage("#page1", "slideup");
                                    } else {


                                        var lijst = '<table> \n\
                                           <tr><td>Gebruikersnaam</td><td>' + gebruiker.gebruikersnaam + '</td></tr>\n\
                                            <tr><td>Naam</td><td>' + gebruiker.naam + '</td></tr>\n\
                                            <tr><td>Voornaam</td><td>' + gebruiker.voornaam + '</td></tr>\n\
                                            <tr><td>E-mail</td><td>' + gebruiker.email + '</td></tr></table>'
                                        var posts = gebruiker.mijnPosts;
                                        var postString = '<li data-role="list-divider" role="heading">Mijn posts</li>';
                                        for (var post in posts) {
                                            var datum = new Date(posts[post].datum);
                                            var datumFormat = datum.getDate() + "-" + datum.getMonth() + "-" + datum.getFullYear() + " " + datum.getHours() + ":" + datum.getMinutes()
                                            postString += ' <li><a href="#page1" data-transition="slide" data-icon="false">' + posts[post].titel + '</a><span class="ui-li-aside">' + datumFormat + '</span> </li>'
                                        }
                                        $("#wnaam").val(gebruiker.naam);
                                        $("#wvoornaam").val(gebruiker.voornaam);
                                        $("#wgebruikdernaam").val(gebruiker.gebruikersnaam);

                                        $("#bevestigKnop").click(function() {
                                            $("#page1").trigger("pagecreate");
//                                          $("input[type='checkbox']").attr("checked",true).checkboxradio("refresh");
                                        });

                                        $("#gegevensContentDivs").html(lijst).append('<a  data-role="button" href="#gevevenswijzigen"  data-prefetch data-transition="slide" >Wijzigen</a>');
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
//            $("#lgebruikersnaam").blur(function (){if($("#lgebruikersnaam").val()==""){ $("#gebnaamfieldcontain").before("<span style='float: left;'>*</span>" )}else{ $("#lgebruikersnaam").addClass(".mlk{color:green !important;}" );}});
            $("#meldaanknop").click(function() {
                aanmelden();
            });
            $("#ganaarzoek").click(function() {
                laadZoekPagina();

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
                    transition: "slide"});//, role: "dialog"
            });
            $("#bevestigKnop").click(function() {
                $.mobile.changePage("#page1", "slideup");
            });
            $("#situatieopslaanknop").click(function() {
                meldingOpslaan(0);
            });
            $("#evenementopslaanknop").click(function() {
                meldingOpslaan(1);
            });

//            data-rel="popup" href="#situatie"


            function aanmelden() {

                gebruiker = JSON.parse(getCookie("gebruiker"));
//                alert(JSON.stringify(gebruiker));
                if (checkCookie("gebruiker")) {
                    var geb = JSON.stringify(gebruiker);

                    setCookie("gebruiker", geb, 15);
                    var lijst = '<table> \n\
                                           <tr><td>Gebruikersnaam</td><td>' + gebruiker.gebruikersnaam + '</td></tr>\n\
                                            <tr><td>Naam</td><td>' + gebruiker.naam + '</td></tr>\n\
                                            <tr><td>Voornaam</td><td>' + gebruiker.voornaam + '</td></tr>\n\
                                            <tr><td>E-mail</td><td>' + gebruiker.email + '</td></tr></table>'
                    var posts = gebruiker.mijnPosts;
                    var postString = '<li data-role="list-divider" role="heading">Mijn posts</li>';
                    for (var post in posts) {
                        var datum = new Date(posts[post].datum);
                        var datumFormat = datum.getDate() + "-" + datum.getMonth() + "-" + datum.getFullYear() + " " + datum.getHours() + ":" + datum.getMinutes()
                        postString += ' <li><a href="#page1" data-transition="slide" data-icon="">' + posts[post].titel + '</a><span class="ui-li-aside">' + datumFormat + '</span> </li>'
                    }
                    $("#wnaam").val(gebruiker.naam);
                    $("#wvoornaam").val(gebruiker.voornaam);
                    $("#wgebruikdernaam").val(gebruiker.gebruikersnaam);

                    $("#bevestigKnop").click(function() {
                        $("#page1").trigger("pagecreate");
//                                          $("input[type='checkbox']").attr("checked",true).checkboxradio("refresh");
                    });

                    $("#gegevensContentDivs").html(lijst).append('<a  data-role="button" href="#gevevenswijzigen"  data-prefetch  data-transition="slide" >Wijzigen</a>');
//                            alert(postString);
                    $("#mijnmeldingenLijst").append(postString);

                    $(".login").val("loguit");
//                    if (gebruiker.beheerder != 9999) {
//                        hr.open("POST", "res/gebruikers/gebruikerlogin", true);
//                        hr.setRequestHeader("Content-type", "application/json");
//                        hr.onreadystatechange = function() {
//                            if (hr.readyState == 4 && hr.status == 200) {
//                                
//
//                        }}}
                        $.mobile.changePage("#page1", "slide");
                        $("#page1").trigger("pagecreate");
                    } else {
                        var gebruikernaam = $("#lgebruikersnaam").val();
                        var wachtwoord = $("#lwachtwoord").val();
                        jsonstring = '{"gebruikersnaam":"' + gebruikernaam + '", "wachtwoord":"' + wachtwoord + '"}';
                        var hr = new XMLHttpRequest();
                        hr.open("POST", "res/gebruikers/gebruikerlogin", true);
                        hr.setRequestHeader("Content-type", "application/json");
                        hr.onreadystatechange = function() {
                            if (hr.readyState == 4 && hr.status == 200) {
                                gebruiker = JSON.parse(hr.responseText);
                                if (gebruiker.gebruikerID == 0) {
                                    $("#lgebruikersnaam").css("border-color", "red");
                                } else {
                                    var geb = JSON.stringify(gebruiker);
                                    setCookie("gebruiker", geb, 15);
                                    var lijst = '<table> \n\
                                           <tr><td>Gebruikersnaam</td><td>' + gebruiker.gebruikersnaam + '</td></tr>\n\
                                            <tr><td>Naam</td><td>' + gebruiker.naam + '</td></tr>\n\
                                            <tr><td>Voornaam</td><td>' + gebruiker.voornaam + '</td></tr>\n\
                                            <tr><td>E-mail</td><td>' + gebruiker.email + '</td></tr></table>'
                                    var posts = gebruiker.mijnPosts;
                                    var postString = '<li data-role="list-divider" role="heading">Mijn posts</li>';
                                    for (var post in posts) {
                                        var datum = new Date(posts[post].datum);
                                        var datumFormat = datum.getDate() + "-" + datum.getMonth() + "-" + datum.getFullYear() + " " + datum.getHours() + ":" + datum.getMinutes()
                                        postString += ' <li><a href="#page1" data-transition="slide" data-icon="">' + posts[post].titel + '</a><span class="ui-li-aside">' + datumFormat + '</span> </li>'
                                    }
                                    $("#wnaam").val(gebruiker.naam);
                                    $("#wvoornaam").val(gebruiker.voornaam);
                                    $("#wgebruikdernaam").val(gebruiker.gebruikersnaam);

                                    $("#bevestigKnop").click(function() {
                                        $("#page1").trigger("pagecreate");
//                                          $("input[type='checkbox']").attr("checked",true).checkboxradio("refresh");
                                    });

                                    $("#gegevensContentDivs").html(lijst).append('<a  data-role="button" href="#gevevenswijzigen"  data-prefetch   data-transition="slide" >Wijzigen</a>');
//                            alert(postString);
                                    $("#mijnmeldingenLijst").append(postString);

//                            var filters = gebruiker.filters;
//
//                            filters.situaties == 0 ? $("#ssituatiesKeuze").attr("checked", false).checkboxradio("refresh") :
//                                    $("#ssituatiesKeuze").attr("checked", true).checkboxradio("refresh");
//                            filters.evenementen == 0 ? $("#sevenementenKeuze").attr("checked", false).checkboxradio("refresh") :
//                                    $("#ssituatiesKeuze").attr("checked", true).checkboxradio("refresh");
//                            filters.goedgekeurdSituaties == 0 ? $("#gsituatiesKeuze").attr("checked", false).checkboxradio("refresh") :
//                                    $("#gsituatiesKeuze").attr("checked", true).checkboxradio("refresh");
//                            filters.goedgekeurdEvenementen == 0 ? $("#gevenementenKeuze").attr("checked", false).checkboxradio("refresh") :
//                                    $("#gevenementenKeuze").attr("checked", true).checkboxradio("refresh");
//                            if (filters.km == 0) {
//                                $("#km5").attr("checked", true).checkboxradio("refresh");
//                            }
//                            if (filters.km == 1) {
//                                $("#km10").attr("checked", true).checkboxradio("refresh");
//                            }
//                            if (filters.km == 2) {
//                                $("#km20").attr("checked", true).checkboxradio("refresh");
//                            }
                                    $(".login").val("loguit");

                                    $.mobile.changePage("#page1", "slide");
                                    $("#page1").trigger("pagecreate");
                                }

                            }


                        }
                    }
                    hr.send(jsonstring);
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
                function meldingOpslaan(type) {
                    var hr = new XMLHttpRequest();
                    if (type == 0) {
                        hr.open("POST", "res/situatie", true);
                        hr.setRequestHeader("Content-type", "application/json");
                        titel = $("#situatietitel").val() == "" ? "geen titel gegeven" : $("#situatietitel").val();
                        inhoud = $("#situatieinhoud").val() == "" ? "geen beschrijving gegeven" : $("#situatieinhoud").val();
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
                        $.mobile.changePage("#page1", "slide");
                        $("#page1").trigger('pagecreate');
                        laadSituaties();
                        laadEvenementen();
                    }
                    if (type == 1) {
                        //alert(jsonstring + "Melding Opgeslaan");
                        hr.open("POST", "res/evenement", true);
                        hr.setRequestHeader("Content-type", "application/json");
                        bdatum = $("#evenementbegindatum").val();
                        edatum = $("#evenementeinddatum").val();

                        titel = $("#evenementtitel").val() == "" ? "geen titel gegeven" : $("#evenementtitel").val();
                        inhoud = $("#evenenementinhoud").val() == "" ? "geen beschrijving gegeven" : $("#evenenementinhoud").val();
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
                        $.mobile.changePage("#page1", "slide");
                        $("#page1").trigger('pagecreate');
                        laadSituaties();
                        laadEvenementen();
                    }


                }//eind melding opslaan



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
                        return true;
                    }
                    else
                    {
                        return false;
//            alert("facebook");
                    }
                }

                function laadZoekPagina() {
                    var hr = new XMLHttpRequest();
                    hr.open("GET", "res/zoek/gemeenten", true);
                    hr.onreadystatechange = function() {

                        if (hr.readyState == 4 && hr.status == 200) {
                            gemeenten = JSON.parse(hr.responseText);
                            var listHtml = '';
                            for (var gemeente in gemeenten) {
                                listHtml += ' <li  gemeentenaam="' + gemeenten[gemeente].gemeente + '" class="gemeente" data-filtertext="' + gemeenten[gemeente].gemeente + '"><a  href="#">' + gemeenten[gemeente].gemeente + '</a></li>';
                            }//alert(JSON.stringify(gemeenten));
                            $("#zoekContent").html(
                                    '<ul id="gemeentelistview" data-filter="true" data-filter-reveal="false" data-filter-placeholder="Zoek op gemeente naam" data-role="listview">' + listHtml + '</ul>'
                                    );

                            $(".gemeente").click(function() {
                                getMeldingenVanGemeente('{"gemeente":"' + $(this).attr("gemeentenaam") + '"}');

                            });
                            $.mobile.changePage("#zoek", "slide");
                            $("#zoek").trigger('pagecreate');
                        }
                    }
                    hr.send(null);
                }
                function getMeldingenVanGemeente(gemeentenaam) {
                    var hr = new XMLHttpRequest();
                    hr.open("POST", "res/zoek/gemeente", true);
                    hr.setRequestHeader("Content-type", "application/json");
                    hr.onreadystatechange = function() {
                        if (hr.readyState == 4 && hr.status == 200) {
                            postsVanEenGemeente = JSON.parse(hr.responseText);
                            var icon = '';
                            var meldingenHtml = '';
                            for (var post in postsVanEenGemeente) {

                                if (+postsVanEenGemeente[post].beginDatum == 0) {
                                    icon = '<img  style="border:0px ;float:right; " src="images/warningklein.png"/>';
                                } else {
                                    icon = '<img  style="border:0px ;float:right; " src="images/eventklein.png"/>';
                                }
                                meldingenHtml += '<div data-content-theme="a" data-filter="true" data-role="collapsible" data-collapsed="false">\n\
                                       <h3>' + postsVanEenGemeente[post].titel + icon + '</h3> \n\
                                            <table > \n\
                                            <tr><td>Meldging Datum</td><td>' + postsVanEenGemeente[post].datum + '</td></tr>\n\
                                             <tr><td>Plaats</td><td>' + postsVanEenGemeente[post].plaats + '</td></tr>\n\
                                            <tr><td>Gemeente</td><td>' + postsVanEenGemeente[post].gemeente + '</td></tr>\n\
                                            <tr><td>Straat</td><td>' + postsVanEenGemeente[post].straat + '</td></tr></table>\n\
                                            <p>Inhoud</p><p>' + postsVanEenGemeente[post].inhoud + '</p> </div>';
                            }
                            $("#zoekMelding").html(meldingenHtml);
                            $.mobile.changePage("#zoekdetail", "slide");
                            $("#zoekMelding").collapsibleset("refresh");
                            $("#meldingtypemenu").change(function() {

                                $("#meldingtypemenu option:selected").each(function() {
                                    meldingenHtml = '';
                                    if ($(this).val() == 0) {
                                        for (var post in postsVanEenGemeente) {

                                            if (+postsVanEenGemeente[post].beginDatum == 0) {
                                                icon = '<img  style="border:0px ;float:right; " src="images/warningklein.png"/>';
                                            } else {
                                                icon = '<img  style="border:0px ;float:right; " src="images/eventklein.png"/>';
                                            }

                                            meldingenHtml += '<div data-content-theme="a" data-filter="true" data-role="collapsible" data-collapsed="false">\n\
                                       <h3>' + postsVanEenGemeente[post].titel + icon + '</h3> \n\
                                            <table > \n\
                                            <tr><td>Meldging Datum</td><td>' + postsVanEenGemeente[post].datum + '</td></tr>\n\
                                             <tr><td>Plaats</td><td>' + postsVanEenGemeente[post].plaats + '</td></tr>\n\
                                            <tr><td>Gemeente</td><td>' + postsVanEenGemeente[post].gemeente + '</td></tr>\n\
                                            <tr><td>Straat</td><td>' + postsVanEenGemeente[post].straat + '</td></tr></table>\n\
                                            <p>Inhoud</p><p>' + postsVanEenGemeente[post].inhoud + '</p> </div>';
                                        }
                                        $("#zoekMelding").html(meldingenHtml);
                                        $("#zoekMelding").collapsibleset("refresh");
                                    }
                                    if ($(this).val() == 1) {

                                        for (var post in postsVanEenGemeente) {
                                            if (postsVanEenGemeente[post].beginDatum == null) {

                                                icon = '<img  style="border:0px ;float:right; " src="images/warningklein.png"/>';
                                                meldingenHtml += '<div data-content-theme="a" data-filter="true" data-role="collapsible" data-collapsed="false">\n\
                                       <h3>' + postsVanEenGemeente[post].titel + icon + '</h3> \n\
                                            <table > \n\
                                            <tr><td>Meldging Datum</td><td>' + postsVanEenGemeente[post].datum + '</td></tr>\n\
                                             <tr><td>Plaats</td><td>' + postsVanEenGemeente[post].plaats + '</td></tr>\n\
                                            <tr><td>Gemeente</td><td>' + postsVanEenGemeente[post].gemeente + '</td></tr>\n\
                                            <tr><td>Straat</td><td>' + postsVanEenGemeente[post].straat + '</td></tr></table>\n\
                                            <p>Inhoud</p><p>' + postsVanEenGemeente[post].inhoud + '</p> </div>';

                                            }
                                        }
                                        $("#zoekMelding").html(meldingenHtml);
                                        $("#zoekMelding").collapsibleset("refresh");
                                    }
                                    if ($(this).val() == 2) {
                                        for (var post in postsVanEenGemeente) {

                                            if (+postsVanEenGemeente[post].beginDatum != 0) {

                                                icon = '<img  style="border:0px ;float:right; " src="images/eventklein.png"/>';


                                                meldingenHtml += '<div data-content-theme="a" data-filter="true" data-role="collapsible" data-collapsed="false">\n\
                                       <h3>' + postsVanEenGemeente[post].titel + icon + '</h3> \n\
                                            <table > \n\
                                            <tr><td>Meldging Datum</td><td>' + postsVanEenGemeente[post].datum + '</td></tr>\n\
                                             <tr><td>Plaats</td><td>' + postsVanEenGemeente[post].plaats + '</td></tr>\n\
                                            <tr><td>Gemeente</td><td>' + postsVanEenGemeente[post].gemeente + '</td></tr>\n\
                                            <tr><td>Straat</td><td>' + postsVanEenGemeente[post].straat + '</td></tr></table>\n\
                                            <p>Inhoud</p><p>' + postsVanEenGemeente[post].inhoud + '</p> </div>';
                                            }
                                        }
                                        $("#zoekMelding").html(meldingenHtml);
                                        $("#zoekMelding").collapsibleset("refresh");
                                    }
                                });
                            });
                        }
                    }
                    hr.send(gemeentenaam);
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
                                            ';
                                $("#gegevensContentDivs").html(lijst).append('<a  data-role="button" href="#page1"  data-prefetch   data-transition="slide" >Wijzigen</a>');
                            }
                        }
                    }
                    hr.send(null);
                }

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
                            icon: "images/green-dot.png"
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

                    }//einde hasposition
                    navigator.geolocation.getCurrentPosition(hasPosition);

                }//eind hal geolocatie


                aanmelden();
//    initialize
                function initialize() {

//        point = new google.maps.LatLng(50.85034590634438, 4.351687654852867);//brussel coordinaten
                    var mapOptions = {
                        center: new google.maps.LatLng(50.85034590634438, 4.351687654852867),
                        zoom: 13,
                        mapTypeId: google.maps.MapTypeId.ROADMAP
                    };
                    var map = new google.maps.Map(document.getElementById('map'),
                            mapOptions);

                    var input = /** @type {HTMLInputElement} */(document.getElementById('searchTextField'));
                    var autocomplete = new google.maps.places.Autocomplete(input);

                    autocomplete.bindTo('bounds', map);

                    var infowindow = new google.maps.InfoWindow();
                    var marker = new google.maps.Marker({
                        map: map
                    });

                    google.maps.event.addListener(autocomplete, 'place_changed', function() {
                        alert(autocomplete.getPlace().name);
                        infowindow.close();
                        marker.setVisible(false);
                        input.className = '';
                        var place = autocomplete.getPlace();
                        if (!place.geometry) {
                            // Inform the user that the place was not found and return.
                            input.className = 'notfound';
                            return;
                        }

                        // If the place has a geometry, then present it on a map.
                        if (place.geometry.viewport) {
                            map.fitBounds(place.geometry.viewport);
                        } else {
                            map.setCenter(place.geometry.location);
                            map.setZoom(17);  // Why 17? Because it looks good.
                        }
                        marker.setIcon(/** @type {google.maps.Icon} */({
                            url: place.icon,
                            size: new google.maps.Size(71, 71),
                            origin: new google.maps.Point(0, 0),
                            anchor: new google.maps.Point(17, 34),
                            scaledSize: new google.maps.Size(35, 35)
                        }));
                        marker.setPosition(place.geometry.location);
                        marker.setVisible(true);

                        var address = '';
                        if (place.address_components) {
                            address = [
                                (place.address_components[0] && place.address_components[0].short_name || ''),
                                (place.address_components[1] && place.address_components[1].short_name || ''),
                                (place.address_components[2] && place.address_components[2].short_name || '')
                            ].join(' ');
                        }

                        infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
                        infowindow.open(map, marker);
                    });

                    // Sets a listener on a radio button to change the filter type on Places
                    // Autocomplete.
                    function setupClickListener(id, types) {
                        var radioButton = document.getElementById(id);
                        google.maps.event.addDomListener(radioButton, 'click', function() {
                            autocomplete.setTypes(types);
                        });
                    }

                    setupClickListener('changetype-all', []);
                    setupClickListener('changetype-establishment', ['establishment']);
                    setupClickListener('changetype-geocode', ['geocode']);

                    laadMeldingen();
                    soortMelingenLaden();
                    typeMeldingAnimatie();
                }//    addDomListener
                google.maps.event.addDomListener(window, 'load', initialize);
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
                            $("#situatiesoort").append(opties).selectmenu('refresh', true);
                        }
                    }
                    hr.send(null);
                }

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
                            var meldLink = '';
                            if (gebruiker) {
                                meldLink = '<a data-transition="slide" href="#melden">Melden</a>';
                            } else {
                                meldLink = '<a  href="#login" data-transition="pop" >Login</a>';
                            }
                            var infoWindowOptions = {
                                content: ' ' + straat + '<br>\n\
                             ' + gemeente + '<br>\n\
                             ' + postcode + '<br>\
                            <div>' + meldLink + '</div> ',
                                enableEventPropagation: true

                            };
                            $("#melden").click(function() {
                                marker.setMap(null);
                            });
                            if (isNewMarker) {
                                infoWindow.close();
                                infoWindow = new google.maps.InfoWindow(infoWindowOptions);
                                infoWindow.open(map, marker);
//                        alert(marker.getPosition().lat() +" "+ marker.getPosition().lng())
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
                function laadMeldingen() {
//        laadGebruiker();
//        facebook();
                    aanmelden();
                    laadSituaties();
                    laadEvenementen();
//        laadZoekPagina();
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
                                 <a  data-role="button" href="#meldinginfo"  data-prefetch  data-transition="slide" > Meer over</a><br>\
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
                                   <a  data-role="button" href="#meldinginfo"  data-prefetch data-rel="dialog" data-transition="pop" > Meer over</a><br>\
                                 <a href="reactie.html">Reageer</a><br>'

                    };
                    google.maps.event.addListener(marker, 'click', function(e) {
                        var datum = new Date(evenement.datum);
                        var datumFormat = datum.getDate() + "-" + datum.getMonth() + "-" + datum.getFullYear() + " " + datum.getHours() + ":" + datum.getMinutes()
                        var localEvenementString = '<div data-role="content"><table data-role="table"  data-mode="reflow">  <thead> <tr><th>Datum</th><th>Titel</th><th>Inhoud</th></tr></thead><tbody><tr><td>' + datumFormat + '</td><td>' + evenement.titel + '</td><td>' + evenement.inhoud + '</td></tr></tbody></table><a  data-role="button" data-inline="true" href="#page1"  data-rel="page" data-transition="pop" >Reageren</a><a  data-role="button" data-inline="true" href="#"  data-rel="page" data-transition="pop" >+</a><a  data-role="button" data-inline="true" href="#"  data-rel="page" data-transition="pop" >-</a></div>';
                        $("#meldinginfo").html(localEvenementString);
                        infoWindow.close();
                        infoWindow = new google.maps.InfoWindow(infoWindowOptions);
                        infoWindow.open(map, marker);


                    }); //alert(situaties.noorderbreedte);


                }



            }
    )(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
        return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/en_US/all.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

 