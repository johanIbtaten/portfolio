import React from 'react';
import { Card, CardImg, CardHeader, CardBody, CardText, CardTitle, Button } from 'reactstrap';
import PortfolioCardDetail from './PortfolioCardDetail';

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

    return (      
      /* 
      Si on clique sur le span on ouvre la fenêtre modal en passant
      le state isOpen à true
      */      
      <span onClick={this.handleToggle}>
        { /*
        On passe la fonction handleToggle et le portfolio en paramètre
        ainsi que isOpen pour informer le composant modal 
        PortfolioCardDetail de s'ouvrir ou pas.
        */ } 
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
        { /*        
        */ } 

        <Card className="portfolio-card">
          <CardImg className="imgView card-img-top" src="https://mdbootstrap.com/img/Photos/Others/photo6.jpg" alt="Card image cap" />
          <CardBody className="shadow-soft">
            <CardTitle className="portfolio-card-title">Remote workers, here's how to dodge</CardTitle>
            <CardText className="portfolio-card-text">According to some historical records, some people out there have boundless energy, loads of free time, and ambition...</CardText>
            <CardText className="portfolio-card-text font-weight-bolder mb-2">Technologies :</CardText>
            <ul className="fa-ul">
              <li>
                <FontAwesomeIcon icon="check-circle" listItem />List Item iqsu diu idu ioqsdu ioqsudiouqsiod
              </li>
              <li>
                <FontAwesomeIcon icon="check-circle" listItem />List Item iqsu diu idu ioqsdu ioqsudiouqsiod
              </li>
              <li>
                <FontAwesomeIcon icon="check-circle" listItem />List Item iqsu diu idu ioqsdu ioqsudiouqsiod
              </li>
            </ul>
            <a href="#" className="btn btn-icon" >
              <FontAwesomeIcon icon={['fab', 'github']} transform="grow-16"/>
            </a>
            <a href="#" className="btn mr-2 btn-primary float-right">
                  Voir le site
            </a>
            <div className="readMore">
              {children}
            </div>
          </CardBody>
        </Card>
        { /*        
        */ } 



      </span>
    )
  }
}
