/* eslint-disable @next/next/no-img-element */

import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Tab } from '@headlessui/react'
import ProductList from '../../components/productList'
import { client } from '../../sanity/lib/client'
import Stripe from 'stripe'
import { useCart } from '../../context/CartContext'

export default function ProductOverview({ productDetails, matchedProduct }) {
  const { items, addItem } = useCart()
  const router = useRouter()

  useEffect(() => {
    // Check if ID slug is undefined and redirect to 404 page
    if (router.query.id === 'undefined') {
      router.push('/404')
    }
  }, [router.query.id])

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

  return (
    <div className='bg-white'>
      <div className='mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:max-w-7xl lg:px-8'>
        <div className='lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8'>
          {/* Image gallery */}
          <Tab.Group as='div' className='flex flex-col-reverse'>
            {/* Image selector */}
            <div className='mx-auto mt-6 block w-full max-w-2xl lg:max-w-none'>
              <Tab.List className='grid grid-cols-4 gap-6'>
                {productDetails?.images.map((image, index) => (
                  <Tab
                    key={index}
                    className='relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4'
                  >
                    {({ selected }) => (
                      <>
                        <span className='sr-only'>{image.name}</span>
                        <span className='absolute inset-0 overflow-hidden rounded-md'>
                          <img
                            src={image.asset.url}
                            alt=''
                            className='h-full  w-auto object-cover object-center'
                          />
                        </span>
                        <span
                          className={classNames(
                            selected ? 'ring-sky-500' : 'ring-transparent',
                            'pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2'
                          )}
                          aria-hidden='true'
                        />
                      </>
                    )}
                  </Tab>
                ))}
              </Tab.List>
            </div>

            <Tab.Panels className='aspect-h-1 aspect-w-1 w-full'>
              {productDetails?.images.map((image, index) => (
                <Tab.Panel key={index}>
                  <img
                    src={image.asset.url}
                    alt={image.alt}
                    className='h-full w-auto object-cover object-center sm:rounded-lg'
                  />
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>

          {/* Product info */}
          <div className='mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0'>
            <h1 className='text-3xl font-bold tracking-tight text-gray-900'>
              {matchedProduct?.product?.name}
            </h1>

            <div className='mt-3'>
              <h2 className='sr-only'>Product information</h2>
              <p className='text-3xl tracking-tight text-gray-900'>
                {(matchedProduct?.unit_amount / 100).toLocaleString('en-CA', {
                  style: 'currency',
                  currency: 'CAD'
                })}
              </p>
            </div>

            <div className='mt-6'>
              <h3 className='sr-only'>Description</h3>
              <div className='space-y-6 text-base text-gray-700'>
                <p>{matchedProduct?.product?.description}</p>
              </div>
            </div>
            <form className='mt-6'>
              <div className='mt-10 flex'>
                <button
                  type='submit'
                  onClick={() => addItemToCart(matchedProduct)}
                  className='flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-sky-600 px-8 py-3 text-base font-medium text-white hover:bg-sky-700 focus:outline-none focus:ring-2 transition ease-in-out focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full'
                >
                  Add to bag
                </button>
              </div>
            </form>

            <section aria-labelledby='details-heading' className='mt-12'>
              <h2 id='details-heading' className='sr-only'>
                Additional details
              </h2>
            </section>
          </div>
        </div>
      </div>
      <ProductList />
    </div>
  )
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export async function getServerSideProps(context) {
  // Replace $productId with the actual ID you're searching for
  const productId = context.params.id
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

  // fetch Stripe product where ID matches slug
  const prices = await stripe.prices.list({
    active: true,
    expand: ['data.product']
  })

  // Find the product with the matching 'ID' metatag
  const matchedProduct = prices.data.find(price => {
    return price.product.metadata.id === productId
  })

  // Fetch product details with associated images based on id (slug)
  const productDetails = await client.fetch(
    `
    *[_type == 'product' && id == $productId][0]{
      _id,
      title,
      id,
      features,
      'images': images[]{
        _id,
        asset->{url, metadata}
      }
    }
  `,
    { productId }
  )

  // Pass the product details as props to the component
  return {
    props: {
      productDetails,
      matchedProduct: matchedProduct || null
    }
  }
}
