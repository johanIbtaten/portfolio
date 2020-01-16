import React from 'react';
import { Card, CardImg, CardHeader, CardBody, CardText, CardTitle, Button } from 'reactstrap';
//import PortfolioCardDetail from './PortfolioCardDetail';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { Router } from '../../routes';

export default class PortfolioCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };

    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    const { portfolio, children } = this.props;
    const { isOpen } = this.state;
    const technoList = portfolio.technoList && portfolio.technoList.split(";").map(item => item.trim());

    return (      
      <Card className="portfolio-card">
        { /*        
          <CardImg className="imgView card-img-top" src="https://mdbootstrap.com/img/Photos/Others/photo6.jpg" alt="Card image cap" />
          <CardImg className="imgView card-img-top" src="https://via.placeholder.com/545x363?text=545x363+Min+Size" alt="Card image cap" />
        */ } 
        <div className="imgViewWrapper">
          <CardImg className="imgView card-img-top" src={portfolio.file} alt="Card image cap" />
        </div>
        <CardBody>
          <CardTitle className="portfolio-card-title">{portfolio.title}</CardTitle>
          <CardText className="portfolio-card-text">{portfolio.description}</CardText>
          
          { technoList &&
            <>
              <CardText className="portfolio-card-text font-weight-bolder mb-2">Technologies :</CardText>
              <ul className="fa-ul">            
                { technoList.map((technoItemList, index) => (
                    <li key={index}>
                      <FontAwesomeIcon icon="check-circle" listItem />{technoItemList}
                    </li>
                ))}
              </ul>
            </>
          }            
 
          { (portfolio.githubLink || portfolio.targetLink) &&
            <div className="clearfix">
              { portfolio.githubLink &&
                <a href={portfolio.githubLink} target="_blank" className="btn-icon" >
                  <FontAwesomeIcon icon={['fab', 'github']} transform="grow-16"/>
                </a>
              }
 
              { portfolio.targetLink &&
                <a href={portfolio.targetLink} target="_blank" className="btn mr-2 btn-primary float-right">
                    Voir
                </a>
              }
            </div>
          }            
          {children}
          
        </CardBody>
      </Card> )
      { /* 
      Si on clique sur le span on ouvre la fenêtre modal en passant
      le state isOpen à true
      */ }      
      { /*<span onClick={this.handleToggle}>
        
        On passe la fonction handleToggle et le portfolio en paramètre
        ainsi que isOpen pour informer le composant modal 
        PortfolioCardDetail de s'ouvrir ou pas.
        <PortfolioCardDetail toggle={this.handleToggle} portfolio={portfolio} isOpen={isOpen}/>
       
        <Card className="portfolio-card">
          <CardHeader className="portfolio-card-header">{portfolio.position}</CardHeader>
          <CardBody>
            <p className="portfolio-card-city">{portfolio.location}</p>
            <CardTitle className="portfolio-card-title">{portfolio.title}</CardTitle>
            <CardText className="portfolio-card-text">{portfolio.description}</CardText>
            <div className="readMore">
              {children}
            </div>
          </CardBody>
        </Card>   

      </span>*/ } 
    
  }
}


// Remote workers, here's how to dodge
// According to some historical records, some people out there have boundless energy, loads of free time, and ambition...

// react.js, next.js ;
// Responsive, css in js;
// Auth0, JWT token;
// MongoDB Atlas, Endpoints