import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';

import { Row, Col } from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Bowser from "bowser";

class Contact extends React.Component {
  
  state = {
    isSafari:false
  }

  componentDidMount() {
    const browser = Bowser.getParser(window.navigator.userAgent);
    console.log(Bowser.parse(window.navigator.userAgent));
    this.setState({
      isSafari: browser.satisfies({ safari: ">3" })
    });    
  }

  render() {
    const { isSafari } = this.state;

    return (
      <BaseLayout headerType="contact-page-nav" title="Johan IBTATEN - Contact" {...this.props.auth}>
        <BasePage className="contact-page">
          <Row className="mt-md-4">
            <Col className="d-flex flex-column justify-content-center align-items-center mt-5">
              <div className="content-wrapper position-relative">
              <img alt="Nuage page contact" className="position-absolute cloud-contact-1" src="/static/images/cloud-contact.svg"/>
              <img alt="Nuage page contact" className="position-absolute cloud-contact-2 d-sm-block d-none" src="/static/images/cloud-contact.svg"/>
              { !isSafari &&
                <>
                <img alt="Nuage page contact" className="position-absolute cloud-contact-3" src="/static/images/cloud-contact.svg"/>
                </>
              }               
              <img alt="Nuage page contact" className="position-absolute cloud-contact-4 d-lg-block d-none" src="/static/images/cloud-contact.svg"/>
              <FontAwesomeIcon icon={['fas', 'paper-plane']} className="position-absolute plane plane-1" />
              <FontAwesomeIcon icon={['fas', 'paper-plane']} className="position-absolute plane plane-2" />
              <FontAwesomeIcon icon={['fas', 'paper-plane']} className="position-absolute plane plane-3" />

              <img alt="Plane line" className="position-absolute plane-line d-lg-block d-none" src="/static/images/plane-line.svg"/>
             
              <h1 className="mt-5">
                Réalisons ensemble<br/>
                des projets uniques !
              </h1>
              <h2 className="mt-4">
                Écrivez-moi à <br className="d-block d-sm-none"/><a href="mailto:j.ibtaten@hotmail.fr">j.ibtaten@hotmail.fr</a><br/>
                <span className="d-block mt-2 mt-sm-auto">
                  Appelez moi au <br className="d-block d-sm-none"/><a href="tel:+33662287321"> 06&nbsp;62&nbsp;28&nbsp;73&nbsp;21</a>
                </span>
              </h2>
              </div>
            </Col>
          </Row>
        </BasePage>
      </BaseLayout>
    )}
}

export default Contact;
