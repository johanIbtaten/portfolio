import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';
import PortfolioCreateForm from '../components/portfolios/PortfolioCreateForm';

import { Row, Col } from 'reactstrap';

import { createPortfolio } from '../actions';

import withAuth from '../components/hoc/withAuth';
import { Router } from '../routes';
import moment from 'moment';

const INITIAL_VALUES = { title: '',
                         company: '',
                         location: '',
                         position: '',
                         description: '',
                         startDate: moment(),
                         endDate: moment() };

class PortfolioNew extends React.Component {

  constructor(props){
    super();

    this.state = {
      error: undefined
    }

    this.savePortfolio = this.savePortfolio.bind(this);
  }

  savePortfolio(portfolioData, {setSubmitting}) {
  //savePortfolio() {
    //alert('yes')
    setTimeout(() => {
      alert(JSON.stringify(portfolioData, null, 2));
      setSubmitting(false);
    }, 400);
    // setSubmitting(true);

    // createPortfolio(portfolioData)
    //   .then((portfolio) => {
    //     setSubmitting(false);
    //     this.setState({error: undefined});
    //     Router.pushRoute('/portfolios');
    //   })
    //   .catch((err) => {
    //     const error = err.message || 'Server Error!';
    //     setSubmitting(false);
    //     this.setState({error});
    //   })
  }

  render() {
    const {error} = this.state;

    return (
      <BaseLayout {...this.props.auth}>
        <BasePage className="portfolio-create-page" title="Create New Portfolio">          
          <Row>
            <Col md="6">
              { /* 
              On déclare le composant PortfolioCreateForm qui se 
              charge de créer le formulaire grâce à formik, on lui passe
              en props les valeurs initiales des champs, les erreurs et
              la fonction de sauvegarde du portfolio à appeler en cas 
              de submit du formulaire.
              */ }
              <PortfolioCreateForm initialValues={INITIAL_VALUES}
                                   error={error}
                                   onSubmit={this.savePortfolio} />
            </Col>
          </Row>         
        </BasePage>
      </BaseLayout>
    )
  }
}

// Cette page est autorisée seulemement pour le siteOwner connecté
//export default withAuth('siteOwner')(PortfolioNew);
export default PortfolioNew;
