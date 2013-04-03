/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package domain;

import java.util.Date;

/**
 *
 * @author Aime
 */
public class Melding {
    private int meldingid;
    private int accountid;
    private int type;//0=situatie 1=evenement
    private int soort;
    private int behandels; //0=nee 1= ja want er zijn geen booleans in sql maar een tiny int wel
    private Date datum;
    private String titel;
    private String beschrijving;
    private String foto;
    private double altitude;
    private double longitude;

    public Melding(int accountid, int type, int soort, int behandels, Date datum, String titel, String beschrijving, String foto, double altitude, double longitude) {
        this.accountid = accountid;
        this.type = type;
        this.soort = soort;
        this.behandels = behandels;
        this.datum = datum;
        this.titel = titel;
        this.beschrijving = beschrijving;
        this.foto = foto;
        this.altitude = altitude;
        this.longitude = longitude;
    }
    public Melding() {
    }

    public int getSoort() {
        return soort;
    }

    public void setSoort(int soort) {
        this.soort = soort;
    }
    public String getFoto() {
        return foto;
    }

    public void setFoto(String foto) {
        this.foto = foto;
    }


    public void setAltitude(int altitude) {
        this.altitude = altitude;
    }

    public void setLongitude(int longitude) {
        this.longitude = longitude;
    }

    public void setMeldingid(int meldingid) {
        this.meldingid = meldingid;
    }

    public void setAccountid(int accountid) {
        this.accountid = accountid;
    }

    public void setDatum(Date datum) {
        this.datum = datum;
    }

    public void setType(int type) {
        this.type = type;
    }

    public void setTitel(String titel) {
        this.titel = titel;
    }

    public void setBeschrijving(String beschrijving) {
        this.beschrijving = beschrijving;
    }

    public void setBehandels(int behandels) {
        this.behandels = behandels;
    }

    public double getAltitude() {
        return altitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public int getMeldingid() {
        return meldingid;
    }

    public int getAccountid() {
        return accountid;
    }

    public Date getDatum() {
        return datum;
    }

    public int getType() {
        return type;
    }

    public String getTitel() {
        return titel;
    }

    public String getBeschrijving() {
        return beschrijving;
    }

    public int getBehandels() {
        return behandels;
    }
    
    
}
