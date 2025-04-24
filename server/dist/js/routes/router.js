"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const app_1 = require("../controllers/app");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.post("/register", app_1.signUp);
router.post("/login", app_1.signIn);
router.post('/refreshToken', app_1.refreshToken);
router.post('/logout', app_1.logOut);
router.get('/hidden', auth_1.verifyingToken, function (req, res) {
    if (!req.user) {
        res.status(403).send({ message: "invalid jsonwebtoken" });
    }
    if (req.user.role === 'admin') {
        res.status(200).send({ message: 'congratulation!' });
    }
    else {
        res.status(403).send({
            message: 'unauthorised access'
        });
    }
});
exports.default = router;
