import Image from 'next/image'
import LandingHeader from '../components/header/landingHeader'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <main className=''>
        <LandingHeader />
        {/* Feature section */}
        <section className='flex justify-center'>
          <div className='bg-white pt-24 pb-12 sm:py-24'>
            <div className='mx-auto max-w-7xl px-6 lg:px-8'>
              <div className='mx-auto max-w-2xl lg:mx-0'>
                <h2 className='text-4xl font-semibold tracking-tight text-gray-900 sm:text-6xl'>
                  Your One-Stop Shop for Collectibles
                </h2>
                <p className='mt-6 text-lg leading-8 text-gray-600'>
                  At Wholesale Haven, we&apos;re passionate about collectibles,
                  and we know you are too. That&apos;s why we offer a wide range
                  of acrylics for all your favorite collectible items, from
                  Pokemon and Yugioh to cars and more. We also carry video games
                  and other unique collectibles that you won&apos;t find
                  anywhere else. Shop now and discover your next favorite item!
                </p>
              </div>
              <div className='mt-6 '>
                <Link
                  href='/#'
                  className='uppercase font-semibold border-b-2 border-black '
                >
                  Read more
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className='flex justify-center'>
          <div className='bg-white pt-24 pb-12 sm:pt-24'>
            <div className='mx-auto max-w-7xl px-6 lg:px-8'>
              <div className='mx-auto max-w-2xl lg:mx-0'>
                <h2 className='text-4xl font-semibold tracking-tight text-gray-900 sm:text-6xl'>
                  Why Choose Wholesale Haven?
                </h2>
                <p className='mt-6 text-lg leading-8 text-gray-600'>
                  We&apos;re more than just a store - we&apos;re collectors
                  ourselves, and we know what you&apos;re looking for.
                  That&apos;s why we offer a wide selection of high-quality
                  acrylics to protect and display your collectibles. Our prices
                  are unbeatable, and our customer service is second to none.
                  Shop with confidence at Wholesale Haven.
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* Numbered list features */}
        <section className='flex justify-center  py-4'>
          <div className='bg-white'>
            <div className='mx-auto max-w-7xl px-6 lg:px-8 bg-gray-50 py-4 rounded-md'>
              <div className='mx-auto max-w-2xl lg:mx-0'>
                {features.map((feature, index) => (
                  <div
                    className={`my-12 ${
                      feature.border
                        ? 'pb-12 border-b-2 border-gray-200'
                        : 'pb-0'
                    }`}
                    key={index}
                  >
                    <p className='text-blue-500 font-bold text-lg'>
                      {feature.number}
                    </p>
                    <h2 className='text-2xl sm:text-3xl font-semibold tracking-tight text-gray-900 '>
                      {feature.title}
                    </h2>
                    <p className='mt-6 text-lg leading-8 text-gray-600'>
                      {feature.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

const features = [
  {
    number: '01.',
    title: 'Protection for Your Collectibles',
    text: 'Our high-quality acrylics keep your collectibles safe from dust, scratches, and damage, so you can enjoy them for years to come.',
    border: true
  },
  {
    number: '02.',
    title: 'Affordable Prices',
    text: 'We offer unbeatable prices on all our products, so you can grow your collection without breaking the bank.',
    border: true
  },
  {
    number: '03.',
    title: 'Fast Shipping',
    text: "We know you can't wait to get your hands on your new collectibles, so we offer fast and reliable shipping to get your order to you as soon as possible.",
    border: true
  },
  {
    number: '04.',
    title: 'Unique Selection',
    text: "We carry a wide variety of collectibles that you won't find anywhere else, so you can add something truly unique to your collection. ",
    border: false
  }
]
