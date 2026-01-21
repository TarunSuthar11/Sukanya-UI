import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBox, FaChevronRight, FaFilter, FaSearch, FaHistory, FaTruck, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

// Mock data updated for production feel
const MOCK_ORDERS = [
    {
        _id: "ORD-928374",
        createdAt: new Date("2024-01-20T10:30:00"),
        orderStatus: "shipped",
        totalItems: 1,
        priceSummary: { grandTotal: 12500 },
        itemsSummarized: "Royal Silk Kanjeevaram Saree",
        expectedDelivery: "Jan 24, 2024",
        isOngoing: true
    },
    {
        _id: "ORD-123456",
        createdAt: new Date("2024-01-15T15:45:00"),
        orderStatus: "delivered",
        totalItems: 2,
        priceSummary: { grandTotal: 16800 },
        itemsSummarized: "Peach Embroidered Saree + 1 more",
        expectedDelivery: "Jan 18, 2024",
        isOngoing: false
    },
    {
        _id: "ORD-778899",
        createdAt: new Date("2024-01-10T09:15:00"),
        orderStatus: "cancelled",
        totalItems: 1,
        priceSummary: { grandTotal: 5600 },
        itemsSummarized: "Cotton Daily Wear Saree",
        expectedDelivery: null,
        isOngoing: false
    }
];

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

export default function OrdersPage() {
    const [filter, setFilter] = useState("all"); // all, ongoing, past
    const [searchQuery, setSearchQuery] = useState("");

    const filteredOrders = MOCK_ORDERS.filter(order => {
        const matchesFilter =
            filter === "all" ||
            (filter === "ongoing" && order.isOngoing) ||
            (filter === "past" && !order.isOngoing);

        const matchesSearch =
            order._id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.itemsSummarized.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesFilter && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-[#FAF9F6] py-12 px-4 md:px-8 lg:px-16 mt-20">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                    <div>
                        <h1 className="text-3xl font-serif text-neutral-900 mb-2">Order History</h1>
                        <p className="text-sm text-neutral-500 font-light">Manage your purchases, tracking, and returns.</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="relative">
                            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-300 text-sm" />
                            <input
                                type="text"
                                placeholder="Search orders..."
                                className="pl-10 pr-4 py-2.5 bg-white border border-neutral-200 rounded-xl text-sm focus:border-primary-400 outline-none transition-all w-full sm:w-64"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex gap-1 p-1 bg-neutral-100 rounded-2xl w-fit mb-8">
                    {["all", "ongoing", "past"].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${filter === f
                                    ? "bg-white text-primary-900 shadow-sm"
                                    : "text-neutral-500 hover:text-neutral-700"
                                }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>

                {filteredOrders.length === 0 ? (
                    <div className="bg-white rounded-3xl p-20 text-center border border-neutral-100">
                        <div className="w-16 h-16 bg-neutral-50 rounded-full flex items-center justify-center mx-auto mb-4 text-neutral-200">
                            <FaBox size={32} />
                        </div>
                        <h2 className="text-xl font-serif text-neutral-800 mb-2 font-medium uppercase tracking-wide">No Orders Found</h2>
                        <p className="text-sm text-neutral-400 mb-8">Try adjusting your filters or search query.</p>
                        <Link to="/shop" className="text-sm font-bold text-primary-700 hover:underline underline-offset-8 decoration-primary-200">
                            Go to Shop →
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {/* Desktop Table Header */}
                        <div className="hidden lg:grid grid-cols-6 gap-4 px-8 py-4 bg-neutral-50 rounded-2xl text-[10px] font-bold text-neutral-400 uppercase tracking-[0.2em]">
                            <div className="col-span-2">Order & Items</div>
                            <div>Placed On</div>
                            <div>Status</div>
                            <div>Total</div>
                            <div className="text-right">Actions</div>
                        </div>

                        {/* Order Items */}
                        {filteredOrders.map((order) => (
                            <div
                                key={order._id}
                                className="bg-white rounded-2xl border border-neutral-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] transition-all hover:shadow-[0_10px_30px_rgba(0,0,0,0.05)] overflow-hidden group"
                            >
                                {/* Desktop View */}
                                <div className="hidden lg:grid grid-cols-6 gap-4 items-center px-8 py-6">
                                    <div className="col-span-2 flex items-center gap-4">
                                        <div className="w-12 h-12 bg-neutral-50 rounded-xl flex items-center justify-center text-primary-200 border border-neutral-100 group-hover:bg-primary-50 group-hover:text-primary-400 transition-colors">
                                            <FaBox size={20} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-neutral-800 font-mono tracking-tighter">{order._id}</p>
                                            <p className="text-xs text-neutral-400 truncate max-w-[200px]">{order.itemsSummarized}</p>
                                        </div>
                                    </div>

                                    <div className="text-sm text-neutral-600">
                                        {order.createdAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </div>

                                    <div>
                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${statusConfig[order.orderStatus].bg} ${statusConfig[order.orderStatus].color}`}>
                                            {React.createElement(statusConfig[order.orderStatus].icon, { size: 10 })}
                                            {order.orderStatus.replace(/_/g, ' ')}
                                        </span>
                                    </div>

                                    <div className="text-sm font-bold text-neutral-800">
                                        Rs. {order.priceSummary.grandTotal.toLocaleString()}
                                    </div>

                                    <div className="text-right">
                                        <Link
                                            to={`/orders/${order._id}`}
                                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-neutral-900 text-white rounded-xl text-xs font-bold hover:bg-black transition-all active:scale-[0.98]"
                                        >
                                            Management
                                            <FaChevronRight size={8} />
                                        </Link>
                                    </div>
                                </div>

                                {/* Mobile View */}
                                <div className="lg:hidden p-6 space-y-4">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-2 ${statusConfig[order.orderStatus].bg} ${statusConfig[order.orderStatus].color}`}>
                                                {order.orderStatus.replace(/_/g, ' ')}
                                            </span>
                                            <p className="text-sm font-bold text-neutral-800 font-mono tracking-tighter">{order._id}</p>
                                        </div>
                                        <p className="text-sm font-bold text-neutral-900">Rs. {order.priceSummary.grandTotal.toLocaleString()}</p>
                                    </div>

                                    <p className="text-xs text-neutral-500 line-clamp-1">{order.itemsSummarized}</p>

                                    <div className="flex items-center justify-between pt-4 border-t border-neutral-50">
                                        <p className="text-[10px] text-neutral-400 uppercase font-bold tracking-widest">
                                            {order.createdAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                        </p>
                                        <Link
                                            to={`/orders/${order._id}`}
                                            className="text-xs font-bold text-primary-700 border-b border-primary-100 pb-0.5"
                                        >
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div className="mt-12 p-8 bg-neutral-900 rounded-3xl text-white relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="relative z-10 text-center md:text-left">
                        <h3 className="text-xl font-serif mb-2">Need assistance with an order?</h3>
                        <p className="text-sm text-neutral-400 font-light">Our concierge team is available 24/7 for your support.</p>
                    </div>
                    <button className="relative z-10 px-8 py-3 bg-white text-neutral-900 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-primary-50 transition-colors shadow-xl">
                        Contact Concierge
                    </button>

                    {/* Subtle Decorative Background */}
                    <div className="absolute right-0 top-0 h-full w-1/3 opacity-10 pointer-events-none">
                        <FaBox size={200} className="rotate-12 translate-x-1/2 -translate-y-1/4" />
                    </div>
                </div>
            </div>
        </div>
    );
}
