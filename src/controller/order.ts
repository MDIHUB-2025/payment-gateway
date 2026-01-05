import { Request, Response } from "express";

// In-memory storage (replace with database later)
const orders = new Map()

export async function CreateOrder(req: Request, res: Response): Promise<void> {

     const { orderId, items, total, customerLat, customerLng } = req.body

     orders.set(orderId, {
    orderId,
    items,
    total,
    status: 'preparing',
    deliveryLat: customerLat,
    deliveryLng: customerLng,
    driverLat: null,
    driverLng: null,
    eta: 30,
    createdAt: new Date()
  })
  
  res.json({ success: true })
}

export async function UpdateOrderStatus(req: Request, res: Response): Promise<void> {

    const { orderId } = req.params
  const { status } = req.body

      const order = orders.get(orderId)
    if (order) {
        order.status = status
        orders.set(orderId, order)
    }
  
  res.json({ success: true })
}