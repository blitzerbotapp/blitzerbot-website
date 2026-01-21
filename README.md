# BlitzerBot Website

Eine moderne, hochwertige Website für die BlitzerBot App, inspiriert von quittrapp.com mit BlitzerBot Brand-Farben und Design.

## 🎨 Brand Colors

- **Primary Blue**: `#1E3A8A` - Für Navigation, Header, Hintergrund
- **Primary Orange**: `#FF8A00` - Für Radar/Blitzer Pins, Warnungen, CTA Buttons
- **Dark Background**: `#0F172A` - Haupt-Hintergrund
- **Secondary Dark**: `#020617` - Sekundärer Hintergrund
- **Primary Text**: `#FFFFFF` - Haupttext
- **Secondary Text**: `#E5E7EB` - Sekundärer Text

## 📁 Struktur

```
blitzerbot-website/
├── index.html          # Haupt-HTML-Datei
├── styles.css          # Alle Styles und Animationen
├── script.js           # JavaScript für Interaktivität
├── assets/             # Assets (Logo, Icons)
│   ├── blitzerbot-logo.png
│   ├── apple-icon.svg
│   └── google-play-icon.svg
└── mockups/            # Symlink zu Mockup-Bildern
    ├── 1.jpg
    ├── 2.jpg
    ├── 3.jpg
    ├── 4.jpg
    ├── 5.jpg
    └── 6.jpg
```

## 🚀 Features

- ✅ Modernes, responsives Design
- ✅ Smooth Scroll Animationen
- ✅ FAQ Accordion
- ✅ Animated Counter für Statistiken
- ✅ Mobile Menu
- ✅ Parallax Effekte
- ✅ Intersection Observer für Scroll-Animationen
- ✅ Dark Mode First Design

## 📱 Responsive

Die Website ist vollständig responsive und optimiert für:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (< 768px)

## 🎯 Verwendung

1. Öffne `index.html` in einem modernen Browser
2. Die Website verwendet die Mockup-Bilder aus dem `mockups/` Ordner
3. Alle Assets sind im `assets/` Ordner

## 🔧 Anpassungen

### Farben ändern
Bearbeite die CSS-Variablen in `styles.css`:
```css
:root {
    --primary-blue: #1E3A8A;
    --primary-orange: #FF8A00;
    /* ... */
}
```

### Inhalte ändern
Bearbeite die entsprechenden Abschnitte in `index.html`

### Animationen anpassen
Bearbeite die Animationen in `styles.css` und `script.js`

## 📝 Notizen

- Die Mockup-Bilder werden über einen Symlink verlinkt
- Das Logo wird aus den App-Assets kopiert
- Alle Icons sind als SVG implementiert für beste Qualität
