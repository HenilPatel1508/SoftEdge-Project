import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  addAddress,
  deleteAddress,
  setCart,
  setSelectedAddress,
} from "@/redux/productSlice";
import store from "@/redux/store";
import { Separator } from "@base-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
// import Products from "./Products";

const AddressForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });
  const { cart, addresses, selectedAddress } = useSelector(
    (store) => store.product,
  );
  const [showForm, setShowForm] = useState(
    addresses?.length > 0 ? false : true,
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSave = () => {
    dispatch(addAddress(formData));
    setShowForm(false);
  };

  const subtotal = cart.totalPrice;
  const shipping = subtotal > 50 ? 0 : 10;
  const tax = parseFloat((subtotal * 0.05).toFixed(2));
  const total = subtotal + shipping + tax;

  const handlePayment = async () => {
    const accessToken = localStorage.getItem("accessToken");
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_URL}/api/v1/order/create-order`,
        {
          products: cart?.items?.map((item) => ({
            productId: item.productId._id,
            quantity: item.quantity,
          })),
          tax,
          shipping,
          amount: total,
          currency: "INR",
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      if (!data.success) return toast.error("Something went wrong");

      console.log("Razorpay Data : ", data);

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.order.amount,
        currency: data.order.currency,
        order_id: data.order.id,
        name: "E-commerce",
        description: "Order Payment",
        handler: async function (response) {
          try {
            const verifyres = await axios.post(
              `${import.meta.env.VITE_URL}/api/v1/order/verify-payment`,
              response,
              {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              },
            );
            if (verifyres.data.success) {
              toast.success("✅ Payment Successfull!");
              dispatch(setCart({ items: [], totalPrice: 0 }));
              navigate("/order-success");
            } else {
              toast.error("❌Payment Verification Failed");
            }
          } catch (error) {
            toast.error("Error Verifying payment");
          }
        },
        modal: {
          ondismiss: async function () {
            //Handler user closing the Popup
            await axios.post(
              `${import.meta.env.VITE_URL}/api/v1/order/verify-payment`,
              {
                razorpay_order_id: data.order.id,
                paymentFailed: true,
              },
              {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              },
            );
            toast.error("Payment Cancelled or Failed");
          },
        },
        prefill: {
          name: formData.fullName,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: "#F472B6",
        },
      };
      const rzp = new window.Razorpay(options);

      //Listen for payment failures
      rzp.on("payment.failed", async function (response) {
        await axios.post(
          `${import.meta.env.VITE_URL}/api/v1/order/create-order`,
          {
            razorpay_order_id: data.order.id,
            paymentFailed: true,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );
        toast.error("Payment Failed.Please Try Again")
      });
      rzp.open()
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while processing payment");
    }
  };

  return (
    <div className="max-w-7xl mx-auto h-screen grid place-items-center p-5">
      <div className="grid grid-cols-2 items-start gap-20 max-w-7xl mx-auto">
        <div className="space-y-4 p-6 bg-white">
          {showForm ? (
            <>
              <div>
                <label htmlFor="fullName">Full Name</label>
                <Input
                  type="text"
                  id="fullName"
                  name="fullName"
                  required
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="phone">Phone Number</label>
                <Input
                  //   type="number"
                  id="phone"
                  name="phone"
                  required
                  placeholder="+91 9878965456"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="john@gmail.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="email">Address</label>
                <Input
                  type="address"
                  id="address"
                  name="address"
                  required
                  placeholder="123 Street"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="city">City</label>
                  <Input
                    type="text"
                    id="city"
                    name="city"
                    required
                    placeholder="Ahmedabad"
                    value={formData.city}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="state">State</label>
                  <Input
                    type="text"
                    id="state"
                    name="state"
                    required
                    placeholder="Gujarat"
                    value={formData.state}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="city">Country</label>
                  <Input
                    type="text"
                    id="country"
                    name="country"
                    required
                    placeholder="India"
                    value={formData.country}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="zip">ZipCode</label>
                  <Input
                    id="zipcode"
                    name="zip"
                    required
                    placeholder="382443"
                    value={formData.zip}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <Button onClick={handleSave} className="w-full">
                Save & Continue
              </Button>
            </>
          ) : (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Saved Address</h2>
              <div className="grid grid-cols-2 gap-5">
                {addresses.map((addr, index) => {
                  return (
                    <div
                      key={index}
                      onClick={() => dispatch(setSelectedAddress(index))}
                      className={`border  p-4 rounded-md cursor-pointer relative ${selectedAddress === index ? "border-pink-100 bg-pink-50" : "border-gray-300"}`}
                    >
                      <p className="font-medium">{addr.fullName}</p>
                      <p>{addr.phone}</p>
                      <p>{addr.email}</p>
                      <p>{addr.address}</p>
                      <p>{addr.city}</p>
                      <p>
                        {addr.state} {addr.country} {addr.zip}{" "}
                      </p>
                      <button
                        onClick={(e) => dispatch(deleteAddress(index))}
                        className="absolute top-5 right-5 text-red-500 hover:text-red-800 text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  );
                })}
              </div>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setShowForm(true)}
              >
                + Add New Address
              </Button>
              <Button
              onClick={handlePayment}
                disabled={selectedAddress === null}
                className="w-full bg-pink-600"
              >
                Proceed to CheckOut
              </Button>
            </div>
          )}
        </div>
        {/* Right Side Order Summary */}
        <div>
          <Card className="w-100 mt-15">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal ({cart.items.length}) items</span>
                <span>₹{subtotal.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping </span>
                <span>₹{shipping}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>₹{tax}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
              <div className="text-sm text-muted-foreground ">
                <p>* Free Shipping on order over 299</p>
                <p>* 30 Days Return Policy</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AddressForm;
