const express = require('express');
const router = express.Router();

const portfolioCtrl = require('../controllers/portfolio');

//const authService = require('../services/auth');
const {checkJwt, checkRole} = require('../services/auth');

// On décrit la méthode post du enpoint en lui passant les middleware
// d'authorisation et de rôle et le controleur qui va gérer la sauvegarde
// des données d'un portfolio
router.post('', checkJwt, checkRole('siteOwner'),
                portfolioCtrl.savePortfolio);

// On décrit get qui n'a pas de middleware pour les authorisations 
// et les rôles, tout le monde peut y accéder. On lui passe son
// controleur qui va récupérer les portfolios             
router.get('', portfolioCtrl.getPortfolios);

// Cette route permet de récupérer un portfolio en passant son id
// dans l'url au bout de l'url de base /api/v1/portfolios
router.get('/:id', portfolioCtrl.getPortfolioById);

// Cette route permet de mettre à jour un portfolio en passant son id
// dans l'url
router.patch('/:id', checkJwt, checkRole('siteOwner'),
               portfolioCtrl.updatePortfolio);

// Cette route permet de supprimer un portfolio en passant son id
// dans l'url
router.delete('/:id', checkJwt, checkRole('siteOwner'),
               portfolioCtrl.deletePortfolio);

module.exports = router;

