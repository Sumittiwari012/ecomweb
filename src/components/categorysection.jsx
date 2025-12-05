const CATEGORIES = [
  { id: 1, name: 'Electronics', image: 'https://images.unsplash.com/photo-1498049860654-af1a5c5668ba?auto=format&fit=crop&w=300' },
  { id: 2, name: 'Fashion', image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=300' },
  { id: 3, name: 'Home & Living', image: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?auto=format&fit=crop&w=300' },
  { id: 4, name: 'Accessories', image: 'https://images.unsplash.com/photo-1523293188086-b5191ee45bb9?auto=format&fit=crop&w=300' },
];

export default function categorysection() {
  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">

        <h2 className="text-3xl font-bold mb-8">Shop by Category</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {CATEGORIES.map((cat) => (
            <div key={cat.id} className="group relative cursor-pointer rounded-lg overflow-hidden shadow-md">
              <img src={cat.image} alt={cat.name}
                className="w-full h-48 object-cover group-hover:scale-110 transition" />

              <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40">
                <h3 className="text-white text-xl font-bold">{cat.name}</h3>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
