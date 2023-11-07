import { useState, useEffect } from 'react'
import { useCart } from '../context/CartContext'
import Image from 'next/image'

const Card = ({ price }) => {
  const { items, addItem } = useCart()
  const [error, setError] = useState('')
  const { product, unit_amount } = price
  const [showDescription, setShowDescription] = useState(false)

  const addItemToCart = price => {
    const found = items.find(p => p.id === price.id)
    if (found) {
      setError('Item has been added!')
      return
    }
    addItem(price)
  }

  useEffect(() => {
    const timeout = setTimeout(() => setError(''), 3000)
    return () => clearTimeout(timeout)
  }, [error])

  const descriptionText = product.description

  return (
    <div>
      <div className='relative'>
        <div className='relative flex items-start justify-center w-full h-72 rounded-lg overflow-hidden'>
          <img
            src={product.images[0]}
            alt={product.description}
            className='object-scale-down rounded-md '
            layout='fill'
          />
        </div>
        <div className='relative mt-4'>
          <h3 className='text-md font-medium text-gray-900 items-center flex min-h-[3rem]'>
            {product.name}
          </h3>
          <div className='mb-4 items-end justify-end h-full '>
            <button
              onClick={() => addItemToCart(price)}
              className='relative flex bg-sky-500 border border-transparent rounded-md py-2 px-8 items-center justify-center text-sm font-medium text-gray-900 hover:bg-sky-400 transition ease-in-out'
            >
              Add to Cart<span className='sr-only'>, {product.name}</span>
            </button>
            {error && <p className='text-sm text-red-400'>{error}</p>}
          </div>
          {descriptionText?.length > 75 ? (
            <div>
              {showDescription ? (
                <p
                  className='mt-1 text-sm text-gray-500 min-h-[
                  3rem]'
                >
                  {descriptionText}
                </p>
              ) : (
                <p
                  className='mt-1 text-sm text-gray-500 min-h-[
                  3rem]'
                >{`${descriptionText.slice(0, 75)}...`}</p>
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
          )}
        </div>
        <div className='absolute top-0 inset-x-0 h-72 rounded-lg p-4 flex items-end justify-end overflow-hidden'>
          <div
            aria-hidden='true'
            className='absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50'
          />
          <p className='relative text-lg font-semibold text-white'>
            {(unit_amount / 100).toLocaleString('en-CA', {
              style: 'currency',
              currency: 'USD'
            })}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Card
