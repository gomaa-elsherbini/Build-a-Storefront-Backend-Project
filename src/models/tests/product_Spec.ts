import { ProductStore } from '../product_model';

const store = new ProductStore();

describe('Product Model', () => {
  it('should have a create method', () => {
    expect(store.createProduct).toBeDefined();
  });
  it('should have an index method', () => {
    expect(store.getAllProducts).toBeDefined();
  });
  it('should have a show method', () => {
    expect(store.getOneProduct).toBeDefined();
  });

  it('create method should create a new product', async () => {
    const result = await store.createProduct({
      name: 'product',
      price: '$100',
    });
    expect(result).toEqual({
      id: 2,
      name: 'product',
      price: '$100',
    });
  });

  it('index method should return a list of all products', async () => {
    const result = await store.getAllProducts();
    expect(result).toEqual([
      {
        id: 1,
        name: 'ipad',
        price: '$500',
      },
      {
        id: 2,
        name: 'product',
        price: '$100',
      },
    ]);
  });

  it('show method should return the correct product', async () => {
    const result = await store.getOneProduct('1');
    expect(result).toEqual({
      id: 1,
      name: 'ipad',
      price: '$500',
    });
  });
});
