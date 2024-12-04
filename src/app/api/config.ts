// API config

// In this POC, we are exposing oauth secret to the client!

export const config = {
  baseURL: process.env.NEXT_PUBLIC_FOLEON_API_BASE_URL,
  oauthClientId: process.env.NEXT_PUBLIC_FOLEON_OAUTH_CLIENT_ID,
  oauthClientSecret: process.env.NEXT_PUBLIC_FOLEON_OAUTH_CLIENT_SECRET,
};
