import HomePage from "./HomePage/page"
import ProductPage from "./ProductPage/page"
import ContactPage from "./ContactPage/page"

export default function App() {
  return (
    <main className="w-full max-w-7xl mx-auto">
      <HomePage />
      <ProductPage />
      <ContactPage />
    </main>
  )
}
