"use strict";

const logger = require('../utils/logger');
const uuid = require('uuid');
const playlistStore = require('../models/playlist-store');
const accounts = require('./accounts.js');

const dashboard = {
  index(request, response) {
    logger.info("dashboard rendering"); //logs out information
    logger.error('some error has occurred'); // logs out errors
    logger.debug('some step has occurred...'); //logs out debugger
    const loggedInUser = accounts.getCurrentUser(request);
    const viewData = {
      title: 'Playlist Dashboard', //this sends to the {{title}} on the dashboard view
      playlists: playlistStore.getUserPlaylists(loggedInUser.uid),  //
    };
    logger.info('about to render',playlistStore.getAllPlaylists());
    response.render("dashboard", viewData);
  },

  deletePlaylist(request , response) {
    const playlistId = request.params.pid;
    logger.debug("Deleting Playlist ${playlistID}");
    playlistStore.removePlaylist(playlistId);
    response.redirect('/dashboard');
  },

  addPlaylist(request , response){
    const loggedInUser = accounts.getCurrentUser(request);
    const newPlaylist = {
      pid: uuid.v1(),
      userid:loggedInUser.uid,
      pltitle: request.body.pltitle,
      songs:[],
    };
    logger.debug('Creating a new playlist', newPlaylist);
    playlistStore.addPlaylist(newPlaylist);
    response.redirect('/dashboard');
  },
};

module.exports = dashboard;
