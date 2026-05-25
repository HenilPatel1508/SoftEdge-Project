import { Product } from "../models/productModel.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/dataUri.js";

// export const addProduct = async (req, res) => {
//   try {
//     const { productName, productDesc, productPrice, category, brand } =
//       req.body;
//     const userId = req.id;
//     if (!productName || !productDesc || !productPrice || !category || !brand) {
//       return res.status(400).json({
//         success: false,
//         message: "All Fields Are Required!!!!",
//       });
//     }

//     //Handle Multiple Image Upload
//     let productImg = [];

//     for (let file of req.files) {
//       const fileUri = getDataUri(file);
//       const result = await cloudinary.uploader.upload(fileUri.content, {
//         folder: "E-commerce",
//       });

//       productImg.push({
//         url: result.secure_url,
//         public_id: result.public_id,
//       });
//     }
//     // Create a Product in DB

//     const newProduct = await Product.create({
//       userId,
//       productName,
//       productDesc,
//       productPrice,
//       category,
//       brand,
//       productImg,
//     });

//     return res.status(200).json({
//       success: true,
//       message: "Product Added Succefully",
//       product: newProduct,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

export const addProduct = async (req, res) => {
  try {
    const { productName, productDesc, productPrice, category, brand } =
      req.body;
    const userId = req.id;

    if (!productName || !productDesc || !productPrice || !category || !brand) {
      return res.status(400).json({
        success: false,
        message: "All Fields Are Required!!!!",
      });
    }

    let productImg = [];

    if (req.files && req.files.length > 0) {
      for (let file of req.files) {
        const fileUri = getDataUri(file);

        const result = await cloudinary.uploader.upload(fileUri.content, {
          folder: "E-commerce",
        });

        productImg.push({
          url: result.secure_url,
          public_id: result.public_id,
        });
      }
    }

    const newProduct = await Product.create({
      userId,
      productName,
      productDesc,
      productPrice,
      category,
      brand,
      productImg,
    });

    return res.status(200).json({
      success: true,
      message: "Product Added Successfully",
      product: newProduct,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// export const getAllProduct = async (_, res) => {
//   try {
//     const products = await Product.find();
//     if (!products) {
//       return res.status(404).json({
//         success: false,
//         message: "No Product Available",
//         products: [],
//       });
//     }
//     return res.status(200).json({
//       success: true,
//       products,
//     });
//   } catch (error) {
//     return (
//       res.status(500),
//       json({
//         success: false,
//         message: error.message,
//       })
//     );
//   }
// };


export const getAllProduct = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const totalProducts = await Product.countDocuments();

    const products = await Product.find()
      .skip(skip)
      .limit(limit);

    if (!products.length) {
      return res.status(404).json({
        success: false,
        message: "No Product Available",
        products: [],
      });
    }

    return res.status(200).json({
      success: true,
      products,
      currentPage: page,
      totalPages: Math.ceil(totalProducts / limit),
      totalProducts,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const deleteProduct = async (req,res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findByIdAndDelete(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product Not Found",
      });
    }

    // Delete images for cloudinary
    if (product.productImg && product.productImg.length > 0) {
      for (let img of product.productImg) {
        const result = await cloudinary.uploader.destroy(img.public_id);
      }
    }

    // Delete product for Mongodb

    await Product.findByIdAndDelete(productId);

    return res.status(200).json({
      success: true,
      message: "Product deleted Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const {
      productName,
      productDesc,
      productPrice,
      category,
      brand,
      existingImages,
    } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product Not Found",
      });
    }

    let updateImages = [];

    //Keep selected old images

    if (existingImages) {
      const KeepIds = JSON.parse(existingImages);
      updateImages = product.productImg.filter((img) =>
        KeepIds.includes(img.public_id),
      );

      //delete only removed images
      const removedimages = product.productImg.filter((img) =>
        !KeepIds.includes(img.public_id),
      );
      for(let img of removedimages){
        await cloudinary.uploader.destroy(img.public_id)
      }
    }else{
        updateImages = product.productImg // keep all if nothing sent 
    }

    // upload new images if any
    if(req.files && req.files.length > 0){
        for(let file of req.files){
            const fileUri = getDataUri(file)
            const result = await cloudinary.uploader.upload(fileUri,{folder:"MERN_Product"})
            updateImages.push({
                url:result.secure_url,
                public_id:result.public_id
            })
        }
    }

    //Update Product
    product.productName = productName || product.productName;
    product.productDesc = productDesc || product.productDesc;
    product.productPrice = productPrice || product.productPrice;
    product.category = category || product.category;
    product.brand = brand || product.brand;
    product.productImg = updateImages;

    await product.save()

    return res.status(200).json({
        success:true,
        message:"Product Updated Successfully",
        product
    })


  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
