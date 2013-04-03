<%-- 
    Document   : melding
    Created on : Apr 3, 2013, 12:43:28 PM
    Author     : Aime
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Een melding geven</title>
    </head>
    <body>
       <script src="jquery1-9.js"></script>        
        <script src="mapscript.js"></script>
       
        <div >  
            <label id="meldinglabel" >Melding Type:</label><br>
            <select id="type" name="type">
                <option value="0" selected>Situatie</option>
                <option value="1">Evenement</option>                
            </select><br>
            <div id="datumDiv" onclick="javascript:alert(getStraat());">
                <label >Evenement datum</label><br>
                <input type="datetime" id="datum" value="" > 
            </div>
            <div id="situatieSoortDiv">
                <label >Soort Melding</label><br>
                <select id="soort" name="soortSituatieSelect"style="width: 320px;">                             
                </select><br>
            </div>
            <div id="melding">
                <div id="titelDiv">
                    <label >Titel</label><br>
                    <input type="text" id="titel"
                </div>
                <div id="beschrijvingDiv">
                    <label >Korte Beschrijving</label><br>
                    <textarea rows="4"  style="width: 320px;" id="beschrijving">
                    </textarea>
                </div>
            </div>
            

        </div>
    </body>
</html>
