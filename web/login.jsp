<%-- 
    Document   : login
    Created on : Apr 16, 2013, 5:25:19 AM
    Author     : Aime
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>
        <link rel="stylesheet" href="styles/jquerymobile.min.css" />
        <link rel="stylesheet" href="styles/jquery.mobile.structure-1.3.1.min.css" />
        <script src="javascript/jquery-1.9.1.min.js"></script>
        <script src="javascript/jquery.mobile-1.3.1.min.js"></script>
        

    </head>
    <body>
        <div id="fb-root"></div>
        <script src="javascript/facebookscript.js">
     checkCookie("user");
        </script>  
         <script src="javascript/loginscript.js">           
        </script> 
        <!-- Home -->
        <div data-theme="b" data-role="page" id="page1">
            <div data-theme="b"  class="ui-header-fixed" data-role="header">
                <h3>
                    Onze Buurt 
                </h3>
                <h3>
                    Welkome 
                </h3>
            </div>
            <div data-role="content" class="ui-content" data-theme="b">
               
                <div  >
                    <h3>
                        Onze Buurt de app waarme iedereen <br> in je omgeving kan bijdragen om jouw straat,<br> 
                        buurt, of wijk te verbeteren.
                    </h3>
                    <p>Login of registreer met facebook:</p>
                </div> <div id="facebook" >
                    <img src="images/fb2.png" width="100px" height="100px"          alt="twitter" />
                </div> 
            <div id="footer" data-theme="b" class="ui-footer-fixed" data-role="footer">
              
            </div>
        </div>
    </body>
</html>
