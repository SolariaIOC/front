export function decodificaJWT(token) {

  const arrayToken = token.split('.');
  if(token.length >= 1) {
    return JSON.parse(atob(arrayToken[1]));
  }

  return null;

}