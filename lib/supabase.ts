import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Product {
  id: string;
  name: string;
  name_ar: string;
  description?: string;
  description_ar?: string;
  price: number;
  currency: string;
  images: string[];
  is_available: boolean;
  is_featured: boolean;
  brand?: string;
  model?: string;
  category_id?: string;
  categories?: {
    name: string;
    name_ar: string;
  };
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  name_ar: string;
  description?: string;
  description_ar?: string;
  image_url?: string;
  created_at: string;
  updated_at: string;
}

export const getProducts = async (): Promise<Product[]> => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        categories (
          name,
          name_ar
        )
      `)
      .eq('is_available', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching products:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

export const getCategories = async (): Promise<Category[]> => {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name_ar');

    if (error) {
      console.error('Error fetching categories:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

export const getFeaturedProducts = async (): Promise<Product[]> => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        categories (
          name,
          name_ar
        )
      `)
      .eq('is_available', true)
      .eq('is_featured', true)
      .order('created_at', { ascending: false })
      .limit(10);

    if (error) {
      console.error('Error fetching featured products:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching featured products:', error);
    return [];
  }
};

export const getProductsByCategory = async (categoryId: string): Promise<Product[]> => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        categories (
          name,
          name_ar
        )
      `)
      .eq('is_available', true)
      .eq('category_id', categoryId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching products by category:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching products by category:', error);
    return [];
  }
};

export const searchProducts = async (query: string): Promise<Product[]> => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        categories (
          name,
          name_ar
        )
      `)
      .eq('is_available', true)
      .or(`name_ar.ilike.%${query}%,name.ilike.%${query}%,description_ar.ilike.%${query}%`)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error searching products:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error searching products:', error);
    return [];
  }
};