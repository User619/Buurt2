package domain;

import java.util.ArrayList;

public class Systeem {

    private ArrayList<Gebruiker> gebruikers;
    private ArrayList<Gebruiker> moderators;

    public Systeem() {
        gebruikers = new ArrayList<Gebruiker>();
        moderators = new ArrayList<Gebruiker>();
    }
}
