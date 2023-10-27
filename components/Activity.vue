<template>
  <div class="flex flex-col items-center p-4 sm:flex-row justify-around gap-4">
    <button
      v-show="btnshow"
      class="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      <NuxtLink to="/users">User Information</NuxtLink>
    </button>
    <button
      class="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded btn"
    >
      <NuxtLink to="/activity">User Activity Log</NuxtLink>
    </button>

    <button
      v-show="btnshow"
      class="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      <NuxtLink to="/activityreport">User Activity Report</NuxtLink>
    </button>
  </div>

  <div>
    <form @submit.prevent="getuseractivitybydate(date)" v-show="btnshow">
      <label
        for="default-search"
        class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      >
        Search
      </label>
      <div class="relative">
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

  <div class="flex justify-center p-1 sm:justify-end">
    <input
      :value="startdate"
      @click="showdate = 1"
      class="p-1 mr-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-25 pl-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      placeholder="Select date"
    />
    <input
      :value="enddate"
      @click="showdate = 1"
      class="p-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-25 pl-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      placeholder="Select date"
    />
  </div>
  <div class="flex justify-center p-1 sm:justify-end" v-show="showdate">
    <VDatePicker
      v-model.range="range"
      v-model="date"
      @click="getuseractivitybydate(date)"
      :attributes="attrs"
    />
  </div>

  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <h1 class="font-bold text-center p-1 underline text-slate-800">
      User Activity
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
            IP Address
          </th>
          <th scope="col" class="px-6 py-3">
            OS
          </th>
          <th scope="col" class="px-6 py-3">
            Browser
          </th>
          <th scope="col" class="px-6 py-3">
            Device
          </th>
          <th scope="col" class="px-6 py-3">
            Activity
          </th>
          <th scope="col" class="px-6 py-3">
            Time
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="odd:bg-white even:bg-slate-50 bg-white border-b dark:bg-gray-900 dark:border-gray-700 hover:bg-slate-200 cursor-pointer"
          v-for="value in tables"
        >
          <th
            scope="row"
            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            <img
              v-bind:src="url + value.user.profilePic"
              width="50"
              height="50"
            />
          </th>
          <th
            scope="row"
            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            id="uud"
          >
            {{ value.user.name }}
          </th>
          <td class="px-6 py-4 text-black">
            {{ value.ipAddress }}
          </td>
          <td class="px-6 py-4 text-black">
            {{ value.os }}
          </td>
          <td class="px-6 py-4 text-black">
            {{ value.browser }}
          </td>
          <td class="px-6 py-4 text-black">
            {{ value.device }}
          </td>
          <td class="px-6 py-4 text-black">
            {{ value.activity }}
          </td>
          <td class="px-6 py-4 text-black">
            {{ moment(String(value.createdAt)).format('MM/DD/YYYY hh:mm A') }}
          </td>
        </tr>
      </tbody>
    </table>
    <div class="flex justify-center sm:justify-center mt-2 mb-2" v-if="chk">
      <UPagination
        v-model="pageno"
        :page-count="10"
        :total="total"
        :active-button="{ color: 'blue' }"
        @click="paginationpage(pageno, date)"
      />
    </div>
  </div>
</template>

<style scoped>
.router-link-exact-active {
  color: #fcfcfc;
  border-bottom: 1px solid rgb(253, 253, 253);
}
</style>
<script setup>
import moment from 'moment'
const pageno = ref(1)
const attrs = ref([
  {
    key: 'today',
    highlight: {
      color: 'green',
      fillMode: 'solid',
    },
    dates: new Date(),
  },
])

const onemonthprev = subtractMonths(new Date(), 1)

const range = ref({
  start: onemonthprev,
  end: new Date(),
})

const chk = ref(0)
const tables = ref([])
const config = useRuntimeConfig()
const url = config.public.BASE_URL
const router = useRouter()
const btnshow = ref(0)

const searchdata = ref('')
const startdate = ref('')
const enddate = ref('')
const showdate = ref(0)
const total = ref()

const date = ref({ start: range.value.start, end: range.value.end })

let totalval = total.value

function subtractMonths(date, months) {
  date.setMonth(date.getMonth() - months)
  return date
}

async function paginationpage(pagenumber, data) {
  const token = localStorage.getItem('TOKEN')
  let result = await fetch(
    `${config.public.BASE_URLS}api/users/activity-logs?startDate=${moment(
      String(data.start),
    ).format('YYYY-MM-DD')}&endDate=${moment(String(data.end)).format(
      'YYYY-MM-DD',
    )}&page=${pagenumber}&name=${searchdata.value}`,
    {
      method: 'GET',
      // headers: { 'bearer': 'application/json' },
      headers: {
        Authorization: 'Bearer ' + token,
      },
    },
  ).then((res) => res.json())

  total.value = result.data.count

  tables.value = result.data.rows
}

function expiryvalidation() {
  let token = localStorage.getItem('TOKEN')

  let role = JSON.parse(atob(token.split('.')[1])).role
  if (token === null) {
    router.push('/')
  } else {
    let exp = JSON.parse(atob(token.split('.')[1])).exp * 1000

    if (exp > Date.now()) {
      if (role == 'user') {
        router.push('/activity')
      } else {
        btnshow.value = 1
      }
    } else {
      router.push('/')
    }
  }
}

async function getuseractivityreport() {
  const onemonthprev = subtractMonths(new Date(), 1)
  startdate.value = moment(String(onemonthprev)).format('YYYY-MM-DD')
  enddate.value = moment(String(new Date())).format('YYYY-MM-DD')
  const token = localStorage.getItem('TOKEN')
  let result = await fetch(
    `${config.public.BASE_URLS}api/users/activity-logs?startDate=${moment(
      String(onemonthprev),
    ).format('YYYY-MM-DD')}&endDate=${moment(String(new Date())).format(
      'YYYY-MM-DD',
    )}&page=1`,
    {
      method: 'GET',
      // headers: { 'bearer': 'application/json' },
      headers: {
        Authorization: 'Bearer ' + token,
      },
    },
  ).then((res) => res.json())

  total.value = result.data.count

  totalval = total.value

  // btncreate(total.value, 1)
  chk.value = 1
  // total.value = 0

  tables.value = result.data.rows
}

async function getuseractivitybydate(data) {
  console.log(searchdata.value)
  startdate.value = moment(String(data.start)).format('YYYY/MM/DD')
  enddate.value = moment(String(data.end)).format('YYYY/MM/DD')
  console.log(data.start)
  console.log(data.end)

  const token = localStorage.getItem('TOKEN')
  let result = await fetch(
    `${config.public.BASE_URLS}api/users/activity-logs?startDate=${moment(
      String(data.start),
    ).format('YYYY-MM-DD')}&endDate=${moment(String(data.end)).format(
      'YYYY-MM-DD',
    )}&name=${searchdata.value}`,
    {
      method: 'GET',
      // headers: { 'bearer': 'application/json' },
      headers: {
        Authorization: 'Bearer ' + token,
      },
    },
  ).then((res) => res.json())
  console.log('result', result)
  tables.value = result.data.rows
  total.value = result.data.count
}

onMounted(() => {
  expiryvalidation()
  getuseractivityreport()
})
</script>
