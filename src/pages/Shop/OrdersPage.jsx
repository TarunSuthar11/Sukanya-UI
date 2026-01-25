import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useGetMyOrders } from "../../hooks/useOrderHooks";
import { FaBox, FaChevronRight, FaSearch, FaHistory, FaTruck, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const statusConfig = {
    placed: { color: "text-blue-600", bg: "bg-blue-50", icon: FaBox },
    confirmed: { color: "text-teal-600", bg: "bg-teal-50", icon: FaCheckCircle },
    packed: { color: "text-orange-600", bg: "bg-orange-50", icon: FaBox },
    shipped: { color: "text-indigo-600", bg: "bg-indigo-50", icon: FaTruck },
    out_for_delivery: { color: "text-purple-600", bg: "bg-purple-50", icon: FaTruck },
    delivered: { color: "text-green-600", bg: "bg-green-50", icon: FaCheckCircle },
    cancelled: { color: "text-red-600", bg: "bg-red-50", icon: FaTimesCircle },
    returned: { color: "text-neutral-500", bg: "bg-neutral-100", icon: FaHistory },
};

const ongoingStatuses = ["placed", "confirmed", "packed", "shipped", "out_for_delivery"];

export default function OrdersPage() {
    const [filter, setFilter] = useState("all"); // all, ongoing, past
    const [searchQuery, setSearchQuery] = useState("");

    const { data: ordersData, isLoading, isError } = useGetMyOrders();
    const orders = ordersData?.data || [];

    const filteredOrders = orders.filter(order => {
        const isOngoing = ongoingStatuses.includes(order.orderStatus);
        const itemsSummarized = order.orderItems.map(i => i.productName).join(", ");

        const matchesFilter =
            filter === "all" ||
            (filter === "ongoing" && isOngoing) ||
            (filter === "past" && !isOngoing);

        const matchesSearch =
            order._id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            itemsSummarized.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesFilter && matchesSearch;
    });

    if (isLoading) return (
        <div className="min-h-screen bg-[#FAF9F6] flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-primary-100 border-t-primary-600 rounded-full animate-spin"></div>
                <p className="font-serif text-neutral-500">Curating your order history...</p>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#FAF9F6] py-16 px-4 md:px-8 lg:px-16">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div>
                        <h1 className="text-4xl font-bold text-neutral-900 mb-2" style={{ fontFamily: 'Tenor Sans, sans-serif' }}>My Orders</h1>
                        <p className="text-neutral-500 font-light">Track, manage and review your ethnic collections.</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="relative">
                            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-300 text-sm" />
                            <input
                                type="text"
                                placeholder="Search by ID or items..."
                                className="pl-10 pr-4 py-3 bg-white border border-neutral-100 rounded-2xl text-sm focus:border-primary-300 outline-none transition-all w-full sm:w-72 shadow-sm"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-2 no-scrollbar">
                    {["all", "ongoing", "past"].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-8 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all shrink-0 ${filter === f
                                ? "bg-neutral-900 text-white shadow-lg shadow-neutral-200"
                                : "bg-white text-neutral-400 border border-neutral-100 hover:border-neutral-200"
                                }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>

                {filteredOrders.length === 0 ? (
                    <div className="bg-white rounded-[2rem] p-20 text-center border border-neutral-100 shadow-sm">
                        <div className="w-20 h-20 bg-neutral-50 rounded-full flex items-center justify-center mx-auto mb-6 text-neutral-200">
                            <FaBox size={32} />
                        </div>
                        <h2 className="text-2xl font-serif text-neutral-800 mb-2 font-medium uppercase tracking-widest">No Collections Found</h2>
                        <p className="text-neutral-400 mb-10 max-w-xs mx-auto text-sm leading-relaxed">It seems you haven't started your fashion journey with us yet or your filters are too specific.</p>
                        <Link to="/shop" className="btn-primary px-12">
                            Explore Collections
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6">
                        {filteredOrders.map((order) => (
                            <div
                                key={order._id}
                                className="bg-white rounded-[1.5rem] border border-neutral-100 shadow-[0_10px_40px_rgba(0,0,0,0.03)] overflow-hidden group hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] transition-all duration-500"
                            >
                                <div className="flex flex-col lg:flex-row">
                                    {/* Image Section */}
                                    <div className="lg:w-48 h-64 lg:h-auto overflow-hidden bg-neutral-50 shrink-0 relative">
                                        <img
                                            src={order.orderItems[0]?.productImage}
                                            alt=""
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                        />
                                        {order.orderItems.length > 1 && (
                                            <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1.5 rounded-full border border-white/20">
                                                +{order.orderItems.length - 1} More
                                            </div>
                                        )}
                                    </div>

                                    {/* Content Section */}
                                    <div className="flex-1 p-6 lg:p-8 flex flex-col justify-between">
                                        <div>
                                            <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                                                <div className="space-y-1">
                                                    <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${statusConfig[order.orderStatus].bg} ${statusConfig[order.orderStatus].color} border border-current/10`}>
                                                        {React.createElement(statusConfig[order.orderStatus].icon, { size: 10 })}
                                                        {order.orderStatus.replace(/_/g, ' ')}
                                                    </span>
                                                    <p className="text-xs text-neutral-400 font-medium pt-1">
                                                        Placed on {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-[10px] font-black text-neutral-300 uppercase tracking-widest mb-1">Order Total</p>
                                                    <p className="text-xl font-bold text-neutral-900">₹{order.priceSummary.grandTotal.toLocaleString()}</p>
                                                </div>
                                            </div>

                                            <div className="mb-6">
                                                <p className="text-[10px] font-black text-primary-600 uppercase tracking-widest mb-2">Order Identification</p>
                                                <h3 className="text-sm font-bold text-neutral-800 font-mono tracking-tight bg-neutral-50 w-fit px-3 py-1 rounded-lg border border-neutral-100">
                                                    {order._id}
                                                </h3>
                                            </div>

                                            <div className="border-t border-neutral-50 pt-4">
                                                <p className="text-xs text-neutral-500 leading-relaxed line-clamp-1">
                                                    <span className="font-bold text-neutral-700">Summary:</span> {order.orderItems.map(i => i.productName).join(", ")}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between mt-8">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-primary-50 flex items-center justify-center text-primary-600">
                                                    <FaTruck size={12} />
                                                </div>
                                                <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">
                                                    {order.orderStatus === 'delivered' ? 'Collection Delivered' : 'Standard Delivery'}
                                                </p>
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <Link
                                                    to={`/orders/${order._id}`}
                                                    className="inline-flex items-center gap-3 px-8 py-3.5 bg-neutral-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all active:scale-95 shadow-xl shadow-neutral-100 group w-full"
                                                >
                                                    Manage Order
                                                    <FaChevronRight size={8} className="group-hover:translate-x-1 transition-transform" />
                                                </Link>
                                                {order.orderStatus === "delivered" && (
                                                    <Link
                                                        to={`/create-review/${order.orderItems[0].productId}`}
                                                        className="text-center py-2 text-[9px] font-black uppercase tracking-widest text-primary-600 hover:text-primary-700 transition-colors"
                                                    >
                                                        Review Collection
                                                    </Link>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
