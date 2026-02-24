import mockData from "../data/mockData.json";

// Simulate API delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Local storage keys
const STORAGE_KEYS = {
  staff: "restaurant_staff",
  tables: "restaurant_tables",
  menu: "restaurant_menu",
};

// Initialize data from JSON or localStorage
const initData = (key) => {
  const stored = localStorage.getItem(STORAGE_KEYS[key]);
  return stored ? JSON.parse(stored) : mockData[key];
};

// Save to localStorage
const saveData = (key, data) => {
  localStorage.setItem(STORAGE_KEYS[key], JSON.stringify(data));
};

// Generic CRUD operations
const createCRUD = (entity) => ({
  getAll: async () => {
    await delay(300);
    return initData(entity);
  },

  getById: async (id) => {
    await delay(300);
    const data = initData(entity);
    return data.find((item) => item.id === id);
  },

  create: async (item) => {
    await delay(300);
    const data = initData(entity);
    const newItem = { ...item, id: Date.now() };
    const updated = [...data, newItem];
    saveData(entity, updated);
    return newItem;
  },

  update: async (id, item) => {
    await delay(300);
    const data = initData(entity);
    const updated = data.map((i) => (i.id === id ? { ...item, id } : i));
    saveData(entity, updated);
    return { ...item, id };
  },

  delete: async (id) => {
    await delay(300);
    const data = initData(entity);
    const updated = data.filter((i) => i.id !== id);
    saveData(entity, updated);
    return id;
  },
});

// Export API services
export const staffAPI = createCRUD("staff");
export const tablesAPI = createCRUD("tables");
export const menuAPI = createCRUD("menu");
