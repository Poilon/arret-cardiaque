# Arrêt cardiaque — ALS adulte (ERC 2025)

Aide décisionnelle **hors-ligne** pour la réanimation de l'arrêt cardiaque de l'adulte,
destinée aux **médecins et internes**. Timeline visuelle de l'algorithme + minuteur de
cycle interactif (compteur de cycles 2 min, chocs, rappels adrénaline/amiodarone).

- **Site statique**, un seul fichier `index.html` (aucune dépendance externe).
- **PWA installable** sur l'écran d'accueil, fonctionne sans connexion (service worker).
- Contenu conforme aux **ERC Guidelines 2025 — Adult Advanced Life Support**, la
  recommandation officielle applicable en **France** (relayée par le **CFRC** et la **SFMU**).

## ⚠️ Licence & droits

Le droit d'auteur protège l'*expression* (textes, schémas exacts), **pas les faits ni la
procédure** (doses, ratios, énergies, séquence). Ce projet est une **création originale** :
aucun schéma ni texte n'est repris des documents ERC / AHA. Les recommandations sont
**reformulées** et les sources **citées**.

- **ERC** / **AHA** : © tous droits réservés → réutilisation de *leurs* figures = permission + frais.
- **ILCOR CoSTR** : CC BY-NC-ND (partage tel quel, non commercial, sans modification).
- Ce projet : **usage non commercial**, aide-mémoire pédagogique, avec disclaimer médical.

**Ce n'est pas un dispositif médical.** Ne remplace ni le jugement clinique, ni la
formation, ni les protocoles de l'établissement. Toujours vérifier la version en vigueur
sur [cprguidelines.eu](https://www.cprguidelines.eu/).

## Développement local

```bash
python3 -m http.server 8080   # puis http://localhost:8080
```

## Déploiement sur poilon.com/arret-cardiaque (GitHub Pages)

1. Créer un dépôt **`arret-cardiaque`** sous le compte GitHub `poilon`.
2. Pousser ce dossier sur la branche `main`.
3. Repo → **Settings → Pages → Source : GitHub Actions**.
4. Le workflow `.github/workflows/deploy.yml` publie automatiquement.
5. Le site est servi sous le domaine du compte : **https://poilon.com/arret-cardiaque**
   (le domaine personnalisé configuré sur `poilon.github.io` s'applique aux project pages).

```bash
git add -A
git commit -m "Arrêt cardiaque ALS ERC 2025"
git branch -M main
git remote add origin git@github.com:poilon/arret-cardiaque.git
git push -u origin main
```

## Mise à jour du contenu

À chaque modification de `index.html`, incrémenter la variable `CACHE` dans `sw.js`
pour forcer le rafraîchissement du cache hors-ligne des utilisateurs.
