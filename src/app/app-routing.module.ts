
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SearchComponent } from './components/spotify/search/search.component';
import { ArtistComponent } from './components/spotify/artist/artist.component';
import { AlbumComponent } from './components/spotify/album/album.component';
import { NavbarComponent } from './components/navbar/navbar.component';



const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'spotify', component: SearchComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
