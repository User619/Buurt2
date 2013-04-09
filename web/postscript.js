
//----------------------meldingen script------------------------------------    
//----------------------situaties halen -------------------------
$(document).ready(
        function() {

            var tempMelding;
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
                            for (var soortmelding in data) {
                                $("#soort").append("<option value='" + data[soortmelding].id + "'>" + data[soortmelding].naam + "</option>")
                                //alert(data[soortmelding].naam );
                            }
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
                postOpslaan();
            });
            function postOpslaan() {
                //loadTmpMelding();
//                alert("controlle 1 pass");
                var hr = new XMLHttpRequest();
                hr.open("POST", "res/situatie", true);
                hr.setRequestHeader("Content-type", "application/json");
                var datum = jaar + "-" + maand + "-" + dag + " " + uur + ":" + min + ":" + sec
                var titel = $("#titel").val() == "" ? "geen titel gegeven" : $("#titel").val();
                var inhoud = $("#inhoud").val() == "" ? "geen beschrijving gegeven" : $("#inhoud").val();
                //beschrijving=beschrijving.value.replace(/^\s*|\s*$/g,'');
                var type = $('#type').find(":selected").val();
                var soort = $('#soort').find(":selected").val();
//                alert("controlle 2 pass");
                var jsonstring =
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
                        '"gebruiker":{"gebruikerID":1}' +
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
//                alert("controlle 3 pass");
            }
            ;
            function typeMeldingAnimatie(callback) {
                $("#type").change
                        (
                                function() {
                                    if ($(this).val() == 1) {
                                        $("#situatieSoortDiv").slideUp(300,
                                                function() {
                                                    $("#datumDiv").slideDown(300,
                                                            function() {

                                                                var datumString = dag + "-" + maand + "-" + jaar + " " + uur + ":" + min + ":" + sec
                                                                $("#datum").attr("value", datumString);
                                                            }
                                                    );
                                                }

                                        );
                                    } else {
                                        $("#datumDiv").slideUp(300, function() {
                                            $("#situatieSoortDiv").slideDown(300)
                                        });
                                    }
                                }
                        );
            }
            ;

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
            loadTmpMelding(typeMeldingAnimatie(soortMelingenLaden()));

        });//eind documnet

        