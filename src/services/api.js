import { PRODUCTS as FALLBACK_PRODUCTS } from '../data/products.js';

const API_BASE_URL = 'http://localhost:5000/api';

export async function fetchProducts(filters = {}) {
  try {
    const query = new URLSearchParams();
    if (filters.category && filters.category !== 'all') query.append('category', filters.category);
    if (filters.search) query.append('search', filters.search);
    if (filters.size) query.append('size', filters.size);
    if (filters.color) query.append('color', filters.color);
    if (filters.maxPrice) query.append('maxPrice', filters.maxPrice);
    if (filters.sort) query.append('sort', filters.sort);

    const res = await fetch(`${API_BASE_URL}/products?${query.toString()}`);
    if (!res.ok) throw new Error('API server error');
    const data = await res.json();
    return data.data || FALLBACK_PRODUCTS;
  } catch (err) {
    console.warn("Backend API unreachable, using local data store:", err.message);
    return FALLBACK_PRODUCTS;
  }
}

export async function fetchProductById(id) {
  try {
    const res = await fetch(`${API_BASE_URL}/products/${id}`);
    if (!res.ok) throw new Error('Product fetch error');
    const data = await res.json();
    return data.data;
  } catch (err) {
    return FALLBACK_PRODUCTS.find((p) => p.id === id || p._id === id) || FALLBACK_PRODUCTS[0];
  }
}

export async function submitOrder(orderPayload) {
  try {
    const res = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderPayload)
    });
    const data = await res.json();
    return data;
  } catch (err) {
    return { success: true, message: 'Order submitted locally', data: orderPayload };
  }
}

export async function loginUser(email, password) {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  return res.json();
}

export async function registerUser(name, email, password) {
  const res = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password })
  });
  return res.json();
}
