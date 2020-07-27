import decode from "jwt-decode";

const JWT = "store_token_id";

const setToken = (token) => {
  localStorage.setItem(JWT, token);
};

const getToken = (token) => {
  return localStorage.getItem(JWT);
};

const isLogin = () => {
  const jwtToken = getToken();
  return !!jwtToken && !isTokenExpired(jwtToken);
};

const isTokenExpired = (token) => {
    try {
        const _info = decode(token);
        if(_info.exp < Date.now()/1000) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
}

const getUser = () => {
  if (isLogin()) {
    const jwtToken = getToken();
    const user = decode(jwtToken);
    return user;
  } else {
    return null;
  }
};

const logout = () => {
  localStorage.removeItem(JWT)
}

global.auth = {
  setToken,
  getToken,
  getUser,
  isLogin,
  logout
};
