export default function footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4">

        <div>
          <h3 className="text-white text-lg font-bold mb-4">ShopVibe</h3>
          <p>Your one-stop destination for premium products.</p>
        </div>

        <FooterColumn title="Quick Links" links={["About Us", "Contact", "FAQs"]} />
        <FooterColumn title="Legal" links={["Privacy Policy", "Terms of Service"]} />

        <div>
          <h4 className="text-white font-semibold mb-4">Newsletter</h4>
          <div className="flex">
            <input
              type="email"
              placeholder="Enter email"
              className="px-4 py-2 w-full rounded-l-md text-gray-900"
            />
            <button className="bg-blue-600 px-4 py-2 rounded-r-md text-white hover:bg-blue-700">
              Subscribe
            </button>
          </div>
        </div>

      </div>

      <div className="text-center text-sm mt-8 border-t border-gray-800 pt-8">
        © 2025 ShopVibe Inc. All rights reserved.
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }) {
  return (
    <div>
      <h4 className="text-white font-semibold mb-4">{title}</h4>
      <ul className="space-y-2 text-sm">
        {links.map((l, idx) => (
          <li key={idx}><a href="#" className="hover:text-white">{l}</a></li>
        ))}
      </ul>
    </div>
  );
}
