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
import addProduct from "@/app/api/admin/addProduct";
import fetchProducts from "@/app/api/admin/fetchProducts";
import { Product } from "@/types/product";

export default function AdminInventoryPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [colors, setColors] = useState<string[]>([]);
  const [sizes, setSizes] = useState([
    { label: "Small", stock: 0 },
    { label: "Medium", stock: 0 },
    { label: "Large", stock: 0 },
  ]);
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    setLoading(true);
    const data = await fetchProducts();
    setProducts(data);
    setLoading(false);
  }

  async function handleAddProduct() {
    if (!imageFile || !name || !price || !category) {
      alert("Please fill in all required fields");
      return;
    }

    const result = await addProduct({
      name,
      description,
      colors,
      sizes,
      category,
      price: parseFloat(price),
      imageFile,
    });

    if (!result.error) {
      alert("Product added!");
      loadProducts();
      resetForm();
    } else {
      alert("Error adding product");
    }
  }

  function resetForm() {
    setName("");
    setDescription("");
    setColors([]);
    setSizes([
      { label: "Small", stock: 0 },
      { label: "Medium", stock: 0 },
      { label: "Large", stock: 0 },
    ]);
    setPrice("");
    setCategory("");
    setImageFile(null);
  }

  async function deleteProduct(id: string) {
    await supabase.from("products").delete().eq("id", id);
    loadProducts();
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
              />
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
                        updated[index].stock =
                          parseInt(e.target.value) || 0;
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
              <Button onClick={handleAddProduct}>Save</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Products Grid */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white shadow-md rounded-lg p-4 flex justify-between"
            >
              <div className="flex w-[40%]">
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
                  </p>
                  <div className="mt-2 gap-2 flex flex-wrap">
                    {product.colors?.map((color: string, idx: number) => (
                      <Badge key={idx} variant="secondary">
                        {color}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-2 gap-2 flex flex-wrap">
                {product.sizes?.map(
                  (sizeObj: { label: string; stock: number }, idx: number) => (
                    <Badge key={idx}>
                      {sizeObj.label} ({sizeObj.stock})
                    </Badge>
                  )
                )}
              </div>
              <p className="mt-2 font-bold">${product.price}</p>

              <div className="flex gap-2 mt-4">
                <Button
                  variant="outline"
                  onClick={() => alert("Edit coming soon")}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
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
