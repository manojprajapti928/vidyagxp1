import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Additem = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    categoryId: "",
    image: null,
  });
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/apiCategory/categories"
        );
        console.log(response);
        setCategories(response.data.categories);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCategories();

    if (id) {
      const fetchProduct = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3001/apiItem/${id}`
          );
          setFormData({
            name: response.data.name,
            price: response.data.price,
            description: response.data.description,
            categoryId: response.data.categoryId,
            image: null,
          });
        } catch (err) {
          console.error(err);
        }
      };
      fetchProduct();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("categoryId", formData.categoryId);
    if (formData.image) formDataToSend.append("image", formData.image);

    try {
      if (id) {
        await axios.put(
          `http://localhost:3001/apiItem/updateItem/:id/${id}`,
          formDataToSend
        );
      } else {
        await axios.post(
          "http://localhost:3001/apiItem/createItem",
          formDataToSend
        );
      }
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-4 bg-white rounded shadow-md"
    >
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Price</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleInputChange}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Category</label>
        <select
          name="categoryId"
          value={formData.categoryId}
          onChange={handleInputChange}
          required
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Image</label>
        <input
          type="file"
          name="image"
          onChange={handleFileChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        {id ? "Update Product" : "Add Product"}
      </button>
    </form>
  );
};

export default Additem;
