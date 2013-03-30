/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package domain;

/**
 *
 * @author Aime
 */
public class Socialnetwork {
    private int accountId;
    private int facebookId;
    private int twitterId;

    public Socialnetwork(int accountId, int facebookId, int twitterId) {
        this.accountId = accountId;
        this.facebookId = facebookId;
        this.twitterId = twitterId;
    }
     public Socialnetwork() {
      
    }

    public int getAccountId() {
        return accountId;
    }

    public void setAccountId(int accountId) {
        this.accountId = accountId;
    }

    public int getFacebookId() {
        return facebookId;
    }

    public void setFacebookId(int facebookId) {
        this.facebookId = facebookId;
    }

    public int getTwitterId() {
        return twitterId;
    }

    public void setTwitterId(int twitterId) {
        this.twitterId = twitterId;
    }
    
}
