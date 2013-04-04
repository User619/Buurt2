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
    private String datum;
    private String straat;    
    private int postcode;
    private String titel;
    private String beschrijving;
    private String foto;
    private double latitude;
    private double longitude;

    public Melding(int accountid, int type, int soort, int behandels, String datum, String straat, int postcode, String titel, String beschrijving, String foto, double latitude, double longitude) {
        this.accountid = accountid;
        this.type = type;
        this.soort = soort;
        this.behandels = behandels;
        this.datum = datum;
        this.straat = straat;
        this.postcode = postcode;
        this.titel = titel;
        this.beschrijving = beschrijving;
        this.foto = foto;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    public String getStraat() {
        return straat;
    }

    public void setStraat(String straat) {
        this.straat = straat;
    }

    public int getPostcode() {
        return postcode;
    }

    public void setPostcode(int postcode) {
        this.postcode = postcode;
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


    public void setLatitude(double altitude) {
        this.latitude = altitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    public void setMeldingid(int meldingid) {
        this.meldingid = meldingid;
    }

    public void setAccountid(int accountid) {
        this.accountid = accountid;
    }

    public void setDatum(String datum) {
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

    public double getLatitude() {
        return latitude;
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

    public String getDatum() {
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
