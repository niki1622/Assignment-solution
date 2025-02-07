const axios = require("axios");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function fetchProducts() {
  try {
    const response = await axios.get("http://localhost:3001/products/");

    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error.message);
    return [];
  }
}

function calculateTotal(products, ids) {
  let total = 0;

  ids.forEach((id) => {
    const product = products.find((p) => p.id == id);
    if (product) {
      total += product.price;
    }
  });

  const tax = Math.round(total * 0.125 * 100) / 100; // 12.5% tax
  const totalWithTax = total + tax;

  return { total, tax, totalWithTax };
}

async function main() {
  const products = await fetchProducts();
  if (products.length === 0) return;

  console.log("\nAvailable Products:");
  products.forEach((product) => {
    console.log(
      `ID: ${product.id}, Name: ${product.title}, Price: $${product.price}`
    );
  });

  rl.question(
    "\nEnter product IDs to add to cart (comma separated): ",
    (input) => {
      const ids = input.split(",").map((id) => id.trim());
      const { total, tax, totalWithTax } = calculateTotal(products, ids);

      console.log(`\nTotal price of selected items: $${total.toPrecision(2)}`);
      console.log(`Tax: $${tax}`);
      console.log(`Total with tax: $${totalWithTax}`);
      rl.close();
    }
  );
}

module.exports = { fetchProducts, calculateTotal };

main();
