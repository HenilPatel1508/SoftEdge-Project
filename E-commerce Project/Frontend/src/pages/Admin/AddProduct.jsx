import ImageUpload from "@/components/ImageUpload";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { setProducts } from "@/redux/productSlice";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { Loader2, PackagePlus } from "lucide-react";

const AddProduct = () => {
  const accessToken = localStorage.getItem("accessToken");
  const dispatch = useDispatch();
  const { products } = useSelector((store) => store.product);

  const [loading, setLoading] = useState(false);

  const initialState = {
    productName: "",
    productDesc: "",
    productPrice: 0,
    productImg: [],
    brand: "",
    category: "",
  };

  const [productData, setProductData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("productName", productData.productName);
    formData.append("productDesc", productData.productDesc);
    formData.append("productPrice", productData.productPrice);
    formData.append("brand", productData.brand);
    formData.append("category", productData.category);

    if (productData.productImg.length === 0) {
      toast.error("Please Select at Least One Image");
      return;
    }

    productData.productImg.forEach((img) => {
      formData.append("files", img);
    });

    try {
      setLoading(true);

      const res = await axios.post(
        `${import.meta.env.VITE_URL}/api/v1/product/add-product`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (res.data.success) {
        dispatch(setProducts([...products, res.data.product]));
        toast.success(res.data.message);
        setProductData(initialState);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10 ml-[320px]">
      <div className="max-w-5xl mx-auto">
        <Card className="shadow-xl border-0 rounded-3xl overflow-hidden">
          
          {/* Header */}
          <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-8">
            <div className="flex items-center gap-3">
              <PackagePlus size={32} />
              <div>
                <CardTitle className="text-3xl font-bold">
                  Add New Product
                </CardTitle>
                <CardDescription className="text-indigo-100 text-base mt-1">
                  Fill in product details to upload your product
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div className="space-y-2">
                <Label className="font-semibold">Product Name</Label>
                <Input
                  type="text"
                  name="productName"
                  value={productData.productName}
                  onChange={handleChange}
                  placeholder="Ex - Jeans"
                  className="h-12 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label className="font-semibold">Brand</Label>
                <Input
                  type="text"
                  name="brand"
                  value={productData.brand}
                  onChange={handleChange}
                  placeholder="Ex - Puma"
                  className="h-12 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label className="font-semibold">Price</Label>
                <Input
                  type="number"
                  name="productPrice"
                  value={productData.productPrice}
                  onChange={handleChange}
                  placeholder="Ex - 1000"
                  className="h-12 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label className="font-semibold">Category</Label>
                <Input
                  type="text"
                  name="category"
                  value={productData.category}
                  onChange={handleChange}
                  placeholder="Ex - Shirt"
                  className="h-12 rounded-xl"
                />
              </div>

              <div className="md:col-span-2 space-y-2">
                <Label className="font-semibold">Product Description</Label>
                <Textarea
                  name="productDesc"
                  value={productData.productDesc}
                  onChange={handleChange}
                  placeholder="Write product description..."
                  className="rounded-xl min-h-[120px]"
                />
              </div>

              <div className="md:col-span-2 bg-slate-100 p-5 rounded-2xl">
                <Label className="font-semibold mb-3 block">
                  Upload Product Images
                </Label>
                <ImageUpload
                  productData={productData}
                  setProductData={setProductData}
                />
              </div>
            </div>

            <CardFooter className="px-0 mt-8">
              <Button
                disabled={loading}
                onClick={submitHandler}
                className="w-full h-14 text-lg rounded-2xl bg-indigo-600 hover:bg-indigo-700"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="animate-spin" />
                    Uploading...
                  </span>
                ) : (
                  "Add Product"
                )}
              </Button>
            </CardFooter>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AddProduct;