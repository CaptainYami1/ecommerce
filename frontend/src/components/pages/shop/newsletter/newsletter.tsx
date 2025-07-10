import { CalendarDaysIcon, HandRaisedIcon } from '@heroicons/react/24/outline'

const Newsletter = () => {
  return (
    <div>
    <div className="relative isolate overflow-hidden bg-gray-300 mt-[100px] dark:bg-gray-900 py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
          <div className="max-w-xl lg:max-w-lg">
            <h2 className="text-4xl font-semibold tracking-tight text-black dark:text-white">Subscribe to our newsletter</h2>
            <p className="mt-4 text-lg text-gray-900 dark:text-gray-300">
              Get exclusive offers on your mail and stay updated with the latest trends in fashion. Join our community of fashion enthusiasts and never miss out on the best deals.
            </p>
            <div className="mt-6 flex max-w-md gap-x-4">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                required
                placeholder="Enter your email"
                autoComplete="email"
                className="min-w-0 flex-auto rounded-md dark:bg-white/5 bg-black/5 px-3.5 py-2 text-base dark:text-white text-black outline-1 -outline-offset-1 dark:outline-white/10 outline-black/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-teal-500 sm:text-sm/6"
              />
              <button
                type="submit"
                className="flex-none rounded-md bg-teal-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs dark:hover:bg-teal-400 hover:bg-teal-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500"
              >
                Subscribe
              </button>
            </div>
          </div>
          <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2">
            <dt className="flex flex-col items-start">
              <div className="rounded-md dark:bg-white/5 bg-black/5 p-2 ring-1 dark:ring-white/10 ring-black/10">
                <CalendarDaysIcon aria-hidden="true" className="size-6 text-teal-600" />
              </div>
              <span className="mt-4 text-base font-semibold text-teal-600">Weekly articles</span>
            </dt>
            <dd className="mt-2 text-base/7 dark:text-gray-400 text-gray-600 flex flex-col items-start">
              Non laboris consequat cupidatat laborum magna. Eiusmod non irure cupidatat duis commodo amet.
            </dd>
            <dt className="flex flex-col items-start">
              <div className="rounded-md dark:bg-white/5 bg-black/5 p-2 ring-1 dark:ring-white/10 ring-black/10">
                <HandRaisedIcon aria-hidden="true" className="size-6 text-teal-600" />
              </div>
              <span className="mt-4 text-base font-semibold text-teal-600">No spam</span>
            </dt>
            <dd className="mt-2 text-base/7 dark:text-gray-400 text-gray-600 flex flex-col items-start">
              Officia excepteur ullamco ut sint duis proident non adipisicing. Voluptate incididunt anim.
            </dd>
          </dl>
        </div>
      </div>
      <div aria-hidden="true" className="absolute top-0 left-1/2 -z-10 -translate-x-1/2 blur-3xl xl:-top-6">
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="aspect-1155/678 w-288.75 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
        />
      </div>
    </div>  


    </div>
  )
}

export default Newsletter