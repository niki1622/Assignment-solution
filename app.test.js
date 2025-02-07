const axios = require("axios");
const { fetchProducts, calculateTotal } = require("./app");

jest.mock("axios");

describe("fetchProducts", () => {
  it("should fetch products from the API", async () => {
    const mockData = [
      { id: 1, name: "Product A", price: 10 },
      { id: 2, name: "Product B", price: 20 },
    ];
    axios.get.mockResolvedValue({ data: mockData });

    const products = await fetchProducts();
    expect(products).toEqual(mockData);
  });

  it("should return an empty array on API failure", async () => {
    axios.get.mockRejectedValue(new Error("API error"));
    const products = await fetchProducts();
    expect(products).toEqual([]);
  });
});

describe("calculateTotal", () => {
  it("should calculate total price and tax correctly", () => {
    const products = [
      { id: 1, name: "Product A", price: 10 },
      { id: 2, name: "Product B", price: 20 },
    ];
    const ids = ["1", "2"];
    const { total, tax, totalWithTax } = calculateTotal(products, ids);
    expect(total).toBe(30);
    expect(tax).toBe(3.75); // 12.5% of 30
    expect(totalWithTax).toBe(33.75);
  });

  it("should return zero if no valid IDs are provided", () => {
    const products = [
      { id: 1, name: "Product A", price: 10 },
      { id: 2, name: "Product B", price: 20 },
    ];
    const ids = ["3", "4"]; // Invalid IDs
    const { total, tax, totalWithTax } = calculateTotal(products, ids);
    expect(total).toBe(0);
    expect(tax).toBe(0);
    expect(totalWithTax).toBe(0);
  });
});
