import HomePage from "./(site)/HomePage/page"
import ProductPage from "./(site)/ProductPage/page"
import ContactPage from "./(site)/ContactPage/page"

export default function App() {
  return (
    <main>
      <HomePage />
      <div className="w-full max-w-7xl mx-auto">
        <ProductPage />
        <ContactPage />
      </div>
    </main>
  )
}
