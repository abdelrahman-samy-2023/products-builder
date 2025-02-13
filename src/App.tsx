import { ChangeEvent, FormEvent, useState } from "react"
import ProductCard from "./components/ProductCard"
import Modal from "./components/ui/Modal"
import { formInputsList, productList } from "./data"
import Button from "./components/ui/Button";
import Input from "./components/ui/Input";
import { IProduct } from "./interfaces";
import { productValidation } from "./validation";
import ErrorMessage from "./components/ErrorMessage";

const App = () => {
  const defaultProductObject = {
    title: '',
    description: '',
    imageURL: '',
    price: '',
    colors: [],
    category: {
      name: '',
      imageURL: ''
    }
  }
  /* _____________ STATE _____________ */
  const [product, setProduct] = useState<IProduct>(defaultProductObject);
  const [errors, setErrors] = useState({ title: "", description: "", imageURL: "", price: "" });
  const [isOpen, setIsOpen] = useState(false);

  /* _____________ HANDLER _____________ */
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const {value, name} = event.target
    
    setProduct({
      ...product,
      [name]: value,
    })
    setErrors({
      ...errors,
      [name]: "",
    });
  };
  const onCancel = () => {
    setProduct(defaultProductObject);
    close();
  }
  
  const submitHandler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const { title, description, price, imageURL } = product;
    const errors= productValidation({ title, description, price, imageURL });

    const hasErrorMsg =
      Object.values(errors).some(value => value === "") && Object.values(errors).every(value => value === "");

    if (!hasErrorMsg) {
      setErrors(errors);
      return;
    }
  }

  /* _____________ RENDER _____________ */
  const renderProductList = productList.map(product => <ProductCard key={product.id} product={product} />)
  const renderFormInputList = formInputsList.map(input => (
    <div className="flex flex-col" key={input.id}>
      <label htmlFor={input.id} className="mb-[1px] text-sm font-medium text-gray-700">{input.label}</label>
      <Input type="text" id={input.id} name={input.name} value={product[input.name]} onChange={onChangeHandler}/>
      <ErrorMessage msg={errors[input.name]} />
    </div>
  ));

  return (
    <main className="container mx-auto">
      <Button className="bg-indigo-700 transition duration-300 hover:bg-indigo-800 my-5" onClick={open}>
        Add
      </Button>
      <div className=" m-3 md:m-4 lg:m-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4 rounded-md">
        {renderProductList}
      </div>
      <Modal isOpen={isOpen} close={close} title="ADD A NEW PRODUCT">
        <form className="space-y-3" onSubmit={submitHandler}>
          {renderFormInputList}
          <div className="flex items-center space-x-3">
            <Button className="bg-indigo-700 transition duration-300 hover:bg-indigo-800" >
              Submit
            </Button>
            <Button className="bg-red-500 transition duration-300 hover:bg-red-600" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </main>
  )
}

export default App