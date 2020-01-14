import React from "react";
import { FormGroup, Label, Input } from 'reactstrap';

export default class PortInputFile extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { setFieldValue } = this.props.form;    
    setFieldValue("file", event.currentTarget.files[0])
  }

  render() {
    const { 
      label,
      type,
      field,      
      form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
      ...props
     } = this.props;

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
        { // Si le champ a été cliqué ou visité (touched) et qu'il y a 
          // une erreur sur ce champ alors on affiche le message d'erreur
          touched[field.name] &&
          errors[field.name] && <div className="error">{errors[field.name]}</div>}
      </FormGroup>
    );
  }
}