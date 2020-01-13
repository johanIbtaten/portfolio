import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button, Alert } from 'reactstrap';
import PortInput from '../form/PortInput';
import PortDate from '../form/PortDate';

import moment from 'moment';

const validateInputs = (values) => {
  let errors = {};

  // On récupère un tableau de tableau de paires clé-valeur
  // à partir de l'objet values qui représente les noms des champs
  // comme clés et leurs valeurs, ensuite on boucle sur chaque paire.
  Object.entries(values).forEach(([key, value]) => {
    // Si le champ n'existe dans l'objet values ou 
    // que la clé est enDate
    if (!values[key]) {
      // Le champ est alors requis
      errors[key] = `Field ${key} is required!`;
    }
  });

  // On initialise une variable startDate avec la date
  // du champ startDate du formulaire et on la formate avec
  // la librairie moment()
  const startDate = moment(values.startDate);
  //const endDate = moment(values.endDate);

  // Si startDate et endDate existent et que la enDate 
  // est avant la startDate ce qui est incohérent
  // if (startDate && endDate && endDate.isBefore(startDate)) {
  //   // Alors on ajoute un message d'erreur à l'objet errors
  //   errors.endDate = 'End Date cannot be before start date!!!';
  // }

  // On retourne l'objet errors qui contient les messages d'erreur 
  // à afficher.
  return errors;
}

// On récupère les props passées au composant dont la fonction
// gestionnaire de soumission onSubmit
const PortfolioCreateForm = ({initialValues, onSubmit, error}) => (
  <div>
    <Formik
      initialValues={initialValues}
      validate={validateInputs}
      /*
      On récupère la fonction gestionnaire de soumission
      pour la passer en props à Formik. Elle pourra
      accéder aux valeurs du formulaire ainsi qu'au formikBag
      qui comportent presque toute les props de Formik. Formik
      appellera dans son code la fonction avec les arguments
      suivants onSubmit(values, formikBag) Ici les paramètres 
      attendus du gestionnaire de soumission sont 
      (portfolioData, {setSubmitting}) 
      */
      onSubmit={onSubmit}
    > 
      { // Formik utilise la props de rendu children pour que le JSX
        // children puisse accéder à diverses propriétés fournies par
        // Formik dont isSubmitting qui est déstructuré depuis l'objet
        // des props passées en paramètre par Formik 
        // (Voir les props https://jaredpalmer.com/formik/docs/api/formik)
        ({ isSubmitting }) => (
        <Form>
          { /*
          On crée un composant Formik Field qui affiche et passe des
          props au composant PortInput
          */ } 
          <Field type="text"
                 name="title"
                 label="Title"
                 component={PortInput}/>          
          <Field type="textarea"
                 name="description"
                 label="Description"
                 component={PortInput}/>
          <Field type="textarea"
                 rows="7"
                 name="technoList"
                 label="technoList"
                 component={PortInput}/>
          <Field type="text"
                 name="targetLink"
                 label="targetLink"
                 component={PortInput}/>
          <Field type="text"
                 name="githubLink"
                 label="githubLink"
                 component={PortInput}/>            
          <Field name="startDate"
                 label="Start Date"
                 initialDate={initialValues.startDate}
                 component={PortDate}/>
          { // Si il y a des erreurs au niveau de la sauvegarde
            // du formulaire on affiche le message d'erreur
            error &&
            <Alert color="danger">
              {error}
            </Alert>
          }
          { /*
          Si le formulaire est en train d'être soumis (isSubmitting à true)
          on désactive le bouton de soumission pour éviter des erreurs.
          */ } 
          <Button color="success" size="lg" type="submit" disabled={isSubmitting}>
            Create
          </Button>
        </Form>
      )}
    </Formik>
  </div>
);

export default PortfolioCreateForm;





































// import React from 'react';


// export default class PortfolioCreateForm extends React.Component {

//   constructor(props) {
//     super(props);
//     this.state = {title: '', description: '', language: ''};

//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }

//   handleChange(event) {
//     const field = event.target.name;
//     this.setState({[field]: event.target.value});
//   }

//   handleSubmit(event) {
//     alert('A name was submitted: ' + this.state.title + ' ' + this.state.description + ' ' + this.state.language);
//     event.preventDefault();
//   }

//   render() {
//     return (
//       <form onSubmit={this.handleSubmit}>
//         <Label>
//           Name:
//           <input name="title" type="text" value={this.state.value} onChange={this.handleChange} />
//         </Label>
//         <Label>
//           Description:
//           <textarea name="description" value={this.state.description} onChange={this.handleChange} />
//         </Label>
//         <Label>
//           Pick your favorite Programming Language:
//           <select name="language" value={this.state.language} onChange={this.handleChange}>
//             <option value="javascript">Javascript</option>
//             <option value="java">Java</option>
//             <option value="c++">C++</option>
//             <option value="c#">C#</option>
//           </select>
//         </Label>
//         <input type="submit" value="Submit" />
//       </form>
//     );
//   }
// }
