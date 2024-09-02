// Remix
import { useEffect, useState, type FormEvent, type ChangeEvent } from 'react'
import { useSearchParams, Form } from '@remix-run/react'

// Packages
import { Toaster, toast } from 'sonner'

// Interfaces
import type {
  ProductFetchInterface,
  ProductFormInterface
} from '~/interfaces/product.interface'

import type { CategoryFetchInterface } from '~/interfaces/category.interface'

// Icons
import { UpdateIcon } from '~/icons'

// Helpers
import { isDecimal } from '~/helpers/isDecimal'

// Styles
import styles from '~/styles/index.module.css'

export default function Index() {
  const FIVE_SECONDS = 5000
  const [searchParams] = useSearchParams()

  const defaultValuesOfFields: ProductFormInterface = {
    code: searchParams.get('codigo')! || '',
    name: '',
    description: '',
    quantity: 0,
    stockMin: 0,
    stockMax: 0,
    price: 0,
    categoryCode: ''
  }

  const [state, setState] = useState<ProductFormInterface>({
    ...defaultValuesOfFields
  })

  const [categories, setCategories] = useState<CategoryFetchInterface[]>([])

  // Handlers
  const handleField = ({
    currentTarget
  }: ChangeEvent<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >) => {
    setState({
      ...state,
      [currentTarget.name]: currentTarget.value
    })
  }

  // Helpers
  const getFormattedPrice = (price: number | string): number | string => {
    let formattedPrice: number | string = +price || 0

    if (isNaN(formattedPrice)) {
      throw new Error('Oops! The price must be a number.')
    }

    // Checking if it's decimal
    return isDecimal(formattedPrice) ? formattedPrice : `${formattedPrice}.00`
  }

  // Queries
  const fetchProduct = async () => {
    try {
      const res = await fetch(
        `http://localhost:8080/api/v1/products?codigo=${state.code}`
      )

      const products: ProductFetchInterface[] = await res.json()
      const data = products[0]
      let price: string | number = 0

      if (data.precio!) {
        price = getFormattedPrice(data.precio)
      }

      setState({
        ...state,
        name: data.nombre || '',
        description: data.descripcion || '',
        quantity: data.cantidad || 0,
        stockMin: data.stockmin || 0,
        stockMax: data.stockmax || 0,
        price: price,
        categoryCode: data.codcat || ''
      })
    } catch (error) {
      console.error(error)
    }
  }

  const fetchCategories = async () => {
    try {
      const res = await fetch(`http://localhost:8080/api/v1/categories`)
      const data: CategoryFetchInterface[] = await res.json()

      setCategories(data)
    } catch (error) {
      console.error(error)
    }
  }

  // Initial
  useEffect(() => {
    const submitBtn = document.querySelector('button[type="submit"]')
    submitBtn?.classList.add('button')

    if (state.code === '') {
      document.querySelector('form')!.style.display = 'none'
      const ONE_MINUTE = 60000

      toast.error('Oops! The parameter "codigo" was expected with a value.', {
        duration: ONE_MINUTE
      })
    }

    if (searchParams.get('codigo') !== '') {
      fetchProduct()
      fetchCategories()
    }
  }, [])

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    let price: string | number = 0

    if (state.price!) {
      price = +getFormattedPrice(+state.price!)
    }

    const productOfForm: ProductFormInterface = {
      code: state.code,
      name: state.name,
      description: state.description,
      quantity: +state.quantity,
      stockMin: +state.stockMin,
      stockMax: +state.stockMax,
      price: price,
      categoryCode: state.categoryCode
    }

    try {
      const res = await fetch(
        `http://localhost:8080/api/v1/products?codigo=${state.code}`,
        {
          method: 'PATCH',
          body: JSON.stringify(productOfForm),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }
        }
      )

      const dataOfServer: ProductFetchInterface = await res.json()

      toast.success('The product has been successfully updated!', {
        duration: FIVE_SECONDS
      })

      const submitBtn = document.querySelector('button[type="submit"]')
      submitBtn?.classList.remove('button')
      submitBtn?.classList.add('buttonDisabled')
      submitBtn?.setAttribute('disabled', '')

      setTimeout(() => {
        submitBtn?.removeAttribute('disabled')
        submitBtn?.classList.remove('buttonDisabled')
        submitBtn?.classList.add('button')
      }, FIVE_SECONDS)

      setState({
        ...state,
        name: dataOfServer.nombre || '',
        description: dataOfServer.descripcion || '',
        quantity: dataOfServer.cantidad || 0,
        stockMin: dataOfServer.stockmin || 0,
        stockMax: dataOfServer.stockmax || 0,
        price: dataOfServer.precio || 0,
        categoryCode: dataOfServer.codcat || ''
      })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <main className={styles.main}>
      <Form
        className={styles.form}
        onSubmit={onSubmit}
        autoComplete='off'
        navigate={false}
      >
        <h3 className={styles.formTitle}>Update Product</h3>

        <div data-title='Product Code' className={styles.field}>
          <input
            type='text'
            name='product_code'
            className={styles.input}
            id='product_code'
            maxLength={8}
            value={state.code}
            disabled
            required
          />
          <label
            htmlFor='product_code'
            className={styles.label}
            data-title='Code'
          ></label>
        </div>

        <div data-title='Product Name' className={styles.field}>
          <input
            type='text'
            name='name'
            className={styles.input}
            id='product_name'
            value={state.name}
            onChange={handleField}
            maxLength={100}
            required
          />
          <label
            htmlFor='name'
            className={styles.label}
            data-title='Name'
          ></label>
        </div>

        <div data-title='Product Description' className={styles.field}>
          <textarea
            className={styles.input}
            name='description'
            id='product_description'
            onChange={handleField}
            value={state.description}
            maxLength={255}
            required
          ></textarea>
          <label
            htmlFor='product_description'
            className={styles.label}
            data-title='Description'
          ></label>
        </div>

        <div data-title='Quantity Group' className={styles.inputsGroup}>
          <div data-title='Quantity' className={styles.field}>
            <input
              type='number'
              name='quantity'
              className={styles.input}
              id='product_quantity'
              onChange={handleField}
              value={state.quantity}
              min={0}
              max={100}
              required
            />
            <label
              htmlFor='product_quantity'
              className={styles.label}
              data-title='Quantity'
            ></label>
          </div>

          <div data-title='Stock Min' className={styles.field}>
            <input
              type='number'
              name='stockMin'
              className={styles.input}
              id='product_stockmin'
              onChange={handleField}
              value={state.stockMin}
              min={0}
              max={100}
              required
            />
            <label
              htmlFor='product_stockmin'
              className={styles.label}
              data-title='Stock Min'
            ></label>
          </div>

          <div data-title='Stock Max' className={styles.field}>
            <input
              type='number'
              name='stockMax'
              className={styles.input}
              id='product_stockmax'
              onChange={handleField}
              value={state.stockMax}
              min={0}
              max={100}
              required
            />
            <label
              htmlFor='product_stockmax'
              className={styles.label}
              data-title='Stock Max'
            ></label>
          </div>
        </div>

        <div data-title='Product Price' className={styles.field}>
          <input
            type='text'
            name='price'
            className={styles.input}
            id='product_price'
            onChange={handleField}
            value={state.price}
            maxLength={10}
            required
          />
          <label
            htmlFor='product_price'
            className={styles.label}
            data-title='$ Price'
          ></label>
        </div>

        <div data-title='Product Category' className={styles.field}>
          <select
            name='categoryCode'
            id='product_category'
            onChange={handleField}
            value={state.categoryCode}
            className={styles.input}
            required
          >
            <option hidden>Select a category</option>
            {categories.map(
              ({ coocat, descripcion }: CategoryFetchInterface, index) => (
                <option key={index} value={coocat}>
                  {descripcion}
                </option>
              )
            )}
          </select>
          <label
            htmlFor='product_category'
            className={styles.label}
            data-title='Category'
          ></label>
        </div>

        <button type='submit'>
          <UpdateIcon height='25' width='25' fill='rgba(255, 255, 255, 0.8)' />
          Update
        </button>
      </Form>

      <Toaster position='bottom-right' />
    </main>
  )
}
