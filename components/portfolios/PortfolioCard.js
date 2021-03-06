import React from 'react';
import { Card, CardImg, CardHeader, CardBody, CardText, CardTitle, Button } from 'reactstrap';
//import PortfolioCardDetail from './PortfolioCardDetail';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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

  handleClickImg = (e, targetLink) => {
    if (targetLink && !targetLink.startsWith('ps:')) {
      e.stopPropagation();
      window.open(targetLink, '_blank');
    }
  }

  

  render() {
    const { portfolio, children, openPhotoSwipe } = this.props;
    //const { isOpen } = this.state;

    // Permet de créer un item de liste après chaque '//' dans la chaîne de caractère
    const technoList = portfolio.technoList && portfolio.technoList.split("//").map(item => item.trim());

    const galleryItems = (portfolio.targetLink && portfolio.targetLink.startsWith('ps:')) && portfolio.targetLink.split(':')[1]

    const clickable = portfolio.targetLink && !portfolio.targetLink.startsWith('ps:') ? "clickable lighter" : ""

    return (      
      <Card className="portfolio-card">        
        <div className={`imgViewWrapper ${clickable}`} onClick={(e) => this.handleClickImg(e, portfolio.targetLink)}>
          <CardImg className="imgView card-img-top" src={portfolio.file} alt="Card image cap" />
        </div>
        <CardBody>
          <CardTitle className="portfolio-card-title">
            <span dangerouslySetInnerHTML={{
              __html: portfolio.title
            }} />
          </CardTitle>
          <CardText className="portfolio-card-text">{portfolio.description}</CardText>        
          
          { technoList &&
            <div>
              <CardText className="portfolio-card-text font-weight-bolder mb-2">Technologies :</CardText>
              <ul className="fa-ul">            
                { technoList.map((technoItemList, index) => (
                    <li key={index}>
                      <FontAwesomeIcon icon="check-circle" listItem />
                      { /*
                      La props dangerouslySetInnerHTML permet de transformer une string en HTML
                      */ } 
                      <span dangerouslySetInnerHTML={{
                        __html: technoItemList
                      }} />
                    </li>
                ))}
              </ul>
            </div>
          }            
 
          { (portfolio.githubLink || portfolio.targetLink) &&
            <div className="clearfix">

            { portfolio.githubLink &&
              <a href={portfolio.githubLink} target="_blank" className="btn-icon" title="Voir le dépôt">
                <FontAwesomeIcon icon={['fab', 'github']} transform="grow-16"/>
              </a>
            }

            { portfolio.targetLink ? 
              portfolio.targetLink.startsWith('ps:') ? 
                <a  href="" className="btn mr-2 btn-primary float-right" onClick={(e) => openPhotoSwipe(e, galleryItems)}>
                  Voir
                </a>
                :
                <a href={portfolio.targetLink} target="_blank" className="btn mr-2 btn-primary float-right">
                  Voir <FontAwesomeIcon icon={['fas', 'external-link-alt']} />
                </a>          
              :
              null
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