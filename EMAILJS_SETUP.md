# EmailJS Setup für Kontaktformular

Das Kontaktformular verwendet EmailJS, um E-Mails automatisch an `info@blitzerbot.com` und `info@laionex.com` zu senden.

## Setup-Anleitung

### 1. EmailJS Account erstellen
1. Gehe zu [https://www.emailjs.com/](https://www.emailjs.com/)
2. Erstelle einen kostenlosen Account
3. Verifiziere deine E-Mail-Adresse

### 2. Email Service konfigurieren
1. Gehe zu **Email Services** im Dashboard
2. Klicke auf **Add New Service**
3. Wähle deinen E-Mail-Provider (Gmail, Outlook, etc.)
4. Folge den Anweisungen zur Verbindung
5. Notiere dir die **Service ID**

### 3. Email Template erstellen
1. Gehe zu **Email Templates** im Dashboard
2. Klicke auf **Create New Template**
3. Verwende folgende Konfiguration:

**Template Name:** BlitzerBot Contact Form

**Subject:**
```
{{subject}}
```

**Content:**
```
Von: {{from_name}}
E-Mail: {{from_email}}
Thema: {{topic}}

Nachricht:
{{message}}

---
Diese Nachricht wurde über die BlitzerBot Website gesendet.
```

**To Email:** 
- `info@blitzerbot.com` (Hauptempfänger)
- Füge `info@laionex.com` als BCC hinzu (in den Template-Einstellungen)

4. Notiere dir die **Template ID**

### 4. Public Key holen
1. Gehe zu **Account** → **General**
2. Kopiere deinen **Public Key**

### 5. Code aktualisieren

Öffne `kontakt.html` und ersetze:

```javascript
emailjs.init("YOUR_PUBLIC_KEY");
```

mit deinem Public Key.

Öffne `contact-form.js` und ersetze:

```javascript
const serviceId = 'YOUR_SERVICE_ID';
const templateId = 'YOUR_TEMPLATE_ID';
```

mit deinen tatsächlichen Werten.

### 6. Testen
1. Öffne die Kontaktseite auf deiner Website
2. Fülle das Formular aus und sende es ab
3. Prüfe, ob die E-Mails an beide Adressen gesendet wurden

## Alternative: Mailto Fallback

Falls EmailJS nicht konfiguriert ist, verwendet das Formular automatisch einen `mailto:` Link als Fallback. Die E-Mail wird dann im Standard-E-Mail-Client des Benutzers geöffnet.

## Hinweis

Der kostenlose EmailJS Plan erlaubt:
- 200 E-Mails pro Monat
- 2 Email Services
- Unbegrenzte Templates

Für höhere Limits kannst du auf einen bezahlten Plan upgraden.
