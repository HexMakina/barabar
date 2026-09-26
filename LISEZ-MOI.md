# Priya Padma — Sens unique

Diaporama de stand en français pour **Lauise Warinda**. Sept diapositives illustrées, dix secondes par diapositive, en boucle de 70 secondes. Format horizontal 16:9, sans son.

## Lancer le diaporama

1. Si vous utilisez l’archive ZIP, extrayez-la entièrement.
2. Ouvrez `index.html` dans un navigateur récent : Chrome, Edge ou Firefox.
3. Cliquez sur **Plein écran**, ou appuyez sur **F**. Le défilement démarre automatiquement une fois les illustrations chargées.

Aucune connexion Internet, installation ni compte n’est nécessaire. Conservez ensemble `index.html`, `styles.css`, `slideshow.js` et le dossier `images`. Copiez le dossier complet sur l’ordinateur du stand ou une clé USB.

Les commandes se masquent après trois secondes. Bougez la souris, touchez l’écran ou utilisez le clavier pour les afficher. Si une commande garde le focus au clavier, elle reste visible jusqu’à ce que vous la quittiez.

| Commande | Action |
| --- | --- |
| Espace | Mettre en pause ou reprendre |
| Flèche droite / gauche | Image suivante / précédente |
| F | Activer ou quitter le plein écran |
| Échap | Quitter le plein écran |
| Tabulation, puis Entrée ou Espace | Utiliser les boutons au clavier |

Le diaporama suspend son chronomètre lorsque son onglet est masqué. Il reprend au retour sur l’onglet. Une navigation manuelle laisse dix secondes à la nouvelle diapositive et conserve l’état lecture/pause. Sur un écran d’un autre format, des bandes sombres préservent les proportions et les textes.

Pour une diffusion continue sur le stand, désactivez la mise en veille de l’ordinateur dans ses réglages. Les transitions s’effacent si le système demande de réduire les animations.

## Contenu

Le titre, le nom de l’autrice, le synopsis et l’ISBN **9798332039683** proviennent des informations fournies par l’utilisateur. Les grottes de Barabar ont été confirmées comme lieu du roman. Les phrases promotionnelles ne sont pas des citations du livre.

Les six aquarelles ont été créées avec l’outil intégré **imagegen**. Ce sont des interprétations artistiques, pas des photographies, des reconstitutions archéologiques ni la couverture officielle du livre. Priya est montrée de dos ou en silhouette ; la dernière scène est symbolique. Les textes restent des éléments HTML indépendants des images.

Les prompts exacts et les références architecturales figurent dans `PROMPTS.md`. Les illustrations finales se trouvent dans `images/` ; la première sert aussi à la dernière diapositive.

## Modifier

Modifiez les textes dans `index.html` et la mise en page dans `styles.css`. Pour changer la durée, ajustez `SLIDE_DURATION` dans `slideshow.js` **et** la durée de l’animation `progress` dans `styles.css` (actuellement 10 secondes). Aucun outil de compilation n’est nécessaire.
