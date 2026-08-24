import { OrdersDB } from '../config/db.js';

// @desc    Create new order
// @route   POST /api/orders
export const createOrder = (req, res) => {
  try {
    const { orderItems, shippingAddress, paymentMethod, itemsPrice, shippingPrice, totalPrice } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ success: false, message: 'No order items specified' });
    }

    const order = OrdersDB.insert({
      user: req.user ? req.user._id : 'guest',
      userEmail: req.user ? req.user.email : req.body.email || 'guest@aeron.lab',
      orderItems,
      shippingAddress: shippingAddress || { address: 'AERON Lab Express', city: 'Mumbai', postalCode: '400001', country: 'India' },
      paymentMethod: paymentMethod || 'Card',
      itemsPrice,
      shippingPrice,
      totalPrice,
      isPaid: true,
      paidAt: new Date().toISOString(),
      status: 'Processing'
    });

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: order
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Get logged-in user orders
// @route   GET /api/orders/myorders
export const getMyOrders = (req, res) => {
  try {
    const orders = OrdersDB.find((o) => o.user === req.user._id);
    res.json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
export const getOrderById = (req, res) => {
  try {
    const order = OrdersDB.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    res.json({
      success: true,
      data: order
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
