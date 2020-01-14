import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';

import { Row, Col } from 'reactstrap';

import axios from 'axios';

// base api url being used
const API_URL = "http://localhost:3000";
const defaultImg = "/static/images/default-img.jpg"

class About extends React.Component {  

  constructor(props){
    super();   

    this.state = {
      multerImage: defaultImg
    }
  }

  setDefaultImage(uploadType) {
    if (uploadType === "multer") {
      this.setState({
        multerImage: defaultImg
      });
    } else if (uploadType === "firebase") {
      // this.setState({
      //   firebaseImage: DefaultImg
      // });
    } else {
      // this.setState({
      //   baseImage: DefaultImg
      // });
    }
  }

  // function to upload image once it has been captured
  // includes multer and firebase methods
  uploadImage(e, method) {
    //let imageObj = {};

    if (method === "multer") {

      let imageFormObj = new FormData();

      imageFormObj.append("imageName", "multer-image-" + Date.now());
      imageFormObj.append("imageData", e.target.files[0]);

      // stores a readable instance of 
      // the image being uploaded using multer
      this.setState({
        multerImage: URL.createObjectURL(e.target.files[0])
      });

      axios.post(`${API_URL}/image/uploadmulter`, imageFormObj)
        .then((data) => {
          if (data.data.success) {
            alert("Image has been successfully uploaded using multer");
            //this.setDefaultImage("multer");
          }
        })
        .catch((err) => {
          alert("Error while uploading image using multer");
          //this.setDefaultImage("multer");
        });
    } else if (method === "firebase") {
      // let currentImageName = "firebase-image-" + Date.now();

      // let uploadImage = storage.ref(`images/${currentImageName}`).put(e.target.files[0]);

      // uploadImage.on('state_changed',
      //   (snapshot) => { },
      //   (error) => {
      //     alert(error);
      //   },
      //   () => {
      //     storage.ref('images').child(currentImageName).getDownloadURL().then(url => {

      //       this.setState({
      //         firebaseImage: url
      //       });

      //       // store image object in the database
      //       imageObj = {
      //         imageName: currentImageName,
      //         imageData: url
      //       };

      //       axios.post(`${API_URL}/image/uploadbase`, imageObj)
      //         .then((data) => {
      //           if (data.data.success) {
      //             alert("Image has been successfully uploaded using firebase storage");
      //             this.setDefaultImage("firebase");
      //           }
      //         })
      //         .catch((err) => {
      //           alert("Error while uploading image using firebase storage")
      //           this.setDefaultImage("firebase");
      //         });
      //     })
      //   })
    }
  }

  render() {
    return (
      <BaseLayout title="Filip Jerga - Learn More About Me" {...this.props.auth}>
        <BasePage className="about-page">
          <Row className="mt-5">

          <div className="process">
            <h4 className="process__heading">Process: Using Multer</h4>
            <p className="process__details">Upload image to a node server, connected to a MongoDB database, with the help of multer</p>

            <input type="file" className="process__upload-btn" onChange={(e) => this.uploadImage(e, "multer")} />
            <img src={this.state.multerImage} alt="upload-image" className="process__image" />
          </div>



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
          </Row>
        </BasePage>
      </BaseLayout>
    )
  }
}

export default About;
