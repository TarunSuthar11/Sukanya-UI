import { useContext, useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiPackage, FiTruck, FiCreditCard } from "react-icons/fi";
import { CartContext } from "../../context/CartContext";
import { createOrder } from "../../service/OrderService";

const currency = (value) => `₹${value.toLocaleString()}`;

export default function Checkout() {
    const { cartItems } = useContext(CartContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: "",
        phone: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        pincode: "",
        paymentMethod: "COD"
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const totals = useMemo(() => {
        const subtotal = cartItems.reduce((sum, item) => sum + item.currentPrice * item.quantity, 0);
        const mrp = cartItems.reduce((sum, item) => sum + item.actualPrice * item.quantity, 0);
        const savings = Math.max(mrp - subtotal, 0);
        const shipping = subtotal > 0 ? 0 : 0;
        const total = subtotal + shipping;
        return { subtotal, mrp, savings, shipping, total };
    }, [cartItems]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error for this field when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: "" }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.fullName.trim()) {
            newErrors.fullName = "Full name is required";
        }

        if (!formData.phone.trim()) {
            newErrors.phone = "Phone number is required";
        } else if (!/^\d{10}$/.test(formData.phone)) {
            newErrors.phone = "Phone number must be 10 digits";
        }

        if (!formData.addressLine1.trim()) {
            newErrors.addressLine1 = "Address is required";
        }

        if (!formData.city.trim()) {
            newErrors.city = "City is required";
        }

        if (!formData.state.trim()) {
            newErrors.state = "State is required";
        }

        if (!formData.pincode.trim()) {
            newErrors.pincode = "Pincode is required";
        } else if (!/^\d{6}$/.test(formData.pincode)) {
            newErrors.pincode = "Pincode must be 6 digits";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        if (cartItems.length === 0) {
            alert("Your cart is empty!");
            return;
        }

        setIsSubmitting(true);

        try {
            const orderData = {
                items: cartItems.map(item => ({
                    productId: item.id,
                    quantity: item.quantity,
                    price: item.currentPrice
                })),
                shippingAddress: {
                    fullName: formData.fullName,
                    phone: formData.phone,
                    addressLine1: formData.addressLine1,
                    addressLine2: formData.addressLine2,
                    city: formData.city,
                    state: formData.state,
                    pincode: formData.pincode
                },
                paymentMethod: formData.paymentMethod,
                totalAmount: totals.total
            };

            console.log("Order Data:", orderData);

            // Uncomment when API is ready
            // const response = await createOrder(orderData);
            // console.log("Order created:", response);

            // For now, just show success and navigate
            alert("Order placed successfully!");
            navigate("/");

        } catch (error) {
            console.error("Error placing order:", error);
            alert("Failed to place order. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen w-full bg-gradient-soft flex items-center justify-center">
                <div className="text-center">
                    <FiPackage className="text-6xl text-primary-600 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-neutral-900 mb-2">Your cart is empty</h2>
                    <p className="text-neutral-600 mb-6">Add some items to your cart before checking out</p>
                    <Link to="/shop" className="btn-primary">
                        Browse Sarees
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full overflow-x-hidden bg-gradient-soft">
            <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-10 md:py-14">
                {/* Back Button */}
                <div className="flex items-center gap-3 mb-8">
                    <Link to="/cart" className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors">
                        <FiArrowLeft />
                        Back to Cart
                    </Link>
                </div>

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-2">Checkout</h1>
                    <p className="text-neutral-600 text-lg">
                        Complete your order by filling in your shipping details
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                    {/* Main Form Section */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Products Summary */}
                        <div className="card-elegant p-5 md:p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <FiPackage className="text-primary-600 text-xl" />
                                <h2 className="text-xl font-bold text-neutral-900">Order Items</h2>
                            </div>
                            <div className="space-y-3">
                                {cartItems.map((item) => (
                                    <div key={item._id || item.id} className="flex gap-4 p-3 rounded-lg bg-primary-50/30 border border-primary-100">
                                        <div className="w-20 h-20 rounded-lg overflow-hidden bg-white flex-shrink-0">
                                            <img
                                                src={item.productImages?.[0]?.url || item.imageUrl}
                                                alt={item.productName || item.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-semibold text-neutral-900 line-clamp-1">{item.productName || item.name}</h3>
                                            <p className="text-sm text-neutral-500">{item.category || 'Saree'}</p>
                                            <div className="flex items-center justify-between mt-1">
                                                <span className="text-sm text-neutral-600">Qty: {item.quantity}</span>
                                                <span className="font-bold text-primary-600">{currency(item.currentPrice * item.quantity)}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Shipping Address Form */}
                        <div className="card-elegant p-5 md:p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <FiTruck className="text-primary-600 text-xl" />
                                <h2 className="text-xl font-bold text-neutral-900">Shipping Address</h2>
                            </div>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Full Name */}
                                    <div>
                                        <label htmlFor="fullName" className="block text-sm font-semibold text-neutral-700 mb-1">
                                            Full Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            id="fullName"
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleInputChange}
                                            className="input-elegant"
                                            placeholder="Tarun Suthar"
                                        />
                                        {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                                    </div>

                                    {/* Phone */}
                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-semibold text-neutral-700 mb-1">
                                            Phone Number <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            className="input-elegant"
                                            placeholder="7976933927"
                                        />
                                        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                                    </div>
                                </div>

                                {/* Address Line 1 */}
                                <div>
                                    <label htmlFor="addressLine1" className="block text-sm font-semibold text-neutral-700 mb-1">
                                        Address Line 1 <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="addressLine1"
                                        name="addressLine1"
                                        value={formData.addressLine1}
                                        onChange={handleInputChange}
                                        className="input-elegant"
                                        placeholder="Near Manadar Haweli"
                                    />
                                    {errors.addressLine1 && <p className="text-red-500 text-xs mt-1">{errors.addressLine1}</p>}
                                </div>

                                {/* Address Line 2 */}
                                <div>
                                    <label htmlFor="addressLine2" className="block text-sm font-semibold text-neutral-700 mb-1">
                                        Address Line 2
                                    </label>
                                    <input
                                        type="text"
                                        id="addressLine2"
                                        name="addressLine2"
                                        value={formData.addressLine2}
                                        onChange={handleInputChange}
                                        className="input-elegant"
                                        placeholder="Ghanchiwara palace road"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {/* City */}
                                    <div>
                                        <label htmlFor="city" className="block text-sm font-semibold text-neutral-700 mb-1">
                                            City <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            id="city"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleInputChange}
                                            className="input-elegant"
                                            placeholder="Sirohi"
                                        />
                                        {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                                    </div>

                                    {/* State */}
                                    <div>
                                        <label htmlFor="state" className="block text-sm font-semibold text-neutral-700 mb-1">
                                            State <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            id="state"
                                            name="state"
                                            value={formData.state}
                                            onChange={handleInputChange}
                                            className="input-elegant"
                                            placeholder="Rajasthan"
                                        />
                                        {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
                                    </div>

                                    {/* Pincode */}
                                    <div>
                                        <label htmlFor="pincode" className="block text-sm font-semibold text-neutral-700 mb-1">
                                            Pincode <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            id="pincode"
                                            name="pincode"
                                            value={formData.pincode}
                                            onChange={handleInputChange}
                                            className="input-elegant"
                                            placeholder="307001"
                                        />
                                        {errors.pincode && <p className="text-red-500 text-xs mt-1">{errors.pincode}</p>}
                                    </div>
                                </div>
                            </form>
                        </div>

                        {/* Payment Method */}
                        <div className="card-elegant p-5 md:p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <FiCreditCard className="text-primary-600 text-xl" />
                                <h2 className="text-xl font-bold text-neutral-900">Payment Method</h2>
                            </div>
                            <div className="space-y-3">
                                <label className="flex items-center gap-3 p-4 rounded-lg border-2 border-primary-200 cursor-pointer hover:bg-primary-50 transition">
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="COD"
                                        checked={formData.paymentMethod === "COD"}
                                        onChange={handleInputChange}
                                        className="w-5 h-5 text-primary-600 focus:ring-primary-500"
                                    />
                                    <div className="flex-1">
                                        <p className="font-semibold text-neutral-900">Cash on Delivery</p>
                                        <p className="text-sm text-neutral-600">Pay when you receive your order</p>
                                    </div>
                                </label>
                                <label className="flex items-center gap-3 p-4 rounded-lg border-2 border-neutral-200 cursor-pointer hover:bg-neutral-50 transition opacity-60">
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="ONLINE"
                                        checked={formData.paymentMethod === "ONLINE"}
                                        onChange={handleInputChange}
                                        className="w-5 h-5 text-primary-600 focus:ring-primary-500"
                                        disabled
                                    />
                                    <div className="flex-1">
                                        <p className="font-semibold text-neutral-900">Online Payment</p>
                                        <p className="text-sm text-neutral-600">Coming soon</p>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Order Summary Sidebar */}
                    <div className="card-elegant p-5 md:p-6 h-fit sticky top-24">
                        <h3 className="text-2xl font-bold text-neutral-900 mb-6">Order Summary</h3>
                        <div className="space-y-3 text-sm text-neutral-700">
                            <div className="flex justify-between items-center">
                                <span className="text-neutral-600">Subtotal</span>
                                <span>{currency(totals.subtotal)}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-green-600 font-semibold">Savings</span>
                                <span>- {currency(totals.savings)}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-neutral-600">Shipping</span>
                                <span>{totals.shipping === 0 ? "Free" : currency(totals.shipping)}</span>
                            </div>
                            <div className="divider-gradient my-4" />
                            <div className="flex justify-between items-center">
                                <span className="text-neutral-600">Total</span>
                                <span className="text-lg font-bold text-neutral-900">{currency(totals.total)}</span>
                            </div>
                        </div>
                        <button
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            className="mt-6 w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? "Processing..." : "Buy Now"}
                        </button>
                        <p className="text-xs text-neutral-500 mt-4 text-center leading-relaxed">
                            Secure checkout • Easy returns • Delivery in 3-5 days
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
