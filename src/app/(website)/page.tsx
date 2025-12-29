import HomePage from "./home/page"
import ProductPage from "./products/page"
import ContactPage from "./contact/page"

export default function App() {
  return (
    <main className="w-full max-w-7xl mx-auto">
      <HomePage />
      <ProductPage />
      <ContactPage />
    </main>
  )
}
