package domain;


import java.util.ArrayList;

public class Gebruiker {
 
private int gebruikerID;
private String gebruikersnaam;
private int noorderbreedte;
private int oosterlengte;
private int zoom;
private ArrayList<Post> posts;
private ArrayList<Post> recentePosts;
private int facebookID;
private int twitterID;
private String moderator;

public Gebruiker(int gebruikerID, String gebruikersnaam,int facebookKey, int twitterKey, String moderator)
{
        this.gebruikerID = gebruikerID;
        this.gebruikersnaam = gebruikersnaam;
        this.noorderbreedte = 0;
        this.oosterlengte = 0;
        this.zoom = 0;
        this.facebookID = facebookKey;
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

    public int getNoorderbreedte() {
        return noorderbreedte;
    }

    public void setNoorderbreedte(int noorderbreedte) {
        this.noorderbreedte = noorderbreedte;
    }

    public int getOosterlengte() {
        return oosterlengte;
    }

    public void setOosterlengte(int oosterlengte) {
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

    public int getFacebookID() {
        return facebookID;
    }

    public void setFacebookID(int facebookID) {
        this.facebookID = facebookID;
    }

    public int getTwitterID() {
        return twitterID;
    }

    public void setTwitterID(int twitterID) {
        this.twitterID = twitterID;
    }

    public String getModerator() {
        return moderator;
    }

    public void setModerator(String moderator) {
        this.moderator = moderator;
    }
    

}
