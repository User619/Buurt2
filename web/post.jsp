
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Een melding geven</title>
        <link rel="stylesheet" type="text/css" href="styles/onzebuurt.css">
        <link href="styles/glDatePicker.darkneon.css" rel="stylesheet" type="text/css">
        <script src="javascript/jquery1-9.js"></script>
        <script src="javascript/glDatePicker.js"></script>
        <script src="javascript/postscript.js"></script>
    </head>
    <body >

        <div gldp-el="van"         style="width:100%; height:50%; position:absolute; top:10px; left:0px;">
        </div>
        <div gldp-el="tot"         style="width:100%; height:50%; position:absolute; top:10px; left:0px;">
        </div>
        <div >  

            <script type="text/javascript">
                $(window).load(function()
                {
                    $('.datumInput').glDatePicker();
                });
            </script>
            <div class="postOmpaak">     

                <div id="meldingType" class="divKnop" >
                    <div id="leftArrow"  class="typeMeldingSelected">
                        &#9664;
                    </div>
                    <div id="meldingDiv">Situatie</div>
                    <div id="rightArrow">
                        &#9654;
                    </div>
                </div>

                <div id="datumDiv">
                    <div class="datumlbl">
                        <label  >Van:</label>
                    </div>

                    <input type="datetime" class="datumInput" id="bdatum" gldp-id="van" value="" ><br>


                    <div class="datumlbl" >
                        <label >Tot:</label> 
                    </div>                
                    <input type="text" class="datumInput" id="edatum" gldp-id="tot"> 
                </div>
                <div id="situatieSoortDiv">
                    <div id="dropdownDiv">
                        <div id="selectedSituatieDiv">
                            <input type="text" id="selectedSituatie" class="input" value="Standaard" key="1">
                        </div>
                        <div id="drodownListDiv" class="input">

                        </div>

                    </div>
                </div>
                <div id="melding">
                    <div id="titelDiv">
                        <label >Titel</label><br>
                        <input type="text" id="titel"  class="input">
                    </div>
                    <div id="inhoudDiv" >
                        <label >Korte Beschrijving</label><br>
                        <textarea rows="4"  style="width: 320px;" id="inhoud"></textarea>
                    </div>
                </div>
                <div id="acties" class="divKnop" >
                    <a href="index.jsp"> 
                        <div id="meldenBtn">
                            Melden
                        </div>
                    </a>

                </div>

            </div>
        </div>    
    </body>
</html>
