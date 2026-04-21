import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import React from "react";
import { useSelector } from "react-redux";
import { Trash, Trash2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

const Cart = () => {
  const cart = useSelector((store) => store.product.cart);
  console.log(cart);

  const subtotal = cart?.totalPrice;
  const shipping = subtotal > 299 ? 0 : 10;
  const tax = subtotal * 0.05; // 5%
  const total = subtotal + shipping + tax;

  return (
    <div className="pt-30 bg-gray-50 ">
      {cart?.items?.length > 0 ? (
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-800 mb-7">
            Shopping Cart
          </h1>
          <div className="max-w-7xl mx-auto flex gap-7">
            <div className="flex flex-col gap-5 flex-1">
              {cart?.items?.map((product, index) => {
                return (
                  <Card key={index}>
                    <div className="flex justify-between items-center pr-6">
                      <div className="flex items-center gap-5 w-[350px]">
                        <img
                          src={product?.productId?.productImg?.[0]?.url}
                          alt=""
                          className="w-25 h-25 pl-5 rounded"
                        />
                        <div className="w-70">
                          <h1 className="font-semibold truncate">
                            {product?.productId?.productName}
                          </h1>
                          <p>₹{product?.productId?.productPrice}</p>
                        </div>
                      </div>
                      <div className="flex gap-5 items-center ">
                        <Button variant="outline">-</Button>
                        <span>1 </span>
                        <Button variant="outline">+</Button>
                      </div>
                      <p>
                        ₹{product?.productId?.productPrice * product?.quantity}
                      </p>
                      <p className="flex text-red-500 items-center justify-center gap-2 cursor-pointer">
                        <Trash color="#cd3232" />
                        Remove
                      </p>
                    </div>
                  </Card>
                );
              })}
            </div>
            <div>
              <Card className="w-[400px]">
                <CardHeader>
                  <CardTitle className="text-2xl">Order Summery</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-lg">
                      Subtotal ({cart?.items?.length}items)
                    </span>
                    <span className="text-lg">
                      ₹{cart?.totalPrice?.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xl">Shipping</span>
                    <span className="text-xl">₹{shipping}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xl">Tax (5%)</span>
                    <span className="text-xl">₹{tax}</span>
                  </div>
                  <Separator/>
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>₹{total}</span>
                  </div>
                  <Button className="w-full bg-indigo-500 hover:bg-indigo-700 hover:scale-105 text-xl">Place Order</Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    <Link to='/products'>Continue Shopping</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      ) : (
        <div>Cart Is Empty</div>
      )}
    </div>
  );
};

export default Cart;
