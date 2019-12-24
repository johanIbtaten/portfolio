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

    this.roles = ['Developer', 'Tech Lover', 'Team Player', 'Course Creater', 'React.js', 'Angular'];
  }

  componentDidMount() {
    this.animateCard();
  }

  componentWillUnmount() {
    this.cardAnimationInterval && clearInterval(this.cardAnimationInterval);
  }

  animateCard() {
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
            <img src="/static/images/background-index.png" />
          </div>
          <Container>
          
          
          <Row>
            <Col md="6">
              <div className={`flip-container ${isFlipping ? 'isFlipping' : ''}`}>
                { /*
                  <div className="flip-container" ontouchstart="this.classList.toggle('hover');" className={`flipper ${isFlipping ? 'isFlipping' : ''}`}>
                */ } 
                <div className="flipper">
                  <div className="front" style={{/*width: 400, height: 500, backgroundColor: 'gray',backgroundImage: 'url(/static/images/section-1.jpg)', backgroundSize : 'cover' */}}>
                    <div className="hero-section-content">
                      <h2> Full Stack Web Developer </h2>
                      <div className="hero-section-content-intro">
                        Have a look at my portfolio and job history.
                      </div>
                    </div>
                    <div className="shadow-custom">
                      <div className="shadow-inner"> </div>
                    </div>
                  </div>
                  <div className="back"  style={{/*width: 400, height: 500, backgroundColor: 'gray', backgroundImage: 'url(/static/images/section-2.jpg)', backgroundSize : 'cover'*/}}>
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
            <Col md="6" className="hero-welcome-wrapper">
                <div className="hero-welcome-text">
                  <h1>
                    { isAuthenticated && <span> <b> {user.name} </b> </span> }
                    Welcome to the portfolio website of Filip Jerga.
                    Get informed, collaborate and discover projects I was working on through the years!
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
                    Let's take a look on my work.
                  </h1>
                </div>
              </Col>
          
          </Row>
          
          
{ /*


            <Row>
              <Col md="6">
                <div className="hero-section">
                  <div className={`flipper ${isFlipping ? 'isFlipping' : ''}`}>
                    <div className="front">
                      <div className="hero-section-content">
                        <h2> Full Stack Web Developer </h2>
                        <div className="hero-section-content-intro">
                          Have a look at my portfolio and job history.
                        </div>
                      </div>
                      <div className="image" style={{width: 400, height: 500, backgroundColor: 'pink', backgroundImage: 'url(/static/images/section-1.jpg)'}}></div>
                     
                      
                        <img alt="Guy programming welcome picture" className="image" src="/static/images/section-1.jpg"/>
                    
                      <div className="shadow-custom">
                        <div className="shadow-inner"> </div>
                      </div>
                    </div>
                    <div className="back">
                      <div className="hero-section-content">
                        <h2> Get Your Projects Done </h2>
                        <div className="hero-section-content-intro">
                          Profesional and top quality service in web development.
                        </div>
                      </div>
                      <div className="image" style={{width: 400, height: 500, backgroundColor: 'gray', backgroundImage: 'url(/static/images/section-2.jpg)'}}></div>
                    
                        <img alt="Guy programming welcome picture" className="image" src="/static/images/section-2.jpg"/>
                
                      <div className="shadow-custom shadow-custom-2">
                        <div className="shadow-inner"> </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
              <Col md="6" className="hero-welcome-wrapper">
                <div className="hero-welcome-text">
                  <h1>
                    { isAuthenticated && <span> <b> {user.name} </b> </span> }
                    Welcome to the portfolio website of Filip Jerga.
                    Get informed, collaborate and discover projects I was working on through the years!
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
                    Let's take a look on my work.
                  </h1>
                </div>
              </Col>
            </Row>




          */ } 




          </Container>
        </div>
{ /*

  <div className="flip-container" ontouchstart="this.classList.toggle('hover');">
    <div className="flipper">
        <div className="hero-section-content">
          <h2> Full Stack Web Developer </h2>
          <div className="hero-section-content-intro">
            Have a look at my portfolio and job history.
          </div>
        </div>
        <div className="shadow-custom">
          <div className="shadow-inner"> </div>
        </div>
      </div>
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
*/ } 
      </BaseLayout>
    )
  }
}
export default Index;
