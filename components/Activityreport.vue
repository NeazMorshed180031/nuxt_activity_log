<template>
  <div class="flex flex-col items-center p-4 sm:flex-row justify-around gap-4">
    <button
      v-show="btnshow"
      class="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      <NuxtLink to="/users">User Information</NuxtLink>
    </button>
    <button
      class="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      <NuxtLink to="/activity">User Activity Log</NuxtLink>
    </button>
    <button
      class="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded btn"
    >
      <NuxtLink to="/activityreport">User Activity Report</NuxtLink>
    </button>
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
      @click="getuseractivityreportbydate(date)"
      :attributes="attrs"
    />
  </div>

  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <h1 class="font-bold text-center p-1 underline text-slate-800">
      User Activity Report
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
            Role
          </th>
          <th scope="col" class="px-6 py-3">
            Activity Count
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
            {{ value.user.email }}
          </td>
          <td class="px-6 py-4 text-black">
            {{ value.user.role }}
          </td>
          <td class="px-6 py-4 text-black">
            {{ value.activityCount }}
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
import moment from 'moment'

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
console.log(onemonthprev)

const range = ref({
  start: onemonthprev,
  end: new Date(),
})

const tables = ref([])
const values = ref([])
const paginateData = ref(null)
const paginate = ref({ page: null })
const config = useRuntimeConfig()
const url = config.public.BASE_URL
const router = useRouter()
const btnshow = ref(0)
const date = ref({ start: '', end: '' })
const searchdata = ref('')
const startdate = ref('')
const enddate = ref('')
const showdate = ref(0)

console.log(date.value)
console.log(attrs.value)

function subtractMonths(date, months) {
  date.setMonth(date.getMonth() - months)
  return date
}

function expiryvalidation() {
  let token = localStorage.getItem('TOKEN')
  console.log(JSON.parse(atob(token.split('.')[1])).role)
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
      } else {
        btnshow.value = 1
      }
    } else {
      console.log('fire2')
      router.push('/')
    }
  }
}

async function getuseractivityreport() {
  console.log('Helloooooooooooo')

  const onemonthprev = subtractMonths(new Date(), 1)
  startdate.value = moment(String(onemonthprev)).format('YYYY/MM/DD')
  enddate.value = moment(String(new Date())).format('YYYY/MM/DD')
  const token = localStorage.getItem('TOKEN')
  let result = await fetch(
    `${config.public.BASE_URLS}api/users/activity-reports?startDate=${moment(
      String(onemonthprev),
    ).format('YYYY-MM-DD')}&endDate=${moment(String(new Date())).format(
      'YYYY-MM-DD',
    )}`,
    {
      method: 'GET',
      // headers: { 'bearer': 'application/json' },
      headers: {
        Authorization: 'Bearer ' + token,
      },
    },
  ).then((res) => res.json())
  console.log('result', result.data)
  tables.value = result.data
  console.log(tables.value)
}

async function getuseractivityreportbydate(data) {
  console.log('Helloooooooooooo')
  console.log(searchdata.value)
  startdate.value = moment(String(data.start)).format('YYYY/MM/DD')
  enddate.value = moment(String(data.end)).format('YYYY/MM/DD')

  // active:bg-violet-700

  const token = localStorage.getItem('TOKEN')
  let result = await fetch(
    `${config.public.BASE_URLS}api/users/activity-reports?startDate=${moment(
      String(data.start),
    ).format('YYYY/MM/DD')}&endDate=${moment(String(data.end)).format(
      'YYYY/MM/DD',
    )}`,
    {
      method: 'GET',
      // headers: { 'bearer': 'application/json' },
      headers: {
        Authorization: 'Bearer ' + token,
      },
    },
  ).then((res) => res.json())
  console.log('result', result)
  tables.value = result.data
  console.log(tables.value)
}

onMounted(() => {
  expiryvalidation()
  getuseractivityreport()
})
</script>
