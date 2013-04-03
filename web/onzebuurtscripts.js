$(document).ready(function(){ 
    
    
    
//----------------------meldingen script------------------------------------    
//----------------------situaties halen -------------------------
         var hr= new XMLHttpRequest();
         hr.open("GET","res/meldingen/soortMeldingen",true);                    
         hr.onreadystatechange = function() { 
               
            if (hr.readyState == 4 && hr.status == 200) {
                //alert(hr.responseText);
                var data = JSON.parse(hr.responseText); 
                    
                    for(var soortmelding in data){
                        $("#soort").append("<option value='"+data[soortmelding].id +"'>"+data[soortmelding].naam  + "</option>" )
                       //alert(data[soortmelding].naam );
                    }
                       }
         }      
                       hr.send(null);
                  
                $("#datumDiv").hide();
                $("#type").change
                (
                    function (){
                      if($(this).val()== 1){                    
                        $("#situatieSoortDiv").slideUp(300,
                            function(){
                                $("#datumDiv").slideDown(300,
                                    function (){
                                        $("#datum").attr("value", new Date() );
                                    }
                                );                            
                            }
                       
                         );
                      }else{
                         $("#datumDiv").slideUp(300, function(){                             
                             $("#situatieSoortDiv").slideDown(300)
                         });
                          ;
                      }               
                     }
                 );
                 
              });//eind document


