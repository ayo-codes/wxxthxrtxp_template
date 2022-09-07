"use strict";

const logger = require("../utils/logger");
const playlistStore = require("../models/playlist-store");

const song = {
  index(request, response) {
    const playlistId = request.params.pid;
    const songId = request.params.songid;
    logger.debug('Editing Song ${songId} from Playlist ${playlistId}');
    const viewData = {
      title: "Edit Song",
      playlist: playlistStore.getPlaylist(playlistId),
      song: playlistStore.getSong(playlistId, songId)
    };
    response.render("song" , viewData);
  },

  update(request, response) {
    const playlistId = request.params.pid;
    const songId = request.params.songid;
    const song= playlistStore.getSong(playlistId, songId)
    const newSong = {
      stitle: request.body.stitle,
      sartist: request.body.sartist,
      sduration: Number(request.body.sduration)
    };
    logger.debug('Updating ${songId} from Playlist ${playlistId}');
    playlistStore.updateSong(song, newSong);
    response.redirect("/playlist/" + playlistId);
  }
};

module.exports = song;
