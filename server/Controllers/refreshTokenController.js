const { generateAccessToken } = require("./tokenController");
const asynchandler = require("express-async-handler")
const refreshAccessToken = asynchandler(async (req, res) => {
    const refreshToken = req.cookies.refreshToken; 

    if (!refreshToken) {
        res.status(401);
        throw new Error("Refresh token not provided");
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            res.status(403);
            throw new Error("Invalid refresh token");
        }

        const newAccessToken = generateAccessToken(decoded);

        res.status(200).json({
            accessToken: newAccessToken,
        });
    });
});

module.exports = {refreshAccessToken}
