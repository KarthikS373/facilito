interface Business {
  [index: string]:
    | string
    | "Tecnología"
    | string[]
    | undefined
    | CompanyBankAccount[]
    | CardPointeData[]
    | BusinessPermissions
    | Subscription;
  name: string;
  category: "Tecnología";
  url: string;
  id: string;
  phone: string;

  // DATOS AGREGADOS
  description?: string;
  forms?: string[]; // lista de IDs de formularios
  users?: string[]; // lista de emails de usuarios
  products?: string[];
  picture?: string;
  categories?: string[]; // Listado de categorías personales
  tokens?: string[]; // listado de tokens push
  badge: string;
  lang: "es" | "en";
  background?: string;
  backgroundImage?: string; // Imagen de fondo
  gallery: string[];

  // INFORMACIÓN BANCARIA
  bankAccounts?: CompanyBankAccount[];
  paymentAccounts?: CompanyPaymentAccount[];
  permissions?: BusinessPermissions;
  subscription?: Subscription;
}

interface BusinessPermissions {
  [index: string]: boolean;
  forms: boolean;
  calendar: boolean;
  products: boolean;
  print: boolean;
  tracking: boolean;
  templates: boolean;
  payments: boolean;
}

interface CompanyPaymentAccount extends CardPointeData {
  main: boolean;
}

interface CompanyBankAccount {
  [id: string]: string;
  typeAccount: string;
  nameAccount: string;
  noAccount: string;
  bank: string;
}

interface Admission {
  user: {
    email?: string;
    phone: string | null;
    picture: string | null;
    name: string;
  };
  business: Business;
}

interface BackgroundProfile {
  background?: string;
  backgroundImage?: string;
  backgroundSize?: string;
}

interface Subscription {
  plan: string;
  price: string;
  duration: number; // DATO EN DIAS
}
