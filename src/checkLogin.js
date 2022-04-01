export default function checkLogin() {
  // User is not logged in
  if (!localStorage.getItem('user')) {
    return false
  }

  // Function to get JWT data
  const parseJWT = (token) => {
    try {
      return JSON.parse(window.atob(token.split('.')[1], 'base64'));
    } catch (err) {
      return null;
    }
  };

  // Check if token is expired
  const user = JSON.parse(localStorage.getItem('user'));
  if (user) {
    const decodedJWT = parseJWT(user.token);
    if (decodedJWT.exp * 1000 < Date.now()) {
      // Delete token from local storage 
      localStorage.clear();
      return false;
    }
  }    

  return true;
}