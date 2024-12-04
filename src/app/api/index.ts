import axios from "axios";
import { config } from "./config";

// Oauth token helper
const fetchOauthToken = () =>
  axios
    .post<{
      token_type: string;
      access_token: string;
    }>(`${config.baseURL}/oauth`, {
      grant_type: "client_credentials",
      client_id: config.oauthClientId,
      client_secret: config.oauthClientSecret,
    })
    .then(({ data }) => {
      return `${data.token_type} ${data.access_token}`;
    });

// Authenticated foleon API
export const foleon = axios.create({ baseURL: config.baseURL });

// Fetch oath token in background and add it too all requests
if (process.env.NODE_ENV !== "test") {
  const tokenPromise = fetchOauthToken();
  foleon.interceptors.request.use(async (cfg) => {
    if (!cfg.headers["Authorization"]) {
      cfg.headers["Authorization"] = await tokenPromise;
    }
    return cfg;
  });
}
