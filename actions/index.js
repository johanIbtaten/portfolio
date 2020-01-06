import axios from 'axios';

import { getCookies, getCookieFromReq } from '../helpers/utils';

// On configure axios
const axiosInstance = axios.create({
  baseURL: `${process.env.BASE_URL}/api/v1`,
  // Si la requête n'aboutit pas après 3s (3000ms) on considère
  // qu'elle a échoué.
  timeout: 3000
});

const setAuthHeader = (req) => {
  // Si il y a une requête côté serveur on récupère
  // les cookies du header sinon on les récupère depuis le navigateur
  const reqCookies = getCookies(req);
  
  // On récupère le token JWT depuis les cookies
  const token = getCookieFromReq(reqCookies, 'jwt');

  // Si on récupère un token JWT depuis les cookies
  if (token) {
    // On ajoute un attribut authorization au header
    // avec pour valeur `Bearer ${token}`
    return { headers: {'authorization': `Bearer ${token}`}};
  }

  return undefined;
}

export const getSecretData = async (req) => {
  // On déclare l'url du endpoint que l'on souhaite requêter
  const url = 'http://localhost:3000/api/v1/secret';

  try {
    // On requête le endpoint avec axios en lui passant
    // l'url, le header modifié avec setAuthHeader pour que
    // le endpoint du serveur puisse vérifier que l'utilisateur
    // qui effectue la requête est bien authentifié avec son token JWT
    // si oui axios retourne la réponse, sinon axios retourne 
    // une erreur 401 
    return await axios.get(url, setAuthHeader(req)).then(response => response.data)
  
    // On catch une éventuelle erreur 401 UnauthorizedError
  } catch (error) {
    console.log(error)
  }
}

const rejectPromise = (resError) => {
  let error = {};

  // Si il y a une erreur
  if (resError && resError.response && resError.response.data) {

    // On place le message de l'erreur dans la variable error
    error = resError.response.data;
  } else {
    error = resError;
  }

  // On retourne une promesse rejetée avec error
  return Promise.reject(error);
}

export const getPortfolios = async () => {
  return await axiosInstance.get('/portfolios').then(response => response.data);
}


export const getPortfolioById = async (id) => {
  return await axiosInstance.get(`/portfolios/${id}`).then(response => response.data);
}

// Le client envoie une requête post au endpoint de server avec les
// données portfolioData pour créer un portfolio dans la bdd et le
// Bearer token JWT dans le header pour vérifier l'authentification 
// et le rôle de l'utilisateur qui a le droit créer un nouveau portfolio.
export const createPortfolio = async (portfolioData) => {
  return await axiosInstance.post('/portfolios', portfolioData, setAuthHeader())
    .then(response => response.data)
    // Si la bdd nous renvoie une erreur on la traite dans la
    // fonction rejectPromise()
    .catch(error => rejectPromise(error))
}

export const updatePortfolio = async (portfolioData) => {
  return await axiosInstance.patch(`/portfolios/${portfolioData._id}`, portfolioData, setAuthHeader())
    .then(response => response.data)
    .catch(error => rejectPromise(error))
}

export const deletePortfolio = (portfolioId) => {
  return axiosInstance.delete(`/portfolios/${portfolioId}`, setAuthHeader()).then(response => response.data);
}

// // ------------ BLOG ACTIONS --------------

// export const getBlogs = async (req) => {
//   return await axiosInstance.get('/blogs').then(response => response.data);
// }

// export const getBlogBySlug = async (slug) => {
//   return await axiosInstance.get(`/blogs/s/${slug}`).then(response => response.data);
// }

// export const getUserBlogs = async (req) => {
//   return await axiosInstance.get('/blogs/me', setAuthHeader(req)).then(response => response.data);
// }

// export const createBlog = (blogData, lockId) => {
//   return axiosInstance.post(`/blogs?lockId=${lockId}`, blogData, setAuthHeader())
//           .then(response => response.data)
//           .catch(err => rejectPromise(err))
// }

// export const updateBlog = (blogData, blogId) => {
//   return axiosInstance.patch(`/blogs/${blogId}`, blogData, setAuthHeader())
//           .then(response => response.data)
//           .catch(err => rejectPromise(err))
// }

// export const getBlogById = (blogId) => {
//   return axiosInstance.get(`/blogs/${blogId}`).then(response => response.data);
// }

// export const deleteBlog = (blogId) => {
//   return axiosInstance.delete(`/blogs/${blogId}`, setAuthHeader())
//           .then(response => response.data)
//           .catch(err => rejectPromise(err));
// }















