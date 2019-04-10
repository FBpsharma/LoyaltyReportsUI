export class value {
    public Id: number;
    public Name: string;
    public Label: string;
    public URLPath: string;
    public CssClass: string;
    public ParentId: number;
    public Level: number;
    public SortOrder: number;
    public Isdefault: boolean;
    public FeatureId: number;
    public ProductId: number;
  
    constructor(
      Id: number,
      Name: string,
      Label: string,
      URLPath: string,
      CssClass: string,
      ParentId: number,
      Level: number,
      SortOrder: number,
      Isdefault: boolean,
      FeatureId: number,
      ProductId: number
    ) {
      this.Id = Id;
      this.Name = Name;
      this.Label = Label;
      this.URLPath = URLPath;
      this.CssClass = CssClass;
      this.ParentId = ParentId;
      this.Level = Level;
      this.SortOrder = SortOrder;
      this.Isdefault = Isdefault;
      this.FeatureId = FeatureId;
      this.ProductId = ProductId;
    }
  }
  
  export class menuList {
    constructor(
      public value: value[],
    ) { }
  }

  export class ListObj {
    public preMenuIndex: number;
    public menuIndex: number;
    public childSubMenuListArray: value[];
    public Id: number;
    public Name: string;
    public Label: string;
    public URLPath: string;
    public CssClass: string;
    public ParentId: number;
    public Level: number;
    public SortOrder: number;
    public Isdefault: boolean;
    public FeatureId: number;
    public ProductId: number;
    public IsNewTD: boolean;
  
    constructor(
      Id?: number,
      Name?: string,
      Label?: string,
      URLPath?: string,
      CssClass?: string,
      ParentId?: number,
      Level?: number,
      SortOrder?: number,
      Isdefault?: boolean,
      FeatureId?: number,
      ProductId?: number,
      childSubMenuListArray?: value[],
      preMenuIndex?: number,
      menuIndex?: number,
      IsNewTD?: boolean
    ) {
      this.Id = Id;
      this.Name = Name;
      this.Label = Label;
      this.URLPath = URLPath;
      this.CssClass = CssClass;
      this.ParentId = ParentId;
      this.Level = Level;
      this.SortOrder = SortOrder;
      this.Isdefault = Isdefault;
      this.FeatureId = FeatureId;
      this.ProductId = ProductId;
      this.childSubMenuListArray = childSubMenuListArray;
      this.preMenuIndex = preMenuIndex;
      this.menuIndex = menuIndex;
      this.IsNewTD = IsNewTD;
    }
  }
  
  export class localSubmenuLists {
    public localSubmenuList: ListObj[];
    constructor(
      localSubmenuList?: ListObj[],
    ) {
      this.localSubmenuList = localSubmenuList;
    }
  }