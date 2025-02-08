import { useState } from "react";
import apiClient from "../apiClient";

const InvoiceForm = () => {
    const [formData, setFormData] = useState({
        vendorName: "",
        address: "",
        contactNumber: "",
        receiptNo: "",
        date: "",
        time: "",
        currency: "",
        items: [{ description: "", quantity: "", unitPrice: "" }],
        paymentMethod: "Credit Card",
        cardLast4Digits: "",
    });

    const [qrCode, setQrCode] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleItemChange = (e, index) => {
        const { name, value } = e.target;
        const items = [...formData.items];
        items[index][name] = value;
        setFormData((prevData) => ({
            ...prevData,
            items,
        }));
    };

    const addItem = () => {
        setFormData((prevData) => ({
            ...prevData,
            items: [...prevData.items, { description: "", quantity: "", unitPrice: "" }],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await apiClient.post("/api/generate-invoice", formData);
            setQrCode(response.data.qrCode);
        } catch (error) {
            console.error("Error generating invoice:", error);
        }
    };

    return (
        <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-6 mt-10">
            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Generate Invoice</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700 font-medium">Vendor/Business Name:</label>
                    <input
                        type="text"
                        name="vendorName"
                        value={formData.vendorName}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-medium">Address:</label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-medium">Contact Number:</label>
                    <input
                        type="text"
                        name="contactNumber"
                        value={formData.contactNumber}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-medium">Receipt No:</label>
                    <input
                        type="text"
                        name="receiptNo"
                        value={formData.receiptNo}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-700 font-medium">Date:</label>
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium">Time:</label>
                        <input
                            type="time"
                            name="time"
                            value={formData.time}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-gray-700 font-medium">Currency:</label>
                    <select name="currency" value={formData.currency} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300">
                        <option value="USD">USD</option>
                        <option value="INR">INR</option>
                        <option value="EUR">EUR</option>
                        {/* Add more currencies as needed */}
                    </select>
                </div>
                <div>
                    <label className="block text-gray-700 font-medium">Items:</label>
                    {formData.items.map((item, index) => (
                        <div key={index} className="grid grid-cols-3 gap-2 mb-2">
                            <input type="text" name="description" placeholder="Description" value={item.description} onChange={(e) => handleItemChange(e, index)} required className="p-2 border border-gray-300 rounded-md" />
                            <input type="number" name="quantity" placeholder="Quantity" value={item.quantity} onChange={(e) => handleItemChange(e, index)} required className="p-2 border border-gray-300 rounded-md" />
                            <input type="text" name="unitPrice" placeholder="Unit Price" value={item.unitPrice} onChange={(e) => handleItemChange(e, index)} required className="p-2 border border-gray-300 rounded-md" />
                        </div>
                    ))}
                    <button type="button" onClick={addItem} className="text-blue-600 hover:text-blue-800">+ Add Item</button>
                </div>
                <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700">Generate Invoice</button>
            </form>
            {qrCode && <img src={`data:image/png;base64,${qrCode}`} alt="QR Code" className="mt-4 mx-auto" />}
        </div>
    );
};

export default InvoiceForm;
