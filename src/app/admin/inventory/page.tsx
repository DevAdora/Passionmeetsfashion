"use client";

import { useState, useEffect, ChangeEvent } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

export default function AdminInventoryPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Form state
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [colors, setColors] = useState<string[]>([]);
  const [sizes, setSizes] = useState([
    { label: "Small", stock: 0 },
    { label: "Medium", stock: 0 },
    { label: "Large", stock: 0 },
  ]);
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(""); // NEW
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  async function handleImageUpload(file: File) {
    const fileName = `${Date.now()}-${file.name}`;
    const { data, error } = await supabase.storage
      .from("product-images")
      .upload(fileName, file);

    if (error) {
      console.error("Error uploading image:", error);
      return null;
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("product-images").getPublicUrl(fileName);

    return publicUrl;
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    setLoading(true);
    const { data, error } = await supabase.from("products").select("*");
    if (!error) {
      setProducts(data);
    }
    setLoading(false);
  }

  async function addProduct() {
    if (!name || !price || !imageFile || !category) {
      alert("Please fill in all required fields");
      return;
    }

    setUploading(true);

    const imageUrl = await handleImageUpload(imageFile);
    if (!imageUrl) {
      setUploading(false);
      return;
    }

    const { error } = await supabase.from("products").insert([
      {
        name,
        description,
        colors,
        sizes,
        category, // NEW
        price: parseFloat(price),
        image_url: imageUrl,
      },
    ]);

    setUploading(false);

    if (!error) {
      setName("");
      setDescription("");
      setColors([]);
      setSizes([
        { label: "Small", stock: 0 },
        { label: "Medium", stock: 0 },
        { label: "Large", stock: 0 },
      ]);
      setPrice("");
      setCategory(""); // reset
      setImageFile(null);

      fetchProducts();
    } else {
      console.error(error);
    }
  }

  async function deleteProduct(id: string) {
    await supabase.from("products").delete().eq("id", id);
    fetchProducts();
  }

  return (
    <section className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Inventory</h1>

        <Dialog>
          <DialogTrigger asChild>
            <Button>Add Item</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <Input
                placeholder="Product Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <Input
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              /> {/* NEW */}
              <Input
                placeholder="Colors (comma separated)"
                value={colors.join(", ")}
                onChange={(e) =>
                  setColors(e.target.value.split(",").map((c) => c.trim()))
                }
              />
              <div className="space-y-2">
                {sizes.map((size, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={size.label}
                      onChange={(e) => {
                        const updated = [...sizes];
                        updated[index].label = e.target.value;
                        setSizes(updated);
                      }}
                      placeholder="Size label"
                    />
                    <Input
                      type="number"
                      value={size.stock}
                      onChange={(e) => {
                        const updated = [...sizes];
                        updated[index].stock = parseInt(e.target.value) || 0;
                        setSizes(updated);
                      }}
                      placeholder="Stock"
                    />
                  </div>
                ))}
              </div>

              <Input
                type="file"
                accept="image/*"
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  if (e.target.files && e.target.files.length > 0) {
                    setImageFile(e.target.files[0]);
                  }
                }}
              />
              <Input
                placeholder="Price"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <Button onClick={addProduct}>Save</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Products Grid */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-1">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white shadow-md rounded-lg p-4 flex justify-between"
            >
              <div className="w-[40%] flex">
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="h-48 w-[40%] object-contain rounded"
                />
                <div className="ml-4 flex-1">
                  <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
                  <p className="text-sm text-gray-600">{product.description}</p>
                  <p className="text-xs text-gray-500">
                    Category: {product.category}
                  </p> {/* NEW */}
                </div>
                <div className="mt-2 gap-2">
                  {product.colors?.map((color: string, idx: number) => (
                    <Badge key={idx} variant="secondary">
                      {color}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="mt-2 gap-2">
                {product.sizes?.map((sizeObj: any, idx: number) => (
                  <Badge key={idx}>
                    {sizeObj.label} ({sizeObj.stock})
                  </Badge>
                ))}
              </div>
              <p className="mt-2 font-bold">${product.price}</p>

              <div className="flex gap-2 mt-4">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => alert("Edit functionality coming soon")}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  className="flex-1"
                  onClick={() => deleteProduct(product.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
