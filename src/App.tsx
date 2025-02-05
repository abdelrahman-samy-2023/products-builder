import { useState } from "react"
import ProductCard from "./components/ProductCard"
import Modal from "./components/ui/Modal"
import { productList } from "./data"
import { Button } from "@headlessui/react"

const App = () => {
  /* _____________ STATE _____________ */
  const [isOpen, setIsOpen] = useState(false)


  /* _____________ HANDLER _____________ */
  function open() {
    setIsOpen(true)
  }

  function close() {
    setIsOpen(false)
  }

  /* _____________ RENDER _____________ */
  const renderProductList = productList.map(product => <ProductCard key={product.id} product={product} />)

  return (
    <main className="container mx-auto">
      <Button className="bg-indigo-700 transition duration-300 hover:bg-indigo-800 w-full p-2 rounded-md text-white cursor-pointer" onClick={open}>Add</Button>

      <div className=" m-3 md:m-4 lg:m-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4 rounded-md">
        {renderProductList}
      </div>
      <Modal isOpen={isOpen} close={close} title="ADD A NEW PRODUCT">
        <div className="flex items-center space-x-3">
          <Button className="bg-indigo-700 transition duration-300 hover:bg-indigo-800 w-full p-2 rounded-md text-white cursor-pointer">Submit</Button>
          <Button className="bg-red-500 transition duration-300 hover:bg-red-600 w-full p-2 rounded-md text-white cursor-pointer" onClick={close}>Cancel</Button>
        </div>
      </Modal>
    </main>
  )
}

export default App