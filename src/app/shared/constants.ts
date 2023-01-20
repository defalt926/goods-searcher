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
    ],
    items: [
        {id: "1", cat_id: "1", subcat_id: "1", name: "White Bread", details: "", rating: 0},
        {id: "2", cat_id: "1", subcat_id: "1", name: "Brown Bread", details: "", rating: 0},
        {id: "3", cat_id: "1", subcat_id: "2", name: "Sparkling Water", details: "", rating: 0},
        {id: "4", cat_id: "1", subcat_id: "2", name: "Distilled Water", details: "", rating: 0},
    ],
    shops: [
        {id: "1", name: "Spar", city: "Szeged", street: "Csanádi utca 7."},
        {id: "2", name: "Aldi", city: "Szeged", street: "Dugonics tér 8."},
    ],
    price: [
        {shop_id: "1", item_id: "1", price: 1000},
        {shop_id: "1", item_id: "2", price: 1500},
        {shop_id: "2", item_id: "1", price: 980},
        {shop_id: "2", item_id: "2", price: 1510},
    ]
}


