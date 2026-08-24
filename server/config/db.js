import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, '../data_store');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

class JsonDatabase {
  constructor(collectionName) {
    this.filePath = path.join(DATA_DIR, `${collectionName}.json`);
    if (!fs.existsSync(this.filePath)) {
      fs.writeFileSync(this.filePath, JSON.stringify([]), 'utf-8');
    }
  }

  read() {
    try {
      const data = fs.readFileSync(this.filePath, 'utf-8');
      return JSON.parse(data || '[]');
    } catch {
      return [];
    }
  }

  write(data) {
    fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2), 'utf-8');
  }

  find(filterFn = () => true) {
    const items = this.read();
    return items.filter(filterFn);
  }

  findOne(filterFn) {
    const items = this.read();
    return items.find(filterFn);
  }

  findById(id) {
    return this.findOne((item) => item.id === id || item._id === id);
  }

  insert(item) {
    const items = this.read();
    const newItem = {
      _id: item._id || `id_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...item
    };
    items.push(newItem);
    this.write(items);
    return newItem;
  }

  updateById(id, updateData) {
    const items = this.read();
    const idx = items.findIndex((item) => item.id === id || item._id === id);
    if (idx === -1) return null;
    items[idx] = {
      ...items[idx],
      ...updateData,
      updatedAt: new Date().toISOString()
    };
    this.write(items);
    return items[idx];
  }

  deleteById(id) {
    let items = this.read();
    const initialLength = items.length;
    items = items.filter((item) => item.id !== id && item._id !== id);
    this.write(items);
    return items.length < initialLength;
  }
}

export const UsersDB = new JsonDatabase('users');
export const ProductsDB = new JsonDatabase('products');
export const OrdersDB = new JsonDatabase('orders');
export const ReviewsDB = new JsonDatabase('reviews');
