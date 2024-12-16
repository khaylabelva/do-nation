const SearchBar: React.FC = () => {
    return (
      <div className="flex justify-center mt-8 mb-10">
        <div className="relative w-1/2">
          <input
            type="text"
            placeholder="Temukan Kampanye Sosial atau Aktivitas Berdampak Positif..."
            className="w-full p-3 pl-10 border rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-100 text-gray-700 font-semibold rounded-full px-4 py-1 shadow hover:bg-gray-300">
            Cari
          </button>
        </div>
      </div>
    );
  };
  
  export default SearchBar;
  