import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [totalSum, setTotalSum] = useState(0);

  function fetchOrders() {
    axios
      .get('https://ecommerce.routemisr.com/api/v1/orders/', {
        headers: {
          Authorization: 'Bearer YOUR_AUTH_TOKEN',
        },
      })
      .then((response) => {
        setOrders(response.data.data);
        const sum = response.data.data.reduce((acc, order) => acc + order.totalOrderPrice, 0);
        setTotalSum(sum);
      })
      .catch((error) => {
        console.error('Error fetching orders:', error);
      });
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg xl:mx-20 md:mx-10 sm:mx-5">
      <div className="mx-10 my-8">
        <h2 className="text-3xl font-bold">Your Orders</h2>
      </div>

      <div className="flex justify-between px-10 py-4 bg-gray-100 rounded-lg">
        <h3 className="text-2xl font-semibold">Total Orders Price: {totalSum} EGP</h3>
      </div>

      {orders.length === 0 ? (
        <p className="text-center text-lg">No orders found.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="mb-6">
            <div className="flex justify-between px-10 py-4 bg-gray-100 rounded-lg">
              <h3 className="text-2xl font-semibold">Order ID: {order.id}</h3>
              <h3 className="text-2xl font-semibold">Total Price: {order.totalOrderPrice} EGP</h3>
            </div>

            <table className="w-full text-sm text-left text-gray-500 mt-4">
              <tbody>
                {order.cartItems.map((item) => (
                  <tr key={item.product.id} className="bg-white border-b hover:bg-gray-50">
                    <td className="p-4">
                      <div className="flex items-center">
                        <img src={item.product.imageCover} className="mx-10 w-40" alt={item.product.title} />
                        <div>
                          <h2 className="text-lg font-semibold">{item.product.title}</h2>
                          <h2 className="text-lg font-semibold">{item.price} EGP</h2>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col items-end">
                        <div className="flex items-center">
                          <div className="mx-2">
                            <h3 className="text-lg">{item.count}</h3>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))
      )}
    </div>
  );
}
