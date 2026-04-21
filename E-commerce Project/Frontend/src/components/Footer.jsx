import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook,FaInstagram, FaTwitter,FaLinkedin} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-200 py-10">
      <div className="max-w-7xl mx-auto px-4 md:flex md:justify-between">
        {/* info */}
        <div className="mb-6 md:mb-6">
          <Link to={"/"}>
            <img src="/shopping-cart.png" className="w-32" alt="" />
          </Link>
          <p className="mt-2 text-lg">
            A sophisticated e-commerce template designed for modern and
            minimalist brands.
          </p>
          <p className="mt-2 text-lg">Sahibag,Ahmedabad</p>
          <p className="text-lg">Email:ecommerce@gmail.com</p>
          <p className="text-lg">Phone:+91 1233448877</p>
        </div>
        {/* Customer Service link */}
        <div className="mb-6 md:mb-6">
          <h3 className="text-xl font-semibold underline" >Customer Service</h3>
          <ul className="mt-2 text-lg space-y-2">
            <li>Contact us</li>
            <li>Shipping & Returns</li>
            <li>FAQs</li>
            <li>Order Tracking</li>
            <li>Size Guide</li>
          </ul>
        </div>
        {/* social media links */}
        <div className="mb-6 md:mb-0">
          <h3 className="text-xl font-semibold underline">Follow Us</h3>
          <div className="flex space-x-4 mt-2 text-2xl">
            <FaFacebook />
            <FaInstagram />
            <FaTwitter />
            <FaLinkedin />
          </div>
        </div>
        {/* newsteller Subscription */}

      </div>
    </footer>
  );
};

export default Footer;
