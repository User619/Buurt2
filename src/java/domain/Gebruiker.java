package domain;


import java.util.ArrayList;

public class Gebruiker {
 
private int gebruikerID;
private String gebruikersnaam;
private double noorderbreedte;
private double oosterlengte;
private int zoom;
private ArrayList<Post> posts;
private ArrayList<Post> recentePosts;
private String facebookID;
private String twitterID;
private String moderator;

public Gebruiker(int gebruikerID, String gebruikersnaam,String facebookID, String twitterKey, String moderator)
{
        this.gebruikerID = gebruikerID;
        this.gebruikersnaam = gebruikersnaam;
        this.noorderbreedte = 0;
        this.oosterlengte = 0;
        this.zoom = 0;
        this.facebookID = facebookID;
        this.twitterID = twitterKey;
        this.moderator = moderator;
        posts = new ArrayList<Post>();
        recentePosts = new ArrayList<Post>();
    }

    public Gebruiker() {
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

    public int getZoom() {
        return zoom;
    }

    public void setZoom(int zoom) {
        this.zoom = zoom;
    }

    public ArrayList<Post> getPosts() {
        return posts;
    }

    public void setPosts(ArrayList<Post> posts) {
        this.posts = posts;
    }

    public ArrayList<Post> getRecentePosts() {
        return recentePosts;
    }

    public void setRecentePosts(ArrayList<Post> recentePosts) {
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

    public String getModerator() {
        return moderator;
    }

    public void setModerator(String moderator) {
        this.moderator = moderator;
    }
    

}
