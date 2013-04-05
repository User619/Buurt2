package domain;

import java.awt.Image;
import java.util.ArrayList;
import java.util.Date;

public class Post {

private int postID;
private String titel;
private String inhoud;
private Image afbeelding;
private Date datum;
private int noorderbreedte;
private int oosterlengte;
private String straat;
private String gemeente;
private String plaats;
private String land;
private Gebruiker gebruiker;
private ArrayList<Gebruiker> likes;
private ArrayList<Reactie> reacties;

    public Post(int PostID, String titel, String inhoud, Image afbeelding, Date datum, int noorderbreedte, int oosterlengte, String straat, String gemeente, String plaats, String land, Gebruiker gebruiker, ArrayList likes, ArrayList reacties) {
        this.postID = postID;
        this.titel = titel;
        this.inhoud = inhoud;
        this.afbeelding = afbeelding;
        this.noorderbreedte = noorderbreedte;
        this.oosterlengte = oosterlengte;
        this.straat = straat;
        this.gemeente = gemeente;
        this.plaats = plaats;
        this.land = land;
        this.gebruiker = gebruiker;
        this.likes = likes;
        this.reacties = reacties;
    }

    public Post(int PostID, String titel, String inhoud, Date datum, int noorderbreedte, int oosterlengte, String straat, String gemeente, String plaats, String land, Gebruiker gebruiker, ArrayList likes, ArrayList reacties) {
        this.postID = postID;
        this.titel = titel;
        this.inhoud = inhoud;
        this.noorderbreedte = noorderbreedte;
        this.oosterlengte = oosterlengte;
        this.straat = straat;
        this.gemeente = gemeente;
        this.plaats = plaats;
        this.land = land;
        this.gebruiker = gebruiker;
        this.likes = likes;
        this.reacties = reacties;
    }
}
