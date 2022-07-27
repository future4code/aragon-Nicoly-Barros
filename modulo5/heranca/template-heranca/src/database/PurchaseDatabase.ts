import { Purchase } from "../models/Purchase";
import { BaseDatabase } from "./BaseDatabase";

export class PurchaseDatabase extends BaseDatabase {
    public static TABLE_PURCHASES = "Labe_Purchases"
    public static TABLE_USERS = "Labe_Users"
    public static TABLE_PRODUCTS = "Labe_Products"

    public async getUserPurchase(id: string) {
        const [result] = await BaseDatabase
            .connection.raw(`
        SELECT
            ${PurchaseDatabase.TABLE_USERS}.email,
            ${PurchaseDatabase.TABLE_PRODUCTS}.name AS product_name,
            ${PurchaseDatabase.TABLE_PRODUCTS}.price AS product_price,
            ${PurchaseDatabase.TABLE_PURCHASES}.quantity AS product_quantity,
            ${PurchaseDatabase.TABLE_PURCHASES}.total_price
        FROM ${PurchaseDatabase.TABLE_PURCHASES}
        JOIN ${PurchaseDatabase.TABLE_USERS}
        ON ${PurchaseDatabase.TABLE_PURCHASES}.user_id = ${PurchaseDatabase.TABLE_USERS}.id
        JOIN ${PurchaseDatabase.TABLE_PRODUCTS}
        ON ${PurchaseDatabase.TABLE_PURCHASES}.product_id = ${PurchaseDatabase.TABLE_PRODUCTS}.id
        WHERE ${PurchaseDatabase.TABLE_PURCHASES}.user_id = ${id};`)

        return result
    }

    public async createPurchase(purchase: Purchase) {
        await BaseDatabase
            .connection(PurchaseDatabase.TABLE_PURCHASES)
            .insert({
                id: purchase.getId(),
                user_id: purchase.getUserId(),
                product_id: purchase.getProductId(),
                quantity: purchase.getQuantity(),
                total_price: purchase.getTotalPrice()
            })
    }

}
