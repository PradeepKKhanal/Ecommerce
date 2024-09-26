
import {ToastId} from '@chakra-ui/react'
export interface Product{
    id: number;
      title: string;
      price: number;
      category?: string;
      quantity: number;
      image: string;
  
  }



export interface ProductApi{
    id: number;
    title: string;
    price: number;
    category: string;
    description: string;
    image: string;
    rating: {
      rate: number;
      count: number;
    };
}

export interface formData{
  fullname:string,
  email:string,
  phone:number,
  zone:string,
  province:string,
  // address:string,
  addresses:{address:string}[]
  paymentMethod:"Debit Card" | 'Esewa' |'Khalti'
}
export type addCart=(products:Product)=>ToastId

export type updateCart=(id:number,quantity:number)=>void

export type deleteCart=(id:number)=>void