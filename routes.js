"use strict";

const express = require("express");
const router = express.Router();

const dashboard = require("./controllers/dashboard.js");
const about = require("./controllers/about.js");
const playlist = require("./controllers/playlist.js");
const accounts = require("./controllers/accounts.js");
const song = require("./controllers/song.js");


router.get("/dashboard", dashboard.index);
router.get("/about", about.index);
router.get("/playlist/:pid", playlist.index);
router.get("/playlist/:pid/deletesong/:songid",playlist.deleteSong);
router.get("/dashboard/deleteplaylist/:pid", dashboard.deletePlaylist);
router.post("/playlist/:pid/addsong", playlist.addSong);
router.post("/dashboard/addplaylist", dashboard.addPlaylist);

//login/signup routes
router.get('/', accounts.index);
router.get('/login', accounts.login);
router.get('/signup', accounts.signup);
router.get('/logout', accounts.logout);
router.post('/register', accounts.register);
router.post('/authenticate', accounts.authenticate);

//routes for songs and updates

router.get("/song/:pid/editsong/:songid", song.index);
router.post("/song/:pid/updatesong/:songid", song.update);

module.exports = router;
