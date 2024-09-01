// Remix
import { type FormEvent, type ChangeEvent } from 'react'
import { Form } from '@remix-run/react'

// Icons
import { UpdateIcon } from '~/icons'

// Styles
import styles from '~/styles/index.module.css'

export default function Index() {
  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    let price: number | string = +formData.get('product_price')!

    const productCodeEl = document.querySelector(
      'input[name="product_code"]'
    ) as HTMLInputElement

    if (isNaN(price)) throw new Error('Oops! The price must be a number.')

    // Checking if it's decimal
    price = price % 1 !== 0 ? price : `${price},00`

    const productOfForm = {
      code: productCodeEl.value,
      name: formData.get('product_name'),
      description: formData.get('product_description'),
      quantity: formData.get('product_quantity'),
      stockMin: formData.get('product_stockmin'),
      stockMax: formData.get('product_stockmax'),
      price: price
    }

    try {
      const res = await fetch('http://localhost:8080/api/v1/categories')
      const dataOfServer = await res.json()

      console.log(productOfForm)
      console.log({ dataOfServer })

      document.querySelector('form')?.reset()
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

        <div data-title='Product ID' className={styles.field}>
          <input
            type='text'
            name='product_code'
            className={styles.input}
            id='product_code'
            maxLength={100}
            value='PR000000'
            disabled
            required
          />
          <label
            htmlFor='product_code'
            className={styles.label}
            data-title='ID'
          ></label>
        </div>

        <div data-title='Product Name' className={styles.field}>
          <input
            type='text'
            name='product_name'
            className={styles.input}
            id='product_name'
            maxLength={100}
            required
          />
          <label
            htmlFor='product_name'
            className={styles.label}
            data-title='Name'
          ></label>
        </div>

        <div data-title='Product Description' className={styles.field}>
          <textarea
            className={styles.input}
            name='product_description'
            id='product_description'
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
              name='product_quantity'
              className={styles.input}
              id='product_quantity'
              min={1}
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
              name='product_stockmin'
              className={styles.input}
              id='product_stockmin'
              min={1}
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
              name='product_stockmax'
              className={styles.input}
              id='product_stockmax'
              min={1}
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
            name='product_price'
            className={styles.input}
            id='product_price'
            maxLength={10}
            required
          />
          <label
            htmlFor='product_price'
            className={styles.label}
            data-title='$ Price'
          ></label>
        </div>

        <button type='submit' className={styles.button}>
          <UpdateIcon height='25' width='25' fill='rgba(255, 255, 255, 0.8)' />
          Update
        </button>
      </Form>
    </main>
  )
}
