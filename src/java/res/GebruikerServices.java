/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package res;

import domain.Evenement;
import domain.Filters;
import domain.Gebruiker;
import domain.Post;
import domain.Situatie;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
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

/**
 *
 * @author Aime
 */
@Stateless
@Path("gebruikers")
public class GebruikerServices {

    @Resource(name = "jdbc/onzebuurt")
    private DataSource source;
    private Gebruiker gebruiker = new Gebruiker();

    @Path("gebruiker")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Gebruiker getGebruiker(Gebruiker gebruiker) {
        Gebruiker gebruikerInfo = new Gebruiker();
        try (Connection conn = source.getConnection()) {
            try (PreparedStatement stat = conn.prepareStatement("select * from gebruiker where FacebookKey=" + gebruiker.getFacebookID())) {
                try (ResultSet rs = stat.executeQuery()) {
                    System.out.print(gebruiker.getFacebookID());
                    while (rs.next()) {
                        System.out.print("gebruiker werd gevonden bij log in");
                        System.out.print(rs.getString("Gebruikersnaam"));
                        gebruikerInfo.setGebruikerID(rs.getInt("GebruikerID"));
                        gebruikerInfo.setGebruikersnaam(rs.getString("Gebruikersnaam"));
                        gebruikerInfo.setNaam(rs.getString("Naam"));
                        gebruikerInfo.setVoornaam(rs.getString("Voornaam"));
                        gebruikerInfo.setEmail(rs.getString("Email"));
                        gebruikerInfo.setBeheerder(rs.getInt("Beheerder"));
                        try (PreparedStatement posts = conn.prepareStatement("select * from post where GebruikerID=" + gebruikerInfo.getGebruikerID())) {
                            try (ResultSet rsPosts = posts.executeQuery()) {
                                List<Post> results = new ArrayList<Post>();

                                while (rsPosts.next()) {
                                    if (rsPosts.getInt("Type") == 0) {
                                        Situatie situatie = new Situatie();
                                        situatie.setPostID(rsPosts.getInt("PostID"));
                                        situatie.setDatum(rsPosts.getString("Datum"));
                                        situatie.setSoort(rsPosts.getInt("Soort"));
                                        situatie.setTitel(rsPosts.getString("Titel"));
                                        situatie.setInhoud(rsPosts.getString("Inhoud"));
                                        //situatie.setAfbeelding(rs.getString("Afbeelding"));
                                        situatie.setStraat(rsPosts.getString("Straat"));
                                        situatie.setGemeente(rsPosts.getString("Gemeente"));
                                        situatie.setPlaats(rsPosts.getString("Plaats"));
                                        situatie.setLand(rsPosts.getString("Land"));
                                        situatie.setOosterlengte(rsPosts.getDouble("Oosterlengte"));
                                        situatie.setNoorderbreedte(rsPosts.getDouble("Noorderbreedte"));
                                        System.out.print(situatie.getTitel());
                                        results.add(situatie);
                                    }
                                    if (rsPosts.getInt("Type") == 1) {

                                        Evenement evenement = new Evenement();
                                        evenement.setPostID(rsPosts.getInt("PostID"));
                                        evenement.setDatum(rsPosts.getString("Datum"));
//                        evenement.setSoort(rs.getInt("Soort"));
                                        evenement.setTitel(rsPosts.getString("Titel"));
                                        evenement.setInhoud(rsPosts.getString("Inhoud"));
                                        //situatie.setAfbeelding(rs.getString("Afbeelding"));
                                        evenement.setStraat(rsPosts.getString("Straat"));
                                        evenement.setGemeente(rsPosts.getString("Gemeente"));
                                        evenement.setPlaats(rsPosts.getString("Plaats"));
                                        evenement.setLand(rsPosts.getString("Land"));
                                        evenement.setOosterlengte(rsPosts.getDouble("Oosterlengte"));
                                        evenement.setNoorderbreedte(rsPosts.getDouble("Noorderbreedte"));
                                        evenement.setBeginDatum(rsPosts.getString("BeginDatum"));
                                        evenement.setEindDatum(rsPosts.getString("EindDatum"));
                                        results.add(evenement);

                                    }
                                    gebruikerInfo.setMijnPosts(results);
                                }
                            }

                        }
                        try (PreparedStatement filterStatement = conn.prepareStatement("select * from filters where Gebruiker=" + gebruikerInfo.getGebruikerID())) {
                            try (ResultSet rsFilters = filterStatement.executeQuery()) {
                                Filters filters = new Filters();

                                while (rsFilters.next()) {
                                    filters.setEvenementen(rsFilters.getInt("Evenementen"));
                                    filters.setSituaties(rsFilters.getInt("Situaties"));
                                    filters.setGoedgekeurdEvenementen(rsFilters.getInt("GoedgekeurdEvenementen"));
                                    filters.setGoedgekeurdSituaties(rsFilters.getInt("GoedgekeurdSituaties"));
                                    filters.setKm(rsFilters.getInt("Km"));
                                    gebruikerInfo.setFilters(filters);
                                }
                            }

                        }//eind filters

                        setGebruiker(gebruikerInfo);
                    }


                    return gebruikerInfo;
                }
            }
        } catch (SQLException ex) {
            throw new WebApplicationException(ex);
        }
    }

    @Path("updategebruiker")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Gebruiker updateGebruiker(Gebruiker gebruiker) {
        Gebruiker gebruikerInfo = new Gebruiker();

        try (Connection conn = source.getConnection()) {
            try (PreparedStatement stat = conn.prepareStatement("select * from gebruiker where GebruikerID=" + gebruiker.getGebruikerID())) {
                try (ResultSet rs = stat.executeQuery()) {

                    while (rs.next()) {
                        gebruikerInfo.setGebruikerID(rs.getInt("GebruikerID"));
                        gebruikerInfo.setGebruikersnaam(rs.getString("Gebruikersnaam"));
                        gebruikerInfo.setNaam(rs.getString("Naam"));
                        gebruikerInfo.setVoornaam(rs.getString("Voornaam"));
                        gebruikerInfo.setEmail(rs.getString("Email"));
                        gebruikerInfo.setBeheerder(rs.getInt("Beheerder"));
                    }
                    if (gebruikerInfo.getGebruikerID() != 0) {
                        try (PreparedStatement update = conn.prepareStatement("update gebruiker set "
                                + " Gebruikersnaam=?, Naam=?, Voornaam=?, Email=?, Wachtwoord=?, Beheerder=?"
                                + " where GebruikerID=" + gebruikerInfo.getGebruikerID())) {
                            update.setString(1, gebruiker.getGebruikersnaam());
                            update.setString(2, gebruiker.getNaam());
                            update.setString(3, gebruiker.getVoornaam());
                            update.setString(4, gebruiker.getEmail());
                            update.setString(5, gebruiker.getWachtwoord());
                            update.setInt(6, gebruiker.getBeheerder());
                            update.executeUpdate();
                            try (PreparedStatement updateFilters = conn.prepareStatement("update filters set "
                                    + " Evenementen=?, Situaties=?, GoedgekeurdEvenementen=?, GoedgekeurdSituaties=?, Km=?"
                                    + " where Gebruiker=" + gebruikerInfo.getGebruikerID())) {

                                updateFilters.setInt(1, gebruiker.getFilters().getEvenementen());
                                updateFilters.setInt(2, gebruiker.getFilters().getSituaties());
                                updateFilters.setInt(3, gebruiker.getFilters().getGoedgekeurdEvenementen());
                                updateFilters.setInt(4, gebruiker.getFilters().getGoedgekeurdSituaties());
                                updateFilters.setInt(5, gebruiker.getFilters().getKm());
                                updateFilters.executeUpdate();
                            }

                            setGebruiker(gebruiker);
                            return gebruiker;

                        }
                    }

                    return gebruikerInfo;
                }
            }
        } catch (SQLException ex) {
            throw new WebApplicationException(ex);
        }
    }

    @Path("gebruikerlogin")
    @POST()
    @Produces(MediaType.APPLICATION_JSON)
    public Gebruiker gebruikerLogin(Gebruiker gebruiker) {
        Gebruiker gebruikerInfo = new Gebruiker();
        try (Connection conn = source.getConnection()) {
            try (PreparedStatement stat = conn.prepareStatement("select * from gebruiker where Gebruikersnaam=\"" + gebruiker.getGebruikersnaam() + "\"")) {
                try (ResultSet rs = stat.executeQuery()) {

                    while (rs.next()) {
                        if (gebruiker.getWachtwoord().equals(rs.getString("Wachtwoord"))) {
                            System.out.print("gebruiker werd gevonden bij log in");
                            System.out.print(rs.getString("Gebruikersnaam"));
                            gebruikerInfo.setGebruikerID(rs.getInt("GebruikerID"));
                            gebruikerInfo.setGebruikersnaam(rs.getString("Gebruikersnaam"));
                            gebruikerInfo.setNaam(rs.getString("Naam"));
                            gebruikerInfo.setVoornaam(rs.getString("Voornaam"));
                            gebruikerInfo.setEmail(rs.getString("Email"));
                            gebruikerInfo.setBeheerder(rs.getInt("Beheerder"));
                            try (PreparedStatement posts = conn.prepareStatement("select * from post where GebruikerID=" + gebruikerInfo.getGebruikerID())) {
                                try (ResultSet rsPosts = posts.executeQuery()) {
                                    List<Post> results = new ArrayList<Post>();

                                    while (rsPosts.next()) {
                                        if (rsPosts.getInt("Type") == 0) {
                                            Situatie situatie = new Situatie();
                                            situatie.setPostID(rsPosts.getInt("PostID"));
                                            situatie.setDatum(rsPosts.getString("Datum"));
                                            situatie.setSoort(rsPosts.getInt("Soort"));
                                            situatie.setTitel(rsPosts.getString("Titel"));
                                            situatie.setInhoud(rsPosts.getString("Inhoud"));
                                            //situatie.setAfbeelding(rs.getString("Afbeelding"));
                                            situatie.setStraat(rsPosts.getString("Straat"));
                                            situatie.setGemeente(rsPosts.getString("Gemeente"));
                                            situatie.setPlaats(rsPosts.getString("Plaats"));
                                            situatie.setLand(rsPosts.getString("Land"));
                                            situatie.setOosterlengte(rsPosts.getDouble("Oosterlengte"));
                                            situatie.setNoorderbreedte(rsPosts.getDouble("Noorderbreedte"));
                                            System.out.print(situatie.getTitel());
                                            results.add(situatie);
                                        }
                                        if (rsPosts.getInt("Type") == 1) {

                                            Evenement evenement = new Evenement();
                                            evenement.setPostID(rsPosts.getInt("PostID"));
                                            evenement.setDatum(rsPosts.getString("Datum"));
//                        evenement.setSoort(rs.getInt("Soort"));
                                            evenement.setTitel(rsPosts.getString("Titel"));
                                            evenement.setInhoud(rsPosts.getString("Inhoud"));
                                            //situatie.setAfbeelding(rs.getString("Afbeelding"));
                                            evenement.setStraat(rsPosts.getString("Straat"));
                                            evenement.setGemeente(rsPosts.getString("Gemeente"));
                                            evenement.setPlaats(rsPosts.getString("Plaats"));
                                            evenement.setLand(rsPosts.getString("Land"));
                                            evenement.setOosterlengte(rsPosts.getDouble("Oosterlengte"));
                                            evenement.setNoorderbreedte(rsPosts.getDouble("Noorderbreedte"));
                                            evenement.setBeginDatum(rsPosts.getString("BeginDatum"));
                                            evenement.setEindDatum(rsPosts.getString("EindDatum"));
                                            results.add(evenement);

                                        }
                                        gebruikerInfo.setMijnPosts(results);
                                    }
                                }

                            }
                            try (PreparedStatement filterStatement = conn.prepareStatement("select * from filters where Gebruiker=" + gebruikerInfo.getGebruikerID())) {
                                try (ResultSet rsFilters = filterStatement.executeQuery()) {
                                    Filters filters = new Filters();

                                    while (rsFilters.next()) {
                                        filters.setEvenementen(rsFilters.getInt("Evenementen"));
                                        filters.setSituaties(rsFilters.getInt("Situaties"));
                                        filters.setGoedgekeurdEvenementen(rsFilters.getInt("GoedgekeurdEvenementen"));
                                        filters.setGoedgekeurdSituaties(rsFilters.getInt("GoedgekeurdSituaties"));
                                        filters.setKm(rsFilters.getInt("Km"));
                                        gebruikerInfo.setFilters(filters);
                                    }
                                }

                            }//eind filters

                            setGebruiker(gebruikerInfo);
                        }
                    }//einde if gebruiker ww is correct

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
    public Gebruiker setTmpGebruiker() {
        System.out.print("tmpGebruiker werd aangeroepen ");
        return gebruiker;
    }
    @Path("admin")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Post admin(String gemeente) {
        
    return null;
    }
//    @Path("admin/edit")
//    @POST
//    @Consumes(MediaType.APPLICATION_JSON)
//    public void goedkeuren(int postid) {
//          try (Connection conn = source.getConnection()) {
//              try(PreparedStatement stat =conn.prepareStatement("update post set GoedGekeurd=1 where PostID="+postid)){
//                  stat.executeUpdate();
//              }
//          }} catch (SQLException ex) {
//                Logger.getLogger(GebruikerServices.class.getName()).log(Level.SEVERE, null, ex);
//            }
//    
//    }
    

    @Path("newgebruiker")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Gebruiker newGebruiker(Gebruiker gebruiker) {
//       System.out.print("nieuw gebruiker werd aan gemaakt");
        Gebruiker gebruikerInfo = new Gebruiker();
        String bestandegebruiker;
        String gebruikerQuery = "insert into gebruiker ("
                + "Gebruikersnaam , Naam , Voornaam , Email , Wachtwoord , FacebookKey, Beheerder ) value (?,?,?,?,?,?,'9999')";
        try (Connection conn = source.getConnection()) {
            try (PreparedStatement stat = conn.prepareStatement("select * from gebruiker ")) {
                try (ResultSet rs = stat.executeQuery()) {
                    while (rs.next()) {
                        gebruikerInfo.setGebruikersnaam(rs.getString("Gebruikersnaam"));
                        if (gebruikerInfo.getGebruikersnaam().equals(gebruiker.getGebruikersnaam())) {

                            return null;
                        }
                    }
                    try (PreparedStatement insert = conn.prepareStatement(gebruikerQuery)) {
                        insert.setString(1, gebruiker.getGebruikersnaam());
                        insert.setString(2, gebruiker.getNaam());
                        insert.setString(3, gebruiker.getVoornaam());
                        insert.setString(4, gebruiker.getEmail());
                        insert.setString(5, gebruiker.getWachtwoord());
                        insert.setString(6, gebruiker.getFacebookID());
                        insert.executeUpdate();
                        System.out.print("insert gebruiker ok");
                        try (PreparedStatement newGebruiker = conn.prepareStatement(
                                "select * from gebruiker where Gebruikersnaam = \"" + gebruiker.getGebruikersnaam() + "\"")) {
                            try (ResultSet resultaatNewGebruiker = newGebruiker.executeQuery()) {
                                while (resultaatNewGebruiker.next()) {
                                    gebruiker.setGebruikerID(resultaatNewGebruiker.getInt("GebruikerID"));
                                    try (PreparedStatement filtersStatement = conn.prepareStatement(//filters aan maken 
                                            "insert into filters ("
                                            + "Gebruiker, Evenementen , Situaties , GoedgekeurdEvenementen ,"
                                            + " GoedgekeurdSituaties , Km  ) value (" + gebruiker.getGebruikerID() + ",0,0,0,0)")) {
                                        filtersStatement.executeUpdate();
                                    }
                                }
                            }
                        }
                    }
                    return this.gebruiker = gebruiker;
                }
            }
        } catch (SQLException ex) {
            throw new WebApplicationException(ex);
        }

    }

    private void setGebruiker(Gebruiker gebruiker) {
        this.gebruiker = gebruiker;
    }
}
