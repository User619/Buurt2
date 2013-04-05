package domain;

import domain.Post;
import java.awt.Image;
import java.util.ArrayList;
import java.util.Date;

public class Situatie extends Post {

    private String type;

    public Situatie(
            int PostID, 
            String titel, 
            String inhoud, 
            Image afbeelding, 
            Date datum, 
            int noorderbreedte, 
            int oosterlengte,
            String straat,
            String gemeente, 
            String plaats, 
            String land, 
            Gebruiker gebruiker, 
            ArrayList likes, 
            ArrayList reacties, 
            String type) {
        super(PostID, titel, inhoud, afbeelding, datum, noorderbreedte, oosterlengte, straat, gemeente, plaats, land, gebruiker, likes, reacties);
        this.type = type;
    }
    public Situatie(
            int PostID, 
            String titel, 
            String inhoud, 
            Date datum, 
            int noorderbreedte, 
            int oosterlengte, 
            String straat, 
            String gemeente, 
            String plaats, 
            String land, 
            Gebruiker gebruiker, 
            ArrayList likes, 
            ArrayList reacties, 
            String type) {
        super(PostID, titel, inhoud, datum, noorderbreedte, oosterlengte, straat, gemeente, plaats, land, gebruiker, likes, reacties);
        this.type = type;
    }
}
