Feature: Pokerstars Sports
    # Add and remove bets to the bet slip scenario
    Scenario: Adding and removing bets
        Given I am placing a bet
        And I click to add a bet
        Then The bet slip should increase
        When I remove a bet
        Then The bet slip should decrease
