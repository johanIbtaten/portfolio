import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';
import { Col, Row, Button } from 'reactstrap';
import PortfolioCard from '../components/portfolios/PortfolioCard';

import { Router } from '../routes';

import { getPortfolios, deletePortfolio } from '../actions';

class Portfolios extends React.Component {

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

  displayDeleteWarning(portfolioId, e) {
    e.stopPropagation();
    // On affiche une boite de dialogue confirm() avant de valider
    // la suppression et on récupère la réponse sous forme d'un
    // booléen isConfirm à true on répond oui au confirm()
    const isConfirm = confirm('Are you sure you want to delete this portfolio???');

    // La suppression est confirmée
    if (isConfirm) {
      
      // Alors on appelle la fonction de suppression du portfolio
      this.deletePortfolio(portfolioId);
    }
  }

  deletePortfolio(portfolioId) {
    deletePortfolio(portfolioId)
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
        <Col key={index} md="4">
         <PortfolioCard portfolio={portfolio}>
         { // Si l'utilisateur est connecté et si il est le siteOwner
           // alors on affiche les boutons d'édition et 
           // de suppression de portfolio. Ces éléments JSX sont des
           // enfants du composant PortfolioCard ils seront donc
           // passés à ce composant dans la props children.
           isAuthenticated && isSiteOwner &&
              <React.Fragment>
                <hr/>
                <Button onClick={(e) => this.navigateToEdit(portfolio._id, e)} color="warning">Edit</Button>{' '}
                <Button onClick={(e) => this.displayDeleteWarning(portfolio._id, e)} color="danger" className="float-right">Delete</Button>
              </React.Fragment>            
          }
         </PortfolioCard>
        </Col>
      )
    })
  }

  render() {
    const { portfolios } = this.props;
    const { isAuthenticated, isSiteOwner } = this.props.auth;

    return (
      <BaseLayout {...this.props.auth}>
        <BasePage className="portfolio-page" title="Portfolios">
        { isAuthenticated && isSiteOwner &&
          <Button onClick={() => Router.pushRoute('/portfolios/new')}
                  color="success"
                  className="create-port-btn">Create Portfolio
          </Button>
        }
        <Row>
          { this.renderPortfolios(portfolios) }
        </Row>
        </BasePage>
      </BaseLayout>
    )
  }
}

export default Portfolios;

// { isAuthenticated && isSiteOwner &&