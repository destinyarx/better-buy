import { Product, UnitType, BestProduct } from '@/types/types'
import { CONVERSION_TABLE } from '@/constants/units'

export function getBestProduct(products: Product[], unit: UnitType) {
    let bestValueProduct: BestProduct|null = null

    for (const product of products) {
        if (!product.quantity || !product.price || !product.unitMeasurement) continue

        // Convert product amount into the default unit
        const normalizedAmount = product.quantity * CONVERSION_TABLE[unit][product.unitMeasurement]
        const pricePerUnit = product.price / normalizedAmount;
    
        if (!bestValueProduct || pricePerUnit < bestValueProduct.price) {
          bestValueProduct = {
            'id': product.id,
            'price': pricePerUnit
          }
        }
      }
    
      return bestValueProduct;
}