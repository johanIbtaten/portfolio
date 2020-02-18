import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';
import PortfolioCreateForm from '../components/portfolios/PortfolioCreateForm';

import { Row } from 'reactstrap';

import { uploadImageAndSavePortfolio, getPortfolioById } from '../actions';

import withAuth from '../components/hoc/withAuth';
import { Router } from '../routes';

class PortfolioEdit extends React.Component {

  static async getInitialProps({query}) {
    let portfolio = {};

    try {
      // On récupère le portfolio que l'on souhaite mettre à jour
      // grâce à son id que l'on récupère du paramètre id de l'url
      // avec query.id
      portfolio =  await getPortfolioById(query.id);
    } catch(error) {
      console.error(err);
    }

    console.log(portfolio)
    // On retourne le portfolio en props
    return {portfolio};
  }

  constructor(props){
    super();

    this.state = {
      error: undefined
    }

    this.updatePortfolio = this.updatePortfolio.bind(this);
  }

  // On met à jour le portfolio dans la bdd grâce à la 
  // fonction updatePortfolio()
  updatePortfolio(portfolioData, {setSubmitting}) {
    setSubmitting(true);
    uploadImageAndSavePortfolio(portfolioData, 'update', this.props.portfolio.file)
      .then((portfolio) => {
        setSubmitting(false);
        this.setState({error: undefined});
        
        // Router.replace() permet de forcer le render de la page cible
        Router.replace('/portfolios');
      })
      .catch((err) => {
        const error = err.message || 'Server Error!';
        setSubmitting(false);
        this.setState({error});
      })
  }

  render() {
    const {error} = this.state;
    const { portfolio } = this.props;

    return (
      <BaseLayout {...this.props.auth} title="Johan IBTATEN - Update Portfolio">
        <BasePage className="portfolio-create-page" title="Update Portfolio">
          <Row>
              { /*
              On passe à la props initialValues l'objet portfolio
              qui permettra de pré-remplir les champs avec ses données
              */ } 
              <PortfolioCreateForm initialValues={portfolio}
                                   error={error}
                                   onSubmit={this.updatePortfolio} editPage />
          </Row>
        </BasePage>
      </BaseLayout>
    )
  }
}

export default withAuth('siteOwner')(PortfolioEdit);
