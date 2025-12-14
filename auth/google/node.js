// ===============================
// Google OAuth Callback Skeleton
// ===============================

const express = require('express');
const axios = require('axios');
const qs = require('querystring');

const app = express();

// 你的 Google OAuth 設定
const GOOGLE_CLIENT_ID = "你的 client_id";
const GOOGLE_CLIENT_SECRET = "你的 client_secret";
const GOOGLE_REDIRECT_URI = "https://28825252.xyz/auth/google/callback";

// ===============================
// 1. Google OAuth Callback Route
// ===============================
app.get('/auth/google/callback', async (req, res) => {
    try {
        const code = req.query.code;

        if (!code) {
            return res.status(400).send("Missing code");
        }

        console.log("✅ Google 回傳的 code:", code);

        // ===============================
        // 2. 用 code 換取 access_token / id_token
        // ===============================
        const tokenRes = await axios.post(
            "https://oauth2.googleapis.com/token",
            qs.stringify({
                code: code,
                client_id: GOOGLE_CLIENT_ID,
                client_secret: GOOGLE_CLIENT_SECRET,
                redirect_uri: GOOGLE_REDIRECT_URI,
                grant_type: "authorization_code"
            }),
            { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        );

        const { access_token, id_token } = tokenRes.data;

        console.log("✅ 取得 access_token:", access_token ? "OK" : "FAILED");
        console.log("✅ 取得 id_token:", id_token ? "OK" : "FAILED");

        // ===============================
        // 3. 用 access_token 取得使用者資料
        // ===============================
        const userRes = await axios.get(
            "https://www.googleapis.com/oauth2/v3/userinfo",
            { headers: { Authorization: `Bearer ${access_token}` } }
        );

        const user = userRes.data;

        console.log("✅ Google 使用者資料：", user);

        // user 內容包含：
        // user.sub (google_id)
        // user.email
        // user.name
        // user.picture

        // ===============================
        // 4. 寫入 mydb（你之後補上）
        // ===============================
        // const userId = await saveOrUpdateUser(user);

        // ===============================
        // 5. 建立 session / JWT（你之後補上）
        // ===============================
        // req.session.user_id = userId;

        // ===============================
        // 6. 導向你的首頁 / Garden
        // ===============================
        res.send("✅ Google OAuth 完成，世界觀入口已啟動");

    } catch (err) {
        console.error("❌ OAuth Callback Error:", err.response?.data || err);
        res.status(500).send("OAuth Error");
    }
});

// ===============================
// Server 啟動
// ===============================
app.listen(3001, () => {
    console.log("✅ Server running on http://localhost:3001");
});
