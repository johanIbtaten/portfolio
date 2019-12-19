const routes = require('next-routes')

module.exports = routes().add('portfolioNew', '/portfolios/new')
.add('portfolio', '/portfolio/:id')
.add('portfolioEdit', '/portfolios/:id/edit')