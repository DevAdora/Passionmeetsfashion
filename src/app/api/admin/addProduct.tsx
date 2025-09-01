import { supabase } from "@/lib/supabase";
import handleImageUpload from "./handleFileImageUpload";

export default async function addProduct(product: {
  name: string;
  description: string;
  colors: string[];
  sizes: { label: string; stock: number }[];
  price: number;
  category: string;
  imageFile: File;
}) {
  const imageUrl = await handleImageUpload(product.imageFile);
  if (!imageUrl) return { error: "Image upload failed" };

  const { error } = await supabase.from("products").insert([
    {
      name: product.name,
      description: product.description,
      colors: product.colors,
      sizes: product.sizes,
      category: product.category,
      price: product.price,
      image_url: imageUrl,
    },
  ]);

  if (error) {
    console.error("Error inserting product:", error);
    return { error };
  }

  return { success: true };
}
