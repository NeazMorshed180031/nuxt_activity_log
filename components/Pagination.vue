<template>
  <nav
    v-bind="$attrs"
    v-if="modelValue?.links?.length && modelValue?.links?.length > 3"
    aria-label="Page navigation example"
  >
    <ul class="pagination justify-content-center">
      <li v-for="(link, i) in modelValue.links" :key="i" class="page-item">
        <template
          v-if="parseInt(getHtml(i)) <= pageLimit || !parseInt(getHtml(i))"
        >
          <template v-if="ingoreNextPrev ? parseInt(getHtml(i)) : true">
            <nuxt-link
              v-if="!prevent"
              class="page-link"
              :class="{ small: small, [getActiveClass(i)]: true }"
              :to="link.active ? '' : makeRoute(i)"
              @click="
                i > 0 && i < modelValue.links.length - 1
                  ? $emit('jumpToPage', i)
                  : handlePrevNext(i)
              "
            >
              <span v-html="getHtml(i)"></span>
            </nuxt-link>
            <a
              v-else
              class="page-link"
              :class="{ small: small, [getActiveClass(i)]: true }"
              @click="
                i > 0 && i < modelValue.links.length - 1
                  ? $emit('jumpToPage', i)
                  : handlePrevNext(i)
              "
            >
              <span v-html="getHtml(i)"></span>
            </a>
          </template>
        </template>
      </li>
    </ul>
  </nav>
</template>

<script setup>
let props = defineProps({
  modelValue: {
    type: [Array, Object, Boolean],
    default: {
      // This is laravel default pagination structure
      current_page: 1,
      data: null,
      first_page_url: null,
      from: 1,
      last_page: 1,
      last_page_url: null,
      links: [
        { active: true, label: "1", url: "" },
        { active: true, label: "Next &raquo;", url: "" },
      ],
      next_page_url: null,
      path: null,
      per_page: 15,
      prev_page_url: null,
      to: 13,
      total: 19,
    },
    prevent: {
      default: false,
      type: Boolean,
    }
  },
  prevent: {
    default: false,
    type: Boolean,
  },
  small: {
    default: false,
    type: Boolean,
  },
  pageLimit: {
    default: 100,
    type: [Number],
  },
  ingoreNextPrev: {
    default: false,
    type: Boolean,
  },
});

const myEmit = defineEmits(["update:modelValue", "jumpToPage"]);
const updateValue = (event) => {
  myEmit("update:modelValue", event.target.value);
};

let handlePrevNext = (page)=> {
  let current_page = props.modelValue.current_page
  if(page==0){
    let page = (current_page > 1 ? ( current_page - 1 ) : 1)
    myEmit('jumpToPage', page)
  }else{
    let page = (current_page < props.modelValue.links.length-2 /**Excluding 1st and last button*/
              ? ( current_page + 1 ) : current_page)
    myEmit('jumpToPage', page)
  }

}
let makeRoute = (page)=> {
  let p = props.modelValue
  if(page == 0){
    if(p.current_page > 1) return '?page=' + (p.current_page-1)
    else return ''
  }else{
    return '?page=' + page
  }
}
let getHtml = (page)=> {
  let p = props.modelValue
  if(page == 0){
    return '<i class="las la-chevron-left"></i>'
  }else if(page > 0 && page==p.links.length-1){
    return '<i class="las la-chevron-right"></i>'
  }else{
    return page
  }
}
let getActiveClass = (page)=> {
  let p = props.modelValue
  if(page == 0 || ( page > 0 && page==p.links.length-1 )){
    return ''
  }else{
    if(page == p.current_page){
      return 'active-page'
    }else{
      return ''
    }
  }
}
let jumpToPage = (page)=> {
    myEmit('jumpToPage', page)
}
</script>

<style scoped>
a {
  background-color: #1e1e2d;
  color: rgb(150, 150, 150) !important;
  background-color: #ebebeb;
  border: 1px solid var(--linecolor-black);
  cursor: pointer !important;
}
a:hover,
a:focus {
  background-color: #e8e8e8 !important;
  border: 1px solid var(--linecolor-black) !important;
  box-shadow: none !important;
}
a.active-page,
a.active-page:hover {
  color: var(--fontcolor-dark) !important;
  background-color: #f7961d !important;
  box-shadow: none !important;
  color: white !important;
}
a.page-link.small {
  padding: 3px 7px;
  margin: 0px;
  font-size: 10px;
}
</style>
