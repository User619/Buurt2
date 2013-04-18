var s=this;
$(document).ready( 
        
        function() {
 window.fbAsyncInit = function() {
            
           
                // init the FB JS SDK
                FB.init({
                    appId: '236439906495493', // App ID from the app dashboard
                    channelUrl: '//localhost:8080/onzebuurt/login.jsp', // Channel file for x-domain comms
                    status: true, // Check Facebook Login status
                    xfbml: true                                  // Look for social plugins on the page
                });
                this.status= function(){
                   
            FB.getLoginStatus(function(response) {
                if (response.status === 'connected') {
                    setCookie("user", "true", 15)

                    FB.api('/me', function(response) {
                        //alert(JSON.stringify(response));
                        var hr = new XMLHttpRequest();
                        hr.open("POST", "res/gebruikers/gebruiker", true);  //hr.open("GET", "res/situatie/tmp2", true);
                        hr.setRequestHeader("Content-type", "application/json");
                        var jsonstring = '{"facebookID":' + response.id + '}';
                        var gebruiker;
                        hr.onreadystatechange = function() {
                            //alert(hr.responseText);
                            if (hr.readyState == 4 && hr.status == 200) {
                                gebruiker = JSON.parse(hr.responseText);
                               
                                if (gebruiker.gebruikerID == 0) { 
                                     var hr2 = new XMLHttpRequest();
                                     hr2.open("POST", "res/gebruikers/tmp", true);  
                                        hr2.setRequestHeader("Content-type", "application/json");
                                        jsonstring = '{"facebookID":"' + response.id + '", "gebruikersnaam":"'+response.name+'"}';
                                     
                                        hr2.send(jsonstring);
                                            alert(JSON.stringify(JSON.parse(jsonstring)));
                                        window.location = "../onzebuurt/index.jsp";
                                }else{
                                   window.location = "../onzebuurt/index.jsp";
                                }
                                
                            }
                        }

                        hr.send(jsonstring);
                        

                    });
                        this.loginOk=function (){
                            return true;
                        }
                        
                    } else if (response.status === 'not_authorized') { 
                        login();
                    } else {
                        login();
                    }
                            });
                        }
                function login() {
                    FB.login(function(response) {
                        if (response.authResponse) {
                          window.location = "../onzebuurt/index.jsp";
                        
                        } else {
                         this.loginOk=function (){
                            return false;
                        } // cancelled
                        }
                    });
                } 
            };

            // Load the SDK asynchronously
            (function(d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) {
                    return;
                }
                js = d.createElement(s);
                js.id = id;
                js.src = "//connect.facebook.net/en_US/all.js";
                fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));
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
            alert(user);
             var fb = new window.fbAsyncInit();
        fb.status();
          
        }
        else
        {
           
        }
    }
 checkCookie("user");
            
        });
//FB.api('/me', function(response) {
//                            alert('Good to see you, ' + response.name + '.');
//                        });
