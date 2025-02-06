import { useState } from 'react';
import apiClient from '../apiClient';

const InvoiceForm = () => {
    const [formData, setFormData] = useState({ item: '', quantity: '', price: '' });
    const [qrCode, setQrCode] = useState(null);
    const [receipt, setReceipt] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await apiClient.post('/api/generate-invoice', formData);
        setQrCode(response.data.qrCode);
        setReceipt(response.data.receipt);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="item" placeholder="Item" onChange={handleChange} />
                <input type="number" name="quantity" placeholder="Quantity" onChange={handleChange} />
                <input type="number" name="price" placeholder="Price" onChange={handleChange} />
                <button type="submit">Generate Invoice</button>
            </form>
            {qrCode && <img src={`data:image/png;base64,${qrCode}`} alt="QR Code" />}
            {receipt && <a href={`data:application/pdf;base64,${receipt}`} download="receipt.pdf">Download Receipt</a>}
        </div>
    );
};

export default InvoiceForm;
