export const getCookieFromReq = (reqCookies, cookieKey) => {
  // On récupère la chaîne du cookie qui a pour clé cookieKey 
  const cookie = reqCookies.split(';').find(c => c.trim().startsWith(`${cookieKey}=`));

  if (!cookie) { return undefined };

  // On récupère la valeur du cookie
  return cookie.split('=')[1];
}

export const shortenText = (text, maxLength = 124) => {
  if (text && text.length > maxLength) {
    return `${text.substring(0, maxLength)} ...`;
  }

  return text;
}

export function getCookies(req) {
  // Si il y a une requête vers le serveur on récupère
  // le cookie dans le header de la requête sinon on 
  // récupère le cookie depuis le navigateur client
  return req ? req.headers.cookie || "" : document.cookie;
}
