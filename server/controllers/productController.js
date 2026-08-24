import { ProductsDB } from '../config/db.js';

// @desc    Fetch all products with search, category, gender, size, color, maxPrice, and sorting
// @route   GET /api/products
export const getProducts = (req, res) => {
  try {
    const { category, gender, size, color, maxPrice, search, sort, isNew, isFeatured } = req.query;

    let products = ProductsDB.find();

    if (search) {
      const q = search.toLowerCase();
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.subtitle?.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    if (category && category !== 'all') {
      const cat = category.toLowerCase();
      products = products.filter(
        (p) =>
          p.category.toLowerCase().includes(cat) ||
          p.gender?.toLowerCase() === cat ||
          (cat === 'new-releases' && p.isNewRelease)
      );
    }

    if (gender) {
      products = products.filter((p) => p.gender?.toLowerCase() === gender.toLowerCase());
    }

    if (size) {
      const numSize = Number(size);
      products = products.filter((p) => p.sizes && p.sizes.includes(numSize));
    }

    if (color) {
      products = products.filter((p) => p.defaultColor === color);
    }

    if (maxPrice) {
      const limit = Number(maxPrice);
      products = products.filter((p) => p.price <= limit);
    }

    if (isNew === 'true') {
      products = products.filter((p) => p.isNewRelease);
    }

    if (isFeatured === 'true') {
      products = products.filter((p) => p.isFeatured);
    }

    // Sort logic
    if (sort === 'price-low') {
      products.sort((a, b) => a.price - b.price);
    } else if (sort === 'price-high') {
      products.sort((a, b) => b.price - a.price);
    } else if (sort === 'rating') {
      products.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    res.json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Fetch single product by ID or slug
// @route   GET /api/products/:id
export const getProductById = (req, res) => {
  try {
    const product = ProductsDB.findOne(
      (p) => p.id === req.params.id || p._id === req.params.id
    );

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.json({
      success: true,
      data: product
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Create new product (Admin)
// @route   POST /api/products
export const createProduct = (req, res) => {
  try {
    const newProduct = ProductsDB.insert(req.body);
    res.status(201).json({
      success: true,
      data: newProduct
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Update product (Admin)
// @route   PUT /api/products/:id
export const updateProduct = (req, res) => {
  try {
    const updated = ProductsDB.updateById(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({
      success: true,
      data: updated
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Delete product (Admin)
// @route   DELETE /api/products/:id
export const deleteProduct = (req, res) => {
  try {
    const deleted = ProductsDB.deleteById(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({
      success: true,
      message: 'Product removed'
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
