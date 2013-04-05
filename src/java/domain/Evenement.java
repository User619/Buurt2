package domain;

import domain.Post;
import java.awt.Image;
import java.util.ArrayList;
import java.util.Date;

public class Evenement extends Post {

    private Date beginDatum;
    private Date eindDatum;

    public Evenement(int PostID, String titel, String inhoud, Image afbeelding, Date datum, int noorderbreedte, int oosterlengte, String straat, String gemeente, String plaats, String land, Gebruiker gebruiker, ArrayList likes, ArrayList reacties, Date beginDatum, Date eindDatum) {
        super(PostID, titel, inhoud, afbeelding, datum, noorderbreedte, oosterlengte, straat, gemeente, plaats, land, gebruiker, likes, reacties);
        this.beginDatum = beginDatum;
        this.eindDatum = eindDatum;
    }

    public Evenement(int PostID, String titel, String inhoud, Image afbeelding, Date datum, int noorderbreedte, int oosterlengte, String straat, String gemeente, String plaats, String land, Gebruiker gebruiker, ArrayList likes, ArrayList reacties, String type, Date beginDatum, Date eindDatum) {
        super(PostID, titel, inhoud, afbeelding, datum, noorderbreedte, oosterlengte, straat, gemeente, plaats, land, gebruiker, likes, reacties);
        this.beginDatum = beginDatum;
        this.eindDatum = eindDatum;
    }
}
