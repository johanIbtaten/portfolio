import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button, Alert, Col, Row } from 'reactstrap';
import PortInput from '../form/PortInput';
import PortDate from '../form/PortDate';

import PortInputFile from '../form/PortInputFile';

import * as Yup from 'yup';

const required = "Ce champ est obligatoire"
// On utilise la librairie Yup pour créer un schéma de validation
// qui transmettra ses données à Formik sous forme d'un objet errors
const SignupSchema = Yup.object().shape({
  title: Yup.string()
    .required(required),
  description: Yup.string()
    .required(required),
  startDate: Yup.string()
    .nullable()
    .required(required),
  file: Yup.string()
    .required(required),
});

// const validateInputs = (values) => {
//   let errors = {};

//   // On récupère un tableau de tableau de paires clé-valeur
//   // à partir de l'objet values qui représente les noms des champs
//   // comme clés et leurs valeurs, ensuite on boucle sur chaque paire.
//   Object.entries(values).forEach(([key, value]) => {
//     // Si le champ n'existe pas dans l'objet values et que la clé
//     // est égale à githubLink ou targetLink
//     if (!values[key]) {
//       //if (key !== 'githubLink' || key !== 'targetLink') {
//         // alors Le champ est requis
//         errors[key] = `Field ${key} is required!`;
//       //}
//     }
//   });

//   // On initialise une variable startDate avec la date
//   // du champ startDate du formulaire et on la formate avec
//   // la librairie moment()
//   // const startDate = moment(values.startDate);
//   //const endDate = moment(values.endDate);

//   // Si startDate et endDate existent et que la enDate 
//   // est avant la startDate ce qui est incohérent
//   // if (startDate && endDate && endDate.isBefore(startDate)) {
//   //   // Alors on ajoute un message d'erreur à l'objet errors
//   //   errors.endDate = 'End Date cannot be before start date!!!';
//   // }

//   // On retourne l'objet errors qui contient les messages d'erreur 
//   // à afficher.
//   return errors;
// }

// On récupère les props passées au composant dont la fonction
// gestionnaire de soumission onSubmit
const PortfolioCreateForm = ({initialValues, onSubmit, error, editPage}) => (
  <Col md="12">
    <Formik
      initialValues={initialValues}
      validationSchema={SignupSchema}
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
        <Form className="FormPortfolio">
          <Row>
            {            
            initialValues.file && (
              <Col lg="2" > 
              <img className="FormPortfolio__imgCurrent" src={'/'+initialValues.file} alt="Vignette actuelle" title="Vignette actuelle" /> 
              </Col>)
            }

            <Col lg="5">         
              { /*
              On crée un composant Formik Field qui affiche et passe des
              props au composant PortInput
              */ }
              <Field type="text"
              name="title"
              label="Titre"
              component={PortInput}/>       
              <Field type="textarea"
              name="description"
              label="Description"
              component={PortInput}/>
              <Field type="textarea"
              rows="7"
              name="technoList"
              label="Technologies"
              component={PortInput}/>
            </Col> 
          
            <Col lg="5">    
              <Field type="text"
                    name="githubLink"
                    label="Lien GitHub"
                    component={PortInput}/>            
              <Field type="text"
                    name="targetLink"
                    label="Lien du site"
                    component={PortInput}/>
              <Field name="startDate"
                    label="Date"
                    initialDate={initialValues.startDate}
                    component={PortDate}/>
              <Field type="file"
                    name="file"
                    component={PortInputFile}/>     
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
              <Button className="btn-xs-block-only" color="success" size="lg" type="submit" disabled={isSubmitting}>
                { editPage ? "Mettre à jour" : "Créer"}
              </Button>
            </Col> 
          </Row>
        </Form>
      )}
    </Formik>
  </Col>
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
