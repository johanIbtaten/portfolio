import React from 'react';
import Typed from 'react-typed';

import BaseLayout from '../components/layouts/BaseLayout';

import { Container, Row, Col } from 'reactstrap';

import Bowser from "bowser";

class Index extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isFlipping: false,
      isChrome:false
    }

    this.roles = ['Développeur', 'Tech Lover', 'Designer', 'React.js', 'Next.js'];    
  }

  componentDidMount() {
    // Quand la page index est montée on appelle la fonction
    // animateCard()
    this.animateCard();
    const browser = Bowser.getParser(window.navigator.userAgent);

    console.log(`The current browser name is "${browser.getBrowserName()}"`);
    console.log(`The current browser name is "${browser.satisfies({ chrome: ">10" })}"`);
    this.setState({
      isChrome: browser.satisfies({ chrome: ">10" })
    });
    
  }

  componentWillUnmount() {
    // Quand la page index est démontée, si il y a un attribut
    // this.cardAnimationInterval qui correspond à un intervalID
    // On stoppe l'éxécution et on réinitialise ce setInterval 
    this.cardAnimationInterval && clearInterval(this.cardAnimationInterval);
  }

  animateCard() {
    // La fonction animateCard met à jour le state isFlipping 
    // avec setState toutes les 9000ms (9s) ce qui déclenche la
    // rotation de la carte.
    // setInterval() renvoie un intervalID que l'on stocke
    // dans l'attribut this.cardAnimationInterval  
    this.cardAnimationInterval = setInterval(() => {
      this.setState({
        isFlipping: !this.state.isFlipping
      });
    }, 9000);
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;
    const { isFlipping, isChrome } = this.state;

    return (
      // On destructure la props this.props.auth pour la passer
      // au composant BaseLayout équivaut à isAuthenticated={true} ou
      // isAuthenticated={false} selon que l'utilisateur
      // est authentifié ou pas.
      <BaseLayout className={`cover ${isFlipping ? 'cover-1' : 'cover-0'}`} {...this.props.auth}
                  headerType="index"
                  title="Johan IBTATEN - Portfolio">
        <div className="main-section">
          <Container>
            <Row>            
              <Col md="6">
                {this.isChrome}
                <div className={`mx-auto ml-md-0 mb-sm-5 mb-md-0 flip-container ${isFlipping && isChrome ? 'isFlipping' : ''}`}>
                <div className={`flipper ${isChrome ? 'chrome-flip' : ''}`}>

                    <div className="front">
                      <img alt="Logo illustration version design Johan IBTATEN" className="image levitate" src="/static/images/logo-illustration1.svg"/>
                      <div className="hero-section-content mt-2 text-md-left text-center">
                        <h2><span>Développeur Front</span><br/>UX / UI Designer</h2>
                        <div className="hero-section-content-intro mt-4 d-none d-md-block">
                          Je vous invite à aller jeter un coup d'oeil à mon portfolio.
                        </div>
                      </div>
                    </div>
                    
                    <div className="back">                   
                      { isChrome &&
                        <>
                        <div className="image-wrapper text-center donuts">
                          <img alt="Logo illustration version donuts Johan IBTATEN" className="image levitate d-sm-block d-none" src="/static/images/logo-illustration2.svg"/>
                          <img alt="Nuage et étoiles du logo version donuts" className="position-absolute cloud-and-stars d-lg-block d-md-none d-sm-block d-xs-none" src="/static/images/cloud-and-stars.svg"/>
                          <img alt="Nuage haut du logo version donuts" className="position-absolute cloud-up d-lg-block d-md-none d-sm-block d-xs-none" src="/static/images/cloud-up.svg"/>
                          <img alt="Nuage bas du logo version donuts" className="position-absolute cloud-down d-lg-block d-md-none d-sm-block d-xs-none" src="/static/images/cloud-down.svg"/>
                          <img alt="Ombre du logo version donuts" className="position-absolute shadow-donuts shadow-scale d-lg-block d-md-none d-sm-block d-xs-none" src="/static/images/shadow-donuts.svg"/>
                          <img alt="Logo version donuts nuages" className="image d-sm-none" src="/static/images/logo-donuts-nuages.svg"/>
                        </div>
                        <div className="hero-section-content mt-3 mt-sm-5 mt-md-3  mt-lg-5 text-md-left text-center">
                          <h2>Je réalise <br/><span className="d-none d-sm-block">vos projets web</span><span className="d-sm-none">vos sites vitrines<br/> et applications web</span></h2>
                          <div className="hero-section-content-intro mt-4 d-none d-md-block">
                          En vous apportant un service professionnel et de qualité.
                          </div>
                        </div>
                        </>                      
                      }
                    </div>

                  </div>
                </div>
              </Col>

              <Col md="6" className="hero-welcome-wrapper text-center text-md-left pl-md-5 mb-5">
                <div className="hero-welcome-text mb-5 mt-4 mt-sm-0">
                  <h1>
                    { isAuthenticated && <span> <b> {user.name || user.nickname} </b> </span> }
                    Bienvenue sur mon site portfolio. Vous pourrez y découvrir mes travaux. 
                    Si vous vous connectez, vous aurez accès à un menu caché Goodies, alors n'hésitez&nbsp;pas.
                  </h1>
                </div>
                <Typed
                  loop
                  typeSpeed={60}
                  backSpeed={60}
                  strings={this.roles}
                  backDelay={1000}
                  loopCount={0}
                  showCursor
                  className="self-typed"
                  cursorChar="|"
                />
              </Col>            
            </Row>
          </Container>        
        </div>
      </BaseLayout>
    )
  }
}
export default Index;
