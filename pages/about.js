import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';

import { Row, Col } from 'reactstrap';

import {PhotoSwipe} from 'react-photoswipe'
import {PhotoSwipeGallery} from 'react-photoswipe'

class About extends React.Component {  
  // state = {
  //   isOpen: false,
  //   items: [
  //     {
  //       src: 'https://i.ibb.co/ZYW3VTp/brown-brim.png',
  //       w: 300,
  //       h: 350,
  //       title: 'Image 1'
  //     },
  //     {
  //       src: 'https://i.ibb.co/ypkgK0X/blue-beanie.png',
  //       w: 300,
  //       h: 350,
  //       title: 'Image 2'
  //     },
  //     {
  //       src: 'https://i.ibb.co/QdJwgmp/brown-cowboy.png',
  //       w: 300,
  //       h: 350,
  //       title: 'Image 3'
  //     }
  //   ],
  //   galleryItems: [
  //     {
  //       src: 'https://i.ibb.co/ZYW3VTp/brown-brim.png',
  //       thumbnail: 'https://i.ibb.co/ZYW3VTp/brown-brim.png',
  //       w: 1200,
  //       h: 900,
  //       title: 'Image 1'
  //     },
  //     {
  //       src: 'https://i.ibb.co/ypkgK0X/blue-beanie.png',
  //       thumbnail: 'https://i.ibb.co/ypkgK0X/blue-beanie.png',
  //       w: 1200,
  //       h: 900,
  //       title: 'Image 2'
  //     },
  //     {
  //       src: 'https://i.ibb.co/YTjW3vF/green-beanie.png',
  //       thumbnail: 'https://i.ibb.co/YTjW3vF/green-beanie.png',
  //       w: 1200,
  //       h: 900,
  //       title: 'Image 3'
  //     },
  //     {
  //       src: 'https://i.ibb.co/RjBLWxB/grey-brim.png',
  //       thumbnail: 'https://i.ibb.co/RjBLWxB/grey-brim.png',
  //       w: 1200,
  //       h: 900,
  //       title: 'Image 4'
  //     }
  //   ],
  //   options: {}
  // };

  // openPhotoSwipe = (e) => {
  //   e.preventDefault();
  //   this.setState({
  //     isOpen: true,
  //     options: {
  //       closeOnScroll: false
  //     }
  //   });
  // };

  // handleClose = () => {
  //   this.setState({
  //     isOpen: false
  //   });
  // };

  // getThumbnailContent = (item) => {
  //   return (
  //     <img src={item.thumbnail} with={120} height={90}/>
  //   );
  // };

  render() {
    return (
      <BaseLayout title="Filip Jerga - Learn More About Me" {...this.props.auth}>
        <BasePage className="about-page">
          <Row className="mt-md-5">
            <Col md="6">
              <div className="left-side">
                <h1 className="title fadein">Hello, Welcome</h1>
                <h4 className="subtitle fadein">To About Page</h4>
                <p className="subsubTitle fadein">Feel free to read short description about me.</p>
              </div>
            </Col>
            <Col md="6">
              <div className="fadein">
                <p>My name is Filip Jerga and I am an experienced software engineer and freelance developer. </p>
                <p>
                I have a Master's degree in Artificial Intelligence and several years of experience working
                on a wide range of technologies and projects from C++ development for ultrasound devices to
                 modern mobile and web applications in React and Angular.
                </p>
                <p>
                Throughout my career, I have acquired advanced technical knowledge and the ability to explain
                programming topics clearly and in detail to a broad audience. I invite you to take my course,
                where I have put a lot of effort to explain web and software engineering concepts in a detailed,
                hands-on and understandable way.
                </p>
              </div>
            </Col>



            { /*
              <div className='layout-page'>
              <main className='layout-main'>
                <div className='container'>
                  <h2>PhotoSwipe</h2>
                  <hr/>
                  <button className='btn btn-primary' onClick={this.openPhotoSwipe}>
                    Click me
                  </button>
                  <PhotoSwipe isOpen={this.state.isOpen} items={this.state.items}
                    options={this.state.options}
                    onClose={this.handleClose}/>
                  <hr/>
                  <h2>PhotoSwipeGallery</h2>
                  <hr/>
                  <PhotoSwipeGallery items={this.state.galleryItems}
                    thumbnailContent={this.getThumbnailContent}/>
                </div>
              </main>
            </div>
            */ } 












          </Row>
        </BasePage>
      </BaseLayout>
    )}
}

export default About;
