// ** productObj == errorsObj (TITLE, DESCRIPTION, IMAGE, PRICE)
export const productValidation = (product: { title: string; description: string; imageURL: string; price: string; }) => {
    // ** Returns an object
    const errors: { title: string; description: string; imageURL: string; price: string; } = {
        title: '',
        description: '',
        imageURL: '',
        price: ''
    }

    if(product.title.trim() || product.title.length < 10 || product.title.length > 80) {
        errors.title = "Product title must be between 10 and 80 characters!";
    }
    if(product.description.trim() || product.description.length < 10 || product.description.length > 80) {
        errors.description = "Product description must be between 10 and 900 characters!";
    }

    return errors;
}