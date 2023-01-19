import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DispalyComponent } from './dispaly/dispaly.component';
import { EditorComponent } from './editor/editor.component';
import { HomeComponent } from './home/home.component';
import { BlogsComponent } from './blogs/blogs.component';
import { ContentComponent } from './content/content.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthGuard } from './auth/auth-guard';
import { SiteMapApi } from 'src/siteMapApi';


const routes: Routes = [
  { path: "ed", component: EditorComponent},
  { path: 'login', component: LoginComponent},
  {path:'signup', component: SignupComponent},
  { path: "get", component: DispalyComponent },
  { path: "", component: HomeComponent },
  { path: "home", component: HomeComponent },
  { path: 'blogs', component: BlogsComponent },
  { path: 'content/:topic', component: ContentComponent },
  { path: 'content/:topic/:title', component: ContentComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'about', component: AboutComponent },
  { path: ':topicId', component: EditorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
