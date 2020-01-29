import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';

import { Row, Col } from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Contact extends React.Component {  

  render() {
    return (
      <BaseLayout title="Filip Jerga - contact" {...this.props.auth}>
        <BasePage title="Me contacter" className="contact-page">
          <Row className="mt-md-4">
            <Col>
              <ul className="fa-ul">
                <li>
                  <FontAwesomeIcon icon={['far', 'envelope']} listItem transform="grow-7" /> <a href="mailto:j.ibtaten@hotmail.fr">j.ibtaten@hotmail.fr</a>
                </li>

                <li>
                  <FontAwesomeIcon icon="mobile-alt" listItem transform="grow-7" /> <a href="tel:+33662287321"> 06 62 28 73 21</a>
                </li>
              </ul>
            </Col>
          </Row>
        </BasePage>
      </BaseLayout>
    )}
}

export default Contact;
