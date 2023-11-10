import decode from "jwt-decode";

class AuthService {
  getProfile(token) {
    const decodedToken = decode(token);
  
    const userProfile = {
      _id: decodedToken._id,
    };
    return userProfile;
  }

  // getProfile() {
  //   return decode(this.getToken());
  // }

  loggedIn() {
    const token = this.getToken();
    return token && !this.isTokenExpired(token) ? true : false;
  }

  isTokenExpired(token) {
    const decoded = decode(token);
    if (decoded.exp < Date.now() / 1000) {
      localStorage.removeItem("user_token");
      return true;
    }
    return false;
  }

  getToken() {
    return localStorage.getItem("user_token");
  }

  login(userToken) {
    console.log("Auth service: Logging in with token:", userToken);
    localStorage.setItem("user_token", userToken);
    console.log(
      "Auth service: Token after storage:",
      localStorage.getItem("user_token")
    );
  }

  logout() {
    localStorage.removeItem("user_token");
    //window.location.reload();
  }
}

export default new AuthService();
