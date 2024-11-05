import Hero from "../components/Hero";

export default function HomePage() {
    return (
        <>
            <Hero />
            <section>
                <div className="container container-xl px-3 px-md-4 px-lg-5 mt-2">
                    <h1 className="text-3xl font-semibold text-center">
                        Service
                    </h1>
                </div>
            </section>
        </>
    );
}
