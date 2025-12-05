import { Truck, ShieldCheck, RefreshCw } from 'lucide-react';

export default function features() {
  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">

        <FeatureCard
          icon={<Truck className="h-8 w-8 text-blue-600" />}
          title="Free Shipping"
          description="On all orders over $50"
        />

        <FeatureCard
          icon={<ShieldCheck className="h-8 w-8 text-blue-600" />}
          title="Secure Payment"
          description="100% secure payment methods"
        />

        <FeatureCard
          icon={<RefreshCw className="h-8 w-8 text-blue-600" />}
          title="30 Day Returns"
          description="Money back guarantee"
        />

      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="flex flex-col items-center p-4">
      <div className="bg-blue-100 p-3 rounded-full mb-4">{icon}</div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-gray-500">{description}</p>
    </div>
  );
}
