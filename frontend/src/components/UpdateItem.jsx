import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateItem = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    categoryId: '',
    image: null
  });
  const [categories, setCategories] = useState([]);
  const [existingImage, setExistingImage] = useState(''); 
  const [loading, setLoading] = useState(true); 
  const navigate = useNavigate();
  const { id } = useParams();

  console.log("data:: ", formData)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:3001/apiCategory/categories');
        setCategories(response.data.categories);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchProduct = async () => {
      if (id) {
        try {
          const response = await axios.get(`http://localhost:3001/apiItem/getItemById/${id}`);

          console.log(" data: ", response)
          setFormData({
            name: response.data.item.name,
            price: response.data.item.price,
            description: response.data.item.description,
            categoryId: response.data.item.categoryId,
            image: null
          });
          setExistingImage(response.data.image); 
          setLoading(false); 
        } catch (err) {
          console.error('Error fetching product:', err);
        }
      }
    };

    fetchCategories();
    fetchProduct(formData);
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form Data Before Submit:', formData);

    if (!formData.name || !formData.price) {
      console.error('Name and price are required');
      return; 
    }

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('price', formData.price);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('categoryId', formData.categoryId);

    if (formData.image) {
      formDataToSend.append('image', formData.image);
    }

    try {
      console.log('Updating item with ID:', id);
      const response = await axios.put(`http://localhost:3001/apiItem/updateItem/${id}`, formData);
      console.log('Response from server:', response.data); 
      navigate('/dashboard'); 
    } catch (err) {
      console.error('Error updating item:', err.response.data);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 bg-white rounded shadow-md">
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name || ''} 
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
          value={formData.price || ''} 
          onChange={handleInputChange}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Description</label>
        <textarea
          name="description"
          value={formData.description || ''}
          onChange={handleInputChange}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Category</label>
        <select
          name="categoryId"
          value={formData.categoryId || ''}
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
        {existingImage && (
          <div className="mt-2">
            <p className="text-sm text-gray-600">Current Image:</p>
            <img src={existingImage} alt="Current" className="h-20 w-20 object-cover" />
          </div>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Update Product
      </button>
    </form>
  );
};

export default UpdateItem;
