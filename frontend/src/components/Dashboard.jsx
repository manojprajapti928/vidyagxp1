import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        const [itemRes, categoryRes] = await Promise.all([
          axios.get("http://localhost:3001/apiItem/getAllItems"),
          axios.get("http://localhost:3001/apiCategory/categories"),
        ]);

        console.log("API response for items:", itemRes);
        setData(itemRes.data.items);

        console.log("API response for categories:", categoryRes);
        setCategories(categoryRes.data.categories);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData();
  }, []);

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (!isConfirmed) return;

    try {
      await axios.delete(`http://localhost:3001/apiItem/deleteItem/${id}`);
      setData(data.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const filteredItems = selectedCategory
    ? data.filter((item) => item.categoryId === selectedCategory)
    : data;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between">
            <div className="flex space-x-7">
              <div>
                <a href="#" className="flex items-center py-4 px-2">
                  <span className="font-semibold text-gray-500 text-lg">
                    Dashboard
                  </span>
                </a>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-3">
              <div className="relative">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="py-2 px-4 text-gray-500 font-semibold hover:text-green-500 transition duration-300"
                >
                  Categories
                  <svg
                    className="w-4 h-4 ml-2 inline-block"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </button>
                {isOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md overflow-hidden shadow-xl z-10">
                    {categories.map((category) => (
                      <a
                        key={category.id}
                        href="#"
                        onClick={() => {
                          setSelectedCategory(category.id);
                          setIsOpen(false);
                        }}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        {category.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
              <button
                onClick={() => navigate("/additem")}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300"
              >
                Add Items
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-md overflow-hidden transition duration-300 hover:shadow-lg"
              >
                <img
                  src={item.imageUrl || "/placeholder.png"}
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">
                    {item.name}
                  </h3>
                  <p className="text-gray-600 mb-2">Price: ₹{item.price}</p>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  <div className="flex justify-between">
                    <Link
                      to={`/updateItem/${item.id}`}
                      className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300"
                    >
                      Update
                    </Link>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-300"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-600">
              No items available
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
