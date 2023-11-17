/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from 'react'
import { useCart } from '../context/CartContext'
import { useTimeoutFn } from 'react-use'
import Link from 'next/link'

export default function Card({ price }) {
  const { items, addItem } = useCart()
  const [error, setError] = useState('')
  const { product, unit_amount } = price
  const [showDescription, setShowDescription] = useState(false)

  let [isShowing, setIsShowing] = useState(true)
  let [, , resetIsShowing] = useTimeoutFn(() => setIsShowing(true), 500)

  const idSlug = product.metadata?.id

  const addItemToCart = price => {
    const found = items.find(p => p.id === price.id)
    /**
     * Uncomment this if you only want to allow one item per product
     */
    // if (found) {
    //   setError('Item has been added!')
    //   return
    // }
    addItem(price)
  }

  useEffect(() => {
    const timeout = setTimeout(() => setError(''), 3000)
    return () => clearTimeout(timeout)
  }, [error])

  // const descriptionText = product.description

  return (
    <div className='md:hover:bg-gray-50 transition ease-out' key={price.id}>
      <div className='relative p-4 rounded-lg md:border md:border-gray-200 min-h-[12rem] h-full '>
        <div className='relative flex items-start justify-center aspect-w-3 aspect-h-4 h-full md:min-h-[16rem] max-h-[16rem] md:aspect-none overflow-hidden border-b-2'>
          <Link href={`/products/${idSlug}`}>
            <img
              src={product.images[0]}
              alt={product.description}
              className='object-scale-down rounded-sm max-h-96 hover:cursor-pointer hover:opacity-75 transition ease-in-out'
            />
          </Link>
        </div>
        <div className='relative mt-4'>
          <Link href={`/products/${idSlug}`}>
            <h3 className='flex min-h-[3rem] mb-2 justify-center items-start text-center text-md font-medium text-gray-900 hover:cursor-pointer transition ease-in-out hover:opacity-80 hover:underline'>
              {product.name}
            </h3>
          </Link>
          <div className='rounded-lg flex overflow-hidden mb-4'>
            <div
              aria-hidden='true'
              className='bg-gradient-to-t from-black opacity-50'
            />
            <p className='flex w-full relative text-lg text-center justify-center text-black'>
              From
              {(unit_amount / 100).toLocaleString('en-CA', {
                style: 'currency',
                currency: 'CAD'
              })}
            </p>
          </div>
          <div className='mb-4 mt-6 items-end justify-end h-full '>
            <button
              onClick={() => addItemToCart(price)}
              className='relative flex bg-blue-400 border border-transparent py-2 px-8 w-full items-center justify-center text-sm font-medium text-white hover:bg-blue-500 transition ease-in-out'
            >
              Add to Cart<span className='sr-only'>, {product.name}</span>
            </button>
            {error && <p className='text-sm text-red-400'>{error}</p>}
          </div>
          {/* {descriptionText?.length > 75 ? (
            <div>
              {showDescription ? (
                <p className='mt-1 text-sm text-gray-500 min-h-[3rem]'>
                  {descriptionText}
                </p>
              ) : (
                <p className='mt-1 text-sm text-gray-500 min-h-[3rem]'>{`${descriptionText.slice(
                  0,
                  70
                )}...`}</p>
              )}
              <button
                onClick={() => setShowDescription(!showDescription)}
                className='text-black underline text-sm hover:text-gray-600 hover:underline focus:outline-none'
              >
                {showDescription ? 'Show Less' : 'Show More'}
              </button>
            </div>
          ) : (
            <p className='mt-1 text-sm text-gray-500'>{descriptionText}</p>
          )} */}
        </div>
      </div>
    </div>
  )
}
