describe( 'dnd on burger constructor', () => {
  before( () => {
   cy.visit( 'http://localhost:3000' );
  } );

 it( 'is dnd handle correct add ingredient', () => {
   cy.get( 'li[class^="burger-ingredient_item"]' ).first()
     .trigger( 'dragstart' );

   cy.get( 'ul[class^="burger-constructor_item_list"]' )
     .trigger( 'dragenter' )
     .trigger( 'drop' );

   cy.get( '.constructor-element' ).should( 'be.exist' );
 } );
} );