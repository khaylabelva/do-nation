const Navbar: React.FC = () => {
    return (
      <nav className="flex justify-between items-center p-6 bg-white shadow-md">
        <div className="text-2xl font-bold text-blue-600">DoNation</div>
        <div className="space-x-6">
          <a href="#" className="hover:text-blue-500">Home</a>
          <a href="#" className="hover:text-blue-500">Donation</a>
          <a href="#" className="hover:text-blue-500">How It Works</a>
          <a href="#" className="hover:text-blue-500">About Us</a>
        </div>
      </nav>
    );
  };
  
  export default Navbar;
  