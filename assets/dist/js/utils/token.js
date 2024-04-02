export function decodificaJWT(token) {

  const arrayToken = token.split('.');
  if(token.length >= 1) {
    return JSON.parse(atob(arrayToken[1]));
  }

  return null;

}

export function checkToken(token){

 let tokenDescodificado =  decodificaJWT(token)
if (tokenDescodificado.exp < Date.now() / 1000) {
  console.log('El token ha caducado');
  localStorage.removeItem('token')
  console.log('redireccion a index.')
  //location.assign('index.html')
  return false;
}
return true;

}