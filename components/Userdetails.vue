<template>
  <div class="flex flex-col items-center p-4 sm:flex-row justify-around gap-4">
    <button
      class="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded btn"
    >
      <NuxtLink to="/users">User Information</NuxtLink>
    </button>
    <button
      class="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      <NuxtLink to="/activity">User Activity Log</NuxtLink>
    </button>
    <button
      class="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      <NuxtLink to="/activityreport">User Activity Report</NuxtLink>
    </button>
  </div>

  <div>
    <form @submit.prevent="getsearcheduserdetails">
      <label
        for="default-search"
        class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      >
        Search
      </label>
      <div class="relative">
        <div
          class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
        ></div>
        <div class="flex justify-center sm:justify-end mr-1">
          <input
            v-model="searchdata"
            type="search"
            class="block w-25 p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search.."
          />
          <button
            type="submit"
            class="text-white absolute right-20 mr-15 sm:right-2.5 bottom-2.5 bg-blue-800 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search
          </button>
        </div>
      </div>
    </form>
  </div>

  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <h1 class="font-bold text-center p-1 underline text-slate-800">
      User Information
    </h1>
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead
        class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
      >
        <tr>
          <th scope="col" class="px-6 py-3">
            Image
          </th>
          <th scope="col" class="px-6 py-3">
            Name
          </th>
          <th scope="col" class="px-6 py-3">
            Email
          </th>
          <th scope="col" class="px-6 py-3">
            Phone
          </th>
          <th scope="col" class="px-6 py-3">
            Role
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="odd:bg-white even:bg-slate-50 border-b dark:bg-gray-900 dark:border-gray-700 hover:bg-slate-200 cursor-pointer"
          v-for="value in tables"
        >
          <th
            scope="row"
            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black"
            id="uud"
          >
            <img v-bind:src="url + value.profilePic" width="50" height="50" />
          </th>

          <th
            scope="row"
            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black"
            id="uud"
          >
            {{ value.name }}
          </th>
          <td class="px-6 py-4 text-black">
            {{ value.email }}
          </td>
          <td class="px-6 py-4 text-black">
            {{ value.phone }}
          </td>
          <td class="px-6 py-4 text-black">
            {{ value.role }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.router-link-exact-active {
  color: #fcfcfc;
  border-bottom: 1px solid rgb(253, 253, 253);
}
</style>

<script setup>
const tables = ref([])
const values = ref([])
const router = useRouter()
const searchdata = ref('')

const config = useRuntimeConfig()
const url = config.public.BASE_URL

function validation() {
  let token = localStorage.getItem('TOKEN')
  let role = JSON.parse(atob(token.split('.')[1])).role
  if (token === null) {
    router.push('/')
  } else {
    let exp = JSON.parse(atob(token.split('.')[1])).exp * 1000
    console.log(exp)
    if (exp > Date.now()) {
      console.log('fire1')
      if (role == 'user') {
        router.push('/activity')
      }
    } else {
      console.log('fire2')
      router.push('/')
    }
  }
}

async function getuserdetails() {
  console.log('Helloooooooooooo')

  // active:bg-violet-700

  const token = localStorage.getItem('TOKEN')
  let result = await fetch(`${config.public.BASE_URLS}api/users`, {
    method: 'GET',
    // headers: { 'bearer': 'application/json' },
    headers: {
      Authorization: 'Bearer ' + token,
    },
  }).then((res) => res.json())
  tables.value = result.data
  console.log(result.data)
}

async function getsearcheduserdetails() {
  console.log('Helloooooooooooo')
  console.log(searchdata.value)
  // active:bg-violet-700

  const token = localStorage.getItem('TOKEN')
  let result = await fetch(
    `http://localhost:3004/api/users?name=${searchdata.value}`,
    {
      method: 'GET',
      // headers: { 'bearer': 'application/json' },
      headers: {
        Authorization: 'Bearer ' + token,
      },
    },
  ).then((res) => res.json())
  tables.value = result.data
  console.log(result.data)
}

onMounted(() => {
  validation()
  getuserdetails()
})
</script>
