export interface IData {
  id?: number;             
  user_id: string;
  name: string;
  address: string;
  price_per_month: number;
  gender: string;
  facilities?: string;      
  image?: File | string;    
  created_at?: string;      
  updated_at?: string;   
 }
 