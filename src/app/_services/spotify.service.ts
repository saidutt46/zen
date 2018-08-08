import { Injectable } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Artist, Album } from '../_models';
import { SpotifyCreds } from '../_configs/spotify';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  private searchUrl: string;
  private artistUrl: string;
  private albumsUrl: string;
  private albumUrl: string;
  credentials: SpotifyCreds;
  client_id: string = this.credentials.client_id;
  client_secret: string = this.credentials.client_secret;

  constructor(private _http: HttpClient) { }

  getToken() {
    const headers = new HttpHeaders();
    const cor = new HttpHeaders();
    headers.append('Authorization', 'Basic ' + btoa(this.client_id + ':' + this.client_secret));
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    const params: URLSearchParams = new URLSearchParams();
    params.set('grant_type', 'client_credentials');
    const body = params.toString();

    return this._http.post('https://accounts.spotify.com/api/token', body, { headers: headers })
      .pipe(map(data => data));
  }
  searchMusic(str: string, type: 'artist', token: string) {
    const headers = new HttpHeaders();
    headers.append('Authorization', 'Bearer ' + token);
    this.searchUrl = 'https://api.spotify.com/v1/search?query=' + str + '&offset=0&limit=20&type=' + type + '&market=US';
    return this._http.get(this.searchUrl, {headers: headers})
    .pipe(map(data => data));
}

getArtist(id: string, token: string) {
    const headers = new HttpHeaders();
    headers.append('Authorization', 'Bearer ' + token);
    this.artistUrl = 'https://api.spotify.com/v1/artists/' + id;
    return this._http.get(this.artistUrl, {headers: headers})
    .pipe(map(data => data));
}

getAlbums(artistId: string, token: string) {
    const headers = new HttpHeaders();
    headers.append('Authorization', 'Bearer ' + token);
    this.albumsUrl = 'https://api.spotify.com/v1/artists/' + artistId +  '/albums/?limit=50&market=US';
    return this._http.get(this.albumsUrl, {headers: headers})
    .pipe(map(data => data));
}

getAlbum(id: string, token: string) {
    const headers = new HttpHeaders();
    headers.append('Authorization', 'Bearer ' + token);
    this.albumUrl = 'https://api.spotify.com/v1/albums/' + id;
    return this._http.get(this.albumUrl, {headers: headers})
    .pipe(map(data => data));
}

}
