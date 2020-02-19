import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';
import { Button } from 'reactstrap';
import PortfolioCard from '../components/portfolios/PortfolioCard';

import { Router } from '../routes';

import { getPortfolios, deletePortfolio } from '../actions';

import {PhotoSwipe} from 'react-photoswipe'

class Portfolios extends React.Component {
  constructor(props) {
    super(props);
    
    // Variable qui contient la clé du state qui correspond à la 
    // galerie à afficher.
    this.galleryItems = 'items1';

    this.state = {
      isOpen: false,
      items1: [
        {
          src: '/static/images/galleries/design/london-wei.jpg',
          w: 933,
          h: 1320,
          title: '<span class="badge badge-danger">Print</span><br/>Affiche pour un week-end d’intégration<br/>// École de commerce ISEE'
        },
        {
          src: '/static/images/galleries/design/fiche-thot.jpg',
          w: 933,
          h: 1320,
          title: '<span class="badge badge-danger">Print</span><br/>Fiche parcours de formation sur le progiciel THOT<br/>// Société SICEM'
        },
        {
          src: '/static/images/galleries/design/catalogue-thot1.png',
          w: 933,
          h: 1320,
          title: '<span class="badge badge-danger">Print</span><br/>Page du catalogue de formation sur le progiciel THOT<br/>// Société SICEM'
        },
        {
          src: '/static/images/galleries/design/catalogue-thot2.png',
          w: 933,
          h: 1320,
          title: '<span class="badge badge-danger">Print</span><br/>Page du catalogue de formation sur le progiciel THOT<br/>// Société SICEM'
        },
        {
          src: '/static/images/galleries/design/archives-yvelines.jpg',
          w: 1056,
          h: 1320,
          title: '<span class="badge badge-montage">Montage photo</span><br/>Fonds d’écran à partir d’images d’archives du patrimoine<br/>// Société SICEM'
        },
        {
          src: '/static/images/galleries/design/fiche-isee.jpg',
          w: 905,
          h: 1320,
          title: '<span class="badge badge-danger">Print</span><br/>Fiche programme Bachelor<br/> // École de commerce ISEE'
        },
        {
          src: '/static/images/galleries/design/retouche-photo.jpg',
          w: 910,
          h: 1320,
          title: '<span class="badge badge-success">Retouche photo</span><br/>Retouche pour une image d’illustration<br/> // Magazine JetPulsion'
        },
        {
          src: '/static/images/galleries/design/gala-annees-folles-affiche.jpg',
          w: 910,
          h: 1320,
          title: '<span class="badge badge-danger">Print</span><br/>Affiche pour le Gala ISEE 2015<br/>// École de commerce ISEE'
        },
        {
          src: '/static/images/galleries/design/gala-annees-folles-livret.jpg',
          w: 910,
          h: 1320,
          title: '<span class="badge badge-danger">Print</span><br/>Livret d’invitation pour le gala ISEE 2015<br/>// École de commerce ISEE'
        },
        {
          src: '/static/images/galleries/design/wei-lanta.png',
          w: 910,
          h: 1320,
          title: '<span class="badge badge-danger">Print</span><br/>Affiche pour un week-end d’intégration<br/>// École de commerce ISEE'
        },
        {
          src: '/static/images/galleries/design/gala-chic.jpg',
          w: 933,
          h: 1320,
          title: '<span class="badge badge-danger">Print</span><br/>Affiche pour le Gala ISEE 2014<br/>// École de commerce ISEE'
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
    var msnry = new Masonry( '.gallery-wrapper', {
      itemSelector: '.grid-item',
      columnWidth: '.grid-sizer',
      percentPosition: true,
      transitionDuration: '0.2s'
    });
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
    const isConfirm = confirm('Êtes-vous sûr de vouloir supprimer ce portfolio ?');

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

  openPhotoSwipe = (e, galleryItems) => {
    e.preventDefault();

    // galleryItems provient du onclick du bouton de la card qui
    // doit ouvrir le photoswipe
    this.galleryItems = galleryItems
    
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

  renderPortfolios(portfolios) {
    const { isAuthenticated, isSiteOwner } = this.props.auth;

    return portfolios.map((portfolio, index) => {
      return (        
        
          <div className="col-xl-4 col-md-6 grid-item" key={index}>
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
                  
      )
    })
  }
         
  render() {
    const { portfolios } = this.props;
    const { isAuthenticated, isSiteOwner } = this.props.auth;
    
    
    return (
      <BaseLayout {...this.props.auth} title="Johan IBTATEN - Mon portfolio">
        <BasePage className="portfolio-page" title="Portfolio">

          { isAuthenticated && isSiteOwner &&
            <Button onClick={() => Router.pushRoute('/portfolios/new')}
            color="success"
            className="create-port-btn">Ajouter un portfolio
            </Button>
          }

          <div className="row gallery-wrapper clearfix">
            <div className="col-xl-4 col-md-6 grid-sizer"></div>            
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