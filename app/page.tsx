import RestaurantBooking from '@/components/RestaurantBooking';

export default function Home() {
  return (
    <main className="min-h-screen bg-[url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070')] bg-cover bg-center">
      <div className="min-h-screen bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-8">
              Indian Eats!
            </h1>
            <p className="text-lg text-gray-200 text-center mb-12">
              Experience fine dining at its best. Reserve your table today.
            </p>
            <RestaurantBooking />
          </div>
        </div>
      </div>
    </main>
  );
}