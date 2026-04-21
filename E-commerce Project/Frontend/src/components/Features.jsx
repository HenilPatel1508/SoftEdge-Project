import { Headphones, Shield, Truck } from "lucide-react";
import React from "react";

const Features = () => {
  return (
    <section className="py-12 bg-muted/50">
      <div className="max-w-full mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="flex items-center space-x-4 justify-center">
            <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Truck className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <h3 className="font-semibold">Free Shipping</h3>
              <p className="text-muted-foreground">On order over RS:1000</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 justify-center">
            <div className="h-12 w-12 bg-green-200 rounded-full flex items-center justify-center">
              <Shield className="h-6 w-6 text-green-500" />
            </div>
            <div>
              <h3 className="font-semibold">Secure Payment</h3>
              <p className="text-muted-foreground">100% secure transaction</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 justify-center">
            <div className="h-12 w-12 bg-purple-200 rounded-full flex items-center justify-center">
              <Headphones className="h-6 w-6 text-purple-500" />
            </div>
            <div>
              <h3 className="font-semibold">24/7 Support</h3>
              <p className="text-muted-foreground">Always hear to help</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
