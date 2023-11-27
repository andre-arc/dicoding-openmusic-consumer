const { Pool } = require("pg");

class PlaylistsService {
    constructor(){
        this._pool = new Pool()
    }

    async getPlaylists(userId){
        const getPlaylists = await this._pool.query({
            text: `SELECT playlists.id, playlists.name, users.username FROM playlists
                          LEFT JOIN users ON users.id = playlists.owner
                          LEFT JOIN collaborations ON playlists.id = collaborations.playlist_id
                          WHERE playlists.owner = $1 OR collaborations.user_id = $1`,
            values: [userId],
          });
          return getPlaylists.rows;
    }
}

module.exports = PlaylistsService