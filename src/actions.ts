"use server";

export const fetchProductData = async () => {
  const response = await fetch(`http://localhost:5000/api/products/all`);
  if (!response.ok) {
    throw new Error('Failed to fetch product data');
  }
  const data = await response.json();
  return data;
};
