import HomePage from "./HomePage/page"
import ProductPage from "./ProductPage/page"
import ContactPage from "./ContactPage/page"

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
