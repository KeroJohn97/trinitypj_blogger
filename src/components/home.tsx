export default function Home() {
  return (
    <section id="home" className="snap-start-section active-section p-4">
      <div className="content-wrapper mx-auto w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <h1 className="mb-4 text-center text-3xl font-bold text-gray-900">Welcome to the App</h1>
        <p className="mb-6 text-center text-gray-600">
          This is the first page of our vertical carousel. Use the scroll wheel or the navigation buttons to navigate.
        </p>
        <div className="text-center">
          <button
            id="mainButton"
            className="rounded-full bg-blue-500 px-6 py-2 font-semibold text-white transition duration-300 ease-in-out hover:bg-blue-600"
          >
            Click Me!
          </button>
          <p id="message" className="mt-4 text-gray-700"></p>
        </div>
      </div>
    </section>
  )
}
