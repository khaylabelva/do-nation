const HeroSection: React.FC = () => {
    return (
      <section className="flex items-center justify-between px-8 md:px-20 mt-16 md:mt-20 mb-40">
        {/* Teks di Kiri */}
        <div className="flex-1 text-left ml-14">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-snug">
            YUK, WUJUDKAN <br />
            <span className="text-blue-500">PERUBAHAN BAIK</span> <br />
            HARI INI!
          </h1>
        </div>
  
        {/* Gambar di Kanan */}
        <div className="flex-1 flex justify-end mr-20">
          <img
            src="/HeroSectionImage.jpg"
            alt="Hero Image"
            className="w-80 h-80 md:w-120 md:h-120 object-contain"
          />
        </div>
      </section>
    );
  };
  
  export default HeroSection;
  