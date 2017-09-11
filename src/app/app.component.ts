import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, Config,LoadingController } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { CardsPage } from '../pages/cards/cards';
import { ChatPage } from '../pages/chat-detail/chat-detail';
import { FirstRunPage } from '../pages/pages';
import { ListMasterPage } from '../pages/list-master/list-master';
import { LoginPage } from '../pages/login/login';
import { MapPage } from '../pages/map/map';
//import { MenuPage } from '../pages/menu/menu';
import { SearchPage } from '../pages/search/search';
import { SettingsPage } from '../pages/settings/settings';
import { SignupPage } from '../pages/signup/signup';
import { TabsPage } from '../pages/tabs/tabs';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { WelcomePage } from '../pages/welcome/welcome';

import { Settings } from '../providers/providers';

import { TranslateService } from '@ngx-translate/core'
import {FirebaseService} from '../providers/firebase'
import {Deploy} from '@ionic/cloud-angular'
import {Storage} from '@ionic/storage'
import {ImageLoaderConfig} from 'ionic-image-loader'

@Component({
  /*template: `<ion-menu [content]="content">
    <ion-header>
      <ion-toolbar>
        <ion-title>Pages</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-list>
        <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">
          {{p.title}}
        </button>
      </ion-list>
    </ion-content>

  </ion-menu>
  <ion-nav #content [root]="rootPage"></ion-nav>`*/
  template:`<ion-nav #content [root]="rootPage"></ion-nav>`,
  providers:[FirebaseService]
})
export class MyApp {
  rootPage:any
  user:any

  @ViewChild(Nav) nav: Nav;

  pages: any[] = [
    { title: 'Tutorial', component: TutorialPage },
    { title: 'Welcome', component: WelcomePage },
    { title: 'Tabs', component: TabsPage },
    { title: 'Cards', component: CardsPage },
    { title: 'Content', component: ChatPage },
    { title: 'Login', component: LoginPage },
    { title: 'Signup', component: SignupPage },
    { title: 'Map', component: MapPage },
    { title: 'Master Detail', component: ListMasterPage },
  //  { title: 'Menu', component: MenuPage },
    { title: 'Settings', component: SettingsPage },
    { title: 'Search', component: SearchPage }
  ]
  status:boolean

  constructor(public ilc:ImageLoaderConfig,public stg:Storage,public lc:LoadingController,public deploy:Deploy,private translate: TranslateService, private platform: Platform,public fbs: FirebaseService, settings: Settings, private config: Config, private statusBar: StatusBar, private splashScreen: SplashScreen) {
    this.initTranslate();
    this.user = this.fbs.currentUser()
    var auth=this.fbs.getAuth()
    this.stg.get("log").then((res)=>{
      this.status=res
      if(res){
        this.rootPage=TabsPage
      }else{
        this.rootPage=WelcomePage
      }
    })

    auth.onAuthStateChanged(user=>{
      if(this.status===undefined&&this.status===null){
        if(user){
          this.nav.setRoot(TabsPage)
          this.stg.set("log",true)
          this.stg.set("uzer",this.fbs.currentUser())
        }else{
          this.nav.setRoot(WelcomePage)
          this.stg.set("log",false)
          this.stg.set("uzer",this.fbs.currentUser())
        }
      }
    })

    // this.user=fbs.currentUser()
    // if(this.user){
    //     this.rootPage=TabsPage
    //   }else{
    //     this.rootPage=WelcomePage
    //   }
    // console.log(this.rootPage)
    // firebase.auth().onAuthStateChanged(function(user) {
    //   if (user) {
    //     // User is signed in.
    //   } else {
    //     // No user is signed in.
    //   }
    // });
    this.platform.ready().then(() => {
      ilc.enableSpinner(false)
      // this.deploy.check().then((snapshotAvailable: boolean) => {
      //   if (snapshotAvailable) {
      //     // When snapshotAvailable is true, you can apply the snapshot
      //     this.deploy.download().then(() => {
      //      return this.deploy.extract()
      //     });
      //   }
      // });
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

  }

  // samp(){
  //   var vm=this
  //   var consRef=this.fbs.getRef("/users/"+this.fbs.currentUser().uid+"/connections")
  //   var onRef=this.fbs.getRef("/users/"+this.fbs.currentUser().uid+"/basic/online")
  //   var conRef=this.fbs.getRef("/.info/connected")
  //   conRef.on('value',function(snap){
  //     if(snap.val()){
  //       vm.fbs.setDatabase("/users/"+vm.user.uid+"/basic/online",true,true).then(function(res){
  //
  //       })
  //     }
  //     var con=consRef.push()
  //     con.set(true)
  //     con.onDisconnect().remove()
  //     onRef.onDisconnect().set({"on":false,"time":firebase.database.ServerValue.TIMESTAMP})
  //   })
  // }
  ionViewDidLoad() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  initTranslate() {
    // Set the default language for translation strings, and the current language.
    this.translate.setDefaultLang('en');

    if (this.translate.getBrowserLang() !== undefined) {
      this.translate.use(this.translate.getBrowserLang());
    } else {
      this.translate.use('en'); // Set your language here
    }

    this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
      this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
