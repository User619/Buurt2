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
    private int behandels; //0=nee 1= ja want er zijn geen booleans in sql maar een tiny int wel
    private Date datum;
    private String titel;
    private String beschrijving;
    private int altitude;
    private int longitude;

    public Melding(int accountid, int type, int behandels, Date datum, String titel, String beschrijving, int altitude, int longitude) {
        this.accountid = accountid;
        this.type = type;
        this.behandels = behandels;
        this.datum = datum;
        this.titel = titel;
        this.beschrijving = beschrijving;
        this.altitude = altitude;
        this.longitude = longitude;
    }
    

    
    public Melding() {
        
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

    public int getAltitude() {
        return altitude;
    }

    public int getLongitude() {
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
