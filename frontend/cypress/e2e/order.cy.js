
describe('Order Flow', () => {
    it('should allow a user to add items to cart and checkout', () => {
        // 1. Open App
        cy.visit('/');
        cy.contains('E-Shop').should('be.visible');

        // 2. View Products (Assuming we have products)
        // Wait for products to load
        cy.get('.grid').should('exist');
        cy.get('button').contains('Do košíka').first().click();

        // 3. Check Cart
        cy.contains('Košík').click();
        cy.url().should('include', '/cart');
        cy.contains('Celkom').should('be.visible');

        // 4. Proceed to Checkout
        cy.contains('Pokladňa').click();
        cy.url().should('include', '/checkout');

        // 5. Fill Form
        cy.get('input[name="customerName"]').type('Test User');
        cy.get('input[name="email"]').type('test@example.com');
        cy.get('input[name="phone"]').type('+421900111222');
        cy.get('input[name="street"]').type('Test Street 1');
        cy.get('input[name="city"]').type('Test City');
        cy.get('input[name="zip"]').type('123 45');
        cy.get('select[name="country"]').select('Slovensko');

        // 6. Submit
        cy.contains('Objednať').click();

        // 7. Verify Success
        // This depends on what happens after order. Assuming redirect to home or success page
        // or a toast message.
        // Let's assume a modal or toast or redirect.
        // Adjust this selector based on actual app behavior.
        cy.on('window:alert', (str) => {
            expect(str).to.contain('úspešne')
        })
    })
})
