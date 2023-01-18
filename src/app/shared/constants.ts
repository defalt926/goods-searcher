import { Category } from "./models/category.model"

export const CONST = {
    categories: [
        {cat_id: "1", name : "Food & Drink"},
        {cat_id: "2", name: "Electronics"},
        {cat_id: "3", name: "Home & Garden"},
        {cat_id: "4", name: "Sporting Goods"}
    ],
    subCategories: [
        {cat_id: "1", subcat_id: "1", name: "Bread"},
        {cat_id: "1", subcat_id: "2", name: "Water"},

        {cat_id: "2", subcat_id: "3", name: "Mobile Phone"},
        {cat_id: "2", subcat_id: "4", name: "Television"},

        {cat_id: "3", subcat_id: "5", name: "Towel"},
        {cat_id: "3", subcat_id: "6", name: "Plants"},

        {cat_id: "4", subcat_id: "7", name: "Bicycle"},
        {cat_id: "4", subcat_id: "8", name: "Fishing rod"},
    ]
}


