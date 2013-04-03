/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package res;

import com.sun.xml.rpc.processor.modeler.j2ee.xml.resAuthType;
import domain.Melding;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;
import javax.ejb.Stateless;
import javax.print.attribute.standard.Media;
import javax.sql.DataSource;
import javax.ws.rs.GET;
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
      l.add(new Melding(12, 12, 12, 12, new Date(2010,12,12), "sdf", "dsdf", "sqd", 10, 10));
   return l;
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
  
    
}
