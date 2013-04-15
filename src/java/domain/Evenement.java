package domain;

import java.awt.Image;
import java.util.ArrayList;

public class Evenement extends Post {

    private String beginDatum;
    private String eindDatum;

    public Evenement(
            int PostID, 
            String titel, 
            String inhoud, 
            Image afbeelding, 
            String datum, 
            int noorderbreedte, 
            int oosterlengte, 
            String straat, 
            String gemeente, 
            String plaats, 
            String land, 
            Gebruiker gebruiker, 
            ArrayList<Gebruiker> likes, 
            ArrayList<Reactie> reacties, 
            String beginDatum, 
            String eindDatum) {
        super(PostID, titel, inhoud, afbeelding, datum, noorderbreedte, oosterlengte, straat, gemeente, plaats, land, gebruiker, likes, reacties);
        this.beginDatum = beginDatum;
        this.eindDatum = eindDatum;
    }

    public Evenement(
            int PostID, 
            String titel, 
            String inhoud, 
            Image afbeelding,
            String datum, 
            int noorderbreedte, 
            int oosterlengte, 
            String straat, 
            String gemeente, 
            String plaats, 
            String land, 
            Gebruiker gebruiker, 
            ArrayList<Gebruiker> likes, 
            ArrayList<Reactie> reacties, 
            String type, 
            String beginDatum, 
            String eindDatum) {
        super(PostID, titel, inhoud, afbeelding, datum, noorderbreedte, oosterlengte, straat, gemeente, plaats, land, gebruiker, likes, reacties);
        this.beginDatum = beginDatum;
        this.eindDatum = eindDatum;
    }

    public Evenement() {
    }

    public String getBeginDatum() {
        return beginDatum;
    }

    public void setBeginDatum(String beginDatum) {
        this.beginDatum = beginDatum;
    }

    public String getEindDatum() {
        return eindDatum;
    }

    public void setEindDatum(String eindDatum) {
        this.eindDatum = eindDatum;
    }
    
}
