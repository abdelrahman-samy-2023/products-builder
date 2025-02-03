import { IProduct } from "../interfaces";
import { txtSlicer } from "../utils/functions";
import Image from "./Image";
import Button from "./ui/Button";

interface IProps {
    product: IProduct;
}

const ProductCard = ({product}: IProps) => {
    const {title, description, imageURL, price, category } = product;

    return (
        <div className="border border-gray-200 rounded-md max-w-sm md:max-w-lg mx-auto md:mx-0 p-2 flex flex-col">
            <Image imageURL={imageURL} alt={"Product Name"} className={"w-full h-full object-cover rounded-md mb-2"} />

            <h3>{title}</h3>  
            <p>{txtSlicer(description)}</p>

            <div className="flex items-center my-4 space-x-2">
                <span className="w-5 h-5 bg-indigo-600 rounded-full cursor-pointer" />
                <span className="w-5 h-5 bg-blue-600 rounded-full cursor-pointer" />
                <span className="w-5 h-5 bg-red-600 rounded-full cursor-pointer" />
            </div>

            <div className="flex items-center justify-between">
                <span>${price}</span>
                <Image imageURL={category.imageURL} alt={category.name} className={"w-10 h-10 rounded-full object-cover"} />
            </div>

            <div className="flex items-center justify-between space-x-2 mt-5">
                <Button className="bg-indigo-700 transition duration-300 hover:bg-indigo-800">EDIT</Button>
                <Button className="bg-red-700 transition duration-300 hover:bg-red-800">DELETE</Button>
            </div>
        </div>  
    )
}

export default ProductCard