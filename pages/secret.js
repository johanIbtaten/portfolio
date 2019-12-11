import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout'
import BasePage from '../components/BasePage'
import withAuth from '../components/hoc/withAuth'

import { getSecretData } from '../actions';

class Secret extends React.Component {

    static async getInitialProps({req}) {
        // On récupère des données côté serveur depuis 
        // le endpoint /api/v1/secret
        const anotherSecretData =  await getSecretData(req);

        return { anotherSecretData };
    }

    // On initialise notre state.
    state = {
        secretData: []
    }

    async componentDidMount() {
        // On récupère des données côté client depuis 
        // le endpoint /api/v1/secret
        const secretData = await getSecretData();

        // On hydrate notre state avec les données 
        // du endpoint récupérées.
        this.setState({
            secretData
        });
    }

    displaySecretData() {
        // On récupère les données du state.
        const { secretData } = this.state;

        // Si il y a des données 
        if ( secretData && secretData.length > 0) {
            // On retourne un tableau d'éléments HTML
            // hydratés avec les données.
            return secretData.map((data, index) => {
                return (
                    <div key={index}>
                    <p> { data.title }</p>
                    <p> { data.description }</p>
                    </div>
                )
            })
        }

        return null;
    }

    render() {
        // On récupère la props anotherSecretData retourné 
        // par getInitialProps
        const { anotherSecretData } = this.props;
        return (
            <BaseLayout {...this.props.auth}>
                <BasePage>
                    <h1>I am Secret page</h1>
                    <h2> {anotherSecretData[0].title} </h2>
                    { this.displaySecretData() }
                </BasePage>
            </BaseLayout>            
        )
    }
}

// Ce composant n'a pas de role spécifique à autoriser 
// donc on ne passe aucun paramètre à la première fonction.
export default withAuth()(Secret);