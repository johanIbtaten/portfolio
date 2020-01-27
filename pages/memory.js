import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout'
import BasePage from '../components/BasePage'
import withAuth from '../components/hoc/withAuth'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Memory extends React.Component {

    componentDidMount () {        
        memoryInit()
    }

    render() {
        return (
            <BaseLayout {...this.props.auth}>
                <BasePage className="memory-page" title="Memory">
                    <section className="score-panel">                    
                        <span className="moves">0 Move</span>
                        <ul className="stars">
                            <li><FontAwesomeIcon icon={['fas', 'star']} /></li>
                            <li><FontAwesomeIcon icon={['fas', 'star']} /></li>
                            <li><FontAwesomeIcon icon={['fas', 'star']} /></li>
                        </ul>
                        <div className="restart" onClick={() => window.location.href = '/memory'}>
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

                        <div className="memory-card" data-framework="ij">
                        <img className="front-face" src="/static/images/logo-ij.svg" alt="Ember" />
                        <img className="back-face" src="/static/images/memory/js-badge.svg" alt="JS Badge" />
                        </div>
                        <div className="memory-card" data-framework="ij">
                        <img className="front-face" src="/static/images/logo-ij.svg" alt="Ember" />
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
                </BasePage>
            </BaseLayout>            
        )
    }
}

// Ce composant n'a pas de role spécifique à autoriser 
// donc on ne passe aucun paramètre à la première fonction.
export default withAuth()(Memory);