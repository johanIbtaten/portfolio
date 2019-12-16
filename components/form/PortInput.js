import { FormGroup, Label, Input } from 'reactstrap';


const PortInput = ({
  label,
  type,
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => {
  return (
  <FormGroup>
    <Label>{label}</Label>
    { /*
    On passe toutes les props de Field au composant Input
    */ } 
    <Input type={type} {...field} {...props} />
    { // Si le champ a été cliqué ou visité (touched) et qu'il y a 
      // une erreur sur ce champ alors on affiche le message d'erreur
      touched[field.name] &&
      errors[field.name] && <div className="error">{errors[field.name]}</div>}
  </FormGroup>
)};


export default PortInput;
