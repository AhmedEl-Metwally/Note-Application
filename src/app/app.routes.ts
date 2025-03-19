import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { HomeComponent } from './pages/home/home.component';
import { NotesComponent } from './pages/notes/notes.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { NotFountComponent } from './pages/not-fount/not-fount.component';

export const routes: Routes =
	[
	    {path:'',redirectTo:'home', pathMatch: 'full'},
		{
			path: '', component: AuthLayoutComponent, children:
				[
					{ path: 'register', component: RegisterComponent, title:'Register'},
					{ path: 'login', component: LoginComponent, title:'Login'},
				]
		},
		{
			path: '', component: MainLayoutComponent, children:
				[
					{path:'home', component:HomeComponent,title:"Home"},
					{ path: 'notes', component: NotesComponent, title:"Notes"},
					{ path: 'gallery', component: GalleryComponent, title:"Gallery"},
					{ path: '**', component: NotFountComponent, title:"Not Fount"},
				]
		}
	];
