/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package res;

import domain.Evenement;
import domain.Gebruiker;
import domain.Situatie;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
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

@Stateless
@Path("evenement")
public class EvenementServices {
    @Resource(name="jdbc/onzebuurt")
    private DataSource source;
    
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public void meldEvenement(Evenement evenement){
         String meldPost="Insert into Post ("
                + "Datum, Type, Titel, Inhoud, "
                + "Straat, Gemeente, Plaats, Land, "
                + "Oosterlengte,  Noorderbreedte, GebruikerID, "
                 +"BeginDatum, EindDatum ) "
                + "values (now(),?,?,?,?,?,?,?,?,?,?,?,?)";
        try (Connection conn = source.getConnection()) {
            try (PreparedStatement stat = conn.prepareStatement(meldPost)) {
                
                 
                stat.setInt(1, 1);//type 0=situatie 1=evemenement
                stat.setString(2, evenement.getTitel());
                stat.setString(3, evenement.getInhoud());
                stat.setString(4, evenement.getStraat());
                
                stat.setString(5, evenement.getGemeente());
                stat.setString(6, evenement.getPlaats());
                stat.setString(7, evenement.getLand());
                stat.setDouble(8, evenement.getOosterlengte());
                stat.setDouble(9, evenement.getNoorderbreedte());
                stat.setDouble(10,evenement.getGebruiker().getGebruikerID());
                try {
                    Date date = new SimpleDateFormat("dd-MM-yyyy HH:mm").parse(evenement.getBeginDatum());
                    String formattedDate = new SimpleDateFormat("yyyy-MM-dd HH:mm").format(date);
                    Date date2 = new SimpleDateFormat("dd-MM-yyyy HH:mm").parse(evenement.getEindDatum());
                    String formattedDate2 = new SimpleDateFormat("yyyy-MM-dd HH:mm").format(date);
                    
                    stat.setString(11, formattedDate);
                    stat.setString(12, formattedDate2);
                } catch (ParseException ex) {
                    Logger.getLogger(EvenementServices.class.getName()).log(Level.SEVERE, null, ex);
                }

                                
                
                stat.executeUpdate();

            }
        } catch (SQLException ex) {
            throw new WebApplicationException(ex);
        }
    }
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public  List<Evenement> evenementen(){
           try (Connection conn = source.getConnection()) {
            try (PreparedStatement stat = conn.prepareStatement("select * from post where type=1")) {
                try (ResultSet rs = stat.executeQuery()) {
                    List<Evenement> results = new ArrayList<Evenement>();
                    while (rs.next()) {
                        Evenement evenement = new Evenement();
                        evenement.setPostID(rs.getInt("PostID"));
                        evenement.setDatum(rs.getString("Datum"));
//                        evenement.setSoort(rs.getInt("Soort"));
                        evenement.setTitel(rs.getString("Titel"));
                        evenement.setInhoud(rs.getString("Inhoud"));
                        //situatie.setAfbeelding(rs.getString("Afbeelding"));
                        evenement.setStraat(rs.getString("Straat"));
                        evenement.setGemeente(rs.getString("Gemeente"));
                        evenement.setPlaats(rs.getString("Plaats"));
                        evenement.setLand(rs.getString("Land"));
                        evenement.setOosterlengte(rs.getDouble("Oosterlengte"));
                        evenement.setNoorderbreedte(rs.getDouble("Noorderbreedte"));
                        Gebruiker gebruiker= new Gebruiker();
                        gebruiker.setGebruikerID(rs.getInt("GebruikerID"));
                        evenement.setGebruiker(gebruiker);
                        evenement.setBeginDatum(rs.getString("BeginDatum"));
                        evenement.setEindDatum(rs.getString("EindDatum"));
                        results.add(evenement);
                    }
                    return results;
                }
            }
        } catch (SQLException ex) {
            throw new WebApplicationException(ex);
        }
        //return null;    
     }
}
