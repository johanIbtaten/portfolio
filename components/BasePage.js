import React from "react";
import { Container } from 'reactstrap';
import Bowser from "bowser";

export default class BasePage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isSamsungBrowser:false
    }
  }

  componentDidMount() {
    const browser = Bowser.getParser(window.navigator.userAgent);

    this.setState({
      isSamsungBrowser: browser.satisfies({ safari: ">4", mobile: {'Samsung Internet for Android': '>=4'} })
    });    
  }

  render() {
    const { className, title, containerClass } = this.props;
    const { isSamsungBrowser } = this.state;

    return (
      <div className={`base-page ${className} ${isSamsungBrowser ? 'samsung' : ''}`}>
        <Container className={containerClass}>
          { title && <div className="page-header"><h1 className="page-header-title">{title}</h1></div>}
          {this.props.children}
        </Container>
      </div>
    )
  }
}