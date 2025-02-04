import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, CheckCircle } from "lucide-react";

const FarmerDashboard = () => {
  const [stockListings, setStockListings] = useState([
    { id: 1, name: "Tomatoes", totalQty: 100, fulfilledQty: 60 },
    { id: 2, name: "Potatoes", totalQty: 200, fulfilledQty: 120 },
  ]);

  const [notifications, setNotifications] = useState([
    { id: 1, message: "Retailer A is interested in 20kg of Tomatoes." },
    { id: 2, message: "Retailer B is interested in 50kg of Potatoes." },
  ]);

  const [acceptedDeals, setAcceptedDeals] = useState([
    { id: 1, stock: "Tomatoes", retailer: "Retailer A", quantity: 20 },
    { id: 2, stock: "Potatoes", retailer: "Retailer B", quantity: 50 },
  ]);

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Stock Listings Section */}
      <Card>
        <CardHeader>
          <CardTitle>Your Stock Listings</CardTitle>
        </CardHeader>
        <CardContent>
          {stockListings.map((stock) => (
            <div key={stock.id} className="mb-4">
              <h3 className="text-lg font-semibold">{stock.name}</h3>
              <Progress value={(stock.fulfilledQty / stock.totalQty) * 100} />
              <p className="text-sm text-gray-500">
                {stock.fulfilledQty}/{stock.totalQty} kg fulfilled
              </p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Notifications Section */}
      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          {notifications.length > 0 ? (
            notifications.map((notif) => (
              <div key={notif.id} className="flex items-center gap-3 mb-3">
                <Bell className="text-yellow-500" />
                <p>{notif.message}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No new notifications</p>
          )}
        </CardContent>
      </Card>

      {/* Accepted Deals Section */}
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Accepted Deals</CardTitle>
        </CardHeader>
        <CardContent>
          {acceptedDeals.length > 0 ? (
            acceptedDeals.map((deal) => (
              <div key={deal.id} className="flex items-center gap-4 mb-3">
                <CheckCircle className="text-green-500" />
                <p>
                  {deal.retailer} accepted {deal.quantity}kg of {deal.stock}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No accepted deals yet</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default FarmerDashboard;