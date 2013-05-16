/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package res;

import domain.Evenement;
import domain.Gebruiker;
import domain.Post;
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
@Path("zoek")
public class ZoekService {

    @Resource(name = "jdbc/onzebuurt")
    private DataSource source;

    @Path("gemeenten")
    @GET()
    @Produces(MediaType.APPLICATION_JSON)
    public List<Post> zoekGemeentes() {
        try (Connection conn = source.getConnection()) {
            try (PreparedStatement stat = conn.prepareStatement("select distinct Gemeente from post")) {
                try (ResultSet rs = stat.executeQuery()) {
                    List<Post> results = new ArrayList<Post>();
                    while (rs.next()) {
                        Post post = new Post();
                        post.setGemeente(rs.getString("Gemeente"));
                        results.add(post);
                    }
                    
                    return results;
                }
            }
        } catch (SQLException ex) {
            throw new WebApplicationException(ex);
        }
        //return null;    
    }
 @Path("gemeente")
    @POST()
    @Produces(MediaType.APPLICATION_JSON)
    public List<Post> zoekOpGemeente(Post postLocatie) {
        try (Connection conn = source.getConnection()) {
            try (PreparedStatement stat = conn.prepareStatement("select * from post where Gemeente='"+postLocatie.getGemeente()+"'")) {
                try (ResultSet rsPosts = stat.executeQuery()) {
                    List<Post> results = new ArrayList<Post>();
                    

                                while (rsPosts.next()) {
                                    if (rsPosts.getInt("Type") == 0) {
                                        Situatie situatie = new Situatie();
                                        situatie.setPostID(rsPosts.getInt("PostID"));
                                        situatie.setDatum(rsPosts.getString("Datum"));
                                        situatie.setSoort(rsPosts.getInt("Soort"));
                                        situatie.setTitel(rsPosts.getString("Titel"));
                                        situatie.setInhoud(rsPosts.getString("Inhoud"));
 
                                        situatie.setStraat(rsPosts.getString("Straat"));
                                        situatie.setGemeente(rsPosts.getString("Gemeente"));
                                        situatie.setPlaats(rsPosts.getString("Plaats"));
                                        situatie.setLand(rsPosts.getString("Land"));
                                        situatie.setOosterlengte(rsPosts.getDouble("Oosterlengte"));
                                        situatie.setNoorderbreedte(rsPosts.getDouble("Noorderbreedte"));
                                        situatie.setGoedGekeurd(rsPosts.getInt("GoedGekeurd"));
                                        
                                        results.add(situatie);
                                    }
                                    if (rsPosts.getInt("Type") == 1) {

                                        Evenement evenement = new Evenement();
                                        evenement.setPostID(rsPosts.getInt("PostID"));
                                        evenement.setDatum(rsPosts.getString("Datum"));
 
                                        evenement.setTitel(rsPosts.getString("Titel"));
                                        evenement.setInhoud(rsPosts.getString("Inhoud"));
                                        
                                        evenement.setStraat(rsPosts.getString("Straat"));
                                        evenement.setGemeente(rsPosts.getString("Gemeente"));
                                        evenement.setPlaats(rsPosts.getString("Plaats"));
                                        evenement.setLand(rsPosts.getString("Land"));
                                        evenement.setOosterlengte(rsPosts.getDouble("Oosterlengte"));
                                        evenement.setNoorderbreedte(rsPosts.getDouble("Noorderbreedte"));
                                        evenement.setBeginDatum(rsPosts.getString("BeginDatum"));
                                        evenement.setEindDatum(rsPosts.getString("EindDatum"));
                                        evenement.setGoedGekeurd(rsPosts.getInt("GoedGekeurd"));
                                        results.add(evenement);

                                    }
                                    
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
