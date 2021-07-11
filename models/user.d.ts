interface User {
  business: string;
  role?: "admin" | "user" | "editor";
  uid: string;
  email: string;
  provider: string; // 'password' | 'google.com' | 'facebook.com'
  name: string;
  phone: string | null;
  picture: string | null;
}
