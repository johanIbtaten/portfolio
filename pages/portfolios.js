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

  handleLoad = () => {
    let msnry = new Masonry( '.gallery-wrapper', {
      itemSelector: '.grid-item',
      columnWidth: '.grid-sizer',
      percentPosition: true,
      transitionDuration: '0.2s'
    });
  }

  componentDidMount () {   
    window.addEventListener('load', this.handleLoad);
    let msnry = new Masonry( '.gallery-wrapper', {
      itemSelector: '.grid-item',
      columnWidth: '.grid-sizer',
      percentPosition: true,
      transitionDuration: '0.2s'
    });
    
    window.mobileAndTabletcheck = function() {
      var check = false;
      (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
      return check;
    };

    if (mobileAndTabletcheck()) {
      (function()
      {
        if( window.localStorage )
        {
          if( !localStorage.getItem('firstLoad') )
          {
            localStorage['firstLoad'] = true;
            window.location.reload();
          }  
          else
            localStorage.removeItem('firstLoad');
        }
      })();
    }
  }

  componentDidUpdate (prevProp, prevState) {
    if (!prevState.isOpen && !this.state.isOpen) {
      if (mobileAndTabletcheck()) {
        localStorage.removeItem('firstLoad');
        window.location.reload();        
      }
    }
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