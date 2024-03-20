export function decodificaJWT(token) {

  const arrayToken = token.split('.');
  console.log("Array Token: ");
  if(token.length >= 1) {
    const tokenPayload = JSON.parse(atob(arrayToken[1]));
    //console.log(tokenPayload)
    return tokenPayload
  }

  return null;

}