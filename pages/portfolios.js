import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';
import { Col, Row, Button } from 'reactstrap';
import PortfolioCard from '../components/portfolios/PortfolioCard';

import { Router } from '../routes';

import { getPortfolios, deletePortfolio } from '../actions';

import { waitForImages } from '../actions/masonry';

import {PhotoSwipe} from 'react-photoswipe'

class Portfolios extends React.Component {
  constructor(props) {
    super(props);
    this.galleryItems = '';

    this.state = {
      isOpen: false,
      items1: [
        {
          src: 'https://i.ibb.co/ZYW3VTp/brown-brim.png',
          w: 300,
          h: 350,
          title: 'Image 1'
        },
        {
          src: 'https://i.ibb.co/ypkgK0X/blue-beanie.png',
          w: 300,
          h: 350,
          title: 'Image 2'
        },
        {
          src: 'https://i.ibb.co/QdJwgmp/brown-cowboy.png',
          w: 300,
          h: 350,
          title: 'Image 3'
        }
      ],
      items2: [
        {
          src: 'https://i.ibb.co/ZYW3VTp/brown-brim.png',
          thumbnail: 'https://i.ibb.co/ZYW3VTp/brown-brim.png',
          w: 1200,
          h: 900,
          title: 'Image 1 galleryItems'
        },
        {
          src: 'https://i.ibb.co/ypkgK0X/blue-beanie.png',
          thumbnail: 'https://i.ibb.co/ypkgK0X/blue-beanie.png',
          w: 1200,
          h: 900,
          title: 'Image 2 galleryItems'
        },
        {
          src: 'https://i.ibb.co/YTjW3vF/green-beanie.png',
          thumbnail: 'https://i.ibb.co/YTjW3vF/green-beanie.png',
          w: 1200,
          h: 900,
          title: 'Image 3 galleryItems'
        },
        {
          src: 'https://i.ibb.co/RjBLWxB/grey-brim.png',
          thumbnail: 'https://i.ibb.co/RjBLWxB/grey-brim.png',
          w: 1200,
          h: 900,
          title: 'Image 4 galleryItems'
        }
      ],
      options: {}
    };    
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


  componentDidMount () {
    waitForImages();
  }

  componentDidUpdate () {
    waitForImages();
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

  // handleClick = (e, targetLink) => {
  //   e.stopPropagation();
  //   window.location.href=targetLink
  // }
  

  openPhotoSwipe = (e, galleryItems) => {
    e.preventDefault();
    this.galleryItems = galleryItems
    console.log('galleryItems', galleryItems);
    this.setState({
      isOpen: true,
      options: {
        closeOnScroll: false
      }
    });
  };

  handleClose = () => {
    this.setState({
      isOpen: false
    });
  };

  // getThumbnailContent = (item) => {
  //   return (
  //     <img src={item.thumbnail} with={120} height={90}/>
  //   );
  // };

  renderPortfolios(portfolios) {
    const { isAuthenticated, isSiteOwner } = this.props.auth;

    return portfolios.map((portfolio, index) => {
      return (        
        <div key={index} className="masonry-brick">
          <div className="masonry-content" /*onClick={(e) => this.handleClick(e, portfolio.targetLink)} href={portfolio.targetLink}*/>
            <PortfolioCard portfolio={portfolio} openPhotoSwipe={this.openPhotoSwipe}>
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
            className="create-port-btn">Ajouter un portfolio
            </Button>
          }
          <div className="masonry">            
            { this.renderPortfolios(portfolios) }
          </div>
          <PhotoSwipe isOpen={this.state.isOpen} items={this.state[this.galleryItems]}
                  options={this.state.options}
                  onClose={this.handleClose}/>
          
          </BasePage>
          </BaseLayout>
          )
        }
}

export default Portfolios;

// { isAuthenticated && isSiteOwner &&