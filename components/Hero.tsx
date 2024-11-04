const Hero = () => (
    <section className="w-full h-screen flex flex-col items-center justify-center text-center text-white py-20 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Welcome to Book Chautari
        </h2>
        <p className="text-lg sm:text-xl mb-6">
            Your destination for the best books and reviews!
        </p>
        <button className="bg-white text-blue-600 font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 hover:text-white transition duration-300 ease-in-out">
            Explore Books
        </button>
    </section>
);

export default Hero;
