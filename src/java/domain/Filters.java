/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package domain;

/**
 *
 * @author Aime
 */
public class Filters {
    private int situaties;
    private int evenementen;
    private int goedgekeurdSituaties;
    private int goedgekeurdEvenementen;
    private int km;
    public Filters(){
    }

    public Filters(int situaties, int evenementen, int goedgekeurdSituaties, int goedgekeurdEvenementen, int km) {
        this.situaties = situaties;
        this.evenementen = evenementen;
        this.goedgekeurdSituaties = goedgekeurdSituaties;
        this.goedgekeurdEvenementen = goedgekeurdEvenementen;
        this.km = km;
    }

    public int getSituaties() {
        return situaties;
    }

    public void setSituaties(int situaties) {
        this.situaties = situaties;
    }

    public int getEvenementen() {
        return evenementen;
    }

    public void setEvenementen(int evenementen) {
        this.evenementen = evenementen;
    }

    public int getGoedgekeurdSituaties() {
        return goedgekeurdSituaties;
    }

    public void setGoedgekeurdSituaties(int goedgekeurdSituaties) {
        this.goedgekeurdSituaties = goedgekeurdSituaties;
    }

    public int getGoedgekeurdEvenementen() {
        return goedgekeurdEvenementen;
    }

    public void setGoedgekeurdEvenementen(int goedgekeurdEvenementen) {
        this.goedgekeurdEvenementen = goedgekeurdEvenementen;
    }

    public int getKm() {
        return km;
    }

    public void setKm(int km) {
        this.km = km;
    }

}
