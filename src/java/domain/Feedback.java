/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package domain;

/**
 *
 * @author Aime
 */
public class Feedback {
    private int feedbackid;
    private int meldingid;
    private int accountid;
    private String feedback;
    private String foto;

    public Feedback(int meldingid, int accountid, String feedback, String foto) {
        this.meldingid = meldingid;
        this.accountid = accountid;
        this.feedback = feedback;
        this.foto = foto;
    }

    public Feedback() {
    }

    public void setFeedbackid(int feedbackid) {
        this.feedbackid = feedbackid;
    }

    public void setMeldingid(int meldingid) {
        this.meldingid = meldingid;
    }

    public void setAccountid(int accountid) {
        this.accountid = accountid;
    }

    public void setFeedback(String feedback) {
        this.feedback = feedback;
    }

    public void setFoto(String foto) {
        this.foto = foto;
    }

    public int getFeedbackid() {
        return feedbackid;
    }

    public int getMeldingid() {
        return meldingid;
    }

    public int getAccountid() {
        return accountid;
    }

    public String getFeedback() {
        return feedback;
    }

    public String getFoto() {
        return foto;
    }
    
}
