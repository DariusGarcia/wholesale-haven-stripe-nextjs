import Link from 'next/link'
import Image from 'next/image'

export default function LandingHeader({ scrollToTarget }) {
  return (
    <div className='relative isolate overflow-hidden pt-14'>
      <img
        src='https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2830&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply'
        alt=''
        className='absolute inset-0 -z-10 h-full w-full object-cover'
        layout='fill'
      />
      <div
        className='absolute inset-x-0 top-0 z-0 transform-gpu overflow-hidden blur-3xl sm:-top-80'
        aria-hidden='true'
      >
        <div
          className='relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#53c208] to-[#3275cb] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]'
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'
          }}
        />
      </div>
      <div className='mx-auto max-w-2xl py-12 sm:py-24'>
        <div className='hidden sm:mb-8 sm:flex sm:justify-center'>
          <div className='relative rounded-full px-3 py-1 text-sm leading-6 text-gray-400 ring-1 ring-white/10 hover:ring-white/20'>
            Browse our most recent released products.{' '}
            <button
              onClick={scrollToTarget}
              href='shop-products'
              className='font-semibold text-white'
            >
              <span className='absolute inset-0' aria-hidden='true' />
              See more <span aria-hidden='true'>&rarr;</span>
            </button>
          </div>
        </div>
        <div className='text-center'>
          <h1 className='text-4xl font-bold tracking-tight text-white sm:text-6xl'>
            Welcome to Wholesale Haven!
          </h1>
          <p className='mt-6 px-3 sm:px-0 text-lg leading-8 text-gray-300'>
            Discover our extensive selection of premium acrylic displays for
            collectibles, including iconic brands such as Pokemon, Yugioh,
            Digimon, automobiles, and much more. Explore our diverse catalog,
            featuring video games and a wide array of collectible treasures.
          </p>
          <div className=' mt-10 z-20 flex items-center justify-center gap-x-6'>
            <button onClick={scrollToTarget} href='shop-products'>
              <span className='rounded-sm cursor-pointer bg-blue-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400'>
                Shop now
              </span>
            </button>
          </div>
        </div>
      </div>
      <div
        className='absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]'
        aria-hidden='true'
      >
        <div
          className='relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]'
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'
          }}
        />
      </div>
    </div>
  )
}
