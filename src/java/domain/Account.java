
package domain;

public class Account {
    private int id;
    private int type;
    private String naam;
    private String voornaam;
    private int punten;
    public Account(String naam, String voornaam){
        setNaam(naam);
        setVoornaam(voornaam);
        id=0;
        type=0;
        punten=0;
    }
    public Account(){    
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setType(int type) {
        this.type = type;
    }

    public void setNaam(String naam) {
        this.naam = naam;
    }

    public void setVoornaam(String voornaam) {
        this.voornaam = voornaam;
    }

    public void setPunten(int punten) {
        this.punten = punten;
    }

    
    public int getId() {
        return id;
    }

    public int getType() {
        return type;
    }

    public String getNaam() {
        return naam;
    }

    public String getVoornaam() {
        return voornaam;
    }

    public int getPunten() {
        return punten;
    }
    
}

