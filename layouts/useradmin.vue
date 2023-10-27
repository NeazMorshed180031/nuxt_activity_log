<template>
  <div>
    <header class="shadow-sm bg-white">
      <nav
        class="flex flex-col items-center p-4 sm:flex-row justify-between gap-4"
      >
        <div>
          <NuxtLink to="/" class="font-bold text-blue-800">
            <myImage />
          </NuxtLink>
        </div>
        <ul class="items-center flex flex-col gap-4 sm:flex-row">
          <li>
            <NuxtLink to="/" class="btn bg-red-700" @click="logout">
              Logout
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </header>
    <div class="container mx-auto">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.router-link-exact-active {
  text-decoration-color: white;
}
</style>
<script setup>
const myImage = h('img', { src: '/image/logo-Usable-450x300 (3).png' })

const router = useRouter()
async function logout() {
  let localtoken = localStorage.getItem('TOKEN')
  let token = JSON.parse(atob(localtoken.split('.')[1])).userId

  let result = await fetch('http://localhost:3004/api/auth/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localtoken,
    },

    body: JSON.stringify({
      userId: token,
    }),
  }).then(
    (res) => console.log(res),
    localStorage.removeItem('TOKEN'),
    console.log('removeitem'),
    router.push('/'),
  )
}
</script>
