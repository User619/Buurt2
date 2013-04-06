/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package res;

import domain.Account;
import domain.Gebruiker;
import domain.Situatie;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
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
@Path("situatie")
public class SituatieServices {
    @Resource(name="jdbc/onzebuurt")
    private DataSource source;
    
   
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public void situatieMelden(Situatie situatie){
        String meldPost="Insert into Post ("
                + "Datum, Type, Soort, Titel, Inhoud, "
                + "Straat, Gemeente, Plaats, Land, "
                + "Oosterlengte,  Noorderbreedte, GebruikerID ) "
                + "values (?,?,?,?,?,?,?,?,?,?,?,?)";
//Insert into PostHistoriek (PostID, Titel, Inhoud, Afbeelding, Oosterlengte, Noorderbreedte,
//Soort, `Type`, BeginDatum, EindDatum, Bewerking, DatumBewerking, BewerkingGebruikerID)
//values ((Select PostID From Post Order By PostID Desc Limit 1), "?", "?", "?", "?", "?", "?", "?", "?", "?", "Aanmaken", now(), "?");""
//        try (Connection conn = source.getConnection()) {
        try (Connection conn = source.getConnection()) {
            try (PreparedStatement stat = conn.prepareStatement(meldPost)) {
                
                stat.setString(1, situatie.getDatum());
                stat.setInt(2, 0);//type 0=situatie 1=evemenement
                stat.setString(3, situatie.getSoort());
                stat.setString(4, situatie.getTitel());
                stat.setString(5, situatie.getInhoud());
                
                stat.setString(6, situatie.getStraat());
                stat.setString(7, situatie.getGemeente());
                stat.setString(8, situatie.getPlaats());
                stat.setString(9, situatie.getLand());
                stat.setDouble(10, situatie.getOosterlengte());
                stat.setDouble(11, situatie.getNoorderbreedte());
                stat.setInt(12, situatie.getGebruiker().getGebruikerID());  
                
                stat.executeUpdate();

            }
        } catch (SQLException ex) {
            throw new WebApplicationException(ex);
        }
    }
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public  List<Situatie> situaties(){
           try (Connection conn = source.getConnection()) {
            try (PreparedStatement stat = conn.prepareStatement("select * from post where type=0")) {
                try (ResultSet rs = stat.executeQuery()) {
                    List<Situatie> results = new ArrayList<Situatie>();
                    while (rs.next()) {
                        Situatie situatie = new Situatie();
                        situatie.setPostID(rs.getInt("PostID"));
                        situatie.setDatum(rs.getString("Datum"));
                        situatie.setSoort(rs.getString("Soort"));
                        situatie.setTitel(rs.getString("Titel"));
                        situatie.setInhoud(rs.getString("Inhoud"));
                        //situatie.setAfbeelding(rs.getString("Afbeelding"));
                        situatie.setStraat(rs.getString("Straat"));
                        situatie.setGemeente(rs.getString("Gemeente"));
                        situatie.setPlaats(rs.getString("Plaats"));
                        situatie.setLand(rs.getString("Land"));
                        situatie.setOosterlengte(rs.getDouble("Oosterlengte"));
                        situatie.setNoorderbreedte(rs.getDouble("Noorderbreedte"));
                        Gebruiker gebruiker= new Gebruiker();
                        gebruiker.setGebruikerID(rs.getInt("GebruikerID"));
                        situatie.setGebruiker(gebruiker);
                        
                        results.add(situatie);
                    }
                    return results;
                }
            }
        } catch (SQLException ex) {
            throw new WebApplicationException(ex);
        }
        //return null;    
    }
  private Situatie tmpSituatie;  
  @Path("tmp")
  @GET
  @Produces(MediaType.APPLICATION_JSON)
  public Situatie tmpGet(){
      return tmpSituatie;
  }
  @Path("tmp")
  @POST
  @Consumes(MediaType.APPLICATION_JSON)
  public void tmpPost( Situatie situatie){
      tmpSituatie=situatie;
      //System.out.println(situatie.getStraat());
  }
  
}
