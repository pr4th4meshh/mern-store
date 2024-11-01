import { truncateDescription } from "@/utils/commonUtils"
import { List, Button } from "antd"
import Link from "next/link"
import React from "react"
import Image from "next/image"

interface ListItemComponentProps {
  item: any
  showQuantityCounter?: boolean
  handleRemoveQuantity?: () => void
  handleAddQuantity?: () => void
  handleDeleteItem?: () => void
}

const ListItemComponent = ({
  item,
  showQuantityCounter,
  handleRemoveQuantity,
  handleAddQuantity,
  handleDeleteItem,
}: ListItemComponentProps) => {
  console.log("ITEM", item)
  if (!item) return <h1>404 return to home</h1>
  console.log("listitem", item)
  const {
    productId: { _id, name, description, price, category, productImages },
    selectedSize,
    quantity,
    _id: itemId,
  } = item
  return (
    <List.Item
      key={item?.title}
      className="border-gray-400 rounded-lg shadow-lg my-4"
      extra={
        <Link href={`/product/${_id}`}>
          <Image
            width={200}
            height={200}
            className="object-cover rounded-xl w-[150px] h-[150px]"
            alt={item.name}
            src={productImages[0] || "https://via.placeholder.com/300x300/ff0000"}
          />
        </Link>
      }
    >
      <div className="flex flex-col">
        <h1 className="text-xl font-semibold mb-2">
          {name?.charAt(0).toUpperCase() + name?.slice(1)}
        </h1>
        <span className=" text-gray-500 mb-1">
          {truncateDescription(description ? description: "")}
        </span>
        <p>
          Size:{" "}
          <span className="text-lg font-semibold mb-1">
            {selectedSize ? selectedSize : ""}
          </span>
        </p>

        <p>
          Price: <span className="text-lg font-semibold">${price ? price: ""}</span>
        </p>

        <div className="flex">
          {showQuantityCounter && (
            <div className="flex justify-center items-center mr-4">
              <Button
                onClick={handleRemoveQuantity}
                type="default"
                className="bg-secondary text-white text-lg w-min mt-2"
                disabled={quantity <= 1}
              >
                -
              </Button>
              <span className="text-lg px-3">{quantity}</span>
              <Button
                onClick={handleAddQuantity}
                type="default"
                className="bg-secondary text-white text-lg w-min mt-2"
              >
                +
              </Button>
            </div>
          )}
          <Button
            onClick={handleDeleteItem}
            type="default"
            className="border-secondary text-secondary text-lg w-min mt-2"
          >
            Remove Item
          </Button>
        </div>
      </div>
    </List.Item>
  )
}

export default ListItemComponent
