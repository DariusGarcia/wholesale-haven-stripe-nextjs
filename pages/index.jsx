import LandingHeader from '../components/header/landingHeader'
import Features from '../components/features'
import Link from 'next/link'
import Stripe from 'stripe'
import Card from '../components/Card'
import { useState, useRef } from 'react'
import { useCart } from '../context/CartContext'
import { ShoppingBagIcon } from '@heroicons/react/24/outline'
import ShoppingCartSlideOver from '../components/ShoppingCart'
import { motion as m, AnimatePresence, useAnimation } from 'framer-motion'

export default function Home({ prices: { data = [], has_more } }) {
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

  const targetRef = useRef(null)
  const secondaryFeaturesControls = useAnimation()

  return (
    <main className=''>
      <LandingHeader
        scrollToTarget={() =>
          targetRef.current.scrollIntoView({ behavior: 'smooth' })
        }
      />
      {/* Feature section */}
      {/* <Features /> */}
      {/* Products */}
      <section>
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
          </div>
        </div>
        {/* Products display */}
        <div className='relative bg-white my-12'>
          <div className='max-w-2xl mx-auto px-2 md:p-4 sm:p-8 lg:max-w-7xl'>
            <h2
              id='shop-products'
              className='md:mb-12 pl-4 md:pl-0 text-2xl font-bold text-gray-900 '
              ref={targetRef}
            >
              Shop products
            </h2>
            <AnimatePresence>
              <m.div
                initial={{ opacity: 0, y: 200 }}
                animate={secondaryFeaturesControls}
                onViewportEnter={() => {
                  secondaryFeaturesControls.start({ opacity: 1, y: 0 })
                }}
                transition={{
                  type: 'spring',
                  bounce: 0.4,
                  duration: 1,
                  delay: 0.2
                }}
                className='md:mt-8 grid grid-cols-2 gap-y-12 sm:gap-x-6
                lg:grid-cols-4 xl:gap-x-8'
              >
                {products.map(price => (
                  <Card key={price.id} price={price} />
                ))}
              </m.div>
            </AnimatePresence>
            <button
              onClick={loadMore}
              disabled={!hasMore}
              className='md:mt-10 mt-24 w-full bg-sky-100 rounded-md py-2 md:px-8 text-sm font-medium text-sky-900 hover:bg-sky-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-sky-100'
            >
              Load more
            </button>
          </div>
        </div>
      </section>
    </main>
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
