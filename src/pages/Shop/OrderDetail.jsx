import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  FaArrowLeft, FaFileDownload, FaTimes, FaShippingFast,
  FaCheckCircle, FaMapMarkerAlt, FaCreditCard,
  FaClipboardList, FaUndoAlt, FaBox, FaPaperPlane, FaTruck, FaRegClock, FaBoxOpen
} from "react-icons/fa";

// Mock data structured for the new design
const MOCK_ORDER = {
  _id: "ORD-928374",
  date: "Jan 20, 2024",
  time: "10:30 AM",
  status: "shipped", // placed, confirmed, shipped, out_for_delivery, delivered
  expectedDelivery: "Jan 24, 2024",
  orderItems: [
    {
      productId: "p1",
      name: "Royal Silk Kanjeevaram Saree",
      image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=400",
      quantity: 1,
      price: 12500,
      category: "Kanjeevaram Silk"
    },
    {
      productId: "p2",
      name: "Peach Embroidered Georgette Saree",
      image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80&w=400",
      quantity: 1,
      price: 8400,
      category: "Georgette"
    }
  ],
  shippingAddress: {
    name: "Tarun Suthar",
    street: "123 Elegance Lane, Heritage Block",
    city: "Jaipur",
    state: "Rajasthan",
    pincode: "302001",
    phone: "+91 98765 43210"
  },
  payment: {
    method: "Credit Card",
    status: "Paid",
    last4: "4242"
  },
  summary: {
    subtotal: 20900,
    shipping: 150,
    tax: 1045,
    discount: 1000,
    total: 21095
  }
};

const STAGES = [
  { id: "placed", label: "Placed", icon: FaPaperPlane },
  { id: "confirmed", label: "Confirmed", icon: FaCheckCircle },
  { id: "shipped", label: "Shipped", icon: FaTruck },
  { id: "out_for_delivery", label: "Out Delivery", icon: FaShippingFast },
  { id: "delivered", label: "Delivered", icon: FaBoxOpen },
];

export default function OrderDetail() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order] = useState(MOCK_ORDER);
  const [showCancelModal, setShowCancelModal] = useState(false);

  const currentStageIndex = STAGES.findIndex(s => s.id === order.status);
  const canCancel = ["placed", "confirmed", "packed"].includes(order.status);

  const handleDownload = () => alert("Downloading Invoice...");

  return (
    <div className="min-h-screen bg-[#FAF9F6] pt-16 md:pt-20 pb-12 px-3 sm:px-6 lg:px-16">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* SECTION 1: TOP HEADER (Compact) */}
        <div className="bg-white rounded-2xl p-5 md:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-neutral-100 animate-in fade-in slide-in-from-top-2 duration-500">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="space-y-2">
              <button
                onClick={() => navigate("/my-orders")}
                className="flex items-center gap-2 text-neutral-400 hover:text-primary-600 transition-colors text-[10px] font-black uppercase tracking-widest group"
              >
                <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                Back
              </button>
              <div className="flex flex-wrap items-center gap-2 md:gap-3">
                <h1 className="text-xl md:text-2xl font-bold text-neutral-900 font-mono tracking-tighter">
                  Order <span className="text-primary-600">#{order._id}</span>
                </h1>
                <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-[9px] font-black uppercase tracking-[0.1em] border border-indigo-100">
                  {order.status.replace(/_/g, ' ')}
                </span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-neutral-500 font-medium">
                <FaRegClock className="text-primary-400" />
                <span>{order.date} • {order.time}</span>
              </div>
            </div>

            <button
              onClick={handleDownload}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-neutral-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all active:scale-95 shadow-lg"
            >
              <FaFileDownload />
              Download Invoice
            </button>
          </div>
        </div>

        {/* SECTION 2: 5-STAGE PROGRESS TRACKER (With Icons) */}
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-neutral-100">
          <div className="hidden md:flex justify-between relative mb-2">
            {/* Background Line */}
            <div className="absolute top-5 left-[8%] right-[8%] h-[2px] bg-neutral-50 -z-0">
              <div
                className="h-full bg-primary-600 transition-all duration-1000 ease-out"
                style={{ width: `${(currentStageIndex / (STAGES.length - 1)) * 100}%` }}
              />
            </div>

            {STAGES.map((stage, idx) => {
              const isCompleted = idx <= currentStageIndex;
              const isCurrent = idx === currentStageIndex;
              const Icon = stage.icon;
              return (
                <div key={stage.id} className="flex flex-col items-center relative z-10 w-24">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-700 ${isCompleted ? "bg-primary-600 text-white shadow-md shadow-primary-100" : "bg-white border-2 border-neutral-50 text-neutral-300"
                    } ${isCurrent ? "ring-4 ring-primary-50" : ""}`}>
                    <Icon size={14} />
                  </div>
                  <p className={`mt-3 text-[8px] font-black uppercase tracking-widest text-center leading-tight ${isCompleted ? "text-primary-800" : "text-neutral-400"
                    }`}>
                    {stage.label}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Mobile Tracker */}
          <div className="md:hidden space-y-6 pl-2">
            {STAGES.map((stage, idx) => {
              const isCompleted = idx <= currentStageIndex;
              const isCurrent = idx === currentStageIndex;
              const Icon = stage.icon;
              return (
                <div key={stage.id} className="flex gap-4 relative">
                  {idx !== STAGES.length - 1 && (
                    <div className={`absolute left-[15px] top-8 bottom-[-24px] w-[1px] ${idx < currentStageIndex ? "bg-primary-600" : "bg-neutral-50"}`} />
                  )}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 ${isCompleted ? "bg-primary-600 text-white" : "bg-white border border-neutral-100 text-neutral-300"
                    }`}>
                    <Icon size={12} />
                  </div>
                  <div className={`flex flex-col pt-1.5 ${isCompleted ? "opacity-100" : "opacity-40"}`}>
                    <p className={`text-[9px] font-black uppercase tracking-widest ${isCompleted ? "text-primary-900" : "text-neutral-500"}`}>
                      {stage.label}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* SECTION 3: ORDERED ITEMS (Compact Professional View) */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-neutral-100">
          <div className="px-6 py-4 border-b border-neutral-50 flex items-center gap-2">
            <FaClipboardList className="text-primary-600 text-xs" />
            <h2 className="text-[10px] font-black text-neutral-800 uppercase tracking-widest">Bag Highlights ({order.orderItems.length})</h2>
          </div>
          <div className="divide-y divide-neutral-50">
            {order.orderItems.map((item, idx) => (
              <div key={idx} className="p-4 sm:p-5 flex gap-4 sm:gap-6 items-center hover:bg-neutral-50/50 transition-colors">
                <div className="w-16 h-20 sm:w-20 sm:h-24 rounded-xl overflow-hidden shadow-sm border border-neutral-100 shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[8px] text-primary-600 font-black uppercase tracking-widest mb-0.5">{item.category}</p>
                  <h3 className="text-sm sm:text-base font-serif text-neutral-800 truncate mb-1">{item.name}</h3>
                  <div className="flex items-center gap-3 text-[10px] text-neutral-400 font-bold uppercase tracking-widest">
                    <span>Qty: {item.quantity}</span>
                    <span className="w-1 h-1 bg-neutral-200 rounded-full"></span>
                    <span>Rs. {item.price.toLocaleString()}</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm sm:text-lg font-bold text-neutral-900 font-serif">Rs. {(item.quantity * item.price).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 4: ADDRESS & SUMMARY (Harmonized Grid) */}
        <div className="grid md:grid-cols-2 gap-6">

          {/* DELIVERY INFO */}
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-neutral-100">
            <h2 className="text-[9px] font-black text-neutral-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
              <FaMapMarkerAlt className="text-primary-600" />
              Shipping Details
            </h2>
            <div className="space-y-4">
              <div className="space-y-1">
                <p className="text-base font-bold font-serif text-neutral-800">{order.shippingAddress.name}</p>
                <p className="text-xs text-neutral-500 leading-relaxed font-light">
                  {order.shippingAddress.street}, {order.shippingAddress.city}<br />
                  {order.shippingAddress.state}, {order.shippingAddress.pincode}
                </p>
              </div>
              <div className="pt-4 border-t border-neutral-50 flex items-center justify-between">
                <div>
                  <p className="text-[8px] font-black text-neutral-400 uppercase tracking-widest">Mobile</p>
                  <p className="text-[11px] font-bold text-neutral-800">{order.shippingAddress.phone}</p>
                </div>
                <button className="text-[9px] font-black text-primary-600 uppercase tracking-widest hover:underline underline-offset-4">
                  Update
                </button>
              </div>
            </div>
          </div>

          {/* TOTAL SUMMARY (Harmonized with Page) */}
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-neutral-100 flex flex-col justify-between">
            <h2 className="text-[9px] font-black text-neutral-400 uppercase tracking-[0.2em] mb-6">Order Summary</h2>
            <div className="space-y-3">
              <div className="flex justify-between text-[11px] font-medium text-neutral-500">
                <span>Subtotal</span>
                <span className="text-neutral-800">Rs. {order.summary.subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-[11px] font-medium text-neutral-500">
                <span>Shipping Charge</span>
                <span className="text-green-600">+ Rs. {order.summary.shipping}</span>
              </div>
              <div className="flex justify-between text-[11px] font-medium text-neutral-500">
                <span>Tax & GST</span>
                <span className="text-neutral-800">+ Rs. {order.summary.tax.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-[11px] font-bold text-red-500">
                <span>Discount Applied</span>
                <span>- Rs. {order.summary.discount.toLocaleString()}</span>
              </div>

              <div className="pt-4 mt-2 border-t border-neutral-50 flex justify-between items-end">
                <div>
                  <p className="text-[8px] font-black text-neutral-400 uppercase tracking-widest mb-1">Total Amount</p>
                  <p className="text-2xl font-serif font-bold text-primary-900 tracking-tight">Rs. {order.summary.total.toLocaleString()}</p>
                </div>
                <div className="text-right pb-1">
                  <p className="text-[8px] font-black text-neutral-400 uppercase tracking-widest">via {order.payment.method}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM ACTION BAR (Compact) */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-2">
          <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-neutral-100 shadow-sm w-full sm:w-auto">
            <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center text-green-600">
              <FaCheckCircle size={14} />
            </div>
            <div>
              <p className="text-[8px] font-black text-neutral-400 uppercase tracking-widest">Payment Status</p>
              <p className="text-[10px] font-bold text-neutral-800">Successfully Processed</p>
            </div>
          </div>

          <div className="flex gap-3 w-full sm:w-auto">
            {canCancel && (
              <button
                onClick={() => setShowCancelModal(true)}
                className="flex-1 sm:flex-none px-8 py-3.5 border border-red-100 text-red-500 hover:bg-red-50 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
              >
                Cancel Order
              </button>
            )}
            <button className="flex-1 sm:flex-none px-8 py-3.5 bg-neutral-900 text-white hover:bg-black rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg active:scale-95">
              Support
            </button>
          </div>
        </div>

      </div>

      {/* CANCELLATION MODAL (Refined) */}
      {showCancelModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm" onClick={() => setShowCancelModal(false)}></div>
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full relative z-10 shadow-2xl animate-in fade-in zoom-in-95 duration-300">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto text-red-500 mb-6">
                <FaUndoAlt size={24} />
              </div>
              <h3 className="text-xl font-serif text-neutral-800 mb-2">Cancel your Order?</h3>
              <p className="text-[11px] text-neutral-400 font-light leading-relaxed mb-8">This action will immediately initiate your refund and return the items to stock.</p>
              <div className="grid grid-cols-2 gap-3">
                <button onClick={() => setShowCancelModal(false)} className="py-3.5 bg-neutral-100 text-neutral-700 rounded-xl font-black uppercase tracking-widest text-[9px] hover:bg-neutral-200 transition-all">Keep</button>
                <button onClick={() => { setShowCancelModal(false); alert("Cancelled"); }} className="py-3.5 bg-red-600 text-white rounded-xl font-black uppercase tracking-widest text-[9px] hover:bg-red-700 transition-all shadow-lg">Confirm</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}