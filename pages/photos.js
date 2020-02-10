import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout'
import BasePage from '../components/BasePage'
import withAuth from '../components/hoc/withAuth'

import {PhotoSwipeGallery} from 'react-photoswipe'

//import { snakeInit } from '../actions/snake';

//import { memoryInit } from '../actions/memory';

//import '../styles/memory.scss';

//import { getSecretData } from '../actions';

//const cards = null

class Photos extends React.Component {

    state = {
        isOpen: false,
        galleryItems: [
          {
            src: '/static/images/galleries/photos/beauval-totem.jpg',
            w: 941,
            h: 1320,
            title: '<span class="badge badge-light">Beauval</span><br/>Totem',
            thumbnail: '/static/images/galleries/photos/th_beauval-totem.jpg'
          },
          {
            src: '/static/images/galleries/photos/central-park.jpg',
            w: 720,
            h: 960,
            title: '<span class="badge badge-light">New York</span><br/>Central Park',
            thumbnail: '/static/images/galleries/photos/th_central-park.jpg'
          },
          {
            src: '/static/images/galleries/photos/chat-santorin.jpg',
            w: 990,
            h: 1320,
            title: '<span class="badge badge-light">Santorin</span><br/>Chat grec',
            thumbnail: '/static/images/galleries/photos/th_chat-santorin.jpg'
          },
          {
            src: '/static/images/galleries/photos/corail-illumination.jpg',
            w: 990,
            h: 1320,
            title: '<span class="badge badge-light">Paris</span><br/>Corail illumination',
            thumbnail: '/static/images/galleries/photos/th_corail-illumination.jpg'
          },
          {
            src: '/static/images/galleries/photos/deauville.jpg',
            w: 1320,
            h: 990,
            title: '<span class="badge badge-light">Deauville</span><br/>Piscine',
            thumbnail: '/static/images/galleries/photos/th_deauville.jpg'
          },
          {
            src: '/static/images/galleries/photos/le-rayon-vert.jpg',
            w: 990,
            h: 1320,
            title: '<span class="badge badge-light">Santorin</span><br/>Le rayon vert',
            thumbnail: '/static/images/galleries/photos/th_le-rayon-vert.jpg'
          },
          {
            src: '/static/images/galleries/photos/louvre.jpg',
            w: 971,
            h: 1320,
            title: '<span class="badge badge-light">Paris</span><br/>Musée du Louvre',
            thumbnail: '/static/images/galleries/photos/th_louvre.jpg'
          },
          {
            src: '/static/images/galleries/photos/meduse-illumination.jpg',
            w: 990,
            h: 1320,
            title: '<span class="badge badge-light">Paris</span><br/>Méduse illumination',
            thumbnail: '/static/images/galleries/photos/th_meduse-illumination.jpg'
          },
          {
            src: '/static/images/galleries/photos/metropolitain.jpg',
            w: 742,
            h: 1320,
            title: '<span class="badge badge-light">Paris</span><br/>Métropolitain',
            thumbnail: '/static/images/galleries/photos/th_metropolitain.jpg'
          },
          {
            src: '/static/images/galleries/photos/mosaique.jpg',
            w: 1320,
            h: 990,
            title: '<span class="badge badge-light">Paris</span><br/>Mosaïque',
            thumbnail: '/static/images/galleries/photos/th_mosaique.jpg'
          },
          {
            src: '/static/images/galleries/photos/ours-illumination.jpg',
            w: 1320,
            h: 1041,
            title: '<span class="badge badge-light">Paris</span><br/>Ours illumination',
            thumbnail: '/static/images/galleries/photos/th_ours-illumination.jpg'
          },
          {
            src: '/static/images/galleries/photos/pandi-panda.jpg',
            w: 1320,
            h: 1320,
            title: '<span class="badge badge-light">Beauval</span><br/>Pandi Panda',
            thumbnail: '/static/images/galleries/photos/th_pandi-panda.jpg'
          },
          {
            src: '/static/images/galleries/photos/paris-tuileries.jpg',
            w: 990,
            h: 1320,
            title: '<span class="badge badge-light">Paris</span><br/>La grande roue',
            thumbnail: '/static/images/galleries/photos/th_paris-tuileries.jpg'
          },
          {
            src: '/static/images/galleries/photos/patisseries.jpg',
            w: 1320,
            h: 990,
            title: '<span class="badge badge-light">Paris</span><br/>Pâtisseries',
            thumbnail: '/static/images/galleries/photos/th_patisseries.jpg'
          }
        ],
        options: {
          //bgOpacity: 0.8
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
          <img src={item.thumbnail} width={140} height={90}/>
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