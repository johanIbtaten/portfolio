import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';
import PortfolioCreateForm from '../components/portfolios/PortfolioCreateForm';

import { Row, Col } from 'reactstrap';

import { createPortfolio } from '../actions';

import withAuth from '../components/hoc/withAuth';
import { Router } from '../routes';
import moment from 'moment';

// On déclare les valeurs par défaut des champs de formulaire
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

    // On initialise un state pour les erreurs de soumission
    // du formulaire.
    this.state = {
      error: undefined
    }

    this.savePortfolio = this.savePortfolio.bind(this);
  }

  // Cette fonction est le gestionnaire se soumission 
  // elle va être passée en props au composant Formik avec
  // la props onSubmit
  savePortfolio(portfolioData, {setSubmitting}) {

    // On appelle la fonction createPortfolio() qui va
    // sauvegarder le nouveau portfolio à partir des données 
    // du formulaire
    createPortfolio(portfolioData)
      .then((portfolio) => {

        // Une fois le portfolio sauvegardé 
        // on débloque le formulaire en mettant la props
        // isSubmitting à false grâce au setter setSubmitting()
        setSubmitting(false);

        // On réinitilaise les erreurs
        this.setState({error: undefined});

        // On redirige l'utilisateur vers la page des portfolios
        Router.pushRoute('/portfolios');
      })
      .catch((err) => {
        // On récupère le message de l'erreur et on le
        // place dans le state error
        const error = err.message || 'Server Error!';
        console.log(error);
        setSubmitting(false);
        this.setState({error});
      })
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
              <PortfolioCreateForm 
                initialValues={INITIAL_VALUES}
                /*
                On passe l'erreur de soumission du formulaire
                au composant.
                */
                error={error}
                /* 
                On passe la fonction gestionnaire se soumission 
                this.savePortfolio dans la props onSubmit
                */
                onSubmit={this.savePortfolio} />
            </Col>
          </Row>         
        </BasePage>
      </BaseLayout>
    )
  }
}

// Cette page est autorisée seulemement pour le siteOwner connecté
export default withAuth('siteOwner')(PortfolioNew);

//export default PortfolioNew;
//savePortfolio() {
    // setTimeout(() => {
    //   alert(JSON.stringify(portfolioData, null, 2));
    //   setSubmitting(false);
    // }, 400);
    // setSubmitting(true);
