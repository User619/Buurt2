/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package res;

import javax.activation.DataSource;
import javax.annotation.Resource;
import javax.ejb.Stateless;
import javax.ws.rs.Path;

/**
 *
 * @author Aime
 */
@Stateless
@Path("meldingen")
public class meldingservices {
  @Resource(name="jdbc/onzebuurt")
  private DataSource source;
  
  
    
}
