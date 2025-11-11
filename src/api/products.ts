import axios, { AxiosResponse } from "axios";
import { Product } from "../types/Product";

export const getProducts = async (): Promise<Product[]> => {
    const URL = process.env.REACT_APP_API_URL;
    try{
        const res: AxiosResponse<Product[]> = await axios.get<Product[]>(`${URL}/products`);
        return res.data;
    }
    catch(err){
        console.error('Failed to fetch products:', err);
        }
    return [];
}