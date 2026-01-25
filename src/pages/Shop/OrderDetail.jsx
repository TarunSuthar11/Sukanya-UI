import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useGetOrderDetails, useCancelOrder, useDownloadReceipt } from "../../hooks/useOrderHooks";
import {
  FaArrowLeft, FaFileDownload, FaTimes, FaShippingFast,
  FaCheckCircle, FaMapMarkerAlt, FaCreditCard,
  FaClipboardList, FaUndoAlt, FaBox, FaPaperPlane, FaTruck, FaRegClock, FaBoxOpen
} from "react-icons/fa";

const STAGES = [
  { id: "placed", label: "Placed", icon: FaPaperPlane },
  { id: "confirmed", label: "Confirmed", icon: FaCheckCircle },
  { id: "shipped", label: "Shipped", icon: FaTruck },
  { id: "out_for_delivery", label: "Out Delivery", icon: FaShippingFast },
  { id: "delivered", label: "Delivered", icon: FaBoxOpen },
];

const statusConfig = {
  placed: { color: "text-blue-600", bg: "bg-blue-50" },
  confirmed: { color: "text-teal-600", bg: "bg-teal-50" },
  packed: { color: "text-orange-600", bg: "bg-orange-50" },
  shipped: { color: "text-indigo-600", bg: "bg-indigo-50" },
  out_for_delivery: { color: "text-purple-600", bg: "bg-purple-50" },
  delivered: { color: "text-green-600", bg: "bg-green-50" },
  cancelled: { color: "text-red-600", bg: "bg-red-50" },
  returned: { color: "text-neutral-500", bg: "bg-neutral-100" },
};

export default function OrderDetail() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState("");

  const { data: orderData, isLoading, isError } = useGetOrderDetails(orderId);
  const cancelOrderMutation = useCancelOrder();
  const downloadReceiptMutation = useDownloadReceipt();

  const order = orderData?.data;

  if (isLoading) return <div className="min-h-screen bg-[#FAF9F6] flex items-center justify-center font-serif">Loading order details...</div>;
  if (!order) return <div className="min-h-screen bg-[#FAF9F6] flex items-center justify-center font-serif">Order not found.</div>;

  const currentStageIndex = STAGES.findIndex(s => s.id === order.orderStatus);
  const canCancel = ["placed", "confirmed", "packed"].includes(order.orderStatus);

  const handleDownload = () => {
    downloadReceiptMutation.mutate(orderId);
  };

  const handleCancel = async () => {
    if (!cancelReason.trim()) {
      alert("Please provide a reason for cancellation.");
      return;
    }
    try {
      await cancelOrderMutation.mutateAsync({ orderId, reason: cancelReason });
      setShowCancelModal(false);
    } catch (error) {
      console.error("Failed to cancel order", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] pt-16 pb-20 px-4 sm:px-8 lg:px-16">
      <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

        {/* Header Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate("/my-orders")}
            className="flex items-center gap-2 text-neutral-400 hover:text-black transition-all text-[10px] font-black uppercase tracking-[0.2em] group"
          >
            <FaArrowLeft size={10} className="group-hover:-translate-x-1 transition-transform" />
            Back to Orders
          </button>

          <button
            onClick={handleDownload}
            disabled={downloadReceiptMutation.isPending}
            className="flex items-center gap-2 text-primary-600 hover:text-primary-700 transition-all text-[10px] font-black uppercase tracking-[0.2em] border-b border-primary-100 pb-1"
          >
            <FaFileDownload size={12} />
            {downloadReceiptMutation.isPending ? "Generating..." : "Download Invoice"}
          </button>
        </div>

        {/* Main Order Info Card */}
        <div className="bg-white rounded-[2rem] p-8 md:p-12 border border-neutral-100 shadow-[0_20px_60px_rgba(0,0,0,0.02)]">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${statusConfig[order.orderStatus]?.bg || 'bg-neutral-50'} ${statusConfig[order.orderStatus]?.color || 'text-neutral-400'} border border-current/10`}>
                  {order.orderStatus.replace(/_/g, ' ')}
                </span>
                <p className="text-[10px] font-bold text-neutral-300 uppercase tracking-widest">
                  Est. Delivery: {order.orderStatus === 'delivered' ? 'Completed' : '3-5 Business Days'}
                </p>
              </div>
              <h1 className="text-4xl font-bold text-neutral-900 mb-2" style={{ fontFamily: 'Tenor Sans, sans-serif' }}>
                Order <span className="text-primary-600">#{order._id.slice(-8).toUpperCase()}</span>
              </h1>
              <div className="flex items-center gap-2 text-xs text-neutral-400 font-medium">
                <FaRegClock size={12} className="text-primary-400" />
                <span>Placed on {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} at {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
            </div>

            <div className="flex flex-col items-start md:items-end">
              <p className="text-[10px] font-black text-neutral-300 uppercase tracking-widest mb-1">Total Payable</p>
              <p className="text-4xl font-bold text-neutral-900">₹{order.priceSummary.grandTotal.toLocaleString()}</p>
            </div>
          </div>

          {/* Progress Tracker */}
          <div className="relative pt-8 pb-4">
            <div className="hidden md:flex justify-between relative">
              <div className="absolute top-5 left-[5%] right-[5%] h-[2px] bg-neutral-50 z-0">
                <div
                  className="h-full bg-primary-600 transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(234,179,8,0.3)]"
                  style={{ width: `${(Math.max(0, currentStageIndex) / (STAGES.length - 1)) * 100}%` }}
                />
              </div>

              {STAGES.map((stage, idx) => {
                const isCompleted = idx <= currentStageIndex;
                const isCurrent = idx === currentStageIndex;
                const Icon = stage.icon;
                return (
                  <div key={stage.id} className="flex flex-col items-center relative z-10">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-700 ${isCompleted ? "bg-neutral-900 text-white shadow-xl" : "bg-white border-2 border-neutral-50 text-neutral-200"
                      } ${isCurrent ? "ring-4 ring-primary-50 scale-110" : ""}`}>
                      <Icon size={16} />
                    </div>
                    <p className={`mt-4 text-[9px] font-black uppercase tracking-widest text-center ${isCompleted ? "text-neutral-900" : "text-neutral-300"
                      }`}>
                      {stage.label}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Mobile Vertical Tracker */}
            <div className="md:hidden space-y-8 pl-4">
              {STAGES.map((stage, idx) => {
                const isCompleted = idx <= currentStageIndex;
                const Icon = stage.icon;
                return (
                  <div key={stage.id} className="flex gap-6 relative">
                    {idx !== STAGES.length - 1 && (
                      <div className={`absolute left-[19px] top-10 bottom-[-32px] w-[2px] ${idx < currentStageIndex ? "bg-neutral-900" : "bg-neutral-50"}`} />
                    )}
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 z-10 ${isCompleted ? "bg-neutral-900 text-white shadow-lg" : "bg-white border-2 border-neutral-50 text-neutral-200"
                      }`}>
                      <Icon size={14} />
                    </div>
                    <div className={`pt-2 ${isCompleted ? "opacity-100" : "opacity-30"}`}>
                      <p className={`text-[10px] font-black uppercase tracking-widest ${isCompleted ? "text-neutral-900" : "text-neutral-400"}`}>
                        {stage.label}
                      </p>
                      {isCompleted && idx === currentStageIndex && <p className="text-[10px] text-primary-600 font-bold mt-1">Status: Active</p>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Order Details Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Items List */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-[2rem] overflow-hidden border border-neutral-100 shadow-sm">
              <div className="px-8 py-6 border-b border-neutral-50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-neutral-900 flex items-center justify-center text-white">
                    <FaClipboardList size={12} />
                  </div>
                  <h2 className="text-[11px] font-black text-neutral-800 uppercase tracking-[0.2em]">Bag Details ({order.orderItems.length})</h2>
                </div>
              </div>
              <div className="divide-y divide-neutral-50">
                {order.orderItems.map((item, idx) => (
                  <div key={idx} className="p-6 md:p-8 flex gap-6 md:gap-8 items-center hover:bg-neutral-50/30 transition-all duration-300">
                    <div className="w-24 h-32 md:w-32 md:h-40 rounded-2xl overflow-hidden shadow-md border border-neutral-100 shrink-0 relative group">
                      <img src={item.productImage} alt={item.productName} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    </div>
                    <div className="flex-1 min-w-0 py-2">
                      <p className="text-[10px] text-primary-600 font-black uppercase tracking-widest mb-1">{item.category}</p>
                      <h3 className="text-lg md:text-xl font-bold text-neutral-800 truncate mb-2" style={{ fontFamily: 'Tenor Sans, sans-serif' }}>{item.productName}</h3>
                      <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-black text-neutral-300 uppercase tracking-widest">Quantity</span>
                          <span className="text-sm font-bold text-neutral-800">{item.quantity}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-black text-neutral-300 uppercase tracking-widest">Unit Price</span>
                          <span className="text-sm font-bold text-neutral-800">₹{item.currentPrice.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right shrink-0 flex flex-col items-end justify-center gap-4">
                      <p className="text-xl md:text-2xl font-bold text-neutral-900">₹{item.totalPrice.toLocaleString()}</p>
                      {order.orderStatus === "delivered" && (
                        <Link
                          to={`/create-review/${item.productId}`}
                          className="px-4 py-2 border border-neutral-900 rounded-full text-[8px] font-black uppercase tracking-widest hover:bg-neutral-900 hover:text-white transition-all"
                        >
                          Leave Review
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar: Address & Summary */}
          <div className="space-y-8">
            {/* Delivery Info */}
            <div className="bg-white rounded-[2rem] p-8 border border-neutral-100 shadow-sm">
              <h2 className="text-[10px] font-black text-neutral-300 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                <FaMapMarkerAlt className="text-primary-600" />
                Shipping To
              </h2>
              <div className="space-y-6">
                <div className="space-y-2">
                  <p className="text-lg font-bold text-neutral-900" style={{ fontFamily: 'Tenor Sans, sans-serif' }}>{order.shippingAddress.fullName}</p>
                  <p className="text-xs text-neutral-500 leading-relaxed font-light">
                    {order.shippingAddress.addressLine1}
                    {order.shippingAddress.addressLine2 && <><br />{order.shippingAddress.addressLine2}</>}
                    <br />
                    {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.pincode}
                  </p>
                </div>
                <div className="pt-6 border-t border-neutral-50">
                  <p className="text-[9px] font-black text-neutral-300 uppercase tracking-widest mb-1">Contact Details</p>
                  <p className="text-xs font-bold text-neutral-800 tracking-wide">{order.shippingAddress.phone}</p>
                </div>
              </div>
            </div>

            {/* Price Summary */}
            <div className="bg-neutral-900 rounded-[2rem] p-8 text-white shadow-xl shadow-neutral-200">
              <h2 className="text-[10px] font-black text-neutral-500 uppercase tracking-[0.2em] mb-8">Financial Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between text-xs font-medium text-neutral-400">
                  <span>Basket Value</span>
                  <span className="text-white">₹{order.priceSummary.itemsTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xs font-medium text-neutral-400">
                  <span>Shipping Fee</span>
                  <span className="text-emerald-400">
                    {order.priceSummary.shippingCharge === 0 ? 'Complimentary' : `₹${order.priceSummary.shippingCharge}`}
                  </span>
                </div>
                <div className="flex justify-between text-xs font-medium text-neutral-400">
                  <span>Tax & GST</span>
                  <span className="text-white">₹{order.priceSummary.tax.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xs font-bold text-primary-400">
                  <span>Fashion Discount</span>
                  <span>- ₹{order.priceSummary.discount.toLocaleString()}</span>
                </div>

                <div className="pt-8 mt-4 border-t border-white/10 flex justify-between items-end">
                  <div>
                    <p className="text-[9px] font-black text-neutral-500 uppercase tracking-widest mb-2">Grand Total</p>
                    <p className="text-3xl font-bold text-white tracking-tighter">₹{order.priceSummary.grandTotal.toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 justify-end mb-1">
                      <FaCreditCard size={10} className="text-primary-500" />
                      <p className="text-[10px] font-black text-neutral-500 uppercase tracking-widest">{order.paymentInfo.method}</p>
                    </div>
                    <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">{order.paymentInfo.status}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 flex flex-col gap-4">
              {canCancel && (
                <button
                  onClick={() => setShowCancelModal(true)}
                  className="w-full py-4 border border-red-100 text-red-500 hover:bg-red-50 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all"
                >
                  Request Cancellation
                </button>
              )}
              <button className="w-full py-4 bg-white border border-neutral-100 text-neutral-900 hover:bg-neutral-50 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-sm">
                Need Assistance?
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* CANCELLATION MODAL */}
      {showCancelModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-md bg-black/40">
          <div className="bg-white rounded-[2.5rem] p-10 max-w-md w-full relative shadow-2xl animate-in fade-in zoom-in-95 duration-300">
            <div className="text-center">
              <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto text-red-500 mb-8">
                <FaUndoAlt size={28} />
              </div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-2" style={{ fontFamily: 'Tenor Sans, sans-serif' }}>Cancel Order?</h3>
              <p className="text-sm text-neutral-400 font-light leading-relaxed mb-8">
                We're sorry to see this go. Please let us know the reason so we can improve your next collection.
              </p>

              <div className="text-left mb-8">
                <label className="text-[10px] font-black text-neutral-300 uppercase tracking-widest mb-2 block ml-1">Cancellation Reason</label>
                <textarea
                  className="w-full p-4 text-sm bg-neutral-50 border border-neutral-100 rounded-2xl focus:ring-2 focus:ring-primary-100 focus:border-primary-300 outline-none transition-all resize-none"
                  placeholder="e.g., Changed my mind, found another size..."
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setShowCancelModal(false)}
                  className="py-4 bg-neutral-100 text-neutral-700 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-neutral-200 transition-all"
                >
                  Keep Collection
                </button>
                <button
                  onClick={handleCancel}
                  disabled={cancelOrderMutation.isPending}
                  className="py-4 bg-red-600 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-red-700 transition-all shadow-lg shadow-red-200 disabled:opacity-50"
                >
                  {cancelOrderMutation.isPending ? "Processing..." : "Confirm Cancel"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}