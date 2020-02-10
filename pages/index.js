import React from 'react';
import Typed from 'react-typed';

import BaseLayout from '../components/layouts/BaseLayout';

import { Container, Row, Col } from 'reactstrap';

class Index extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isFlipping: false
    }

    this.roles = ['Développeur', 'Tech Lover', 'Designer', 'React.js', 'Next.js'];
  }

  componentDidMount() {
    // Quand la page index est montée on appelle la fonction
    // animateCard()
    this.animateCard();
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
    const { isFlipping } = this.state;

    return (
      // On destructure la props this.props.auth pour la passer
      // au composant BaseLayout équivaut à isAuthenticated={true} ou
      // isAuthenticated={false} selon que l'utilisateur
      // est authentifié ou pas.
      <BaseLayout className={`cover ${isFlipping ? 'cover-1' : 'cover-0'}`} {...this.props.auth}
                  headerType="index"
                  title="Filip Jerga - Portfolio">
        <div className="main-section">
          <div className="background-image">
          { /*
            <img src="/static/images/background-index.png" />
          */ } 
          </div>
          <Container>
            <Row>            
              <Col md="6">
                <div className={`mx-auto ml-md-0 mb-5 mb-md-0 flip-container ${isFlipping ? 'isFlipping' : ''}`}>
                  <div className="flipper">
                    <div className="front">
                      <img alt="Guy programming welcome picture" className="image" src="/static/images/section-1.jpg"/>
                      <div className="hero-section-content">
                        <h2>Développeur <br/>Front-End / UX UI Designer</h2>
                        <div className="hero-section-content-intro">
                          Je vous invite à aller jeter un coup d'oeil à mon portfolio.
                        </div>
                      </div>
                      <div className="shadow-custom">
                        <div className="shadow-inner"> </div>
                      </div>
                    </div>
                    <div className="back">
                      <img alt="Guy programming welcome picture" className="image" src="/static/images/section-2.jpg"/>
                      <div className="hero-section-content">
                        <h2> Je réalise vos projets web</h2>
                        <div className="hero-section-content-intro">
                          Je vous apporte un service professionnel et de qualité dans le développement de vos applications et sites web.
                        </div>
                      </div>
                      <div className="shadow-custom">
                        <div className="shadow-inner"> </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>

              <Col md="6" className="hero-welcome-wrapper text-center text-md-left">
                <div className="hero-welcome-text">
                  <h1>
                    { isAuthenticated && <span> <b> {user.name || user.nickname} </b> </span> }
                    Bienvenue sur le site portfolio de Johan Ibtaten. Vous pourrez y découvrir mes travaux.
                    Si vous vous connectez, vous aurez accès à un menu caché Goodies, alors n'hésitez pas.
                    { /*
                      Welcome to the portfolio website of Filip Jerga.
                      Get informed, collaborate and discover projects I was working on through the years!
                    */ } 
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

                <div className="hero-welcome-bio">
                  <h1>
                    Regardons un peu mes travaux.
                    { /*
                    */ } 
                  </h1>
                </div>
              </Col>            
            </Row>
          </Container>        
        </div>
      </BaseLayout>
    )
  }
}
export default Index;
