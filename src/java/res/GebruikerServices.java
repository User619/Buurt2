/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package res;

import domain.Gebruiker;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import javax.annotation.Resource;
import javax.ejb.Stateless;
import javax.sql.DataSource;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;

/**
 *
 * @author Aime
 */
@Stateless
@Path("gebruikers")
public class GebruikerServices {
    @Resource(name="jdbc/onzebuurt")
    private DataSource source;
    private Gebruiker gebruiker=new Gebruiker();
    
    @Path("gebruiker")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
     public Gebruiker getGebruiker(Gebruiker gebruiker){
         try (Connection conn = source.getConnection()) {
            try (PreparedStatement stat = conn.prepareStatement("select * from gebruiker where FacebookKey="+gebruiker.getFacebookID())) {
                try (ResultSet rs = stat.executeQuery()) {
                   Gebruiker gebruikerInfo = new Gebruiker();
                   
                    while(rs.next()){
                       gebruikerInfo.setGebruikerID(rs.getInt("GebruikerID"));
                       gebruikerInfo.setGebruikersnaam(rs.getString("Gebruikersnaam"));
                       gebruikerInfo.setFacebookID(rs.getString("FacebookKey"));                        
                    }
                    this.gebruiker=gebruikerInfo;
                    return gebruikerInfo;
                }
            }
        } catch (SQLException ex) {
            throw new WebApplicationException(ex);
        }    
     }
    @Path("tmpGebruiker")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
     public Gebruiker setTmpGebruiker(){        
         return getGebruiker(gebruiker);
     }
    @Path("tmp")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
     public void setTmpGebruiker(Gebruiker gebruiker){
         String gebruikerQuery="insert into gebruiker ("
                    + "Gebruikersnaam, FacebookKey) value (?,?)";
         try (Connection conn = source.getConnection()) {
             try (PreparedStatement stat = conn.prepareStatement(gebruikerQuery)) {
                stat.setString(1, gebruiker.getGebruikersnaam());
                stat.setString(2, gebruiker.getFacebookID());
               
                stat.executeUpdate();
                setGebruiker(gebruiker);

            }
        } catch (SQLException ex) {
            throw new WebApplicationException(ex);
        }    
     }

    private void setGebruiker(Gebruiker gebruiker) {
       this.gebruiker=gebruiker;
    }
}
