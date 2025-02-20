import { ChangeEvent, FormEvent, useState } from "react"
import ProductCard from "./components/ProductCard"
import Modal from "./components/ui/Modal"
import { categories, colors, formInputsList, productList } from "./data"
import Button from "./components/ui/Button";
import Input from "./components/ui/Input";
import { IProduct } from "./interfaces";
import { productValidation } from "./validation";
import ErrorMessage from "./components/ErrorMessage";
import CircleColor from "./components/CircleColor";
import { v4 as uuid } from "uuid";
import Select from "./components/ui/Select";

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
  const [products, setProducts] = useState<IProduct[]>(productList);
  const [product, setProduct] = useState<IProduct>(defaultProductObject);
  const [errors, setErrors] = useState({ title: "", description: "", imageURL: "", price: "", colors: "" });
  const [tempColors, setTempColor] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

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
    const errors= productValidation({ title, description, price, imageURL, colors: tempColors });

    const hasErrorMsg =
      Object.values(errors).some(value => value === "") && Object.values(errors).every(value => value === "");

    if (!hasErrorMsg) {
      setErrors(errors);
      return;
    }

    setProducts(prev => [{ ...product, id: uuid(), colors: tempColors, category: selectedCategory }, ...prev]);
    setProduct(defaultProductObject);
    setTempColor([]);
    close();
  }

  /* _____________ RENDER _____________ */
  const renderProductList = products.map(product => <ProductCard key={product.id} product={product} />)
  const renderFormInputList = formInputsList.map(input => (
    <div className="flex flex-col" key={input.id}>
      <label htmlFor={input.id} className="mb-[1px] text-sm font-medium text-gray-700">{input.label}</label>
      <Input type="text" id={input.id} name={input.name} value={product[input.name]} onChange={onChangeHandler}/>
      <ErrorMessage msg={errors[input.name]} />
    </div>
  ));
  const renderProductColors = colors.map(color => (
    <CircleColor
      key={color}
      color={color}
      onClick={() => {
        if (tempColors.includes(color)) {
          setTempColor(prev => prev.filter(item => item !== color));
          return;
        }
        setTempColor(prev => [...prev, color]);
      }}
    />
  ));

  return (
    <main className="container mx-auto">
      <div className="flex flex-col md:flex-row items-center justify-between p-5 m-5 bg-white rounded-lg border border-gray-200 space-y-3">
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">Create and Manage Products</h1>
        <Button
          className="bg-indigo-700 transition duration-300 hover:bg-indigo-800 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 flex items-center space-x-2"
          width="w-fit"
          onClick={open}
          aria-label="Add New Product"
          role="button"
          tabIndex={0}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          <span>Add New Product</span>
        </Button>
      </div>

      <div className=" m-3 md:m-4 lg:m-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4 rounded-md">
        {renderProductList}
      </div>
      <Modal isOpen={isOpen} close={close} title="ADD A NEW PRODUCT">
        <form className="space-y-4" onSubmit={submitHandler}>
          {renderFormInputList}
          
          <div className="space-y-4 mb-0">
            <Select selected={selectedCategory} setSelected={setSelectedCategory} />
            <div className="flex flex-wrap gap-1">
              {renderProductColors}
            </div>
            <div className="flex flex-wrap gap-1">
              {tempColors.map(color => (
                <span
                  key={color}
                  className="px-2 py-1 text-xs font-medium rounded-full text-white"
                  style={{ backgroundColor: color }}
                >
                  {color}
                </span>
              ))}
            </div>
            <ErrorMessage msg={errors.colors} />
          </div>

          <div className="flex gap-3 pt-4">
            <Button className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2">
              Submit
            </Button>
            <Button type="button" onClick={onCancel} className="bg-gray-500 hover:bg-gray-600 px-4 py-2">
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </main>
  )
}

export default App;