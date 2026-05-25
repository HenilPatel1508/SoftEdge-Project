import { Input } from "@/components/ui/input";
import { Edit, Search, Trash2 } from "lucide-react";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDispatch, useSelector } from "react-redux";
import store from "@/redux/store";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import ImageUpload from "@/components/ImageUpload";
import axios from "axios";
import { toast } from "sonner";
import { setProducts } from "@/redux/productSlice";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const AdminProduct = () => {
  const { products } = useSelector((store) => store.product);
  const [editProduct, setEditProduct] = useState(null);
  const [searchterm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const accessToken = localStorage.getItem("accessToken");
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("productName", editProduct.productName);
    formData.append("productDesc", editProduct.productDesc);
    formData.append("productPrice", editProduct.productPrice);
    formData.append("category", editProduct.category);
    formData.append("brand", editProduct.brand);

    //Add existing image publicIds
    const existingImages = editProduct.productImg
      .filter((img) => !(img instanceof File) && img.public_id)
      .map((img) => img.public_id);

    formData.append("existingImages", JSON.stringify(existingImages));

    //add new Files

    editProduct.productImg
      .filter((img) => img instanceof File)
      .forEach((file) => {
        formData.append("files", file);
      });

    try {
      const res = await axios.put(
        `${import.meta.env.VITE_URL}/api/v1/product/update/${editProduct._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      if (res.data.success) {
        toast.success("Product Updated Successfully");
        const updateProducts = products.map((p) =>
          p._id === editProduct._id ? res.data.product : p,
        );
        dispatch(setProducts(updateProducts));
        setOpen(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteProductHandler = async (productId) => {
    try {
      const remainingProducts = products.filter(
        (product) => product._id !== productId,
      );
      const res = await axios.delete(
        `${import.meta.env.VITE_URL}/api/v1/product/delete/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(setProducts(remainingProducts));
      }
    } catch (error) {
      console.error(error);
    }
  };

  let filterdProduct = products.filter(
    (product) =>
      product.productName.toLowerCase().includes(searchterm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchterm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchterm.toLowerCase()),
  );

  if (sortOrder === "Low To High") {
    filterdProduct = [...filterdProduct].sort(
      (a, b) => a.productPrice - b.productPrice,
    );
  }
  if (sortOrder === "High To Low") {
    filterdProduct = [...filterdProduct].sort(
      (a, b) => b.productPrice - a.productPrice,
    );
  }

  return (
  <div className="flex-1 p-8 bg-slate-100 ml-75">
    
    {/* Top Section */}
    <div className="backdrop-blur-xl bg-white/60 border border-white/40 shadow-xl rounded-3xl p-6 mb-8">
      <div className="flex justify-between items-center gap-4">
        
        {/* Search */}
        <div className="relative w-[420px]">
          <Input
            type="text"
            value={searchterm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search Products..."
            className="w-full h-14 pl-5 pr-12 rounded-2xl bg-white/70 border-white/40 shadow-md"
          />
          <Search className="absolute right-4 top-4 text-slate-500" />
        </div>

        {/* Sort */}
        <Select onValueChange={(value) => setSortOrder(value)}>
          <SelectTrigger className="w-[260px] h-14 rounded-2xl bg-white/70 border-white/40 shadow-md">
            <SelectValue placeholder="Sort By Price" />
          </SelectTrigger>
          <SelectContent className="rounded-2xl">
            <SelectGroup>
              <SelectItem value="Low To High">Low To High</SelectItem>
              <SelectItem value="High To Low">High To Low</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>

    {/* Products */}
    <div className="grid gap-5">
      {filterdProduct.map((product, index) => {
        return (
          <Card
            key={index}
            className="backdrop-blur-xl bg-white/65 border border-white/40 shadow-xl rounded-3xl p-5 hover:shadow-2xl transition-all"
          >
            <div className="flex items-center justify-between">

              {/* Product Info */}
              <div className="flex items-center gap-5">
                <img
                  src={product.productImg[0].url}
                  alt=""
                  className="w-24 h-24 object-cover rounded-2xl shadow-lg"
                />

                <div>
                  <h1 className="text-xl font-bold text-slate-800">
                    {product.productName}
                  </h1>
                  <p className="text-slate-500 mt-1">
                    {product.brand} • {product.category}
                  </p>
                </div>
              </div>

              {/* Price */}
              <h1 className="text-2xl font-bold text-indigo-600">
                ₹{product.productPrice}
              </h1>

              {/* Actions */}
              <div className="flex gap-3">
                
                <div className="p-3 rounded-2xl bg-green-100 hover:bg-green-200 cursor-pointer transition">
                  <Edit
                    onClick={() => {
                      setOpen(true);
                      setEditProduct(product);
                    }}
                    className="text-green-600"
                  />
                </div>

                <div className="p-3 rounded-2xl bg-red-100 hover:bg-red-200 cursor-pointer transition">
                  <Trash2
                    onClick={() => deleteProductHandler(product._id)}
                    className="text-red-600"
                  />
                </div>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  </div>
);
};

export default AdminProduct;
