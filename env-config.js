const prod = process.env.NODE_ENV === 'production';

module.exports = {
  // 'process.env.BASE_URL': prod ? 'https://filipjerga.herokuapp.com' : 'http://localhost:3000',
  'process.env.BASE_URL': 'http://localhost:3000',
  'process.env.NAMESPACE': 'https://filipjerga.herokuapp.com',
  'process.env.CLIENT_ID': 'jM9RnI7cuQoTkWL2fFjI5tRIfPwPhStt'
}
