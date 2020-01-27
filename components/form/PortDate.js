import React from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
import { FormGroup, Label, Button } from 'reactstrap';

export default class PortDate extends React.Component {

  constructor(props) {
    super(props);

    // On initialise dateValue avec la date récupérée depuis
    // la props initialValues du formulaire ou la date du jour 
    // si elle n'est pas déclarée.
    const dateValue = props.initialDate ? moment(props.initialDate) : moment();
    
    // Si il n'y a pas de initialDate isHidden est à true
    const isHidden = props.initialDate ? false : true;

    // On initialise le state
    this.state = {
      dateValue,
      isHidden
    };

    this.handleChange = this.handleChange.bind(this);
  }

  setFieldValueAndTouched(date, touched) {
    // On récupère deux fonctions de Formik passées en props
    const { setFieldValue, setFieldTouched } = this.props.form;

    // On récupère le nom du champ
    const { name } = this.props.field;

    // On met à jour la valeur du champ correspondant à name
    // et on autorise la validation avec true en argument
    setFieldValue(name, date, true);

    // On met le champ en touched pour la validation
    setFieldTouched(name, touched, true);
  }

  // On met à jour le state quand on change la date du Datepicker
  handleChange(date) {
    this.setState({
      dateValue: date
    });

    // On met à jour la valeur du champ
    this.setFieldValueAndTouched(date, true);
  }

  // On toggle l'affichage du Datepicker
  toggleDate(date) {
    // On change le state isHidden    
    this.setState({
      isHidden: !this.state.isHidden
    });

    // On met à jour la valeur du champ
    // avec date ou null si le champ est caché
    this.setFieldValueAndTouched(date, true);
  }

  render() {
    const { canBeDisabled, label, field, form: { touched, errors} } = this.props;
    const { isHidden, dateValue } = this.state;

    return (
      <FormGroup>
      <Label>{label}</Label>
        <div className="input-group">
          { //!isHidden &&
            <DatePicker
              selected={dateValue}
              onChange={this.handleChange}
              peekNextMonth
              showMonthDropdown
              showYearDropdown
              /* La date max est le date du jour moment()*/
              maxDate={moment()}
              dropdownMode="select"
            />
          }
        </div>
        { // Si le champ est canBeDisabled et n'est isHidden on
          // affiche le bouton qui permet de cacher le 
          // Datepicker endDate 
          //canBeDisabled && !isHidden && <Button onClick={() => this.toggleDate(null)}>Still Working Here...</Button>
        }

        { // Si le champ est canBeDisabled et est isHidden on
          // affiche le bouton qui permet d'afficher le 
          // Datepicker endDate et on affiche Still Working Here            
          //canBeDisabled && isHidden &&
          /*          
          <React.Fragment>
            <span> Still Working Here </span>
            <Button onClick={() => this.toggleDate(dateValue)}> Set End Date </Button>
          </React.Fragment>
          */ 
        }



        { // Si il y a des erreurs on affiche le message d'erreur
          touched[field.name] &&
          errors[field.name] && <div className="error">{errors[field.name]}</div>}
      </FormGroup>
    );
  }
}













