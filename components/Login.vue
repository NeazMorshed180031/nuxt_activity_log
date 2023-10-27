<template>
  <section class="bg-gray-50 dark:bg-gray-900 py-10">
    <div
      class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
    >
      <div
        class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-b"
      >
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1
            class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
          >
            Login to Your account
          </h1>
          <form
            class="space-y-4 md:space-y-6"
            action="#"
            @submit.prevent="submit"
          >
            <div>
              <label
                for="email"
                class="block mb-2 text-sm text-gray-900 font-bold dark:text-white"
              >
                Your email
              </label>
              <input
                v-model="email"
                type="email"
                class="bg-gray-50 border border-blue-800 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                placeholder="name@company.com"
                required
              />
            </div>
            <div>
              <label
                for="password"
                class="block mb-2 text-sm font-bold text-gray-900 dark:text-white"
              >
                Password
              </label>
              <input
                v-model="password"
                id="password"
                placeholder="••••••••"
                class="bg-gray-50 border border-blue-800 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                required
              />
              <div class="text-center text-red-600 font-bold">
                {{ msg }}
              </div>
            </div>

            <button
              type="submit"
              class="w-full text-white bg-blue-800 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Log In
            </button>
            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
              <a
                href="#"
                class="font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                Forgot Password?
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
const email = ref('superadmin@gmail.com')
const password = ref('12345678')
let result
const msg = ref('')
const config = useRuntimeConfig()

const router = useRouter()

function validation() {
  let token = localStorage.getItem('TOKEN')

  if (token === null) {
    router.push('/')
  } else {
    let exp = JSON.parse(atob(token.split('.')[1])).exp * 1000

    if (exp > Date.now()) {
      router.push('/users')
    } else {
      router.push('/')
    }
  }
}

async function submit() {
  let data = new FormData()
  data.append('email', email.value)
  data.append('password', password.value)
  result = await fetch(`${config.public.BASE_URLS}api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },

    body: JSON.stringify({
      email: email.value,
      password: password.value,
    }),
  }).then((res) => res.json())

  if (result.message) {
    localStorage.setItem('TOKEN', result.access_token)
    router.push('/users')
  }

  if (result.msg) {
    msg.value = result.msg
  }
}

onMounted(() => {
  validation()
})
</script>
