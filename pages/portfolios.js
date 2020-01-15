import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';
import { Col, Row, Button } from 'reactstrap';
import PortfolioCard from '../components/portfolios/PortfolioCard';

import { Router } from '../routes';

import { getPortfolios, deletePortfolio } from '../actions';

class Portfolios extends React.Component {

  componentDidMount () {
    /**
 * Set appropriate spanning to any masonry item 
 *
 * Get different properties we already set for the masonry, calculate 
 * height or spanning for any cell of the masonry grid based on its 
 * content-wrapper's height, the (row) gap of the grid, and the size 
 * of the implicit row tracks.
 *
 * @param item Object A brick/tile/cell inside the masonry
 */
function resizeMasonryItem(item){
  /* Get the grid object, its row-gap, and the size of its implicit rows */
  var grid = document.getElementsByClassName('masonry')[0],
      rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap')),
      rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));

  /*
   * Spanning for any brick = S
   * Grid's row-gap = G
   * Size of grid's implicitly create row-track = R
   * Height of item content = H
   * Net height of the item = H1 = H + G
   * Net height of the implicit row-track = T = G + R
   * S = H1 / T
   */
  var rowSpan = Math.ceil((item.querySelector('.masonry-content').getBoundingClientRect().height+rowGap)/(rowHeight+rowGap));

  /* Set the spanning as calculated above (S) */
  item.style.gridRowEnd = 'span '+rowSpan; 
 
}


/**
 * Apply spanning to all the masonry items
 *
 * Loop through all the items and apply the spanning to them using 
 * `resizeMasonryItem()` function.
 *
 * @uses resizeMasonryItem
 */
function resizeAllMasonryItems(){
  // Get all item class objects in one list
  var allItems = document.getElementsByClassName('masonry-brick');

  /*
   * Loop through the above list and execute the spanning function to
   * each list-item (i.e. each masonry item)
   */
  for(var i=0;i>allItems.length;i++){
    resizeMasonryItem(allItems[i]);
  }
}

/**
 * Resize the items when all the images inside the masonry grid 
 * finish loading. This will ensure that all the content inside our
 * masonry items is visible.
 *
 * @uses ImagesLoaded
 * @uses resizeMasonryItem
 */
function waitForImages() {
  var allItems = document.getElementsByClassName('masonry-brick');
  for(var i=0;i<allItems.length;i++){
    //imagesLoaded( allItems[i], function(instance) {
      //var item = instance.elements[0];
      //resizeMasonryItem(item);
      
      resizeMasonryItem(allItems[i]);
    //} );
  }
}

/* Resize all the grid items on the load and resize events */
var masonryEvents = ['load', 'resize'];
masonryEvents.forEach( function(event) {
  window.addEventListener(event, resizeAllMasonryItems);
} );

/* Do a resize once more when all the images finish loading */
waitForImages(); 
}

componentDidUpdate () {
  /**
* Set appropriate spanning to any masonry item 
*
* Get different properties we already set for the masonry, calculate 
* height or spanning for any cell of the masonry grid based on its 
* content-wrapper's height, the (row) gap of the grid, and the size 
* of the implicit row tracks.
*
* @param item Object A brick/tile/cell inside the masonry
*/
function resizeMasonryItem(item){
/* Get the grid object, its row-gap, and the size of its implicit rows */
var grid = document.getElementsByClassName('masonry')[0],
    rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap')),
    rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));

/*
 * Spanning for any brick = S
 * Grid's row-gap = G
 * Size of grid's implicitly create row-track = R
 * Height of item content = H
 * Net height of the item = H1 = H + G
 * Net height of the implicit row-track = T = G + R
 * S = H1 / T
 */
var rowSpan = Math.ceil((item.querySelector('.masonry-content').getBoundingClientRect().height+rowGap)/(rowHeight+rowGap));

/* Set the spanning as calculated above (S) */
item.style.gridRowEnd = 'span '+rowSpan; 

}


/**
* Apply spanning to all the masonry items
*
* Loop through all the items and apply the spanning to them using 
* `resizeMasonryItem()` function.
*
* @uses resizeMasonryItem
*/
function resizeAllMasonryItems(){
// Get all item class objects in one list
var allItems = document.getElementsByClassName('masonry-brick');

/*
 * Loop through the above list and execute the spanning function to
 * each list-item (i.e. each masonry item)
 */
for(var i=0;i>allItems.length;i++){
  resizeMasonryItem(allItems[i]);
}
}

/**
* Resize the items when all the images inside the masonry grid 
* finish loading. This will ensure that all the content inside our
* masonry items is visible.
*
* @uses ImagesLoaded
* @uses resizeMasonryItem
*/
function waitForImages() {
var allItems = document.getElementsByClassName('masonry-brick');
for(var i=0;i<allItems.length;i++){
  //imagesLoaded( allItems[i], function(instance) {
    //var item = instance.elements[0];
    //resizeMasonryItem(item);
    
    resizeMasonryItem(allItems[i]);
  //} );
}
}

/* Resize all the grid items on the load and resize events */
var masonryEvents = ['load', 'resize'];
masonryEvents.forEach( function(event) {
window.addEventListener(event, resizeAllMasonryItems);
} );

/* Do a resize once more when all the images finish loading */
waitForImages(); 
}









  static async getInitialProps() {
    let portfolios = [];     
    try {
      // On récupère les objets portfolio dans le tableau portfolios
      // depuis la bdd grâce à la fonction getPortfolios() qui utilise axios
      portfolios = await getPortfolios();
    } catch(err) {
      console.error(err);
    }

    return {portfolios};
  }

  navigateToEdit(portfolioId, e) {
    e.stopPropagation();
    Router.pushRoute(`/portfolios/${portfolioId}/edit`)
  }

  displayDeleteWarning(portfolioId, portfolioFile, e) {
    e.stopPropagation();
    // On affiche une boite de dialogue confirm() avant de valider
    // la suppression et on récupère la réponse sous forme d'un
    // booléen isConfirm à true on répond oui au confirm()
    const isConfirm = confirm('Are you sure you want to delete this portfolio???');

    // La suppression est confirmée
    if (isConfirm) {
      
      // Alors on appelle la fonction de suppression du portfolio
      this.deletePortfolio(portfolioId, portfolioFile);
    }
  }

  deletePortfolio(portfolioId, portfolioFile) {
    deletePortfolio(portfolioId, portfolioFile)
      .then(() => {
        Router.pushRoute('/portfolios');
      })
      .catch(err => console.error(err));
  }

  renderPortfolios(portfolios) {
    const { isAuthenticated, isSiteOwner } = this.props.auth;
    console.log("this.props.auth", this.props.auth);


    

    return portfolios.map((portfolio, index) => {
      return (
       

        
          <div key={index} className="masonry-brick">
            <div className="masonry-content">
              <PortfolioCard portfolio={portfolio}>
              { // Si l'utilisateur est connecté et si il est le siteOwner
                // alors on affiche les boutons d'édition et 
                // de suppression de portfolio. Ces éléments JSX sont des
                // enfants du composant PortfolioCard ils seront donc
                // passés à ce composant dans la props children.
                isAuthenticated && isSiteOwner &&
                <div className="adminBar">              
                  <Button onClick={(e) => this.navigateToEdit(portfolio._id, e)} color="warning">Edit</Button>{' '}
                  <Button onClick={(e) => this.displayDeleteWarning(portfolio._id, encodeURIComponent(portfolio.file), e)} color="danger" className="float-right">Delete</Button>
                </div>
              }          
              </PortfolioCard>        
            </div>
          </div>          
      )
    })
  }

  render() {
    const { portfolios } = this.props;
    const { isAuthenticated, isSiteOwner } = this.props.auth;

    return (
      <BaseLayout {...this.props.auth}>
      { /*      
      <div className="background-image op1"></div>
      */ }         
        <BasePage className="portfolio-page" title="Portfolios">
        { isAuthenticated && isSiteOwner &&
          <Button onClick={() => Router.pushRoute('/portfolios/new')}
                  color="success"
                  className="create-port-btn">Create Portfolio
          </Button>
        }
          <div className="masonry">            
            { this.renderPortfolios(portfolios) }
          </div>
       
        </BasePage>
      </BaseLayout>
    )
  }
}

export default Portfolios;

// { isAuthenticated && isSiteOwner &&