/**
 * Validates a product object to ensure all fields meet the required conditions.
 *
 * @param {Product} product - The product object containing title, description, imageURL, price, and colors.
 * @returns {ProductErrors} - An object containing validation error messages for each invalid field.
 */

interface Product {
    title: string;
    description: string;
    imageURL: string;
    price: string;
    colors: string[];
}

interface ProductErrors {
    title: string;
    description: string;
    imageURL: string;
    price: string;
    colors: string;
}

// Regular expression for URL validation (placed outside to avoid redefining it)
const validUrl = /^(ftp|http|https):\/\/[^ "]+$/;

export const productValidation = (product: Product): ProductErrors => {
    const errors: ProductErrors = {
        title: '',
        description: '',
        imageURL: '',
        price: '',
        colors: ''
    };

    // Validate title
    if (!product.title.trim() || product.title.length < 10 || product.title.length > 80) {
        errors.title = "Product title must be between 10 and 80 characters.";
    }

    // Validate description
    if (!product.description.trim() || product.description.length < 10 || product.description.length > 900) {
        errors.description = "Product description must be between 10 and 900 characters.";
    }

    // Validate image URL
    if (!product.imageURL.trim() || !validUrl.test(product.imageURL)) {
        errors.imageURL = "Valid image URL is required.";
    }

    // Validate price
    if (!product.price.trim() || isNaN(Number(product.price)) || Number(product.price) <= 0) {
        errors.price = "Price must be a valid number greater than 0.";
    }

    // Validate colors
    if (product.colors.length === 0) {
        errors.colors = "At least one color must be selected.";
    }

    return errors;
};