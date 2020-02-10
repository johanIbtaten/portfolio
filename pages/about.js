import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';

import { Row, Col } from 'reactstrap';

class About extends React.Component {  

  render() {
    return (
      <BaseLayout title="Filip Jerga - Learn More About Me" {...this.props.auth}>
        <BasePage className="about-page">
          <Row className="mt-md-5">
            <Col md="6">
              <div className="left-side">
                <h1 className="title fadein">Bonjour, bienvenue,</h1>
                <h4 className="subtitle fadein">faisons connaissance...</h4>
                { /*
                  <p className="subsubTitle fadein">Vous lirez ici une courte description sur moi.</p>
                */ } 
              </div>
            </Col>
            <Col md="6">
              <div className="fadein">
                <p>
                Je m'appelle Johan Ibtaten, je suis développeur et designer web expérimenté. J'habite à Paris dans le 15ème arrondissement.</p>
                <p>
                J'ai fait des études et suivi diverses formations dans le domaine du développement informatique.
                J'ai pu travailler sur un large spectre de technologies allant du Java sur les systèmes 
                Android à des applications web modernes en React JS en passant par PHP et WordPress. 
                Même si mon domaine d'expertise est plutôt orienté Front-End, j'ai de solides connaissances en Back-End.
                </p>
                <p>
                J'ai également fait des études et plusieurs formations dans le domaine du design graphique et du design d'interfaces. 
                J'ai pu mettre en pratique mes compétences pour réaliser des UI modernes et ergonomiques ainsi que divers travaux d'infographie destinés au print.                
                </p>
                <p>
                  C'est cette double casquette de développeur et de designer qui fait ma singularité. 
                  Je peux réaliser seul toute la partie Font-End d'une application web de la conception graphique à l'intégration en passant par le développement.
                </p>
                <p>
                  Deux passions, un seul métier.
                </p>
              </div>
            </Col>
          </Row>
        </BasePage>
      </BaseLayout>
    )}
}

export default About;
