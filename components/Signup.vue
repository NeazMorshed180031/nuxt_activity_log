<template>
  <section class="bg-gray-50 dark:bg-gray-900">
    <div class="flex flex-col items-center justify-center mx-auto mt-5">
      <div
        class="w-full bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
      >
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1
            class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
          >
            Registration
          </h1>
          <form
            class="space-y-4 md:space-y-6"
            action="#"
            @submit.prevent="submit"
          >
            <div>
              <label
                for="email"
                class="block mb-2 text-sm font-bold text-gray-900 dark:text-white"
              >
                Your Name
              </label>
              <input
                v-model="names"
                type="text"
                name="name"
                id="name"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Your Name"
                required=""
                autocomplete=""
              />
            </div>

            <div>
              <label
                for="email"
                class="block mb-2 text-sm font-bold text-gray-900 dark:text-white"
              >
                Your email
              </label>
              <input
                v-model="email"
                type="email"
                name="email"
                id="email"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@company.com"
                required=""
                autocomplete=""
              />
            </div>

            <div>
              <label
                for="password"
                class="block mb-2 text-sm font-bold text-gray-900 dark:text-white"
              >
                Mobile Number
              </label>
              <input
                v-model="phone"
                type="number"
                name="number"
                id="Mobile Number"
                placeholder="Your Mobile Number"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
                autocomplete=""
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
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
                autocomplete=""
              />
            </div>

            <div>
              <label
                for="password"
                class="block mb-2 text-sm font-bold text-gray-900 dark:text-white"
              >
                Confirm Password
              </label>
              <input
                v-model="confirmpassword"
                type="password"
                name="confirm password"
                id="confirm password"
                placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
                autocomplete=""
              />
            </div>

            <!-- upload Image -->
            <div class="container mx-auto items-center">
              <div
                class="max-w-sm mx-auto bg-white rounded-lg shadow-md overflow-hidden items-center"
              >
                <div
                  id="image-preview"
                  class="max-w-sm mb-4 bg-gray-100 border-dashed border-2 border-gray-400 rounded-lg items-center mx-auto text-center cursor-pointer"
                >
                  <input
                    @change="uploadimg"
                    id="upload"
                    type="file"
                    class="hidden"
                    accept="image/*"
                  />
                  <label for="upload" class="cursor-pointer">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-8 h-8 text-gray-700 mx-auto mb-4"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                      />
                    </svg>
                    <h5
                      class="mb-2 text-xl font-bold tracking-tight text-gray-700"
                    >
                      Upload picture
                    </h5>
                    <p class="font-normal text-sm text-gray-400 md:px-6">
                      Choose photo size should be less than
                      <b class="text-gray-600">2mb</b>
                    </p>
                    <p class="font-normal text-sm text-gray-400 md:px-6">
                      and should be in
                      <b class="text-gray-600">JPG, PNG, or GIF</b>
                      format.
                    </p>
                    <span
                      id="filename"
                      class="text-gray-500 bg-gray-200 z-50"
                    ></span>
                  </label>
                </div>
              </div>
            </div>

            <div class="flex items-center justify-between">
              <div class="flex items-start">
                <div class="flex items-center h-5">
                  <input
                    id="remember"
                    aria-describedby="remember"
                    type="checkbox"
                    class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    required=""
                  />
                </div>
                <div class="ml-3 text-sm">
                  <label
                    for="remember"
                    class="text-gray-500 dark:text-gray-300"
                  >
                    I agree with the terms and condition
                  </label>
                </div>
              </div>
            </div>
            <button
              type="submit"
              class="w-full text-white bg-blue-800 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Sign in
            </button>
            <div class="text-center text-red-600 font-bold">
              {{ msg }}
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import axios from 'axios'
const names = ref('')
const email = ref('')
const password = ref('')
const confirmpassword = ref('')
const phone = ref('')
const img = ref('')
const err = ref('')
const msg = ref('')
const router = useRouter()

function uploadimg(e) {
  img.value = e.target.files[0]
}

async function submit() {
  let data = new FormData()
  data.append('name', names.value)
  data.append('email', email.value)
  data.append('password', password.value)
  data.append('passwordConfirmation', confirmpassword.value)
  data.append('phone', phone.value)
  data.append('profile_pic', img.value)
  const configs = useRuntimeConfig()
  const URL = `${config.public.BASE_URLS}api/auth/register`
  let config = {
    header: {
      'Content-Type': 'image/.jpg',
    },
  }

  let result = axios
    .post(URL, data, config)
    .then((response) => {
      msg.value = response.data.message
      router.push('/')
    })
    .catch((response) => {
      if (response.response.data.errors[0].msg) {
        msg.value = response.response.data.errors[0].msg
      }
    })
}

onMounted(() => {
  const uploadInput = document.getElementById('upload')
  const filenameLabel = document.getElementById('filename')
  const imagePreview = document.getElementById('image-preview')

  // Check if the event listener has been added before
  let isEventListenerAdded = false

  uploadInput.addEventListener('change', (event) => {
    const file = event.target.files[0]

    if (file) {
      filenameLabel.textContent = file.name

      const reader = new FileReader()
      reader.onload = (e) => {
        imagePreview.innerHTML = `<img src="${e.target.result}" class="max-h-48 rounded-lg mx-auto" alt="Image preview" />`
        imagePreview.classList.remove(
          'border-dashed',
          'border-2',
          'border-gray-400',
        )

        // Add event listener for image preview only once
        if (!isEventListenerAdded) {
          imagePreview.addEventListener('click', () => {
            uploadInput.click()
          })

          isEventListenerAdded = true
        }
      }
      reader.readAsDataURL(file)
    } else {
      filenameLabel.textContent = ''
      imagePreview.innerHTML = `<div class="bg-gray-200  rounded-lg flex items-center justify-center text-gray-500">No image preview</div>`
      imagePreview.classList.add('border-dashed', 'border-2', 'border-gray-400')

      // Remove the event listener when there's no image
      imagePreview.removeEventListener('click', () => {
        uploadInput.click()
      })

      isEventListenerAdded = false
    }
  })

  uploadInput.addEventListener('click', (event) => {
    event.stopPropagation()
  })
})
</script>
