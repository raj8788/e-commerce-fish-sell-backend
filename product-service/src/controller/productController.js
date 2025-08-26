import Product from "../models/productsModel.js"; 

export const createProduct = async (req, res) => {
  const { category_id, product_name, description, price, stock_quantity, product_img } = req.body;

  try {
    const newProduct = await Product.create({
      category_id,
      product_name,
      description,
      price,
      stock_quantity,
      product_img,
    });

    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll(); 
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { category_id, product_name, description, price, stock_quantity, product_img, is_active } = req.body;

  try {
    const [updated] = await Product.update(
      { category_id, product_name, description, price, stock_quantity, product_img, is_active },
      { where: { product_id: id } }
    );

    if (!updated) {
      return res.status(404).json({ message: "Product not found" });
    }

    const updatedProduct = await Product.findByPk(id);
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const deleteProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.is_active = false;
    await product.save();

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
