describe('home page', () => {
    it('selects stop and show destinationss', () => {
        cy.visit('http://localhost:5173');

        // select blue line route.
        const routeSelector = cy.get('main > div:nth-child(1)');
        const routeSelectorButton = routeSelector.find('button');
        routeSelectorButton.click();

        const metroBlueLineOption = cy.contains('METRO Blue Line');
        metroBlueLineOption.click()

        // select southbound directions.
        const directionSelector = cy.get('main > div:nth-child(2)');

        const directionSelectorButton = directionSelector.find('button');
        directionSelectorButton.click();

        const southboundOption = cy.contains('Southbound');
        southboundOption.click();

        // select place
        const placeSelector = cy.get('main > div:nth-child(3)');

        const placeSelectorButton = placeSelector.find('button');
        placeSelectorButton.click();

        const fortSnellingStationOption = cy.contains('Fort Snelling Station');
        fortSnellingStationOption.click();

        // verify table
        const tableHeader = cy.contains('Fort Snelling Station');
        tableHeader.should('be.visible');

        const tableSubHeader = cy.contains('51418');
        tableSubHeader.should('be.visible');

        // 3 destinations rows + expander row.

        // first row
        cy.get('table tbody tr:nth-child(1) td').contains( "Blue");
        cy.get('table tbody tr:nth-child(1) td').contains( "to Mall of America");

        // second row
        cy.get('table tbody tr:nth-child(2) td').contains( "Blue");
        cy.get('table tbody tr:nth-child(2) td').contains( "to Mall of America");

        // third row
        cy.get('table tbody tr:nth-child(3) td').contains( "Blue");
        cy.get('table tbody tr:nth-child(3) td').contains( "to Mall of America");

        // expander row.
        const rowsExpander = cy.get('table tbody tr:nth-child(4) th')
        rowsExpander.contains('Departures');
    })
})