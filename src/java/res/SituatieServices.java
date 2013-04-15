/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package res;


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
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;
import org.jboss.logging.Param;

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
                stat.setInt(3, situatie.getSoort());
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
                        situatie.setSoort(rs.getInt("Soort"));
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
  @Path("soortMeldingen")
  @GET
  @Produces(MediaType.APPLICATION_JSON)
  public String getSoortMeldingen(){
  try (Connection conn = source.getConnection()) {
            try (PreparedStatement stat = conn.prepareStatement("SELECT * FROM soortmelding")) {
                try (ResultSet rs = stat.executeQuery()) {
                   String soortmeldingen="[";
                    while (rs.next()) {
                       soortmeldingen+= "{\"id\":\""+rs.getString("soortmeldingid")+"\", \"naam\":\""+rs.getString("naam")+"\"},\n";
                      
                    }                   
                    return soortmeldingen=soortmeldingen.substring(0, soortmeldingen.length()-2)+"]";//om de latste comma(,) te verwijderen tijden het maken van json array
                }
            }
        } catch (SQLException ex) {
            throw new WebApplicationException(ex);
        }
  
  }
  private double minLat,minLng,maxLat,maxLng;
  private int rad=0;
  private int R=6371;
  @Path("10km/{lat}:{lng}")
  @GET
  @Produces(MediaType.APPLICATION_JSON)
  public List<Situatie> bereken10kmRondOmGebruiker(@PathParam("lat")double lat,@PathParam("lng")double lng){
//////      // first-cut bounding box (in degrees)
//  maxLat = lat + Math.toDegrees(rad/R);
//  minLat = lat - Math.toDegrees(rad/R);
//////  compensate for degrees longitude getting smaller with increasing latitude
//  maxLng = lng + Math.toDegrees(rad/R/Math.cos(Math.toDegrees(lat)));
//minLng = lng - Math.toDegrees(rad/R/Math.cos(Math.toDegrees(lat)));
List<Situatie> results = new ArrayList<Situatie>();
Situatie s=new Situatie();
s.setNoorderbreedte(lng);
s.setOosterlengte(lat);
results.add(s);
return results;
//Select ID, Postcode, Lat, Lon
//      From MyTable
//      Where Lat Between :minLat And :maxLat
//        And Lon Between :minLon And :maxLon
// try (Connection conn = source.getConnection()) {
//            try (PreparedStatement stat = conn.prepareStatement("select * from post where "
//                    + "Noorderbreedte between "+ minLat+" and "+maxLat+" and "
//                    + "Oosterlengte between "+minLng+" and "+maxLng)) {
//                try (ResultSet rs = stat.executeQuery()) {
//                    List<Situatie> results = new ArrayList<Situatie>();
//                    while (rs.next()) {
//                        Situatie situatie = new Situatie();
//                        situatie.setPostID(rs.getInt("PostID"));
//                        situatie.setDatum(rs.getString("Datum"));
//                        situatie.setSoort(rs.getInt("Soort"));
//                        situatie.setTitel(rs.getString("Titel"));
//                        situatie.setInhoud(rs.getString("Inhoud"));
//                        //situatie.setAfbeelding(rs.getString("Afbeelding"));
//                        situatie.setStraat(rs.getString("Straat"));
//                        situatie.setGemeente(rs.getString("Gemeente"));
//                        situatie.setPlaats(rs.getString("Plaats"));
//                        situatie.setLand(rs.getString("Land"));
//                        situatie.setOosterlengte(rs.getDouble("Oosterlengte"));
//                        situatie.setNoorderbreedte(rs.getDouble("Noorderbreedte"));
//                        Gebruiker gebruiker= new Gebruiker();
//                        gebruiker.setGebruikerID(rs.getInt("GebruikerID"));
//                        situatie.setGebruiker(gebruiker);
//                        
//                        results.add(situatie);
//                    }
//                    return results;
//                }
//            }
//        } catch (SQLException ex) {
//            throw new WebApplicationException(ex);
//        }
//
  }
  
}
