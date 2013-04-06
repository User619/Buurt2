package domain;

import java.util.Date;

public class Reactie  {

    private int reactieID;
    private Gebruiker gebruiker;
    private Date datum;
    private String inhoud;

    public Reactie(int reactieID, Gebruiker gebruiker, Date datum, String inhoud)  {
        this.reactieID = reactieID;
        this.gebruiker = gebruiker;
        this.datum = datum;
        this.inhoud = inhoud;
    }
    
}
