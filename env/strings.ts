export interface Strings {
    es: En;
    en: En;
}

export interface En {
    general:                 General;
    footer:                  Footer;
    admission:               Admission;
    components:              Components;
    form:                    EnForm;
    calendar:                Calendar;
    appBar:                  AppBar;
    sendMethods:             SendMethods;
    customize:               Customize;
    newForm:                 NewForm;
    signing:                 Signing;
    business:                Business;
    login:                   Login;
    forms:                   Forms;
    summary:                 EnSummary;
    answers:                 Answers;
    visitor:                 Visitor;
    form_edit:               FormEdit;
    products:                EnProducts;
    settings:                Settings;
    create_product:          CreateProduct;
    create_product_messajes: CreateProductMessajes;
}

export interface Admission {
    title:   string;
    text:    string;
    buttons: string[];
    role:    Role;
    wait:    Wait;
}

export interface Role {
    label: string;
    roles: string[];
}

export interface Wait {
    title: string;
    body:  string;
}

export interface Answers {
    label:         string[];
    date:          string;
    list:          string;
    name:          string;
    send:          string;
    state:         string;
    actions:       string;
    download_data: string;
}

export interface AppBar {
    search: string;
    routes: string[];
}

export interface Business {
    addAccount:    string;
    removeAccount: string;
    makeMain:      string;
    mainAccount:   string;
    wait:          Wait;
    waitYet:       Wait;
    errors:        string;
    steps:         string[];
    next:          string;
    yetBrand:      Brand;
    newBrand:      Brand;
}

export interface Brand {
    altBtn:        string;
    title:         string;
    info:          string;
    onSend:        Wait;
    sameUrlError?: Wait;
    inputs:        Category[];
    phoneInput?:   string;
    category:      Category;
    emailMsg?:     string[];
}

export interface Category {
    label:         string;
    name:          string;
    type:          string;
    data?:         string[];
    field:         string;
    autocomplete?: string;
}

export interface Calendar {
    title: string;
    text:  string;
}

export interface Components {
    tooltips:        Tooltips;
    stepper:         Stepper;
    coupon:          Coupon;
    requestGeo:      string;
    hideGeo:         string;
    labels:          string[];
    products:        ComponentsProducts;
    formInput:       FormInput;
    date:            DateClass;
    option:          Option;
    media:           Media;
    placeholder:     Placeholder;
    geoPlaceholders: string[];
    linkHelper:      string;
    titleHelper:     string;
    helper:          string;
}

export interface Coupon {
    percent:     string;
    discLabel:   string;
    showCoupons: string;
    alert:       Wait;
    typeLabel:   string;
    typeOptions: string[];
    preview:     string;
    form:        CouponForm;
}

export interface CouponForm {
    multiples: string[];
    id:        string;
    percent:   string;
    count:     string;
}

export interface DateClass {
    interval:         string;
    title:            string;
    validation:       string;
    days:             string[];
    clientTime:       Wait;
    rangeClient:      string[];
    range:            string;
    rangeTitles:      string[];
    time:             string;
    reservation:      string;
    errorReservation: Wait;
    label:            string;
    buttons:          string[];
}

export interface FormInput {
    required: string;
    new:      string;
}

export interface Media {
    label: string;
}

export interface Option {
    label: string;
    btn:   string;
}

export interface Placeholder {
    short:     string;
    long:      string;
    products:  string;
    options:   string;
    checkbox:  string;
    coupon:    string;
    link:      string;
    title:     string;
    image:     string;
    imageHref: string;
    video:     string;
    videoHref: string;
}

export interface ComponentsProducts {
    addProduct:         string;
    free:               string;
    checkout:           string;
    checkoutAlert:      Wait;
    checkoutInputs:     string[];
    shippingBtn:        string;
    tagsTooltips:       string[];
    shippingLabel:      string;
    shippingPriceLabel: string;
    shippingAlert:      string;
    emptyError:         Wait;
    requiredError:      Wait;
    checkoutOptions:    string[];
    add:                string[];
    alert:              Wait;
    info:               Info;
    wait:               Wait;
    select:             string;
    cart:               string;
    cartConfirmed:      string;
}

export interface Info {
    category: string;
    price:    string;
    sku:      string;
    select:   string;
}

export interface Stepper {
    next: string;
    back: string;
}

export interface Tooltips {
    new:      string;
    link:     string;
    title:    string;
    image:    string;
    video:    string;
    drag:     string;
    delete:   string;
    copy:     string;
    required: string;
    products: string;
    geo:      string;
    coupon:   string;
}

export interface CreateProduct {
    create:              string;
    back:                string;
    save_product:        string;
    title:               string;
    description:         string;
    categori:            string;
    add_extras:          string;
    cant:                string;
    option_unique:       string;
    option_multiple:     string;
    add:                 string;
    new_categori:        string;
    save:                string;
    picture_product:     string;
    recomendate_picture: string;
    size_max:            string;
    replace_picture:     string;
    price_product:       string;
    price_promo:         string;
    united:              string;
    united_name:         string;
    active:              string;
    SKU:                 string;
    stock:               string;
    stock_infinite:      string;
    stock_limited:       string;
    stock_no:            string;
    state:               string;
    the_products:        string;
    product_desta:       string;
    desta:               string;
    the_products_desta:  string;
    add_title_extra:     string;
    name_optional:       string;
    add_title_product:   string;
    add_dec_product:     string;
    add_title_cat:       string;
    no_category:         string;
    type_variable:       string;
    value:               string;
}

export interface CreateProductMessajes {
    max_img:       string;
    max_img_body:  string;
    cat_succeful:  string;
    cat_succeful1: string;
    cat_succeful2: string;
    fields:        string[];
}

export interface Customize {
    title:       string;
    back:        string;
    bannerTitle: string;
    imageHelp:   string;
    bannerHelp:  string;
    gradient:    string;
    degrees:     string;
    image:       string;
    banner:      string;
}

export interface Footer {
    title:   string;
    privacy: string;
    terms:   string;
}

export interface EnForm {
    date:             string;
    public:           Wait;
    private:          Wait;
    summary:          FormSummary;
    notEmpty:         Wait;
    geo:              string;
    validation:       Validation;
    cart:             Cart;
    hiddenForm:       string;
    submit:           string;
    notification:     string;
    bankTransfer:     string;
    submitSubject:    string;
    submitRequired:   Wait;
    submitTitle:      string;
    sendAlert:        Wait;
    submitEmptyStock: SubmitEmptyStock;
    success:          Wait;
    successTracking:  string;
}

export interface Cart {
    title:    string;
    shipping: string;
    name:     string;
    guest:    string;
    desc:     string;
    payTitle: string;
    captcha:  Wait;
    error:    Wait;
    wait:     Wait;
    alert:    Wait;
    fields:   string[];
    pay:      string[];
}

export interface SubmitEmptyStock {
    subject: string;
    content: string;
}

export interface FormSummary {
    title:             string;
    items:             string;
    coupon:            string;
    couponAlert:       Wait;
    couponError:       Wait;
    couponErrorReused: Wait;
    desc:              string;
    products:          string;
    searched:          string;
    totalOf:           string;
    orderTotal:        string;
    payMethod:         string;
    taxes:             string;
}

export interface Validation {
    required: string;
    date:     string;
    name:     string;
}

export interface FormEdit {
    change_perfil:     string;
    select_tema:       string;
    edit_info:         string;
    name_business:     string;
    descript_business: string;
    cat_business:      string;
    url_business1:     string;
    url_business2:     string;
    saving_business:   string;
    view_visitor:      string;
    edit_color:        string;
    set_color:         string;
}

export interface Forms {
    accountMenuOptions: string[];
    forms:              string;
    "forms-desc":       string;
    filter:             string;
    "create-form":      string;
    form_recent:        string;
    public:             string;
    hidden:             string;
    answers:            string;
    old_recent:         string;
    recent_old:         string;
}

export interface General {
    title: string;
}

export interface Login {
    facebook:   string;
    google:     string;
    welcome:    string;
    forgot:     string;
    signing:    string;
    remember:   string;
    cta:        string;
    formInputs: Category[];
}

export interface NewForm {
    splash:          string;
    iFrame:          IFrame;
    banner:          Calendar;
    personalOptions: PersonalOptions;
    cloudLoad:       string;
    shareMenu:       ShareMenu;
    idField:         string;
    options:         string[];
    optionsAlert:    Wait;
    publishAlert:    Wait;
    share:           Wait;
    shareFrame:      Wait;
    shareSuccess:    ShareSuccess;
    publishSuccess:  PublishSuccess;
    publishMsg:      string;
    loadImage:       Wait;
    uploadError:     Wait;
    loadedImage:     string;
    cloud:           string;
    title:           string;
    topbarBtns:      string[];
    publishConfig:   string;
    publish:         string;
    unPublish:       string;
    emptyAlert:      Wait;
    defValues:       DefValues;
    unPublishAlert:  Wait;
    dnd:             string;
    description:     string;
    emptyList:       string;
}

export interface DefValues {
    short:       string;
    multiple:    string;
    long:        string;
    helper:      string;
    link:        string;
    title:       string;
    description: string;
    select:      string;
}

export interface IFrame {
    title:    string;
    sizesLbl: string;
    sizes:    string[];
    preview:  string;
    copy:     string;
}

export interface PersonalOptions {
    name:       string;
    nameHelper: string;
    helper:     string;
    title:      string;
    fields:     string[];
    helpers:    string[];
}

export interface PublishSuccess {
    title:  string;
    body:   string;
    see:    string;
    seeBtn: string;
}

export interface ShareMenu {
    link:   string;
    insert: string;
    qr:     string;
}

export interface ShareSuccess {
    title: string;
    body:  string;
    bit:   string;
}

export interface EnProducts {
    cat_products: string;
    product_1:    string;
    categoris:    string;
    new_product:  string;
    title:        string;
    categori:     string;
    price:        string;
    state:        string;
    actions:      string;
    edith:        string;
}

export interface SendMethods {
    whts:   string;
    wError: string;
    wEmail: string;
    wLink:  string;
    email:  string;
    btn:    string;
    cancel: string;
}

export interface Settings {
    print:        string;
    no_account:   string;
    type_account: string;
    bank:         string;
}

export interface Signing {
    nameInput: string;
    create:    string;
}

export interface EnSummary {
    title: string;
    desc:  string;
}

export interface Visitor {
    edit: string;
}
