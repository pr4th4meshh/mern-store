interface Item {
  price: number;
  quantity: number;
}

// Define your GST percentage as a constant
export const GST_PERCENTAGE = 3;

// Function to calculate the total price including GST
export const calculateTotalPrice = (subTotal: number, gstPercentage: number) => {
  const gstAmount = (gstPercentage / 100) * subTotal;
  const totalPrice = subTotal + gstAmount;
  const roundedTotalPrice = Math.round(totalPrice * 100) / 100;
  return roundedTotalPrice;
};

// Function to calculate GST amount
export const gstConversion = (percentage: number, total: number) => {
  const calculatedAmount = (percentage / 100) * total;
  return calculatedAmount.toFixed(2);
};

// Function to calculate the checkout price to pay
export const getCheckoutPriceToPay = (items: Item[]) => {
  const totalPriceToCheckout = items.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  return calculateTotalPrice(totalPriceToCheckout, GST_PERCENTAGE);
};
