import FilterSidebar from "@/components/FilterSidebar";
import { Select } from "@/components/ui/select";
import React, { useEffect, useState } from "react";
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ProductCard from "@/components/ProductCard";
import { toast } from "sonner";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import store from "@/redux/store";
import { setProducts } from "@/redux/productSlice";

const Products = () => {
  const { products } = useSelector((store) => store.product);
  const [sortOrder, setSortOrder] = useState();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 99999]);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  // const getAllProduct = async () => {
  //   try {
  //     setLoading(true);
  //     const res = await axios.get(
  //       `${import.meta.env.VITE_URL}/api/v1/product/getAllProduct`,
  //     );
  //     if (res.data.success) {
  //       setAllProducts(res.data.products);
  //       console.log(res.data);
  //       dispatch(setProducts(res.data.products));
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     toast.error(error.response.data.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const getAllProduct = async (page = 1) => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${import.meta.env.VITE_URL}/api/v1/product/getAllProduct?page=${page}&limit=${limit}`,
      );

      if (res.data.success) {
        setAllProducts(res.data.products);
        setPage(res.data.currentPage);
        setTotalPages(res.data.totalPages);

        dispatch(setProducts(res.data.products));
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (allProducts.length === 0) return;

    let filtered = [...allProducts];

    if (search.trim() !== "") {
      filtered = filtered.filter((p) =>
        p.productName?.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (category !== "All") {
      filtered = filtered.filter((p) => p.category === category);
    }

    if (brand !== "All") {
      filtered = filtered.filter((p) => p.brand === brand);
    }

    filtered = filtered.filter(
      (p) => p.productPrice >= priceRange[0] && p.productPrice <= priceRange[1],
    );

    if (sortOrder === "Low to High") {
      filtered.sort((a, b) => a.productPrice - b.productPrice);
    } else if (sortOrder === "High to Low") {
      filtered.sort((a, b) => b.productPrice - a.productPrice);
    }
    dispatch(setProducts(filtered));
  }, [search, category, brand, sortOrder, priceRange, allProducts, dispatch]);

  useEffect(() => {
    getAllProduct(page);
  }, [page]);
  return (
    <div className="pt-25 pb-10">
      <div className="max-w-7xl mx-auto flex gap-7">
        {/* sidebar */}
        <FilterSidebar
          search={search}
          setSearch={setSearch}
          brand={brand}
          setBrand={setBrand}
          category={category}
          setCategory={setCategory}
          allProducts={allProducts}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
        />
        {/* MainProduct Section */}
        {/* MainProduct Section */}
        <div className="flex flex-col flex-1">
          <div className="flex justify-between items-center mb-6 bg-white shadow-sm rounded-xl px-5 py-4 border">
            <h2 className="text-xl font-semibold text-gray-800">
              {category === "All"
                ? "Explore All Products"
                : `Explore ${category}`}
            </h2>

            <Select onValueChange={(value) => setSortOrder(value)}>
              <SelectTrigger className="w-64 h-12 rounded-xl border-2 border-gray-200 bg-gray-50 hover:bg-white transition-all duration-200 shadow-sm focus:ring-2 focus:ring-black">
                <SelectValue placeholder="Sort Products" />
              </SelectTrigger>

              <SelectContent className="rounded-xl border shadow-xl bg-white">
                <SelectGroup>
                  <SelectItem
                    value="Low to High"
                    className="cursor-pointer hover:bg-gray-100"
                  >
                    Price: Low → High
                  </SelectItem>

                  <SelectItem
                    value="High to Low"
                    className="cursor-pointer hover:bg-gray-100"
                  >
                    Price: High → Low
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 pr-10 gap-7">
            {products.map((product) => {
              return (
                <ProductCard
                  key={product._id}
                  product={product}
                  loading={loading}
                />
              );
            })}
          </div>
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Prev
            </button>

            <span>
              Page {page} of {totalPages}
            </span>

            <button
              disabled={page === totalPages}
              onClick={() => setPage((prev) => prev + 1)}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
