export function decodificaJWT(token) {

  const arrayToken = token.split('.');
  console.log("Array Token: ");
  console.log(arrayToken);

  const tokenPayload = JSON.parse(atob(arrayToken[1]));
  //console.log(tokenPayload)
  return tokenPayload

}