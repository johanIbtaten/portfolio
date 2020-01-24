import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout'
import BasePage from '../components/BasePage'
import withAuth from '../components/hoc/withAuth'

import {PhotoSwipeGallery} from 'react-photoswipe'

//import { snakeInit } from '../actions/snake';

import { memoryInit } from '../actions/memory';

import '../styles/memory.scss';

//import { getSecretData } from '../actions';

//const cards = null

class Photos extends React.Component {

    state = {
        isOpen: false,
        items: [
          {
            src: 'https://i.ibb.co/ZYW3VTp/brown-brim.png',
            w: 300,
            h: 350,
            title: ' syufu sdfu sdfyu sdyuf  sdufy usdy fu ysd usydf uysd fuiy sdi usdyf uiysd fuysd udyf sdyf  sudfy uisdyf sdfu sdufy uisdy f sdufyuisdy fuif usdyfui sydf'
          },
          {
            src: 'https://i.ibb.co/ypkgK0X/blue-beanie.png',
            w: 300,
            h: 350,
            title: 'Image 2'
          },
          {
            src: 'https://i.ibb.co/QdJwgmp/brown-cowboy.png',
            w: 300,
            h: 350,
            title: 'Image 3'
          }
        ],
        galleryItems: [
          {
            src: '/static/images/bread-2193537_1280.jpg',
            thumbnail: '/static/images/bread-2193537_1280.jpg',
            w: 800,
            h: 800,
            title: ' syufu sdfu sdfyu sdyuf  sdufy usdy fu ysd usydf uysd fuiy sdi usdyf uiysd fuysd udyf sdyf  sudfy uisdyf sdfu sdufy uisdy f sdufyuisdy fuif usdyfui sydf'
          },
          {
            src: 'https://i.ibb.co/ypkgK0X/blue-beanie.png',
            thumbnail: 'https://i.ibb.co/ypkgK0X/blue-beanie.png',
            w: 1200,
            h: 900,
            title: 'Image 2'
          },
          {
            src: 'https://i.ibb.co/YTjW3vF/green-beanie.png',
            thumbnail: 'https://i.ibb.co/YTjW3vF/green-beanie.png',
            w: 1200,
            h: 900,
            title: 'Image 3'
          },
          {
            src: 'https://i.ibb.co/RjBLWxB/grey-brim.png',
            thumbnail: 'https://i.ibb.co/RjBLWxB/grey-brim.png',
            w: 1200,
            h: 900,
            title: 'Image 4'
          }
        ],
        options: {
          bgOpacity: 0.8
        }
      };
    
      openPhotoSwipe = (e) => {
        e.preventDefault();
        this.setState({
          isOpen: true,
          options: {
            closeOnScroll: false
          }
        });
      };
    
      handleClose = () => {
        this.setState({
          isOpen: false
        });
      };
    
      getThumbnailContent = (item) => {
        return (
          <img src={item.thumbnail} width={280} height={190}/>
        );
      };

    render() {
        return (
            <BaseLayout {...this.props.auth}>
              <BasePage className="photos-page" title="Photos">
              <PhotoSwipeGallery items={this.state.galleryItems}
              thumbnailContent={this.getThumbnailContent} options={this.state.options}/>
              </BasePage>
            </BaseLayout>            
        )
    }
}

// Ce composant n'a pas de role spécifique à autoriser 
// donc on ne passe aucun paramètre à la première fonction.
export default withAuth()(Photos);