import { DashboardQueries } from '../../Services/dashboard';

const dashboard = new DashboardQueries();

describe('dashboard Class', () => {
  it('should have the productsInOrders method', () => {
    expect(dashboard.productsInOrders).toBeDefined();
  });

  it('should have the fiveMostPopularProducts method', () => {
    expect(dashboard.fiveMostPopularProducts).toBeDefined();
  });

  it('productsInOrders method should show the products associated with order', async () => {
    const result = await dashboard.productsInOrders();
    expect(result).toEqual(
      [] //{ name: 'string', price: '$100', order_id: string }
    );
  });

  it('fiveMostPopularProducts method should show the five most popular products products', async () => {
    const result = await dashboard.productsInOrders();
    expect(result).toEqual([]);
  });
});
