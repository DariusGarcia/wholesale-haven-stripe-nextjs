/* eslint-disable @next/next/no-img-element */
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Disclosure, RadioGroup, Tab } from '@headlessui/react'
import { StarIcon } from '@heroicons/react/20/solid'
import { HeartIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/outline'
import ProductList from '../../components/productList'
import { client } from '../../sanity/lib/client'
import Stripe from 'stripe'

export default function ProductOverview({ productDetails, matchedProduct }) {
  // const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const router = useRouter()

  useEffect(() => {
    // Check if slug is undefined and redirect to 404 page
    if (router.query.slug === '/undefined') {
      router.push('/404')
    }
  }, [router.query.slug])

  console.log({ matchedProduct: matchedProduct })
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

            <section aria-labelledby='details-heading' className='mt-12'>
              <h2 id='details-heading' className='sr-only'>
                Additional details
              </h2>

              <div className='divide-y divide-gray-200 border-t'>
                {product.details.map(detail => (
                  <Disclosure as='div' key={detail.name}>
                    {({ open }) => (
                      <>
                        <h3 className='hover:bg-gray-50 px-2 transition ease-in-out'>
                          <Disclosure.Button className='group relative flex w-full items-center justify-between py-6 text-left'>
                            <span
                              className={classNames(
                                open ? 'text-sky-600' : 'text-gray-900',
                                'text-sm font-medium'
                              )}
                            >
                              {detail.name}
                            </span>
                            <span className='ml-6 flex items-center'>
                              {open ? (
                                <MinusIcon
                                  className='block h-6 w-6 text-sky-400 group-hover:text-sky-500'
                                  aria-hidden='true'
                                />
                              ) : (
                                <PlusIcon
                                  className='block h-6 w-6 text-gray-400 group-hover:text-gray-500'
                                  aria-hidden='true'
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel
                          as='div'
                          className='prose prose-sm pb-6'
                        >
                          <ul role='list'>
                            {productDetails?.features?.map(item => (
                              <li key={item._key}>{item.description}</li>
                            ))}
                          </ul>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
      <ProductList />
    </div>
  )
}

const product = {
  name: 'Acrylic Display Case',
  price: '$50.00',
  rating: 4,
  images: [
    {
      id: 1,
      name: 'Angled view',
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-03-product-01.jpg',
      alt: 'Angled front view with bag zipped and handles upright.'
    },
    {
      id: 1,
      name: 'Angled view',
      src: '/placeholder.png',
      alt: 'Angled front view with bag zipped and handles upright.'
    },
    {
      id: 1,
      name: 'Angled view',
      src: '/placeholder.png',
      alt: 'Angled front view with bag zipped and handles upright.'
    }
    // More images...
  ],
  colors: [
    {
      name: 'Washed Black',
      bgColor: 'bg-gray-700',
      selectedColor: 'ring-gray-700'
    },
    { name: 'White', bgColor: 'bg-white', selectedColor: 'ring-gray-400' },
    {
      name: 'Washed Gray',
      bgColor: 'bg-gray-500',
      selectedColor: 'ring-gray-500'
    }
  ],
  description: `
      Fringilla phasellus faucibus scelerisque eleifend donec pretium vulputate sapien nec. Duis tristique sollicitudin nibh sit amet commodo. Elit ut aliquam purus sit. Vitae congue mauris rhoncus aenean vel elit scelerisque mauris. Sit amet luctus venenatis lectus magna fringilla urna porttitor rhoncus.
    `,
  details: [
    {
      name: 'Features',
      items: [
        'Amet facilisis magna etiam tempor orci.',
        'Amet facilisis magna etiam tempor orci.',
        'Amet facilisis magna etiam tempor orci.',
        'Amet facilisis magna etiam tempor orci.',
        'Amet facilisis magna etiam tempor orci.',
        'Amet facilisis magna etiam tempor orci.',
        'Amet facilisis magna etiam tempor orci.'
      ]
    }
    // More sections...
  ]
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
