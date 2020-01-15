import React from "react";
import { FormGroup, Label, Input } from 'reactstrap';

const defaultImg = "https://via.placeholder.com/545x363?text=545x363+Min+Size"

export default class PortInputFile extends React.Component {

  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      multerImage: defaultImg
    }
  }

  // setDefaultImage(uploadType) {
  //   this.setState({
  //     multerImage: defaultImg
  //   });   
  // }

  handleChange(event) {
    const { setFieldValue } = this.props.form;
    const imgFile = event.currentTarget.files[0]    
    setFieldValue("file", imgFile)
    this.setState({
      multerImage: URL.createObjectURL(imgFile)
    });
  }

  render() {
    const { 
      label,
      type,
      field,      
      form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
      ...props
     } = this.props;

    const imgStyle = {
      width: 300,
    };

    return (
      <FormGroup>
        <Label>{label}</Label>
        { /*
        On passe toutes les props de Field au composant Input
        */ } 
        <Input 
          type={type}         
          {...props}
          onChange={(event) => this.handleChange(event)}
        />
        <img style={imgStyle} src={this.state.multerImage} alt="upload-image" />
        { // Si le champ a été cliqué ou visité (touched) et qu'il y a 
          // une erreur sur ce champ alors on affiche le message d'erreur
          touched[field.name] &&
          errors[field.name] && <div className="error">{errors[field.name]}</div>}
      </FormGroup>
    );
  }
}