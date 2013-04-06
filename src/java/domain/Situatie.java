package domain;

import java.awt.Image;
import java.util.ArrayList;

public class Situatie extends Post {

    private String soort;

    public Situatie(
            int PostID, 
            String titel, 
            String inhoud, 
            Image afbeelding, 
            String datum, 
            double noorderbreedte, 
            double oosterlengte,
            String straat,
            String gemeente, 
            String plaats, 
            String land, 
            Gebruiker gebruiker, 
              ArrayList<Gebruiker> likes, 
            ArrayList<Reactie> reacties, 
            
            String type) {
        super(PostID, titel, inhoud, afbeelding, datum, noorderbreedte, oosterlengte, straat, gemeente, plaats, land, gebruiker, likes, reacties);
        this.soort = type;
    }
    public Situatie(
            int PostID, 
            String titel, 
            String inhoud, 
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
            String type) {
        super(PostID, titel, inhoud, datum, noorderbreedte, oosterlengte, straat, gemeente, plaats, land, gebruiker, likes, reacties);
        this.soort = type;
    }

    public Situatie() {
    }

    public String getSoort() {
        return soort;
    }

    public void setSoort(String soort) {
        this.soort = soort;
    }
}
