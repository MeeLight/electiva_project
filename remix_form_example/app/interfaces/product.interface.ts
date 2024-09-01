export interface ProductFormInterface {
  code: string
  name: string
  description: string
  quantity: number
  stockMin: number
  stockMax: number
  price: string | number
  categoryCode: string
}

export interface ProductFetchInterface {
  nombre: string
  descripcion: string
  cantidad: number
  stockmin: number
  stockmax: number
  precio: number
  codcat: string
}
