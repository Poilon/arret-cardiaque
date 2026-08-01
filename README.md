> **Ce dépôt a déménagé.** Arrêt cardiaque (ALS, ERC 2025) fait maintenant partie du monorepo
> [Poilon/carabin](https://github.com/Poilon/carabin), dans `arret-cardiaque/`, et est en ligne sur
> **https://poilon.com/carabin/arret-cardiaque/**
>
> Ce dépôt ne sert plus qu'une redirection. Le code et son historique continuent
> là-bas — ne rien committer ici.

# Arrêt cardiaque — algorithme adulte

Affiche **hors-ligne** de l'algorithme de l'arrêt cardiaque chez l'adulte
(FV/TVsp/Asystolie/AESP), destinée aux **médecins et internes** : les deux voies
numérotées, la qualité de la RCP, les énergies de choc, la pharmacothérapie, la
protection des voies aériennes, le RACS et les causes réversibles.

- **Site statique**, un seul fichier `index.html` (aucune dépendance externe).
- **PWA installable** sur l'écran d'accueil, fonctionne sans connexion (service worker).
- L'affiche est composée à **taille fixe (1640 px)** puis mise à l'échelle du viewport
  par `fitPoster()` : tout tient à l'écran, **sans défilement**, de 800×600 à 1920×1080.
  Conséquence : la feuille de style ne contient **aucune media query** — la mise en page
  dépend de la largeur de l'affiche, pas de celle de l'écran.

> Sur un téléphone en portrait, une affiche paysage réduite pour tenir en entier donne
> un texte de quelques pixels. Le zoom par pincement reste actif, mais une vue verticale
> dédiée au mobile reste à faire si l'usage en garde sur téléphone compte.

## Origine du contenu et droits

Cette version **reprend la structure et le contenu d'une affiche** inspirée des
recommandations de l'*American Heart Association* (encadrés numérotés 1–7 et A–C,
panneaux latéraux, causes réversibles). Ce n'est donc **pas une création originale** :
c'est une adaptation.

Ce qui a été refait : la **terminologie**, retraduite en français clinique (RCP et non
RCR, adrénaline et non épinéphrine, embolie pulmonaire et non « thrombose pulmonaire »,
RACS et non RCS), ainsi que deux **contresens** de la traduction source — la PetCO₂ doit
être décrite comme *basse* et non « fiable », et « tension des pneumothorax » devient
*pneumothorax sous tension*.

Le droit d'auteur protège l'*expression* (mise en page, formulations exactes), **pas les
faits ni la procédure** (doses, ratios, énergies, séquence). La mise en page et
l'enchaînement des encadrés étant dérivés de l'affiche source :

- usage **non commercial**, pédagogique, avec mention de la source ;
- avant toute **diffusion large ou commerciale**, faire vérifier les droits sur la mise
  en page d'origine, ou redessiner l'organigramme de façon indépendante ;
- **ERC** / **AHA** : © tous droits réservés — réutiliser *leurs* figures suppose une
  autorisation.

**Ce n'est pas un dispositif médical.** Ne remplace ni le jugement clinique, ni la
formation, ni les protocoles de l'établissement. Vérifier la version en vigueur des
recommandations applicables en France sur [cprguidelines.eu](https://www.cprguidelines.eu/).

## Développement local

```bash
python3 -m http.server 8080   # puis http://localhost:8080
```

Pour contrôler le rendu sans navigateur interactif :

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless=new --disable-gpu --window-size=1600,900 \
  --screenshot=/tmp/ac.png --virtual-time-budget=10000 \
  "file://$PWD/index.html"
```

## Déploiement sur poilon.com/arret-cardiaque (GitHub Pages)

Le workflow `.github/workflows/deploy.yml` publie automatiquement à chaque push sur
`main` (Settings → Pages → Source : **GitHub Actions**). Le domaine personnalisé
configuré sur `poilon.github.io` s'applique aux project pages.

Le nom du cache du service worker contient `__BUILD__`, remplacé par le SHA du commit
au déploiement : le cache hors-ligne se purge donc tout seul à chaque mise en ligne,
aucune variable à incrémenter à la main.
