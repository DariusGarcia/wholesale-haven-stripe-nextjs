/* eslint-disable @next/next/no-img-element */
import { useState, useEffect, Fragment } from 'react'
import { useCart } from '../context/CartContext'
import Image from 'next/image'

import { Transition } from '@headlessui/react'

import { useTimeoutFn } from 'react-use'

export default function Card({ price }) {
  const { items, addItem } = useCart()
  const [error, setError] = useState('')
  const { product, unit_amount } = price
  const [showDescription, setShowDescription] = useState(false)

  let [isShowing, setIsShowing] = useState(true)
  let [, , resetIsShowing] = useTimeoutFn(() => setIsShowing(true), 500)

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
    <div className='hover:bg-gray-50 transition ease-out'>
      <div className='relative p-4 rounded-lg md:border md:border-gray-200 min-h-[12rem] h-full '>
        <div className='relative flex items-start justify-center aspect-w-3 aspect-h-4 h-full md:min-h-[16rem] max-h-[16rem] md:aspect-none overflow-hidden border-b-2'>
          <img
            src={product.images[0]}
            alt={product.description}
            className='object-scale-down rounded-sm max-h-96'
          />
        </div>
        <div className='relative mt-4'>
          <h3 className='flex min-h-[3rem] mb-2 items-start text-md font-medium text-gray-900'>
            {product.name}
          </h3>
          <div className='rounded-lg flex overflow-hidden mb-4'>
            <div
              aria-hidden='true'
              className='bg-gradient-to-t from-black opacity-50'
            />
            <p className='relative text-lg font-semibold text-black'>
              {(unit_amount / 100).toLocaleString('en-CA', {
                style: 'currency',
                currency: 'CAD'
              })}
            </p>
          </div>
          <div className='mb-4 items-end justify-end h-full '>
            <button
              onClick={() => addItemToCart(price)}
              className='relative flex bg-blue-400 border border-transparent rounded-md py-2 px-8 items-center justify-center text-sm font-semibold text-gray-900 hover:text-black hover:bg-blue-300 transition ease-in-out'
            >
              Add to Cart<span className='sr-only'>, {product.name}</span>
            </button>
            {error && <p className='text-sm text-red-400'>{error}</p>}
          </div>
          {descriptionText?.length > 75 ? (
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
          )}
        </div>
      </div>
    </div>
  )
}
