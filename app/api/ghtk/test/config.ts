export const GHTK_API_URL = "https://services.giaohangtietkiem.vn/services";
export const GHTK_TOKEN = process.env.GHTK_TOKEN || "YOUR_GHTK_TOKEN_HERE";

export const HEADERS = {
  "Content-Type": "application/json",
  "Token": GHTK_TOKEN
};
