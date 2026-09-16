const fs = require('fs');

let page = fs.readFileSync('src/app/journeys/[slug]/page.tsx', 'utf-8');

// We need to add a "Related Packages" section at the end of the main tag.
// Right after the grid ends (which is the closing div of the grid).
const relatedPackagesSection = \
        {/* Related Packages */}
        <section className="mt-24 border-t border-stone-200 pt-16">
          <h2 className="font-playfair text-3xl text-stone-900 mb-8 text-center">More Related Packages</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tourPackages.filter(p => p.slug !== tour.slug).slice(0, 3).map((pkg) => (
              <div key={pkg.id} className="group bg-white rounded-xl overflow-hidden shadow-sm border border-stone-100 hover:shadow-md transition-shadow">
                <div className="relative h-64 w-full overflow-hidden">
                  <ImageSlider images={pkg.gallery} alt={pkg.title} />
                </div>
                <div className="p-6">
                  <h3 className="font-playfair text-xl text-stone-900 mb-2 line-clamp-2">{pkg.title}</h3>
                  <div className="flex items-center gap-2 mb-6 text-xs text-stone-500 uppercase tracking-widest">
                    <span><Clock className="inline w-3 h-3 mr-1" />{pkg.duration}</span>
                  </div>
                  <Link href={\/journeys/\\} className="block text-center border border-stone-900 text-stone-900 px-4 py-3 text-sm tracking-widest uppercase hover:bg-stone-900 hover:text-white transition-colors w-full">
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
\;

page = page.replace("      </main>", relatedPackagesSection);

fs.writeFileSync('src/app/journeys/[slug]/page.tsx', page);
