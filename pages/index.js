import React from 'react';
import Typed from 'react-typed';

import BaseLayout from '../components/layouts/BaseLayout';

import { Container, Row, Col } from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Index extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isFlipping: false
    }

    this.roles = ['Developer', 'Tech Lover', 'Team Player', 'Course Creater', 'React.js', 'Angular'];
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
                        <h2> Full Stack Web Developer </h2>
                        <div className="hero-section-content-intro">
                          Have a look at my portfolio and job history. Don't be shy.
                        </div>
                      </div>
                      <div className="shadow-custom">
                        <div className="shadow-inner"> </div>
                      </div>
                    </div>
                    <div className="back">
                      <img alt="Guy programming welcome picture" className="image" src="/static/images/section-2.jpg"/>
                      <div className="hero-section-content">
                        <h2> Get Your Projects Done </h2>
                        <div className="hero-section-content-intro">
                          Profesional and top quality service in web development.
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
                    { isAuthenticated && <span> <b> {user.name} </b> </span> }
                    Welcome to the portfolio website of Filip Jerga.
                    Get informed, collaborate and discover projects I was working on through the years!
                  </h1>
                  { /*     
                  <FontAwesomeIcon icon={['fab', 'facebook']} />
                  <FontAwesomeIcon icon={['fab', 'twitter']} />
                  <FontAwesomeIcon icon={['fab', 'google']} />
                  
                  <FontAwesomeIcon icon="archway" size="xs" />
                  <FontAwesomeIcon icon="archway" size="lg" />
                  <FontAwesomeIcon icon="archway" size="6x" />

                  
                  // Une simple chaine de caractère dans l'attribut icon fait
                  // référence à la version solid de l'icone                   
                  <FontAwesomeIcon icon="address-book" size="6x" />
                  
                  // Si l'on souhaite un autre version, il faut la préciser
                  // avec un préfixe, ici far pour la version regular
                  <FontAwesomeIcon icon={['far', 'address-book']} size="6x" />

                  <ul class="fa-ul">
                    <li><FontAwesomeIcon icon="spinner" listItem />List icons can</li>
                    <li><FontAwesomeIcon icon="spinner" listItem />be used to</li>
                    <li><FontAwesomeIcon icon="spinner" listItem />replace bullets</li>
                    <li><FontAwesomeIcon icon="spinner" listItem />in lists</li>
                  </ul>

                  <a href="#" className="btn btn-warning btn-lg mr-3">Hello</a>
                  <a href="#" className="btn btn-warning btn-lg"><FontAwesomeIcon icon="address-book" transform="grow-8" /></a>
                  */ } 

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
                    Let's take a look on my work.
                  </h1>
                </div>
              </Col>            
            </Row>
          </Container>
          <span className="service-link">Vector illustration credit:{' '}
            <a href="https://www.Vecteezy.com/">vecteezy.com</a>
          </span>
        </div>
      </BaseLayout>
    )
  }
}
export default Index;
