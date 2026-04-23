export default function Activity() {
  return (
    <section id="activities" className="snap-start-section p-4">
      <div className="content-wrapper mx-auto w-full max-w-2xl rounded-xl bg-white p-8 shadow-lg">
        <h1 className="mb-4 text-center text-3xl font-bold text-gray-900">Activities & Events</h1>
        <p className="mb-8 text-center text-gray-600">
          Check out some of our recent activities and events. Click an image to view it in full screen!
        </p>
        {/* Staggered Image Gallery */}
        <div className="grid grid-cols-2 gap-4">
          <div className="gallery-item-container overflow-hidden rounded-lg shadow-md transition-shadow duration-300">
            <img
              src="https://source.unsplash.com/random/400x600?event"
              data-src="https://source.unsplash.com/random/1200x1800?event"
              className="gallery-image h-full w-full rounded-lg object-cover"
              alt="Event photo"
            ></img>
          </div>
          <div className="gallery-item-container overflow-hidden rounded-lg shadow-md transition-shadow duration-300">
            <img
              src="https://source.unsplash.com/random/400x400?concert"
              data-src="https://source.unsplash.com/random/1200x1200?concert"
              className="gallery-image h-full w-full rounded-lg object-cover"
              alt="Concert photo"
            ></img>
          </div>
          <div className="gallery-item-container overflow-hidden rounded-lg shadow-md transition-shadow duration-300">
            <img
              src="https://source.unsplash.com/random/400x400?meeting"
              data-src="https://source.unsplash.com/random/1200x1200?meeting"
              className="gallery-image h-full w-full rounded-lg object-cover"
              alt="Meeting photo"
            ></img>
          </div>
          <div className="gallery-item-container overflow-hidden rounded-lg shadow-md transition-shadow duration-300">
            <img
              src="https://source.unsplash.com/random/400x600?workshop"
              data-src="https://source.unsplash.com/random/1200x1800?workshop"
              className="gallery-image h-full w-full rounded-lg object-cover"
              alt="Workshop photo"
            ></img>
          </div>
          <div className="gallery-item-container overflow-hidden rounded-lg shadow-md transition-shadow duration-300">
            <img
              src="https://source.unsplash.com/random/400x500?party"
              data-src="https://source.unsplash.com/random/1200x1500?party"
              className="gallery-image h-full w-full rounded-lg object-cover"
              alt="Party photo"
            ></img>
          </div>
          <div className="gallery-item-container overflow-hidden rounded-lg shadow-md transition-shadow duration-300">
            <img
              src="https://source.unsplash.com/random/400x500?conference"
              data-src="https://source.unsplash.com/random/1200x1500?conference"
              className="gallery-image h-full w-full rounded-lg object-cover"
              alt="Conference photo"
            ></img>
          </div>
        </div>
      </div>
    </section>
  )
}
