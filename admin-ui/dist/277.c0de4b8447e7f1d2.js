"use strict";(self.webpackChunkvendure_admin=self.webpackChunkvendure_admin||[]).push([[277],{6277:(A,h,o)=>{o.r(h),o.d(h,{LoginComponent:()=>s,LoginGuard:()=>l,LoginModule:()=>d,loginRoutes:()=>w});var n=o(4386),a=o(6058),_=o(2583),f=o(7589),p=o(6193),u=o(3740),g=o(9348),M=o(9571),C=o(7062),x=o(4369);function O(t,i){if(1&t&&(n.TgZ(0,"p",22),n._uU(1," Photo by "),n.TgZ(2,"a",23),n._uU(3),n.qZA(),n._uU(4," on "),n.TgZ(5,"a",23),n._uU(6,"Unsplash"),n.qZA()()),2&t){const e=n.oxw();n.xp6(2),n.Q6J("href",e.imageCreatorUrl,n.LSH),n.xp6(1),n.Oqu(e.imageCreator),n.xp6(2),n.Q6J("href",e.imageUnsplashUrl,n.LSH)}}function P(t,i){if(1&t&&(n.TgZ(0,"p",24),n._uU(1),n.qZA()),2&t){const e=n.oxw();n.xp6(1),n.Oqu(e.imageLocation)}}function b(t,i){if(1&t&&n._UZ(0,"img",25),2&t){const e=n.oxw();n.Q6J("src",e.imageUrl,n.LSH)("alt",e.imageUrl)}}function v(t,i){1&t&&(n.TgZ(0,"span"),n._uU(1,"-"),n.qZA())}function y(t,i){if(1&t&&(n.TgZ(0,"span"),n._uU(1),n.YNc(2,v,2,0,"span",20),n.qZA()),2&t){const e=n.oxw();n.xp6(1),n.hij("",e.brand," "),n.xp6(1),n.Q6J("ngIf",!e.hideVendureBranding||!e.hideVersion)}}function E(t,i){1&t&&(n.TgZ(0,"span"),n._uU(1,"vendure"),n.qZA())}function U(t,i){if(1&t&&(n.TgZ(0,"span"),n._uU(1),n.qZA()),2&t){const e=n.oxw();n.xp6(1),n.hij("v",e.version,"")}}function I(t,i){1&t&&n._UZ(0,"img",26)}const L=function(t){return{brand:t}};class s{constructor(i,e,r,c){this.authService=i,this.router=e,this.httpClient=r,this.localizationService=c,this.username="",this.password="",this.rememberMe=!1,this.version=a.s5M,this.brand=(0,a.hq7)().brand,this.hideVendureBranding=(0,a.hq7)().hideVendureBranding,this.hideVersion=(0,a.hq7)().hideVersion,this.customImageUrl=(0,a.hq7)().loginImageUrl,this.imageUrl="",this.imageUnsplashUrl="",this.imageLocation="",this.imageCreator="",this.imageCreatorUrl="",this.customImageUrl?this.imageUrl=this.customImageUrl:this.loadImage()}ngOnInit(){this.direction$=this.localizationService.direction$}logIn(){this.errorMessage=void 0,this.authService.logIn(this.username,this.password,this.rememberMe).subscribe(i=>{switch(i.__typename){case"CurrentUser":const e=this.getRedirectRoute();this.router.navigateByUrl(e||"/");break;case"InvalidCredentialsError":case"NativeAuthStrategyError":this.errorMessage=i.message}})}loadImage(){this.httpClient.get("https://login-image.vendure.io").toPromise().then(i=>{this.updateImage(i)})}updateImage(i){const e=i.user,r=i.location;this.imageUrl=i.urls.regular+"?utm_source=Vendure+Login+Image&utm_medium=referral",this.imageCreator=e.name,this.imageLocation=r.name,this.imageCreatorUrl=e.links.html+"?utm_source=Vendure+Login+Image&utm_medium=referral",this.imageUnsplashUrl=i.links.html}getRedirectRoute(){let i;const e=new RegExp(`${a.ONw}=(.*)`);try{const r=window.location.search.match(e);r&&1<r.length&&(i=atob(decodeURIComponent(r[1])))}catch{}return i}static#n=this.\u0275fac=function(e){return new(e||s)(n.Y36(a.e80),n.Y36(_.F0),n.Y36(f.eN),n.Y36(a.oQ8))};static#e=this.\u0275cmp=n.Xpm({type:s,selectors:[["vdr-login"]],decls:40,vars:40,consts:[[1,"login-wrapper",3,"dir"],[1,"login-wrapper-inner"],[1,"login-wrapper-image"],[1,"login-wrapper-image-content"],[1,"login-wrapper-image-title"],[1,"login-wrapper-image-copyright"],["class","creator",4,"ngIf"],["class","location",4,"ngIf"],[3,"src","alt",4,"ngIf"],[1,"login-wrapper-form"],[1,"login-title"],[1,"login-form"],[1,"login-group"],["type","text","name","username","id","login_username",1,"username",3,"ngModel","placeholder","ngModelChange"],["name","password","type","password","id","login_password",1,"password",3,"ngModel","placeholder","ngModelChange"],[1,"login-error",3,"clrAlertType","clrAlertClosable"],[1,"alert-text"],["type","checkbox","clrCheckbox","","id","rememberme","name","rememberme",3,"ngModel","ngModelChange"],["type","submit",1,"button","primary","login-button",3,"disabled","click"],[1,"version"],[4,"ngIf"],["class","login-wrapper-logo","src","assets/logo-login.webp",4,"ngIf"],[1,"creator"],["target","_blank",3,"href"],[1,"location"],[3,"src","alt"],["src","assets/logo-login.webp",1,"login-wrapper-logo"]],template:function(e,r){1&e&&(n.TgZ(0,"div",0),n.ALo(1,"async"),n.TgZ(2,"div",1)(3,"div",2)(4,"div",3)(5,"div",4),n._uU(6),n.ALo(7,"translate"),n.qZA(),n.TgZ(8,"div",5),n.YNc(9,O,7,3,"p",6),n.YNc(10,P,2,1,"p",7),n.qZA()(),n.YNc(11,b,1,2,"img",8),n.qZA(),n.TgZ(12,"div",9)(13,"p",10),n._uU(14),n.ALo(15,"translate"),n.qZA(),n.TgZ(16,"form",11)(17,"div",12)(18,"input",13),n.NdJ("ngModelChange",function(m){return r.username=m}),n.ALo(19,"translate"),n.qZA(),n.TgZ(20,"input",14),n.NdJ("ngModelChange",function(m){return r.password=m}),n.ALo(21,"translate"),n.qZA(),n.TgZ(22,"clr-alert",15)(23,"clr-alert-item")(24,"span",16),n._uU(25),n.qZA()()(),n.TgZ(26,"clr-checkbox-wrapper")(27,"input",17),n.NdJ("ngModelChange",function(m){return r.rememberMe=m}),n.qZA(),n.TgZ(28,"label"),n._uU(29),n.ALo(30,"translate"),n.qZA()(),n.TgZ(31,"div")(32,"button",18),n.NdJ("click",function(){return r.logIn()}),n._uU(33),n.ALo(34,"translate"),n.qZA()()(),n.TgZ(35,"div",19),n.YNc(36,y,3,2,"span",20),n.YNc(37,E,2,0,"span",20),n.YNc(38,U,2,1,"span",20),n.qZA()()(),n.YNc(39,I,1,0,"img",21),n.qZA()()),2&e&&(n.Q6J("dir",n.lcZ(1,23,r.direction$)),n.xp6(6),n.hij(" ",n.lcZ(7,25,"common.login-image-title")," "),n.xp6(3),n.Q6J("ngIf",r.imageCreator),n.xp6(1),n.Q6J("ngIf",r.imageLocation),n.xp6(1),n.Q6J("ngIf",r.imageUrl),n.xp6(3),n.hij(" ",n.xi3(15,27,"common.login-title",n.VKq(38,L,r.hideVendureBranding?r.brand:"Vendure"))," "),n.xp6(4),n.Q6J("ngModel",r.username)("placeholder",n.lcZ(19,30,"common.username")),n.xp6(2),n.Q6J("ngModel",r.password)("placeholder",n.lcZ(21,32,"common.password")),n.xp6(2),n.ekj("visible",r.errorMessage),n.Q6J("clrAlertType","danger")("clrAlertClosable",!1),n.xp6(3),n.hij(" ",r.errorMessage," "),n.xp6(2),n.Q6J("ngModel",r.rememberMe),n.xp6(2),n.Oqu(n.lcZ(30,34,"common.remember-me")),n.xp6(3),n.Q6J("disabled",!r.username||!r.password),n.xp6(1),n.hij(" ",n.lcZ(34,36,"common.login")," "),n.xp6(3),n.Q6J("ngIf",r.brand),n.xp6(1),n.Q6J("ngIf",!r.hideVendureBranding),n.xp6(1),n.Q6J("ngIf",!r.hideVersion),n.xp6(1),n.Q6J("ngIf",!r.hideVendureBranding))},dependencies:[p.TIm,p.CyW,p.I9z,p.MgK,p.KKC,p.PEh,u.O5,g._Y,g.Fj,g.Wl,g.JJ,g.JL,g.On,g.F,M.Lv,a.y_K,u.Ov,C.X$],styles:[".login-wrapper[_ngcontent-%COMP%]{background:var(--color-login-page-bg);background-image:none;height:100vh;display:flex;align-items:center;justify-content:center;padding:20px}.login-wrapper[_ngcontent-%COMP%]   .login-wrapper-inner[_ngcontent-%COMP%]{background:#fff;width:1120px;height:590px;display:flex;justify-content:flex-start;align-items:stretch;position:relative;border-radius:var(--border-radius);border:1px solid var(--color-weight-150);overflow:hidden}@media (max-width: 992px){.login-wrapper[_ngcontent-%COMP%]   .login-wrapper-inner[_ngcontent-%COMP%]{flex-direction:column;height:auto;width:100%}}.login-wrapper[_ngcontent-%COMP%]   .login-wrapper-inner[_ngcontent-%COMP%]   .login-wrapper-image[_ngcontent-%COMP%]{height:100%;flex-grow:1;position:relative}@media (max-width: 992px){.login-wrapper[_ngcontent-%COMP%]   .login-wrapper-inner[_ngcontent-%COMP%]   .login-wrapper-image[_ngcontent-%COMP%]{height:300px}}.login-wrapper[_ngcontent-%COMP%]   .login-wrapper-inner[_ngcontent-%COMP%]   .login-wrapper-image[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{display:block;width:100%;height:100%;object-fit:cover;object-position:center;position:relative;z-index:1}.login-wrapper[_ngcontent-%COMP%]   .login-wrapper-inner[_ngcontent-%COMP%]   .login-wrapper-image[_ngcontent-%COMP%]   .login-wrapper-image-content[_ngcontent-%COMP%]{width:100%;height:100%;position:absolute;left:0;bottom:0;z-index:10;background:rgb(2,0,36);background:linear-gradient(180deg,rgba(2,0,36,0) 0%,rgba(0,0,0,.75) 100%);display:flex;flex-direction:column;align-items:flex-start;justify-content:flex-end;padding:30px}.login-wrapper[_ngcontent-%COMP%]   .login-wrapper-inner[_ngcontent-%COMP%]   .login-wrapper-image[_ngcontent-%COMP%]   .login-wrapper-image-content[_ngcontent-%COMP%]   .login-wrapper-image-title[_ngcontent-%COMP%]{font-size:1.6rem;font-weight:700;color:#fff;margin-bottom:20px}@media (max-width: 992px){.login-wrapper[_ngcontent-%COMP%]   .login-wrapper-inner[_ngcontent-%COMP%]   .login-wrapper-image[_ngcontent-%COMP%]   .login-wrapper-image-content[_ngcontent-%COMP%]   .login-wrapper-image-title[_ngcontent-%COMP%]{font-size:1.2rem}}.login-wrapper[_ngcontent-%COMP%]   .login-wrapper-inner[_ngcontent-%COMP%]   .login-wrapper-image[_ngcontent-%COMP%]   .login-wrapper-image-content[_ngcontent-%COMP%]   .login-wrapper-image-copyright[_ngcontent-%COMP%]{opacity:.8}.login-wrapper[_ngcontent-%COMP%]   .login-wrapper-inner[_ngcontent-%COMP%]   .login-wrapper-image[_ngcontent-%COMP%]   .login-wrapper-image-content[_ngcontent-%COMP%]   .login-wrapper-image-copyright[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:.6rem;color:#fff;margin:0!important}.login-wrapper[_ngcontent-%COMP%]   .login-wrapper-inner[_ngcontent-%COMP%]   .login-wrapper-image[_ngcontent-%COMP%]   .login-wrapper-image-content[_ngcontent-%COMP%]   .login-wrapper-image-copyright[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{color:#fff;text-decoration:underline}.login-wrapper[_ngcontent-%COMP%]   .login-wrapper-inner[_ngcontent-%COMP%]   .login-wrapper-form[_ngcontent-%COMP%]{height:100%;width:400px;padding:40px;display:flex;flex-direction:column;align-items:stretch;justify-content:center;box-shadow:0 20px 25px #0000001a;overflow:hidden;border-radius:5px;flex-shrink:0}@media (max-width: 992px){.login-wrapper[_ngcontent-%COMP%]   .login-wrapper-inner[_ngcontent-%COMP%]   .login-wrapper-form[_ngcontent-%COMP%]{height:auto;width:100%;padding:20px}}.login-wrapper[_ngcontent-%COMP%]   .login-wrapper-inner[_ngcontent-%COMP%]   .login-wrapper-form[_ngcontent-%COMP%]   .login-title[_ngcontent-%COMP%]{font-weight:700;font-size:1.2rem;margin-bottom:20px;color:var(--color-weight-600)}.login-wrapper[_ngcontent-%COMP%]   .login-wrapper-inner[_ngcontent-%COMP%]   .login-wrapper-form[_ngcontent-%COMP%]   .login-group[_ngcontent-%COMP%]   input.username[_ngcontent-%COMP%], .login-wrapper[_ngcontent-%COMP%]   .login-wrapper-inner[_ngcontent-%COMP%]   .login-wrapper-form[_ngcontent-%COMP%]   .login-group[_ngcontent-%COMP%]   input.password[_ngcontent-%COMP%]{display:block;width:100%;margin-bottom:15px;padding:12px 16px!important;background:#fff;font-size:14px;line-height:22px;color:#52667a;outline:none;-webkit-appearance:none}.login-wrapper[_ngcontent-%COMP%]   .login-wrapper-inner[_ngcontent-%COMP%]   .login-wrapper-form[_ngcontent-%COMP%]   .login-group[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]{width:100%!important;margin-top:20px!important}.login-wrapper[_ngcontent-%COMP%]   .login-wrapper-inner[_ngcontent-%COMP%]   .login-wrapper-logo[_ngcontent-%COMP%]{width:60px;height:auto;position:absolute;right:20px;top:20px}.login-button[_ngcontent-%COMP%]{width:100%;margin-top:var(--space-unit);justify-content:center}.version[_ngcontent-%COMP%]{flex:1;flex-grow:1;display:flex;align-items:flex-end;justify-content:center;color:var(--color-grey-300)}.version[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] + span[_ngcontent-%COMP%]{margin-inline-start:5px}.login-error[_ngcontent-%COMP%]{max-height:0;overflow:hidden}.login-error.visible[_ngcontent-%COMP%]{max-height:46px;transition:max-height .2s;animation:_ngcontent-%COMP%_shake .82s cubic-bezier(.36,.07,.19,.97) both;animation-delay:.2s;transform:translateZ(0);-webkit-backface-visibility:hidden;backface-visibility:hidden;perspective:1000px}@keyframes _ngcontent-%COMP%_shake{10%,90%{transform:translate3d(-1px,0,0)}20%,80%{transform:translate3d(2px,0,0)}30%,50%,70%{transform:translate3d(-4px,0,0)}40%,60%{transform:translate3d(4px,0,0)}}.login-wrapper[dir=rtl][_ngcontent-%COMP%]   .login-wrapper-inner[_ngcontent-%COMP%]   .login-wrapper-logo[_ngcontent-%COMP%]{right:auto;left:20px}.login-wrapper[dir=rtl][_ngcontent-%COMP%]   .login-wrapper-inner[_ngcontent-%COMP%]   .login-wrapper-image[_ngcontent-%COMP%]   .login-wrapper-image-content[_ngcontent-%COMP%]{left:auto;right:0}"]})}class l{constructor(i,e){this.router=i,this.authService=e}canActivate(i){return this.authService.checkAuthenticatedStatus().pipe((0,x.U)(e=>(e&&this.router.navigate(["/"]),!e)))}static#n=this.\u0275fac=function(e){return new(e||l)(n.LFG(_.F0),n.LFG(a.e80))};static#e=this.\u0275prov=n.Yz7({token:l,factory:l.\u0275fac,providedIn:"root"})}const w=[{path:"",component:s,pathMatch:"full",canActivate:[l]}];class d{static#n=this.\u0275fac=function(e){return new(e||d)};static#e=this.\u0275mod=n.oAB({type:d});static#r=this.\u0275inj=n.cJS({imports:[a.m81,_.Bz.forChild(w)]})}}}]);
//# sourceMappingURL=277.c0de4b8447e7f1d2.js.map