export default function About() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-amber-50 via-white to-orange-50">
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-10 xl:px-16 py-10 md:py-14">
        {/* Hero */}
        <section className="grid gap-8 lg:grid-cols-[1.2fr,1fr] items-center mb-12">
          <div>
            <p className="text-xs font-semibold tracking-[0.3em] text-amber-600 uppercase mb-3">
              Our Story
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
              Weaving timeless stories, one saree at a time.
            </h1>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              Sukanya is a curated saree boutique born out of a love for Indian craftsmanship,
              heritage weaves, and modern aesthetics. We partner with skilled weavers and designers
              across India to bring you sarees that feel as special as the moments you wear them in.
            </p>
          </div>
          <div className="relative h-64 md:h-72 lg:h-80 rounded-3xl overflow-hidden shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1603791445824-0050bd436b0d?auto=format&fit=crop&w=1200&q=80"
              alt="Saree detail"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-amber-900/40 via-transparent to-transparent" />
          </div>
        </section>

        {/* Mission / Values */}
        <section className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-2xl shadow-md border border-amber-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Our Mission</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              To make premium sarees accessible while celebrating the artisans, techniques,
              and stories behind every weave.
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-md border border-amber-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Craftsmanship</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              We carefully source from handloom clusters, heritage houses, and trusted designers
              to ensure authenticity and quality.
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-md border border-amber-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Experience</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              From discovery to delivery, we focus on a seamless experience so you can shop
              confidently from the comfort of your home.
            </p>
          </div>
        </section>

        {/* Stats / Highlights */}
        <section className="bg-white rounded-3xl border border-amber-100 shadow-md p-6 md:p-8 mb-12">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <p className="text-3xl font-bold text-amber-700">50+</p>
              <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mt-1">Weaver partners</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-amber-700">5000+</p>
              <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mt-1">Sarees curated</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-amber-700">1000+</p>
              <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mt-1">Happy customers</p>
            </div>
          </div>
        </section>

        {/* Why Sukanya */}
        <section className="grid lg:grid-cols-2 gap-8 items-center mb-12">
          <div className="order-2 lg:order-1 space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Why Sukanya?</h2>
            <ul className="space-y-3 text-sm md:text-base text-gray-600">
              <li>• Curated collections across silk, cotton, chiffon, Banarasi, and designer sarees.</li>
              <li>• Transparent pricing and detailed product descriptions to help you choose better.</li>
              <li>• Safe packaging and reliable delivery across major cities in India.</li>
              <li>• Responsive support for sizing, styling, and after-care queries.</li>
            </ul>
          </div>
          <div className="order-1 lg:order-2 relative h-60 md:h-72 rounded-3xl overflow-hidden shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80"
              alt="Customer experience"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur rounded-2xl px-4 py-3 text-sm shadow">
              <p className="font-semibold text-gray-900">“Every saree from Sukanya feels like a keepsake.”</p>
              <p className="text-xs text-gray-500 mt-1">— A happy Sukanya customer</p>
            </div>
          </div>
        </section>

        {/* Call to action */}
        <section className="bg-gradient-to-r from-amber-600 to-orange-500 rounded-3xl px-6 md:px-10 py-6 md:py-8 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl md:text-2xl font-semibold">Be part of our saree story.</h2>
            <p className="text-sm md:text-base text-amber-50/90 mt-1">
              Explore our latest collections and find a saree that feels like you.
            </p>
          </div>
          <div className="flex gap-3">
            <a
              href="/shop"
              className="inline-flex items-center justify-center px-5 py-3 rounded-full bg-white text-amber-800 text-sm md:text-base font-semibold shadow-md hover:shadow-lg transition"
            >
              Browse Collections
            </a>
            <a
              href="/"
              className="inline-flex items-center justify-center px-5 py-3 rounded-full border border-amber-100 text-white text-sm md:text-base font-semibold hover:bg-amber-500/20 transition"
            >
              Back to Home
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}