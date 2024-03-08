from main import *
from fastapi import HTTPException



def validate_product_data(product_data):
        errors = []

        # Check if required fields are present
        required_fields = ["name", "description", "image", "price", "images"]
        for field in required_fields:
            if field not in product_data:
                errors.append(f"Missing required field: {field}")

        # Validate price
        if "price" in product_data:
            try:
                price = float(product_data["price"])
                if price < 0:
                    errors.append("Price must be a positive number")
            except ValueError:
                errors.append("Price must be a valid number")

        # Validate images
        if "images" in product_data:
            images_data = product_data["images"]
            if not isinstance(images_data, list) or len(images_data) != 1:
                errors.append("Images must be a list containing one object")
            else:
                image_obj = images_data[0]
                if not isinstance(image_obj, dict):
                    errors.append("Images must be a list of objects")
                else:
                    required_image_fields = ["image1", "image2", "image3"]
                    for field in required_image_fields:
                        if field not in image_obj:
                            errors.append(f"Missing required field in images: {field}")

        # Additional custom validation logic can be added here

        if errors:
            raise HTTPException(status_code=400, detail=errors)