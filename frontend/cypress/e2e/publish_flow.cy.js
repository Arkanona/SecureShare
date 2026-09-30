describe('Parcours de publication et protection des routes', () => {

  it('Redirige un utilisateur non connecté puis permet la connexion et l\'accès à /publish', () => {

    // 1. Tentative d'accès à la route /publish
    cy.visit('/publish');

    // 2. Vérification de la redirection automatique vers /login
    cy.url().should('include', '/login');

    // 3. Saisie des identifiants et validation
    // 💡 Ajuste les sélecteurs [name="..."] ou les classes selon tes composants React
    cy.get('input[name="email"]').type('test1@gmail.com');
    cy.get('input[name="password"]').type('Pass123!');
    
    // Clic sur le bouton de soumission
    cy.get('button[type="submit"]').click();

    // 4. Vérification de l'atterrissage effectif sur /publish
    cy.url().should('include', '/');
    
  });

});