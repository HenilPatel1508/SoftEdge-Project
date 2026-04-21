import React from "react";
import { Button } from "./ui/button";

const Hero = () => {
  return (
    <section className=" bg-[url('/hero.jpg')] bg-cover bg-center h-screen  text-white py-52">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl text-black font-bold mb-4">
              Branded Clothes at Best Price
            </h1>
            <p className="text-xl mb-6 text-black">
              Discover Cutting edge technology with unbeatable deals on
              Shirt,Pants ,T-shirts and more.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-black text-cyan-200 text-2xl hover:bg-white hover:text-black p-5">
                Shop Now
              </Button>
              <Button
                className="border-white text-white hover:bg-white text-2xl hover:text-black bg-transparent p-5"
                variant="outline"
              >
                View Deals
              </Button>
            </div>
          </div>
          <div className="relative">
            {/* <img src="/hero.jpg" className="absolute -top-20" alt="" /> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
