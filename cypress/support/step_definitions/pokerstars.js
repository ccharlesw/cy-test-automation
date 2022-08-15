import { Before, Given, And, Then, When } from "@badeball/cypress-cucumber-preprocessor";

Before(() => { 
    // get network requests
    cy.routeRequests();
});

// Adding bets to the bet slip scenario
Given("I am placing a bet", () => {
    cy.getSportsPage();
    cy.get('#tab-nav-betslip .singleBetsCounter')
        .contains("(0)");
});

And("I click to add a bet", () => { 
    // custom to place one or more bets
    // by calling the betSelection command and with params (menu, index)
    cy.betSelection('home', 0);
    cy.betSelection('home', 2);
});

Then("The bet slip should increase", () => {
    cy.verifyBetSlipCount(2);
});
 
When("I remove a bet", () => {
    cy.removeBets('null', 0);
    //cy.removeBets('all', 0); 
});

Then("The bet slip should decrease", () => { 
    cy.verifyBetSlipCount(1);
});
