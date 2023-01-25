import { Category } from "./models/category.model"
import { Item } from "./models/item.model"
import { Price } from "./models/price.model"
import { Shop } from "./models/shop.model"
import { SubCategory } from "./models/subcategory.model"

export const CONST = {
    categories: [
        {cat_id: "1", name : "Food & Drink"} as Category,
        {cat_id: "2", name: "Electronics"} as Category,
        {cat_id: "3", name: "Home & Garden"} as Category,
        {cat_id: "4", name: "Sporting Goods"} as Category,
    ],
    subCategories: [
        {cat_id: "1", subcat_id: "1", name: "Bread"} as SubCategory,
        {cat_id: "1", subcat_id: "2", name: "Water"} as SubCategory,
        {cat_id: "2", subcat_id: "3", name: "Mobile Phone"} as SubCategory,
        {cat_id: "2", subcat_id: "4", name: "Television"} as SubCategory,
        {cat_id: "3", subcat_id: "5", name: "Towel"} as SubCategory,
        {cat_id: "3", subcat_id: "6", name: "Plants"} as SubCategory,
        {cat_id: "4", subcat_id: "7", name: "Bicycle"} as SubCategory,
        {cat_id: "4", subcat_id: "8", name: "Fishing rod"} as SubCategory,
    ],
    items: [
        {id: "1", cat_id: "1", subcat_id: "1", name: "White Bread", description: "1kg white bread", rating: 0} as Item,
        {id: "2", cat_id: "1", subcat_id: "1", name: "Brown Bread", description: "", rating: 0} as Item,
        {id: "3", cat_id: "1", subcat_id: "2", name: "Sparkling Water", description: "", rating: 0} as Item,
        {id: "4", cat_id: "1", subcat_id: "2", name: "Distilled Water", description: "", rating: 0} as Item,
    ],
    shops: [
        {id: "1", name: "Spar", city: "Szeged", street: "Csanádi street 7."} as Shop,
        {id: "2", name: "Aldi", city: "Szeged", street: "Dugonics square 8."} as Shop,
    ],
    prices: [
        {shop_id: "1", item_id: "1", price: 1000} as Price,
        {shop_id: "1", item_id: "2", price: 1500} as Price,
        {shop_id: "2", item_id: "1", price: 980} as Price,
        {shop_id: "2", item_id: "2", price: 1510} as Price,
        {shop_id: "1", item_id: "3", price: 65} as Price,
        {shop_id: "1", item_id: "4", price: 130} as Price,
        {shop_id: "2", item_id: "3", price: 70} as Price,
        {shop_id: "2", item_id: "4", price: 140} as Price,
    ],
}
