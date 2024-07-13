"use client"
import ProductGallery from "./_components/ProductGallery"
import React, { useEffect, useState } from "react"
import {
  StarFilled,
  HeartOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons"
import ButtonComponent from "@/components/ui/ButtonComponent"
import { useGetProductByIdQuery } from "@/lib/api-slices/productsApiSlice"
import { useDispatch, useSelector } from "react-redux"
import { addItemToWishlist } from "@/lib/slices/wishlistSlice"
import { message } from "antd"
import { addItemsToCart } from "@/lib/slices/cartSlice"

export const dynamic = "force-dynamic"

const product = {
  id: "productId",
  name: "Sample Product",
  rating: "4.7",
  description: "This is a sample product description.",
  price: "90.00",
  color: "Cream",
  sizes: ["XS", "S", "M", "L", "XL", "XXL"],
  images: [
    "https://via.placeholder.com/600x600",
    "https://via.placeholder.com/600x600/ff0000",
    "https://via.placeholder.com/600x600/00ff00",
    "https://via.placeholder.com/600x600/0000ff",
  ],
}

const ProductDetailsPage = ({ params }: { params: { productId: string } }) => {
  const {
    data: productDetails,
    error: productDetailsError,
    isLoading: productDetailsLoading,
    refetch,
  } = useGetProductByIdQuery(params.productId)
  const [selectedSize, setSelectedSize] = useState(productDetails?.sizes[0])
  const dispatch = useDispatch()
  const wishlistedItems = useSelector(
    (state) => state.wishlistedItems.wishlistedItems,
  )
  const cart = useSelector((state) => state.cart.cart)
  const user = useSelector((state) => state.user.currentUser)

  useEffect(() => {
    refetch()
  }, [refetch])

  useEffect(() => {
    if (productDetails) {
      setSelectedSize(productDetails.sizes[0])
    }
  }, [productDetails])

  const isItemInWishlist = wishlistedItems.some(
    (item) => item._id === productDetails?._id,
  )

  const handleAddToWishlisted = () => {
    if (!user) {
      message.warning("You need to login/register to perform this action!")
    } else if (isItemInWishlist) {
      message.info("Item is already added in the Wishlist!")
    } else {
      const productWithSelectedSize = { ...productDetails, selectedSize }
      dispatch(addItemToWishlist({ item: productWithSelectedSize }))
      message.success(
        `Item of size (${selectedSize.toUpperCase()}) added to wishlited items!`,
      )
    }
  }

  const handleAddToCart = () => {
    const isItemInCart = cart.some(
      (item) =>
        item._id === productDetails._id && item.selectedSize === selectedSize,
    )

    if (!user) {
      message.warning("You need to login/register to perform this action!")
    } else if (isItemInCart) {
      message.info("Item is already added to the Cart!")
    } else {
      const productToBeAdded = { ...productDetails, selectedSize }
      dispatch(addItemsToCart({ item: productToBeAdded, quantity: 1 }))
      message.success(
        `Item of size (${selectedSize.toUpperCase()}) added to the Cart!`,
      )
    }
  }

  return (
    <div className="container mx-auto p-8">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2">
          <ProductGallery apiImages={productDetails?.productImages} images={product.images} />
        </div>
        <div className="w-full flex flex-col text-xl md:w-1/2 md:pl-10 mt-10 md:mt-10">
          <h1 className="text-3xl font-bold mb-4">{productDetails?.name}</h1>
          <p className="text-gray-700 mb-4">{productDetails?.description}</p>
          <span>Ratings:</span>
          <p className="text-gray-700 mb-4">
            <StarFilled className="pr-1 text-secondary" />
            {product.rating} / 5
          </p>
          <span>Color:</span>
          <p className="text-gray-700 mb-4 font-semibold">{product.color}</p>
          <span>Price:</span>
          <p className="text-2xl font-semibold mb-4">
            ${productDetails?.price}
          </p>
          <div className="flex flex-wrap gap-3 mb-3">
            <span>Sizes:</span>
            {productDetails?.sizes.map((size, index) => (
              <>
                <input
                  type="button"
                  value={size.toUpperCase()}
                  key={index}
                  className={`min-w-min cursor-pointer border px-4 py-1 text-lg rounded-full ${
                    selectedSize === size ? "border-secondary" : "border-black"
                  } `}
                  onClick={() => setSelectedSize(size)}
                />
              </>
            ))}
          </div>

          <ButtonComponent
            title={
              isItemInWishlist ? "Item added to Wishlist" : "Add to Wishlist"
            }
            textColor="text-white"
            bgColor="bg-secondary"
            icon={<HeartOutlined />}
            onClick={handleAddToWishlisted}
          />
          <ButtonComponent
            title="Add to Cart"
            textColor="text-white"
            bgColor="bg-black"
            icon={<ShoppingCartOutlined />}
            onClick={handleAddToCart}
          />
        </div>
      </div>
    </div>
  )
}

export default ProductDetailsPage
