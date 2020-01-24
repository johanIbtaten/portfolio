import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout'
import BasePage from '../components/BasePage'
import withAuth from '../components/hoc/withAuth'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

//import { snakeInit } from '../actions/snake';

import { memoryInit } from '../actions/memory';

import '../styles/memory.scss';

//import { getSecretData } from '../actions';

//const cards = null

class Memory extends React.Component {

    componentDidMount () {        
        //alert(document.querySelectorAll('.memory-card'));
        //document.querySelectorAll('.memory-card').forEach(card => card.addEventListener('click', flipCard));

        //memoryInit(document.querySelectorAll('.memory-card'))
        memoryInit()

        //window.onload = snakeInit();
    }

    componentDidUpdate () {
        //window.onload = snakeInit();
    }  

    // static async getInitialProps({req}) {
    //     // On récupère des données côté serveur depuis 
    //     // le endpoint /api/v1/secret
    //     const anotherSecretData =  await getSecretData(req);

    //     return { anotherSecretData };
    // }

    // // On initialise notre state.
    // state = {
    //     secretData: []
    // }

    // async componentDidMount() {
    //     // On récupère des données côté client depuis 
    //     // le endpoint /api/v1/secret
    //     const secretData = await getSecretData();

    //     // On hydrate notre state avec les données 
    //     // du endpoint récupérées.
    //     this.setState({
    //         secretData
    //     });
    // }

    displaySecretData() {
        // On récupère les données du state.
        // const { secretData } = this.state;

        // // Si il y a des données 
        // if ( secretData && secretData.length > 0) {
        //     // On retourne un tableau d'éléments HTML
        //     // hydratés avec les données.
        //     return secretData.map((data, index) => {
        //         return (
        //             <div key={index}>
        //             <p> { data.title }</p>
        //             <p> { data.description }</p>
        //             </div>
        //         )
        //     })
        // }

        // return null;
    }

    render() {
        return (
            <BaseLayout {...this.props.auth}>
                <BasePage className="memory-page" title="Memory">
                    <section className="score-panel">
                    
                        <span className="moves">0 Move</span>
                        { /*
                        */ } 
                        <ul className="stars">
                            <li><FontAwesomeIcon icon={['fas', 'star']} /></li>
                            <li><FontAwesomeIcon icon={['fas', 'star']} /></li>
                            <li><FontAwesomeIcon icon={['fas', 'star']} /></li>
                        </ul>
                        <div className="restart" onClick={() => memoryInit()}>
                            <FontAwesomeIcon icon={['fas', 'redo']} />
                        </div>
                        
                    </section>
                    <section className="memory-game">
                        <div className="memory-card" data-framework="aurelia">
                        <img className="front-face" src="/static/images/memory/aurelia.svg" alt="Aurelia" />
                        <img className="back-face" src="/static/images/memory/js-badge.svg" alt="JS Badge" />
                        </div>
                        <div className="memory-card" data-framework="aurelia">
                        <img className="front-face" src="/static/images/memory/aurelia.svg" alt="Aurelia" />
                        <img className="back-face" src="/static/images/memory/js-badge.svg" alt="JS Badge" />
                        </div>

                        <div className="memory-card" data-framework="vue">
                        <img className="front-face" src="/static/images/memory/vue.svg" alt="Vue" />
                        <img className="back-face" src="/static/images/memory/js-badge.svg" alt="JS Badge" />
                        </div>
                        <div className="memory-card" data-framework="vue">
                        <img className="front-face" src="/static/images/memory/vue.svg" alt="Vue" />
                        <img className="back-face" src="/static/images/memory/js-badge.svg" alt="JS Badge" />
                        </div>

                        <div className="memory-card" data-framework="angular">
                        <img className="front-face" src="/static/images/memory/angular.svg" alt="Angular" />
                        <img className="back-face" src="/static/images/memory/js-badge.svg" alt="JS Badge" />
                        </div>
                        <div className="memory-card" data-framework="angular">
                        <img className="front-face" src="/static/images/memory/angular.svg" alt="Angular" />
                        <img className="back-face" src="/static/images/memory/js-badge.svg" alt="JS Badge" />
                        </div>

                        <div className="memory-card" data-framework="ember">
                        <img className="front-face" src="/static/images/memory/ember.svg" alt="Ember" />
                        <img className="back-face" src="/static/images/memory/js-badge.svg" alt="JS Badge" />
                        </div>
                        <div className="memory-card" data-framework="ember">
                        <img className="front-face" src="/static/images/memory/ember.svg" alt="Ember" />
                        <img className="back-face" src="/static/images/memory/js-badge.svg" alt="JS Badge" />
                        </div>

                        <div className="memory-card" data-framework="backbone">
                        <img className="front-face" src="/static/images/memory/backbone.svg" alt="Backbone" />
                        <img className="back-face" src="/static/images/memory/js-badge.svg" alt="JS Badge" />
                        </div>
                        <div className="memory-card" data-framework="backbone">
                        <img className="front-face" src="/static/images/memory/backbone.svg" alt="Backbone" />
                        <img className="back-face" src="/static/images/memory/js-badge.svg" alt="JS Badge" />
                        </div>

                        <div className="memory-card" data-framework="react">
                        <img className="front-face" src="/static/images/memory/react.svg" alt="React" />
                        <img className="back-face" src="/static/images/memory/js-badge.svg" alt="JS Badge" />
                        </div>
                        <div className="memory-card" data-framework="react">
                        <img className="front-face" src="/static/images/memory/react.svg" alt="React" />
                        <img className="back-face" src="/static/images/memory/js-badge.svg" alt="JS Badge" />
                        </div>
                    </section>
                    { /*
                        <div className="snakeWrapper"></div>                    
                    */ } 
                </BasePage>
            </BaseLayout>            
        )
    }
}

// Ce composant n'a pas de role spécifique à autoriser 
// donc on ne passe aucun paramètre à la première fonction.
export default withAuth()(Memory);