import { Component, OnInit, OnDestroy, } from '@angular/core';
import { DataStorageService } from 'lr/app/shared/data-storage.service';
import { Router } from "@angular/router";
import { Subscription } from 'rxjs/Subscription';
import { menuList, ListObj } from 'lr/app/shared/menu.model';
import * as $ from 'jquery';
import { LrAnalyticService } from 'lr/app/core/lr-analytic.service';

//  TODO: In this class we are using same Complex Menu logic as present in our existing Clpweb Project, will change  -->
@Component({
  selector: 'app-lr-header',
  templateUrl: './lr-header.component.html',
  styleUrls: ['./lr-header.component.scss']
})
export class LrHeaderComponent implements OnInit, OnDestroy {

  constructor(private dataStorageService: DataStorageService, private router: Router,private lrAnalyticService:LrAnalyticService ) { }
  
  allmenu = {};
  objectKeys = Object.keys;
  AllMenuList = [];
  topMenuList = [];
  subMenuList = [];
  childSubMenuList = [];
  childSubMenuListArray = [];
  data: Object[];
  ListObj1 = {}
  ListObj2 = {}
  ListObj3 = {}
  showSearchBox1 = false;
  localDataFlage = false;
  thirdListFlage = true;
  atHome = false;
  subscription: Subscription;
  filteredStatus = '';
  currentUserFullName;
  companyLogo;
  logourl;
  location: string;
  searchText;
  showSearchBox = false;

  ngOnInit() {
    const response = true;
    this.onFetchData();
    this.currentUserFullName = this.getCurrentUserFullName();
    this.companyLogo = this.getLogoUrl();
    this.lrAnalyticService.trackEvent('login', this.currentUserFullName, response ? 'success' : 'fail');
  }

  onFetchData() {
    this.getMenu();
  }

  getMenuLogic(menuList: menuList) {

    if (menuList) {
      this.AllMenuList = menuList.value;
      var AllMenuListLength = this.AllMenuList.length;

      for (var AllmenuVal = 0; AllmenuVal < AllMenuListLength; AllmenuVal++) {

        if (this.AllMenuList[AllmenuVal].ParentId == null) {
          var ListObj = new Object();
          ListObj = this.AllMenuList[AllmenuVal];
          this.topMenuList.push(ListObj)
        }
      }
      var parentlevelMenu = $.grep(this.AllMenuList, function (n, i) {
        return (n.Level === 1);
      });
      var ParentId = parentlevelMenu[0];
      if (this.atHome) {
        for (var allmenuvar = 0; allmenuvar < this.AllMenuList.length; allmenuvar++) {
          if (this.AllMenuList[allmenuvar].ParentId == ParentId) {
            this.atHome = true;
            return
          }
        }
      }
    }
  }

  topMenuMouseOver = function (menu1) {
  }

  clickTopMenu = function (menu) {
    this.menuCounter = 0;
    this.partialMenu = menu.Id;
    $("#lp").show();
    this.currentmenu1Flage = false;
    this.firstTimer = true;
    localStorage.setItem("partialMenu", menu.Id);

    var pId = menu.Id;
    this.subMenuList.length = 0
    var AllMenuListLength = this.AllMenuList.length;
    var menuCounterIndex = 1;
    this.subMenuList = [];
    for (var AllsubmenuVal = 0; AllsubmenuVal < AllMenuListLength; AllsubmenuVal++) {
      if (this.AllMenuList[AllsubmenuVal].ParentId == pId) {
        var ListObj1 = new ListObj();
        ListObj1 = this.AllMenuList[AllsubmenuVal];
        this.AllMenuList[AllsubmenuVal];
        ListObj1.childSubMenuListArray = new Array();
        ListObj1.preMenuIndex = menuCounterIndex;
        menuCounterIndex = 1;
        for (var AllsubsubmenuVal = 0; AllsubsubmenuVal < AllMenuListLength; AllsubsubmenuVal++) {
          if (this.AllMenuList[AllsubsubmenuVal].ParentId == ListObj1.Id) {
            menuCounterIndex++;
            var ListObj2 = new ListObj();
            ListObj2 = this.AllMenuList[AllsubsubmenuVal];
            this.menuCounter++;

            ListObj1.childSubMenuListArray.push(ListObj2);
            ListObj2.childSubMenuListArray = new Array();
            for (var AllsubsubsubmenuVal = 0; AllsubsubsubmenuVal < AllMenuListLength; AllsubsubsubmenuVal++) {
              if (this.AllMenuList[AllsubsubsubmenuVal].ParentId == ListObj2.Id) {
                var ListObj3 = new ListObj();
                ListObj3 = this.AllMenuList[AllsubsubsubmenuVal];

                ListObj2.childSubMenuListArray.push(ListObj3);

              }
            }
          }
        }
        this.menuCounter++
        ListObj1.menuIndex = menuCounterIndex;
        if ((ListObj1.preMenuIndex + ListObj1.menuIndex) > 9) {
          menuCounterIndex = 0;
          ListObj1.IsNewTD = true;
        }
        else
          ListObj1.IsNewTD = false;
        this.subMenuList.push(ListObj1)
      }
    }
    var localSubmenuList = [];
    this.localSubmenuLists = [];
    this.localSubmenuLists.push(localSubmenuList);
    var localSubmenuListsCount = 0
    for (var i = 0; i < this.subMenuList.length; i++) {
      var subMenuChildMenuCount = (this.subMenuList[i].childSubMenuListArray != null && this.subMenuList[i].childSubMenuListArray
        instanceof Array && this.subMenuList[i].childSubMenuListArray.length > 0) ? this.subMenuList[i].childSubMenuListArray.length : 0;
      if (localSubmenuListsCount + subMenuChildMenuCount + 1 > 12) {
        var localSubmenuList = [];
        localSubmenuList.push(this.subMenuList[i]);
        this.localSubmenuLists.push(localSubmenuList);
        localSubmenuListsCount = 0 + subMenuChildMenuCount + 1
      } else {
        localSubmenuList.push(this.subMenuList[i]);

        localSubmenuListsCount = localSubmenuListsCount + subMenuChildMenuCount + 1
      }

    }

    if (localSubmenuListsCount == 0) {
      this.localSubmenuLists.pop();
    }
    if (this.subMenuList && this.subMenuList.length > 0) {
      if (this.subMenuList[0].URLPath) {
        menu.URLPath = this.subMenuList[0].URLPath
      } else {
        if (this.subMenuList[0].childSubMenuListArray && this.subMenuList[0].childSubMenuListArray.length > 0) {
          menu.URLPath = this.subMenuList[0].childSubMenuListArray[0].URLPath;
        }

      }

    } else if (menu.URLPath == null || menu.URLPath.length == 0) {
      menu.URLPath = this.defaultMenuUrl;
    }

  }

  topMenuMouseLeave = function (menu) {
  }

  topMenuClicked = function (menu) {
    this.subMenu = menu.URLPath;
    if (this.subMenu == "/MemberProfiler/") {
      this.router.navigate(['MemberProfiler/search']);
    }
    else if (this.subMenu == "/SegmentationBuilder/") {
      // this.memberProfilerService.removeItem();
      this.router.navigate(['/SegmentationBuilder']);
    }
    else if (this.subMenu != null) {
      // this.memberProfilerService.removeItem();
      location.href = location.origin + "/#" + this.subMenu;
    }
    else {
      // this.memberProfilerService.removeItem();
      location.href = location.origin + "/#";
    }
  }
  clickSubMenu = function (menu) {

    // this.memberProfilerService.removeItem();
    this.subMenu = menu.URLPath;

    if (this.subMenu == "/MemberProfiler/") {
      this.router.navigate(['MemberProfiler/search']);
    }
    else if (this.subMenu != null) {
      location.href = location.origin + "/#" + this.subMenu;
    }
    else {
      location.href = location.origin + "/#";
    }

  }
  clickTopMenu3 = function (menu3) {
    // this.memberProfilerService.removeItem();
    this.submenu3 = menu3.URLPath;
    if (this.submenu3 != null) {
      location.href = location.origin + "/#" + this.submenu3;
    }
    else {
      location.href = location.origin + "/#";
    }

  }

  getUlr = function (URLPath) {
    var url = '';
    if (URLPath == '' || URLPath == null || URLPath == undefined) {
    } else if (URLPath == "/custom/report") {
      url = 'javascript:void(0);'
    } else {

      url = '#' + URLPath;

    }
    return url

  }

  getMenu() {
    this.getMenuList();
  }

  getMenuList() {
    this.dataStorageService.onFetchMenu();
    this.subscription = this.dataStorageService.menuChanges
      .subscribe(
      (menuList: menuList) => {
        const menuLists: menuList = menuList;
        this.getMenuLogic(menuLists);

      }
      );
    const menuList: menuList = this.dataStorageService.getMenuList();
    this.getMenuLogic(menuList);

  }

  goFullscreen = function () {
  }

  logout = function () {
    const data: Object = {

    };
    this.dataStorageService.onLogout(data);
  }

  searchPopUp = function () {
    if (this.showSearchBox) {
      this.showSearchBox = false;
    }
    else {
      this.showSearchBox = true;
    }
  }

  profile = function () {
    var profile = "/settings/users/userprofile"
    window.location.href = location.origin + "/#" + profile;
  }

  getCurrentUserFullName() {
    return localStorage.getItem(location.hostname + "currentUserFullName");
  }

  searchpath = function (menu) {

  }
  setLogoUrl(logoUrl) {
    localStorage.setItem(location.hostname + "logoUrl", logoUrl);
  }
  getLogoUrl() {
    return localStorage.getItem("companyLogo");
  }

  ngOnDestroy() {
  }

}

