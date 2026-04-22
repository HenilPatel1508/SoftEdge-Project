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
        `http://localhost:3000/api/v1/product/update/${editProduct._id}`,
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
        `http://localhost:3000/api/v1/product/delete/${productId}`,
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
    <div className="pl-[350px] py-20 pr-20 flex flex-col gap-3 min-h-screen bg-gray-100">
      <div className="flex justify-between">
        <div className="relative bg-white rounded-lg">
          <Input
            type="text"
            value={searchterm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search Product......"
            className="w-[400px] p-5 placeholder:text-lg items-center"
          />
          <Search className="absolute right-3 top-1.5 text-gray-500" />
        </div>
        <Select onValueChange={(value)=>setSortOrder(value)}>
          <SelectTrigger className="w-[280px] bg-white p-5 text-md">
            <SelectValue placeholder="Sort By Price" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="Low To High">Low To High</SelectItem>
              <SelectItem value="High To Low">High To Low</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      {filterdProduct.map((product, index) => {
        return (
          <Card key={index} className="px-4">
            <div className="flex items-center justify-between">
              <div className="flex gap-2 items-center">
                <img
                  src={product.productImg[0].url}
                  alt=""
                  className="w-25 h-25"
                />
                <h1 className="font-bold text-lg p-5 w-96 text-gray-600">
                  {product.productName}
                </h1>
              </div>
              <h1 className="font-bold text-lg">₹{product.productPrice}</h1>
              <div className="flex gap-3 cursor-pointer">
                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger
                    render={
                      <Edit
                        onClick={() => {
                          (setOpen(true), setEditProduct(product));
                        }}
                        className="text-green-500"
                      />
                    }
                  />
                  <DialogContent className="sm:max-w-2xl max-h-[730px] overflow-y-scroll">
                    <DialogHeader>
                      <DialogTitle className={"text-2xl text-bold"}>
                        Edit Product
                      </DialogTitle>
                      <DialogDescription className={"text-xl"}>
                        Make changes to your product here. Click save when
                        you&apos;re done.
                      </DialogDescription>
                    </DialogHeader>
                    <FieldGroup>
                      <div className="flex flex-col gap-2">
                        <Field className={"grid gap-2"}>
                          <Label className={"text-xl text-semibold"}>
                            Product Name
                          </Label>
                          <Input
                            type="text"
                            value={editProduct?.productName}
                            onChange={handleChange}
                            name="productName"
                            placeholder="Ex-T-shirt"
                            required
                          />
                        </Field>
                        <Field className={"grid gap-2"}>
                          <Label className={"text-xl text-semibold"}>
                            Price
                          </Label>
                          <Input
                            type="number"
                            value={editProduct?.productPrice}
                            onChange={handleChange}
                            name="productPrice"
                            placeholder="Ex-200"
                            required
                          />
                        </Field>
                        <div className="grid grid-cols-2 gap-4">
                          <Field className={"grid gap-2"}>
                            <Label className={"text-xl text-semibold"}>
                              Brand
                            </Label>
                            <Input
                              type="text"
                              name="brand"
                              value={editProduct?.brand}
                              onChange={handleChange}
                              placeholder="Ex-Puma"
                              required
                            />
                          </Field>
                          <Field className={"grid gap-2"}>
                            <Label className={"text-xl text-semibold"}>
                              Category
                            </Label>
                            <Input
                              type="text"
                              name="category"
                              value={editProduct?.category}
                              onChange={handleChange}
                              placeholder="Ex-Shirt"
                              required
                            />
                          </Field>
                        </div>
                        <div className="grid gap-2">
                          <div className="flex items-center">
                            <Label className={"text-xl text-semibold"}>
                              Product Description
                            </Label>
                            <Textarea
                              name="productDesc"
                              value={editProduct?.productDesc}
                              onChange={handleChange}
                              placeholder="Enter Brief Description of Product"
                            />
                          </div>
                          <ImageUpload
                            productData={editProduct}
                            setProductData={setEditProduct}
                          />
                        </div>
                      </div>
                    </FieldGroup>
                    <DialogFooter>
                      <DialogClose
                        render={<Button variant="outline">Cancel</Button>}
                      />
                      <Button onClick={handleSave} type="submit">
                        Save changes
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <AlertDialog>
                  <AlertDialogTrigger className="cursor-pointer">
                    <Trash2 color="#cd3232" />
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your account from our servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => deleteProductHandler(product._id)}
                      >
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default AdminProduct;
