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
                        gebruikerInfo.setGebruikerID(rs.getInt("GebruikerID"));
                        gebruikerInfo.setGebruikersnaam(rs.getString("Gebruikersnaam"));
                        gebruikerInfo.setNaam(rs.getString("Naam"));
                        gebruikerInfo.setVoornaam(rs.getString("Voornaam"));
                        gebruikerInfo.setEmail(rs.getString("Email"));
                        gebruikerInfo.setBeheerder(rs.getInt("Beheerder"));
                        setGebruiker(gebruikerInfo);
                    }


                    return gebruikerInfo;
                }
            }
        } catch (SQLException ex) {
            throw new WebApplicationException(ex);
        }
    }

    @Path("updateGebruiker")
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

    @Path("tmpGebruiker")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Gebruiker setTmpGebruiker() {
        System.out.print("tmpGebruiker werd aangeroepen ");
        return gebruiker;
    }

    @Path("newgebruiker")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Gebruiker newGebruiker(Gebruiker gebruiker) {
        System.out.print("nieuw gebruiker werd aan gemaakt");
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
