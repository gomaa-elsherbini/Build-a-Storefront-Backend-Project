import { OrderStore } from '../order_model';

const store = new OrderStore();

describe('Order Model', () => {
  it('should have a getCompletedUserOrders method', () => {
    expect(store.getCompletedUserOrders).toBeDefined();
  });

  it('should have a getCurrentUserOrder method', () => {
    expect(store.getCurrentUserOrder).toBeDefined();
  });

  it('should have createOrder method', () => {
    expect(store.createOrder).toBeDefined();
  });

  it('create method should create a new order', async () => {
    const result = await store.createOrder({
      status: 'complete',
      user_id: 1 as unknown as number,
    });
    expect(result).toEqual({
      id: 2,
      status: 'complete',
      user_id: 1 as unknown as number,
    });
  });

  it('index method should return a list of all orders', async () => {
    const result = await store.getCompletedUserOrders(1);
    expect(result).toEqual([
      {
        id: 1,
        status: 'complete',
        user_id: 1 as unknown as number,
      },
      {
        id: 2,
        status: 'complete',
        user_id: 1 as unknown as number,
      },
    ]);
  });

  it('show method should return the correct order', async () => {
    const result = await store.getCurrentUserOrder(1);
    expect(result).toEqual({
      id: 1,
      status: 'complete',
      user_id: 1 as unknown as number,
    });
  });
});
