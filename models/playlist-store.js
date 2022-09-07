"use strict";
const _ = require("lodash");
const JsonStore = require("./json-store");
const constants = require("constants"); //imports json-store file

const playlistStore = {
  store: new JsonStore('./models/playlist-store.json', {playlistCollectionJSON: [] }),
  collection: 'playlistCollectionJSON',

  getAllPlaylists(){
    return this.store.findAll(this.collection);
  },
  
  getPlaylist(pid) {
    return this.store.findOneBy(
      this.collection, { pid: pid });
  },

  addPlaylist(playlist){
    this.store.add(this.collection, playlist);
    this.store.save();
  },

  removePlaylist(pid) {
    const playlist = this.getPlaylist(pid);
    this.store.remove(this.collection, playlist);
    this.store.save();
  },

  removeAllPlaylists(){
    this.store.removeAll(this.collection);
    this.store.save();
  },

  addSong(sid, song){
    const playlist = this.getPlaylist(sid);
    playlist.songs.push(song);

    let pduration = 0;
    for (let i = 0; i < playlist.songs.length; i++){
      pduration += playlist.songs[i].sduration;
    }
    playlist.pduration = pduration;
    this.store.save();
  },

  removeSong(sid , songId){  //transfer both the songid and the new variable songId
    const playlist = this.getPlaylist(sid);
    const songs = playlist.songs;
    _.remove(songs , { sid: songId});
    this.store.save();
  },

  getSong(pid , songId){
    const playList = this.store.findOneBy(this.collection, { pid: pid });
    const songs = playList.songs.filter(song => song.sid == songId);
    return songs[0];
  },

  updateSong(song, updatedSong) {
    song.stitle = updatedSong.stitle;
    song.sartist = updatedSong.sartist;
    song.sduration = updatedSong.sduration;
    this.store.save();
  },

  getUserPlaylists(userid){
    return this.store.findBy(this.collection, {userid: userid});  // this will fetch the user id and only show playlists based on that userid
  }

};

module.exports = playlistStore; // this exports the playlistStore const we have just created to be used by other parts of the app 