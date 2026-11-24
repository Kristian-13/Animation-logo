# Taste My Personality — Kris · Midnight Remix

> **Taste the Beat.**

Školní projekt „Taste Your Personality“: personalizovaná produktová stránka, na které je plechovka limonády reklamou na mě, ne na značku.

🔗 **Web:** https://UZIVATEL.github.io/taste-my-personality/
📦 **Repozitář:** https://github.com/UZIVATEL/taste-my-personality

## Koncept

Limitovaná edice **Midnight Remix** vychází z hudby. Je to moje nejčastější kulisa, když se učím, kreslím nebo jen přemýšlím. Celá stránka působí jako noční pódium: plechovka levituje před točící se vinylovou deskou, kolem ní hrají reproduktory, ekvalizér skáče do rytmu a přes scénu běží páska se sloganem. Kliknutím na plechovku (nebo na tlačítko *Pusť to nahlas*) se „pustí beat“: deska zrychlí, reproduktory pulzují a z plechovky vyletí noty.

### Plechovka
- Jméno **Kris** písmem *Yellowtail*, které připomíná klasický Spencerian script z cola plechovek.
- Krémová vlna na plechovce je přetvořená do podoby **zvukové vlny** s tyrkysovou linkou.
- Tři strany potisku: logo se jménem / vinyl s názvem edice / ekvalizér, příchuť (třešeň × neonová limetka) a čárový kód.
- Potisk je skutečné HTML + CSS, ne obrázek. Kovový vzhled a kapky vody vznikají přes fotku prázdné plechovky v režimu `mix-blend-mode: multiply`.

### Grafické prvky a jejich význam
| Prvek | Význam |
|---|---|
| Vinylová deska | Hudba je střed, kolem kterého se všechno točí. Za plechovkou funguje jako slunce nebo svatozář. |
| Sluchátka | Můj vlastní svět a soustředění. |
| Kazeta „Mixtape Vol.1“ | Playlisty, které skládám pro kamarády. |
| Reproduktory a ekvalizér | Energie, „když už, tak nahlas“. |
| Noty, běžící páska, studiová mřížka | Dekorativní vzory a rytmus kompozice. |

### Barevná paleta
| Název | HEX |
|---|---|
| Midnight | `#160B33` |
| Stage Pink | `#FF3D8B` |
| EQ Cyan | `#3CF0FF` |
| Tape Amber | `#FFB547` |
| Cream Noise | `#FFF1DC` |

### Animace a interakce
- levitující plechovka a plynulé otáčení potisku (při najetí myší se točí rychleji)
- **tažením** myší nebo prstem plechovku roztočíš i se setrvačností
- **kliknutím** zapneš „play mode“ (deska, reproduktory, ekvalizér a vylétající noty)
- parallax: vrstvy se posouvají podle kurzoru, každá jinou rychlostí
- při najetí na plechovku se okolní objekty rozestoupí
- sekce pod úvodem se postupně objevují při scrollování
- respektuje `prefers-reduced-motion`

## Technické zpracování
- čisté HTML, CSS a JavaScript, bez knihoven
- vrstvení přes `position: absolute` a `z-index`, ořez potisku přes `clip-path`, velikosti uvnitř plechovky v container query jednotkách (`cqw`)
- responzivní zobrazení pro desktop, tablet i mobil
- vlastní favicon (`assets/img/favicon.svg`) a titulek stránky

## Struktura projektu
```
taste-my-personality/
├── index.html
├── README.md
├── css/
│   └── style.css
├── js/
│   └── main.js
└── assets/
    └── img/
        ├── can-mockup.png   (zmenšená fotka prázdné plechovky)
        ├── vinyl.svg
        ├── headphones.svg
        ├── cassette.svg
        ├── speaker.svg
        ├── note.svg
        └── favicon.svg
```

## Zdroje
- **Výchozí šablona:** „Coca-Cola 3D Rotation“ od Umeshe Joshiho („Ralph“). Z ní pochází princip otáčení potisku a fotka prázdné plechovky (`can-mockup.png`).
- **Ilustrace** (vinyl, sluchátka, kazeta, reproduktor, noty, favicon) jsou vlastní, ručně psané SVG.
- **Písma:** [Anton](https://fonts.google.com/specimen/Anton), [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk), [Yellowtail](https://fonts.google.com/specimen/Yellowtail) (Google Fonts, licence SIL OFL)
- Při tvorbě jsem použil/a AI asistenta (Claude) jako pomoc s kódem.

---
*Školní projekt. Nejde o oficiální produkt ani reklamu společnosti The Coca-Cola Company.*
