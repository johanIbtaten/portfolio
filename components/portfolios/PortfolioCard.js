import React from 'react';
import { Card, CardHeader, CardBody, CardText, CardTitle } from 'reactstrap';
import PortfolioCardDetail from './PortfolioCardDetail';

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
      </span>
    )
  }
}
