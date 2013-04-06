/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package res;

import domain.Melding;
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
@Path("meldingen")
public class meldingservices {
  @Resource(name="jdbc/onzebuurt")
  private DataSource source;
  
  @GET
  @Produces(MediaType.APPLICATION_JSON)
  public List<Melding> getMeldingen(){
      List<Melding> l=new ArrayList<Melding>();
     
   return l;
  }
  @Path("meldingopslaan")
  @POST
  @Consumes(MediaType.APPLICATION_JSON)
  public void meldingOpslaan(Melding melding){
      try (Connection conn = source.getConnection()) {
            try (PreparedStatement stat = conn.prepareStatement(
//INSERT INTO `onzebuurt`.`melding` (`accountid`, `datum`, `soort`, `gemeente`, `straat`, `titel`, `beschrijving`, `behandeld`, `altitude`, `longitude`) VALUES ('1', '2013-04-03 19:53:27', '1', '9300', 'noname', 'situatie', 'besch', '0', '50', '50');
"INSERT INTO melding (accountid, datum, type, soort, gemeente, straat, titel, beschrijving, behandeld, latitude, longitude) "+
  "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)"))                      
                    {
                        stat.setInt(1, melding.getAccountid());
                        stat.setString(2, melding.getDatum());
                        stat.setInt(3, melding.getType());
                        stat.setInt(4, melding.getSoort());
                        stat.setInt(5, melding.getPostcode());
                        stat.setString(6, melding.getStraat());
                        stat.setString(7, melding.getTitel());
                        stat.setString(8, melding.getBeschrijving());
                        stat.setInt(9, melding.getBehandels());
                        stat.setDouble(10, melding.getLatitude());
                        stat.setDouble(11, melding.getLongitude());
                        stat.executeUpdate();
                        //System.out.println("send db ok");
                        
            }
        } catch (SQLException ex) {
            throw new WebApplicationException(ex);
        }
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
  private Melding tempMeling;
  @Path("tmp")
  @POST
  @Consumes(MediaType.APPLICATION_JSON)
  public void tmpConsume( Melding melding){
      tempMeling=melding;
  }
  @Path("tmp2")
  @GET
  @Produces(MediaType.APPLICATION_JSON)
  public Melding tmpProduces(){
      return tempMeling;
  }
    
}
