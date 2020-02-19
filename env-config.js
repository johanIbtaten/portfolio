const prod = process.env.NODE_ENV === 'production';

module.exports = {
  'process.env.BASE_URL': prod ? 'https://johanibtaten.herokuapp.com' : 'http://localhost:3000',
  'process.env.NAMESPACE': 'https://johanibtaten.herokuapp.com',
  'process.env.CLIENT_ID': 'jM9RnI7cuQoTkWL2fFjI5tRIfPwPhStt'
}

// auth0.com compte test
// bonojo75@gmail.com
// aA123456789!
