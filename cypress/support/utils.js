// before utils for accessing the sports page
Cypress.Commands.add('getSportsPage', () => { 
    cy.visit('/sports/');
    cy.cookiesConfig('Accept All Cookies');
});

// generic command to navigate menu item
Cypress.Commands.add('getSportsNav', (menu) => { 
    cy.get(`#sportsNav_sportsList:contains("${menu}")`).click();
});

// manage cookies
Cypress.Commands.add('cookiesConfig', (action) => {
    // basic implementation to click the "Accept All Cookies" button.
    // further implementation is required to be perform on the "Manage Cookies" button. id='#onetrust-pc-btn-handler'

    cy.wait("@cookieConsent").its('response.statusCode').should('equal', 200);
    cy.get(`#onetrust-accept-btn-handler:contains("${action}")`, {timeout: 30000}).click({ force: true });
});

Cypress.Commands.add('betSelection', (menu, item) => {
    switch (menu) {
        case 'in-play':
            cy.get('#sportList__link__inplay > .sportsList__label').then(($el) => {
                expect($el).to.contain('In-Play');
            });
            cy.get('#home-rab > .betBundlesView > .groupHeader').then(($el) => {
                expect($el).to.contain('Request a Bet');
            });
            cy.get('#event-selection-5466402819 > .button__bet__odds').click();

        case 'football':
            cy.get('#sportList__link__soccer > .sportsList__label')
                .should('have.text', 'Football')
                .click();

        default:
            cy.get('#sportList__link__home > .sportsList__label').then(($el) => {
                expect($el).to.contain('Home');
                cy.addBets(item)
            });
    }
});


// use to verify the bet count
Cypress.Commands.add('verifyBetSlipCount', (item) => { 
    cy.get('.singleBetsCounter').then(($betEl) => { 
        expect($betEl).to.contain(`(${item})`);
    });
});

Cypress.Commands.add('addBets', (index) => {
    cy.get('.selectionBlock').find('.button__bet__odds').then(($betEl) => { 
        cy.get($betEl[index]).click({force: true});
    });
});

Cypress.Commands.add("removeBets", (action, index) => { 
    // set action to null for individual removal
    const obj = { action, index };
    
    if (obj.action !== 'all') {
        cy.get('.paddingLeft').find('.remove').then(($betEl) => { 
            cy.get($betEl[index]).click({force: true});
        });
    } else {
        cy.get('a[title="Remove All"]').click();
        cy.get('#confirmationOverlay').contains('Are you sure you want to remove all selections from your Bet Slip?');
        cy.get('.-yes').click();
    }   
});

