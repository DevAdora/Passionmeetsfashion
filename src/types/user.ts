// export interface Profile {
//   id: string; 
//   fullName: string;
//   email: string;
//   phone?: string;
//   street?: string;
//   city?: string;
//   postal?: string;
//   password?: string; 
//   role: string;
//   created_at: string;
// }

export interface Profile {
  id: string;
  fullName: string;   
  email?: string;
  password?: string;
  role: string;
  created_at: string;
  street?: string;
  city?: string;
  province?: string;
  postal?: string;
  phone?: string;
}
