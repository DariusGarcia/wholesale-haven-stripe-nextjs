import Stripe from 'stripe'
import Card from '../../components/Card'
import { useState } from 'react'
import { useCart } from '../../context/CartContext'
import { ShoppingBagIcon } from '@heroicons/react/24/outline'

import ShoppingCartSlideOver from '../../components/ShoppingCart'

const HomePage = ({ prices: { data = [], has_more } }) => {
  const [products, setProducts] = useState(data)
  const [hasMore, setHasMore] = useState(has_more)

  const { items } = useCart()
  const [open, setOpen] = useState(false)

  const [cartSliderIsOpen, setCartSliderIsOpen] = useState(false)

  const lastProductId = products[products.length - 1]?.id

  const loadMore = async () => {
    if (!hasMore || !lastProductId) return

    try {
      const { prices } = await fetch(
        `/api/stripe/prices?starting_after=${lastProductId}`
      ).then(res => res.json())
      if (prices.data) {
        setProducts(products => [...products, ...prices.data])
        setHasMore(prices.has_more)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {' '}
      <div className='z-50 fixed bottom-10 right-5 '>
        <div className=' bg-sky-200 hover:bg-sky-100 transition ease-in-out   items-start flex justify-center rounded-full'>
          <ShoppingCartSlideOver
            open={cartSliderIsOpen}
            setCartSliderIsOpen={setCartSliderIsOpen}
          />

          {!cartSliderIsOpen && (
            <div className='flow-root p-2'>
              <div
                className='group p-2 flex items-center cursor-pointer'
                onClick={() => setCartSliderIsOpen(open => !open)}
              >
                <ShoppingBagIcon
                  className='flex-shrink-0 h-5 w-5 text-sky-700 group-hover:text-sky-800'
                  aria-hidden='true'
                />
                <span className='ml-2 text-sm font-medium text-sky-700 group-hover:text-sky-800'>
                  ( {items.length} )
                </span>
                <span className='sr-only'>items in cart, view bag</span>
              </div>
            </div>
          )}
        </div>{' '}
      </div>
      <div className='relative bg-white'>
        <div className='max-w-2xl mx-auto p-4 sm:p-8 lg:max-w-7xl'>
          <h2 className='text-2xl font-bold text-gray-900'>All Products</h2>

          <div className='mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8'>
            {products.map(price => (
              <Card key={price.id} price={price} />
            ))}
          </div>

          <button
            onClick={loadMore}
            disabled={!hasMore}
            className='mt-10 w-full bg-sky-100 rounded-md py-2 px-8 text-sm font-medium text-sky-900 hover:bg-sky-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-sky-100'
          >
            Load more
          </button>
        </div>{' '}
      </div>
    </>
  )
}

export async function getServerSideProps() {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
  const prices = await stripe.prices.list({
    active: true,
    limit: 8,
    expand: ['data.product']
  })

  return {
    props: {
      prices
    }
  }
}

export default HomePage
