function Translations() {
    
    var data = {
        
        // Titles
        "mainTitle": {"sv":"Mensa årsträff 2016", "en":"Mensa AG 2016", "de":"Mensa jahrestreffen 2016"},
        
        // Menu
        "mnuWelcome": {"sv":"Välkommen","en":"Welcome","de":"Willkommen"},
        "mnuMensaGbg": {"sv":"Mensa Väst","en":"Mensa Väst","de":"Mensa West"},
        "mnuGothenburg": {"sv":"Göteborg","en":"Gothenburg","de":"Göteborg"},
        "mnuVasttrafik": {"sv":"Resor","en":"Getting around","de":"Transport"},
        "mnuHotel": {"sv":"Boende","en":"Accomodations","de":"Wohnen"},
        "mnuContact": {"sv":"Kontakt","en":"Contact","de":"Kontakt"},
        "mnuFAQ": {"sv":"FAQ","en":"FAQ","de":"FAQ"},
        "mnuLogin": {"sv":"Logga in","en":"Log in","de":"Einloggen"},
        "mnuRegister": {"sv":"Anmälan","en":"Registration","de":"Benachrichtigung"},
        "mnuAG": {"sv":"Årsträffen","en":"AG","de":"Jahrestreffen"},
        "mnuActivities": {"sv":"Aktiviteter","en":"Events","de":"Angebote"},
        "mnuAGM": {"sv":"Årsmöte","en":"AGM","de":"Jahreshauptversammlung"},
        "mnuGalamiddag": {"sv":"Galamiddag","en":"Gala dinner","de":"Gala Abend"},
        "mnuLogout": {"sv":"Logga ut","en":"Log out","de":"Abmelden"},
        
        // User account
        "createAccount": {"en":"Create an account", "sv":"Skapa ett konto", "de":"Konto einrichten"},
        "createAccountInfo": {"en":"", "sv":"Ange ditt medlemsnummer och välj ett lösenord.<br>Konton skapas automatiskt första gången.", "de":"Gib deine Mitgliedsnummer ein und bestimme ein Passwort,<br> damit wird dein Konto automatisch"},
        "createAccountInfo2": {"en":"", "sv":"Medlemsnumret skall skrivas in enligt formatet landkod+år+siffror (SEyyyyxxx)", "de":"die Mitgliedsnummer bitte folgendermaßen eingeben: Länderkennung-Jahr-Schlussziffern (DEjjjjxxxx)"},
        "moreAboutYou": {"en":"More about you", "sv":"Mer om dig", "de":"Mehr über mich"},
        "foodAndShelter": {"en":"Mat & logi", "sv":"Mat & logi", "de":"Mat & logi"},
        "events": {"en":"Activities", "sv":"Aktivitet", "de":"Aktivitet"},
        "man": {"en":"Man", "sv":"Man", "de":"Mann"},
        "woman": {"en":"Woman", "sv":"Kvinna", "de":"Frau"},
        "optionalUserInfo": {"en":"Optional information", "sv":"Frivilig information", "de":"Freiwillige Informationen"},
        "descEmail": {"en":"Enter your email address if you'd like to receive information about the AG via email", "sv":"Ange din e-postadress om du vill kunna ta emot information om årsträffen via e-post.", "de":"Schicke bitte deine Email Adresse wenn du mehr Informationen über unser Jahrestreffen per Email erhalten möchtest"},
        "email": {"en":"Email", "sv":"E-post", "de":"Email"},
        "descPhone": {"en":"Enter your phone number in case we need to reach you during the AG", "sv":"Ange ditt telefonnummer ifall vi behöver nå dig under årsträffen", "de":"Schicke deine Telefonnummer, damit wir dich während des Jahrestreffen erreichen können"},
        "phone": {"en":"Mobile phone number", "sv":"Mobiltelefonnummer", "de":"Handy nummer"},
        "descGender": {"en":"Enter your gender if you wish to share a room with members of the same gender only", "sv":"Ange ditt kön om du önskar dela rum enbart med medlemmar av samma kön", "de":"Teile uns bitte mit ob du dein Zimmer nur mit Menseranern des gleich Geschlechtes teilen möchtest"},
        "descArrival": {"en":"Please enter estimated time of arrival. This information will help us plan the reception.", "sv":"Vänligen ange ungefärlig ankomstid. Det kommer att hjälpa arrangörerna att planera mottagandet.", "de":"Teile uns bitte deine Ankunftszeit mit, damit das Orga-Team den Auftakt des Jahrestreffen besser organisieren"},
        
        // Error message
        "Felaktig medlemsnummer": {"en":undefined, "sv":"Felaktig medlemsnummer", "de":"Diese Mitgliedsnummer wurde nicht gefunden"},
        
        
    };
    
    // get the text
    this.get = function(id, lng) {

        var txt = undefined;
        var entry = data[id];
        if (entry!==undefined) { 
            txt = entry[lng];
            if (txt===undefined) txt = entry['sv'];
        }
        if (txt===undefined) txt = "["+id+"]["+lng+"]";
        return txt;

    };
    
    
}