"use strict";

const uuid = require('uuid');  // this brings in the unique id identifier
const logger = require('../utils/logger');

const playlistStore = require('../models/playlist-store');
const playlistAnalytics = require('../utils/playlist-analytics');

const playlist = {
  index(request, response) {
    const playlistId = request.params.pid;
    logger.debug('Playlist id =', playlistId)

    const playlist = playlistStore.getPlaylist(playlistId)
    const shortestSong = playlistAnalytics.getShortestSong(playlist);
    console.log(shortestSong);
    const viewData = {
      title: 'Playlist',
      playlist: playlistStore.getPlaylist(playlistId),
      shortestSong: shortestSong
    };
  response.render('playlist',viewData);
},
  deleteSong(request,response){
    const playlistId = request.params.pid;
    const songId = request.params.songid;
    logger.debug('Deleting Song ${songId} from Playlist ${playlistId}');
    playlistStore.removeSong(playlistId, songId);
    response.redirect('/playlist/' + playlistId);
  },
  addSong(request,response){
    const playlistId = request.params.pid;
    const playlist = playlistStore.getPlaylist(playlistId);
    const newSong = {
      sid: uuid.v1(),
      stitle: request.body.stitle,
      sartist: request.body.sartist,
      sduration: Number(request.body.sduration),  //converts String to a number
    };
    logger.debug('New Song = ', newSong);
    playlistStore.addSong(playlistId, newSong);
    response.redirect('/playlist/' + playlistId);
  },
};

module.exports = playlist;