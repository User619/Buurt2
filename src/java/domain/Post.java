package domain;

import java.awt.Image;
import java.util.ArrayList;

public class Post {

    private int postID;
    private String titel;
    private String inhoud;
    private Image afbeelding;
    private String datum;
    private double noorderbreedte;
    private double oosterlengte;
    private String straat;
    private String gemeente;
    private String plaats;
    private String land;
    private Gebruiker gebruiker;
    private ArrayList<Gebruiker> likes;
    private ArrayList<Reactie> reacties;
    private int soort; 
    private int goedGekeurd;

    public int getGoedGekeurd() {
        return goedGekeurd;
    }

    public void setGoedGekeurd(int goedGekeurd) {
        this.goedGekeurd = goedGekeurd;
    }

    public int getSoort() {
        return soort;
    }

    public void setSoort(int soort) {
        this.soort = soort;
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
    private String beginDatum;
    private String eindDatum;
    public Post(int PostID,
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
            ArrayList<Reactie> reacties) {
        this.postID = PostID;
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

    public Post(int PostID,
            String titel,
            String inhoud,
            String datum,
            double noorderbreedte,
            double oosterlengte,
            String straat,
            String gemeente,
            String plaats,
            String land,
            Gebruiker gebruiker,
            ArrayList<Gebruiker> likes,
            ArrayList<Reactie> reacties) {
        this.postID = PostID;
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

    public Post() {
    }

    public int getPostID() {
        return postID;
    }

    public void setPostID(int postID) {
        this.postID = postID;
    }

    public String getTitel() {
        return titel;
    }

    public void setTitel(String titel) {
        this.titel = titel;
    }

    public String getInhoud() {
        return inhoud;
    }

    public void setInhoud(String inhoud) {
        this.inhoud = inhoud;
    }

    public Image getAfbeelding() {
        return afbeelding;
    }

    public void setAfbeelding(Image afbeelding) {
        this.afbeelding = afbeelding;
    }

    public String getDatum() {
        return datum;
    }

    public void setDatum(String datum) {
        this.datum = datum;
    }

    public double getNoorderbreedte() {
        return noorderbreedte;
    }

    public void setNoorderbreedte(double noorderbreedte) {
        this.noorderbreedte = noorderbreedte;
    }

    public double getOosterlengte() {
        return oosterlengte;
    }

    public void setOosterlengte(double oosterlengte) {
        this.oosterlengte = oosterlengte;
    }

    public String getStraat() {
        return straat;
    }

    public void setStraat(String straat) {
        this.straat = straat;
    }

    public String getGemeente() {
        return gemeente;
    }

    public void setGemeente(String gemeente) {
        this.gemeente = gemeente;
    }

    public String getPlaats() {
        return plaats;
    }

    public void setPlaats(String plaats) {
        this.plaats = plaats;
    }

    public String getLand() {
        return land;
    }

    public void setLand(String land) {
        this.land = land;
    }

    public Gebruiker getGebruiker() {
        return gebruiker;
    }

    public void setGebruiker(Gebruiker gebruiker) {
        this.gebruiker = gebruiker;
    }

    public ArrayList<Gebruiker> getLikes() {
        return likes;
    }

    public void setLikes(ArrayList<Gebruiker> likes) {
        this.likes = likes;
    }

    public ArrayList<Reactie> getReacties() {
        return reacties;
    }

    public void setReacties(ArrayList<Reactie> reacties) {
        this.reacties = reacties;
    }
}
