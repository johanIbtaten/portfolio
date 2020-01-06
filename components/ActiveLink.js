import React, { Children } from 'react';
import { Link } from '../routes';
import { withRouter } from 'next/router';


const ActiveLink = ({children, router, ...props}) => {

  // La méthode Children.only vérifie que children n’a qu’un 
  // seul enfant (un élément React) et le renvoie. Si ce n’est  
  // pas le cas elle lèvera une erreur.
  const child = Children.only(children);
  let className = child.props.className || "";

  // On récupère le chemin de la page avec router.asPath
  // on le compare avec le chemin du lien si ils sont
  // identiques on ajoute la classe (active) de la props 
  // activeClassName à className
  if (router.asPath === props.route && props.activeClassName) {
    className = `${className} ${props.activeClassName}`
  }

  // On supprime la props.activeClassName pour ne pas la passer
  // au composant Link
  delete props.activeClassName;

  // On clone et ajoute ou modifie la props className de l'élément
  // child avec la méthode React.cloneElement()
  return <Link {...props}>{React.cloneElement(child, {className})}</Link>;
}

// On ajoute les props du router avec le HOC withRouter()
export default withRouter(ActiveLink);
