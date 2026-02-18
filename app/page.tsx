export default function WelcomePage() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-2xl text-center">

        <div className="mb-6 text-sm text-gray-500 tracking-wide">
          🇳🇵 Nepal’s Reading Community
        </div>

        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight leading-tight">
          Welcome to
          <span className="block mt-2 text-blue-600">
            Book Chautari
          </span>
        </h1>

        <p className="mt-6 text-gray-600 text-lg">
          Discover and discuss Nepalese literature in one place.
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
            Explore
          </button>

          <button className="border border-gray-300 px-6 py-3 rounded-lg hover:bg-gray-50 transition">
            Join
          </button>
        </div>

      </div>
    </section>
  );
}
