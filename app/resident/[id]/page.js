"use client"

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const ResidentPage = ({ params }) => {
    const router = useRouter();
    const { id } = params;
    const [resident, setResident] = useState({});
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({ name: '', phone: '', email: '' });

    const fetchResident = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/admin/getresidentbyid/${id}`);
            setResident(response.data || {});
            setFormData(response.data || {});
            setLoading(false);
        } catch (error) {
            console.error('Error fetching resident:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchResident();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleUpdate = async () => {
        try {
            await axios.put(`http://localhost:3000/admin/updateresident/${id}`, formData);
            fetchResident(); // Refresh resident data after update
            router.push('/resident'); // Navigate back to all residents page
        } catch (error) {
            console.error('Error updating resident:', error);
        }
    };

    const handleDelete = async () => {
        // Display confirmation dialog
        const confirmDelete = window.confirm("Are you sure you want to delete this resident?");
        
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:3000/admin/deleteresident/${id}`);
                router.push('/resident'); // Navigate back to all residents page
            } catch (error) {
                console.error('Error deleting resident:', error);
            }
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Resident Details</h1>
            {loading ? (
                <p className="text-gray-700">Getting resident please wait!</p>
            ) : (
                <div>
                    <form className="mb-4">
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-black"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number:</label>
                            <input
                                type="text"
                                name="phone"
                                id="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-black"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-black"
                            />
                        </div>
                    </form>
                    <button onClick={handleUpdate} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded inline-block mr-2">Update</button>
                    <button onClick={handleDelete} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded inline-block">Delete</button>
                </div>
            )}
        </div>
    );
};

export default ResidentPage;