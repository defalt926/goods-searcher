import { Category } from "./models/category.model"
import { Item } from "./models/item.model"
import { Price } from "./models/price.model"
import { Shop } from "./models/shop.model"
import { SubCategory } from "./models/subcategory.model"
import { User } from "./models/user.model"

export const CONST = {
    categories: [
        {cat_id: "1", name : "Étel & Ital"} as Category,
        {cat_id: "2", name: "Elektronika"} as Category,
        {cat_id: "3", name: "Otthon & Kert"} as Category,
        {cat_id: "4", name: "Sport"} as Category,
    ],
    subCategories: [
        {cat_id: "1", subcat_id: "1", name: "Péksütemény"} as SubCategory,
        {cat_id: "1", subcat_id: "2", name: "Víz"} as SubCategory,
        {cat_id: "2", subcat_id: "3", name: "Mobiltelefon"} as SubCategory,
        {cat_id: "2", subcat_id: "4", name: "Televízió"} as SubCategory,
        {cat_id: "3", subcat_id: "5", name: "Törölköző"} as SubCategory,
        {cat_id: "3", subcat_id: "6", name: "Növény"} as SubCategory,
        {cat_id: "4", subcat_id: "7", name: "Kerékpár"} as SubCategory,
        {cat_id: "4", subcat_id: "8", name: "Horgászbot"} as SubCategory,
    ],
    items: [
        {id: "1", cat_id: "1", subcat_id: "1", name: "Epres Fánk", description: "epres fánk 1db", rating: 0} as Item,
        {id: "2", cat_id: "1", subcat_id: "1", name: "Pogácsa", description: "fornetti sajtos pogácsa 100g", rating: 0} as Item,
        {id: "3", cat_id: "1", subcat_id: "2", name: "Ásványvíz", description: "", rating: 0} as Item,
        {id: "4", cat_id: "1", subcat_id: "2", name: "Desztillált víz", description: "", rating: 0} as Item,
        {id: "5", cat_id: "1", subcat_id: "1", name: "Csokis Fánk", description: "csokis fánk 1db", rating: 0} as Item,
        {id: "6", cat_id: "1", subcat_id: "1", name: "Vaníliás Fánk", description: "vaníliás fánk 1db", rating: 0} as Item,
    ],
    shops: [
        {id: "1", name: "Spar", city: "Szeged", street: "Csanádi utca 7"} as Shop,
        {id: "2", name: "Aldi", city: "Szeged", street: "Dugonics tér 8"} as Shop,
        {id: "3", name: "Tesco", city: "Budapest", street: "Teréz krt. 55-57"} as Shop,
    ],
    prices: [
        {shop_id: "1", item_id: "1", price: 250} as Price,
        {shop_id: "1", item_id: "2", price: 150} as Price,
        {shop_id: "2", item_id: "1", price: 230} as Price,
        {shop_id: "2", item_id: "2", price: 160} as Price,
        {shop_id: "1", item_id: "3", price: 65} as Price,
        {shop_id: "1", item_id: "4", price: 130} as Price,
        {shop_id: "2", item_id: "3", price: 70} as Price,
        {shop_id: "2", item_id: "4", price: 140} as Price,
        {shop_id: "1", item_id: "5", price: 250} as Price,
        {shop_id: "3", item_id: "1", price: 200} as Price,
        {shop_id: "3", item_id: "6", price: 200} as Price,
    ],
    users: [
        {id: '0', first_name: 'Tamás', auth_uid: 'AVyMavz6HpRBbY9HsSl2Xf1oiMr2', last_name: 'Kiss', email: 'kisst186@gmail.com', password: 'Test1234', is_suspended: false} as User,
    ]
}
