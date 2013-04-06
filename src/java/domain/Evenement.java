package domain;

import domain.Post;
import java.awt.Image;
import java.util.ArrayList;
import java.util.Date;

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
}
