import { POPULATION_STATS } from "@/lib/constants";

export function Administration() {
    return (
        <section id="section-3" className="py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-red-600 mb-4">Administrasi Penduduk</h2>
            <p className="text-lg mb-8">
              Sistem digital yang berfungsi mempermudah pengelolaan data dan informasi terkait dengan kependudukan dan pendayagunaannya untuk pelayanan publik yang efektif dan efisien
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
              {POPULATION_STATS.map((stat, index) => (
                <div key={index} className="flex">
                  <div className="w-1/2 bg-red-500 text-white p-4 flex items-center justify-center text-3xl font-bold">
                    {stat.value}
                  </div>
                  <div className="w-1/2 bg-white border border-gray-200 p-4 flex items-center justify-center text-gray-700">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
    )
}