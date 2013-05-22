package domain;

import java.util.ArrayList;
import java.util.List;

public class Gebruiker {

    private int gebruikerID;
    private String gebruikersnaam;
    private String naam;
    private String voornaam;
    private String email;
    private String wachtwoord;
    private String facebookID;
    private String twitterID;
    private double noorderbreedte;
    private double oosterlengte;
    private int beheerder;
    private List<Post> mijnPosts;
    private List<Post> recentePosts;
    private Filters filters;

    public Gebruiker(int gebruikerID, String gebruikersnaam, String naam, String voornaam, String email, String wachtwoord, String facebookID, String twitterID, double noorderbreedte, double oosterlengte, int beheerder, ArrayList<Post> mijnPosts, ArrayList<Post> recentePosts) {
        this.gebruikerID = gebruikerID;
        this.gebruikersnaam = gebruikersnaam;
        this.naam = naam;
        this.voornaam = voornaam;
        this.email = email;
        this.wachtwoord = wachtwoord;
        this.facebookID = facebookID;
        this.twitterID = twitterID;
        this.noorderbreedte = noorderbreedte;
        this.oosterlengte = oosterlengte;
        this.beheerder = beheerder;
        this.mijnPosts = mijnPosts;
        this.recentePosts = recentePosts;
    }

    

    public Gebruiker() {
    }

    public Filters getFilters() {
        return filters;
    }

    public void setFilters(Filters filters) {
        this.filters = filters;
    }

    public int getBeheerder() {
        return beheerder;
    }

    public void setBeheerder(int beheerder) {
        this.beheerder = beheerder;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

   

    public String getNaam() {
        return naam;
    }

    public void setNaam(String naam) {
        this.naam = naam;
    }

    public String getVoornaam() {
        return voornaam;
    }

    public void setVoornaam(String voornaam) {
        this.voornaam = voornaam;
    }

    public String getWachtwoord() {
        return wachtwoord;
    }

    public void setWachtwoord(String wachtwoord) {
        this.wachtwoord = wachtwoord;
    }


    public int getGebruikerID() {
        return gebruikerID;
    }

    public void setGebruikerID(int gebruikerID) {
        this.gebruikerID = gebruikerID;
    }

    public String getGebruikersnaam() {
        return gebruikersnaam;
    }

    public void setGebruikersnaam(String gebruikersnaam) {
        this.gebruikersnaam = gebruikersnaam;
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

    

    public List<Post> getMijnPosts() {
        return mijnPosts;
    }

    public void setMijnPosts(List<Post> mijnPosts) {
        this.mijnPosts = mijnPosts;
    }

    public List<Post> getRecentePosts() {
        return recentePosts;
    }

    public void setRecentePosts(List<Post> recentePosts) {
        this.recentePosts = recentePosts;
    }

    public String getFacebookID() {
        return facebookID;
    }

    public void setFacebookID(String facebookID) {
        this.facebookID = facebookID;
    }

    public String getTwitterID() {
        return twitterID;
    }

    public void setTwitterID(String twitterID) {
        this.twitterID = twitterID;
    }

}
