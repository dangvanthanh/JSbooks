<template>
  <div class="container mx-auto p-3">
    <div class="flex flex-wrap">
      <div class="w-1/2 mt-2">
        <span class="text-white inline-block mr-2">Filter:</span>
        <label
          href="#"
          class="text-orange-light inline-block mr-2 ml-2 relative"
          v-for="bookFilter in bookFilters"
          :key="bookFilter">
          <input type="radio" :value="bookFilter" v-model="bookFilterSelected" name="book" class="opacity-0 absolute">
          <span class="hover:underline">{{ bookFilter }}</span>
        </label>
      </div>
      <div class="w-1/2">
        <div class="text-right">
          <input type="text" placeholder="Search books" class="px-2 py-2 w-4/5 border border-grey-darker rounded" v-model="bookTitle" @keyup.enter="findBook">
        </div>
      </div>
    </div>
    <div class="flex flex-wrap">
      <div v-for="book in books" :key="book.url" class="w-1/2 lg:w-1/3 flex pl-3 pr-3 pt-8 mb-8">
        <div class="flex flex-col">
          <div class="flex items-start">
            <figure class="book w-2/5 relative border border-grey-light">
							<ul class="book__front list-reset">
								<li>
									<img :src="book.cover" alt="" class="w-full h-full align-middle shadow">
								</li>
								<li></li>
							</ul>
							<ul class="book__page list-reset items-center">
								<li></li>
								<li>
									<a class="book__button inline-block text-center no-underline px-2 py-2 border border-black text-black" :href="book.url" target="_blank">Read</a>
								</li>
								<li></li>
								<li></li>
								<li></li>
							</ul>
							<ul class="book__back list-reset">
								<li></li>
								<li></li>
							</ul>
							<ul class="book__spin list-reset">
								<li></li>
								<li></li>
							</ul>
						</figure>
            <figcaption class="w-3/5 pl-3">
              <h2 class="text-base mb-1 font-medium"><a :href="book.url" target="_blank" class="text-orange no-underline">{{ book.title }}</a></h2>
              <h3 class="text-sm mb-2 font-normal"><a href="book.authorUrl" target="_blank" class="text-orange-light font-weight">{{ book.author }}</a></h3>
              <p class="text-xs mb-3 text-white">{{ book.level }}</p>
              <p class="overflow-hidden text-xs text-white">{{ book.info | formatTruncate }}</p>
            </figcaption>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Homebook__page',
  data () {
    return {
      books: [],
      booksList: [],
      bookFilters: ['All', 'Beginner', 'Intermediate', 'Advanced'],
      bookFilterSelected: 'All',
      bookTitle: ''
    }
  },
  filters: {
    formatTruncate: function (str) {
      return str.slice(0, 124 > 3 ? 124 - 3 : 124) + '...';
    }
  },
  mounted () {
    fetch('books.json')
      .then(r => r.json())
      .then(json => {
        this.books = json.books;
        this.booksList = json.books;
      });
  },
  watch: {
    bookFilterSelected () {
      if (this.bookFilterSelected === 'All') {
        this.books = this.booksList;
      } else {
        this.books = this.booksList.filter(book => book.level === this.bookFilterSelected);
      }
    }
  },
  methods: {
    findBook () {
      this.books = this.booksList.filter(book => book.title.toLowerCase().indexOf(this.bookTitle.toLowerCase()) > -1);
    }
  }
}
</script>

<style scope>
input[type="radio"]:checked + span {
  text-decoration: underline;
}

.book {
	position: relative;
	width: 160px;
	height: 220px;
	-webkit-perspective: 1000px;
	-moz-perspective: 1000px;
	perspective: 1000px;
	-webkit-transform-style: preserve-3d;
	-moz-transform-style: preserve-3d;
	transform-style: preserve-3d;
}

.book__button {
	margin-top: 90px;
	-webkit-transition: color 0.3s, border-color 0.3s;
	-moz-transition: color 0.3s, border-color 0.3s;
	transition: color 0.3s, border-color 0.3s;
  width: 80%;
  margin-left: 15px;
}

/*
	2. background & color
*/

/* HARDCOVER FRONT */
.book__front li:first-child {
	background-color: #eee;
	-webkit-backface-visibility: hidden;
	-moz-backface-visibility: hidden;
	backface-visibility: hidden;
}

/* reverse */
.book__front li:last-child {
	background: #fffbec;
}

/* HARDCOVER BACK */
.book__back li:first-child {
	background: #fffbec;
}

/* reverse */
.book__back li:last-child {
	background: #fffbec;
}

.book__spin li:first-child {
	background: #eee;
}
.book__spin li:last-child {
	background: #fff;
}

/* thickness of cover */

.book__front li:first-child:after,
.book__front li:first-child:before,
.book__front li:last-child:after,
.book__front li:last-child:before,
.book__back li:first-child:after,
.book__back li:first-child:before,
.book__back li:last-child:after,
.book__back li:last-child:before,
.book__spin li:first-child:after,
.book__spin li:first-child:before,
.book__spin li:last-child:after,
.book__spin li:last-child:before {
	background: #999;
}

/* book__page */

.book__page > li {
	background: -webkit-linear-gradient(left, #e1ddd8 0%, #fffbf6 100%);
	background: -moz-linear-gradient(left, #e1ddd8 0%, #fffbf6 100%);
	background: -ms-linear-gradient(left, #e1ddd8 0%, #fffbf6 100%);
	background: linear-gradient(left, #e1ddd8 0%, #fffbf6 100%);
	box-shadow: inset 0px -1px 2px rgba(50, 50, 50, 0.1), inset -1px 0px 1px rgba(150, 150, 150, 0.2);
	border-radius: 0px 5px 5px 0px;
}

/*
	3. opening cover, back cover and book__pages
*/

.book__front {
	-webkit-transform: rotateY(-34deg) translateZ(8px);
	-moz-transform: rotateY(-34deg) translateZ(8px);
	transform: rotateY(-34deg) translateZ(8px);
	z-index: 100;
}

.book__back {
	-webkit-transform: rotateY(-15deg) translateZ(-8px);
	-moz-transform: rotateY(-15deg) translateZ(-8px);
	transform: rotateY(-15deg) translateZ(-8px);
}

.book__page li:nth-child(1) {
	-webkit-transform: rotateY(-28deg);
	-moz-transform: rotateY(-28deg);
	transform: rotateY(-28deg);
}

.book__page li:nth-child(2) {
	-webkit-transform: rotateY(-30deg);
	-moz-transform: rotateY(-30deg);
	transform: rotateY(-30deg);
}

.book__page li:nth-child(3) {
	-webkit-transform: rotateY(-32deg);
	-moz-transform: rotateY(-32deg);
	transform: rotateY(-32deg);
}

.book__page li:nth-child(4) {
	-webkit-transform: rotateY(-34deg);
	-moz-transform: rotateY(-34deg);
	transform: rotateY(-34deg);
}

.book__page li:nth-child(5) {
	-webkit-transform: rotateY(-36deg);
	-moz-transform: rotateY(-36deg);
	transform: rotateY(-36deg);
}

/*
	4. position, transform & transition
*/

.book__front,
.book__back,
.book__spin,
.book__front li,
.book__back li,
.book__spin li {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	-webkit-transform-style: preserve-3d;
	-moz-transform-style: preserve-3d;
	transform-style: preserve-3d;
}

.book__front,
.book__back {
	-webkit-transform-origin: 0% 100%;
	-moz-transform-origin: 0% 100%;
	transform-origin: 0% 100%;
}

.book__front {
	-webkit-transition: all 0.8s ease, z-index 0.6s;
	-moz-transition: all 0.8s ease, z-index 0.6s;
	transition: all 0.8s ease, z-index 0.6s;
}

/* HARDCOVER front */
.book__front li:first-child {
	cursor: default;
	-webkit-user-select: none;
	-moz-user-select: none;
	user-select: none;
	-webkit-transform: translateZ(2px);
	-moz-transform: translateZ(2px);
	transform: translateZ(2px);
}

.book__front li:last-child {
	-webkit-transform: rotateY(180deg) translateZ(2px);
	-moz-transform: rotateY(180deg) translateZ(2px);
	transform: rotateY(180deg) translateZ(2px);
}

/* HARDCOVER back */
.book__back li:first-child {
	-webkit-transform: translateZ(2px);
	-moz-transform: translateZ(2px);
	transform: translateZ(2px);
}

.book__back li:last-child {
	-webkit-transform: translateZ(-2px);
	-moz-transform: translateZ(-2px);
	transform: translateZ(-2px);
}

/* thickness of cover */
.book__front li:first-child:after,
.book__front li:first-child:before,
.book__front li:last-child:after,
.book__front li:last-child:before,
.book__back li:first-child:after,
.book__back li:first-child:before,
.book__back li:last-child:after,
.book__back li:last-child:before,
.book__spin li:first-child:after,
.book__spin li:first-child:before,
.book__spin li:last-child:after,
.book__spin li:last-child:before {
	position: absolute;
	top: 0;
	left: 0;
}

/* HARDCOVER front */
.book__front li:first-child:after,
.book__front li:first-child:before {
	width: 4px;
	height: 100%;
}

.book__front li:first-child:after {
	-webkit-transform: rotateY(90deg) translateZ(-2px) translateX(2px);
	-moz-transform: rotateY(90deg) translateZ(-2px) translateX(2px);
	transform: rotateY(90deg) translateZ(-2px) translateX(2px);
}

.book__front li:first-child:before {
	-webkit-transform: rotateY(90deg) translateZ(158px) translateX(2px);
	-moz-transform: rotateY(90deg) translateZ(158px) translateX(2px);
	transform: rotateY(90deg) translateZ(158px) translateX(2px);
}

.book__front li:last-child:after,
.book__front li:last-child:before {
	width: 4px;
	height: 160px;
}

.book__front li:last-child:after {
	-webkit-transform: rotateX(90deg) rotateZ(90deg) translateZ(80px) translateX(-2px) translateY(-78px);
	-moz-transform: rotateX(90deg) rotateZ(90deg) translateZ(80px) translateX(-2px) translateY(-78px);
	transform: rotateX(90deg) rotateZ(90deg) translateZ(80px) translateX(-2px) translateY(-78px);
}
.book__front li:last-child:before {
	box-shadow: 0px 0px 30px 5px #333;
	-webkit-transform: rotateX(90deg) rotateZ(90deg) translateZ(-140px) translateX(-2px) translateY(-78px);
	-moz-transform: rotateX(90deg) rotateZ(90deg) translateZ(-140px) translateX(-2px) translateY(-78px);
	transform: rotateX(90deg) rotateZ(90deg) translateZ(-140px) translateX(-2px) translateY(-78px);
}

/* thickness of cover */

.book__back li:first-child:after,
.book__back li:first-child:before {
	width: 4px;
	height: 100%;
}

.book__back li:first-child:after {
	-webkit-transform: rotateY(90deg) translateZ(-2px) translateX(2px);
	-moz-transform: rotateY(90deg) translateZ(-2px) translateX(2px);
	transform: rotateY(90deg) translateZ(-2px) translateX(2px);
}
.book__back li:first-child:before {
	-webkit-transform: rotateY(90deg) translateZ(158px) translateX(2px);
	-moz-transform: rotateY(90deg) translateZ(158px) translateX(2px);
	transform: rotateY(90deg) translateZ(158px) translateX(2px);
}

.book__back li:last-child:after,
.book__back li:last-child:before {
	width: 4px;
	height: 160px;
}

.book__back li:last-child:after {
	-webkit-transform: rotateX(90deg) rotateZ(90deg) translateZ(80px) translateX(2px) translateY(-78px);
	-moz-transform: rotateX(90deg) rotateZ(90deg) translateZ(80px) translateX(2px) translateY(-78px);
	transform: rotateX(90deg) rotateZ(90deg) translateZ(80px) translateX(2px) translateY(-78px);
}

.book__back li:last-child:before {
	box-shadow: 10px -1px 80px 20px #666;
	-webkit-transform: rotateX(90deg) rotateZ(90deg) translateZ(-140px) translateX(2px) translateY(-78px);
	-moz-transform: rotateX(90deg) rotateZ(90deg) translateZ(-140px) translateX(2px) translateY(-78px);
	transform: rotateX(90deg) rotateZ(90deg) translateZ(-140px) translateX(2px) translateY(-78px);
}

/* BOOK SPINE */
.book__spin {
	-webkit-transform: rotateY(60deg) translateX(-5px) translateZ(-12px);
	-moz-transform: rotateY(60deg) translateX(-5px) translateZ(-12px);
	transform: rotateY(60deg) translateX(-5px) translateZ(-12px);
	width: 16px;
	z-index: 0;
}

.book__spin li:first-child {
	-webkit-transform: translateZ(2px);
	-moz-transform: translateZ(2px);
	transform: translateZ(2px);
}

.book__spin li:last-child {
	-webkit-transform: translateZ(-2px);
	-moz-transform: translateZ(-2px);
	transform: translateZ(-2px);
}

/* thickness of book spine */
.book__spin li:first-child:after,
.book__spin li:first-child:before {
	width: 4px;
	height: 100%;
}

.book__spin li:first-child:after {
	-webkit-transform: rotateY(90deg) translateZ(-2px) translateX(2px);
	-moz-transform: rotateY(90deg) translateZ(-2px) translateX(2px);
	transform: rotateY(90deg) translateZ(-2px) translateX(2px);
}

.book__spin li:first-child:before {
	-webkit-transform: rotateY(-90deg) translateZ(-12px);
	-moz-transform: rotateY(-90deg) translateZ(-12px);
	transform: rotateY(-90deg) translateZ(-12px);
}

.book__spin li:last-child:after,
.book__spin li:last-child:before {
	width: 4px;
	height: 16px;
}

.book__spin li:last-child:after {
	-webkit-transform: rotateX(90deg) rotateZ(90deg) translateZ(8px) translateX(2px) translateY(-6px);
	-moz-transform: rotateX(90deg) rotateZ(90deg) translateZ(8px) translateX(2px) translateY(-6px);
	transform: rotateX(90deg) rotateZ(90deg) translateZ(8px) translateX(2px) translateY(-6px);
}

.book__spin li:last-child:before {
	box-shadow: 5px -1px 100px 40px rgba(0, 0, 0, 0.2);
	-webkit-transform: rotateX(90deg) rotateZ(90deg) translateZ(-210px) translateX(2px) translateY(-6px);
	-moz-transform: rotateX(90deg) rotateZ(90deg) translateZ(-210px) translateX(2px) translateY(-6px);
	transform: rotateX(90deg) rotateZ(90deg) translateZ(-210px) translateX(2px) translateY(-6px);
}

.book__page,
.book__page > li {
	position: absolute;
	top: 0;
	left: 0;
	-webkit-transform-style: preserve-3d;
	-moz-transform-style: preserve-3d;
	transform-style: preserve-3d;
}

.book__page {
	width: 100%;
	height: 98%;
	top: 1%;
	left: 3%;
	z-index: 10;
}

.book__page > li {
	width: 100%;
	height: 100%;
	-webkit-transform-origin: left center;
	-moz-transform-origin: left center;
	transform-origin: left center;
	-webkit-transition-property: transform;
	-moz-transition-property: transform;
	transition-property: transform;
	-webkit-transition-timing-function: ease;
	-moz-transition-timing-function: ease;
	transition-timing-function: ease;
}

.book__page > li:nth-child(1) {
	-webkit-transition-duration: 0.6s;
	-moz-transition-duration: 0.6s;
	transition-duration: 0.6s;
}

.book__page > li:nth-child(2) {
	-webkit-transition-duration: 0.6s;
	-moz-transition-duration: 0.6s;
	transition-duration: 0.6s;
}

.book__page > li:nth-child(3) {
	-webkit-transition-duration: 0.4s;
	-moz-transition-duration: 0.4s;
	transition-duration: 0.4s;
}

.book__page > li:nth-child(4) {
	-webkit-transition-duration: 0.5s;
	-moz-transition-duration: 0.5s;
	transition-duration: 0.5s;
}

.book__page > li:nth-child(5) {
	-webkit-transition-duration: 0.6s;
	-moz-transition-duration: 0.6s;
	transition-duration: 0.6s;
}

/*
	5. events
*/

.book:hover > .book__front {
	-webkit-transform: rotateY(-145deg) translateZ(0);
	-moz-transform: rotateY(-145deg) translateZ(0);
	transform: rotateY(-145deg) translateZ(0);
	z-index: 0;
}

.book:hover > .book__page li:nth-child(1) {
	-webkit-transform: rotateY(-30deg);
	-moz-transform: rotateY(-30deg);
	transform: rotateY(-30deg);
	-webkit-transition-duration: 1.5s;
	-moz-transition-duration: 1.5s;
	transition-duration: 1.5s;
}

.book:hover > .book__page li:nth-child(2) {
	-webkit-transform: rotateY(-35deg);
	-moz-transform: rotateY(-35deg);
	transform: rotateY(-35deg);
	-webkit-transition-duration: 1.8s;
	-moz-transition-duration: 1.8s;
	transition-duration: 1.8s;
}

.book:hover > .book__page li:nth-child(3) {
	-webkit-transform: rotateY(-118deg);
	-moz-transform: rotateY(-118deg);
	transform: rotateY(-118deg);
	-webkit-transition-duration: 1.6s;
	-moz-transition-duration: 1.6s;
	transition-duration: 1.6s;
}

.book:hover > .book__page li:nth-child(4) {
	-webkit-transform: rotateY(-130deg);
	-moz-transform: rotateY(-130deg);
	transform: rotateY(-130deg);
	-webkit-transition-duration: 1.4s;
	-moz-transition-duration: 1.4s;
	transition-duration: 1.4s;
}

.book:hover > .book__page li:nth-child(5) {
	-webkit-transform: rotateY(-140deg);
	-moz-transform: rotateY(-140deg);
	transform: rotateY(-140deg);
	-webkit-transition-duration: 1.2s;
	-moz-transition-duration: 1.2s;
	transition-duration: 1.2s;
}

/*
	6. Bonus
*/

/* cover CSS */

.coverDesign {
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	overflow: hidden;
	z-index: 1;
	-webkit-backface-visibility: hidden;
	-moz-backface-visibility: hidden;
	backface-visibility: hidden;
}

.coverDesign::after {
	background-image: -webkit-linear-gradient( -135deg, rgba(255, 255, 255, 0.45) 0%, transparent 100%);
	background-image: -moz-linear-gradient( -135deg, rgba(255, 255, 255, 0.45) 0%, transparent 100%);
	background-image: linear-gradient( -135deg, rgba(255, 255, 255, 0.45) 0%, transparent 100%);
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
}

.coverDesign h1 {
	color: #fff;
	font-size: 2.2em;
	letter-spacing: 0.05em;
	text-align: center;
	margin: 54% 0 0 0;
	text-shadow: -1px -1px 0 rgba(0,0,0,0.1);
}

.coverDesign p {
	color: #f8f8f8;
	font-size: 1em;
	text-align: center;
	text-shadow: -1px -1px 0 rgba(0,0,0,0.1);
}

.yellow {
	background-color: #f1c40f;
	background-image: -webkit-linear-gradient(top, #f1c40f 58%, #e7ba07 0%);
	background-image: -moz-linear-gradient(top, #f1c40f 58%, #e7ba07 0%);
	background-image: linear-gradient(top, #f1c40f 58%, #e7ba07 0%);
}

.blue {
	background-color: #3498db;
	background-image: -webkit-linear-gradient(top, #3498db 58%, #2a90d4 0%);
	background-image: -moz-linear-gradient(top, #3498db 58%, #2a90d4 0%);
	background-image: linear-gradient(top, #3498db 58%, #2a90d4 0%);
}

.grey {
	background-color: #f8e9d1;
	background-image: -webkit-linear-gradient(top, #f8e9d1 58%, #e7d5b7 0%);
	background-image: -moz-linear-gradient(top, #f8e9d1 58%, #e7d5b7 0%);
	background-image: linear-gradient(top, #f8e9d1 58%, #e7d5b7 0%);
}

/* Basic ribbon */

.ribbon {
	background: #c0392b;
	color: #fff;
	display: block;
	font-size: 0.7em;
	position: absolute;
	top: 11px;
	right: 1px;
	width: 40px;
	height: 20px;
	line-height: 20px;
	letter-spacing: 0.15em;
	text-align: center;
	-webkit-transform: rotateZ(45deg) translateZ(1px);
	-moz-transform: rotateZ(45deg) translateZ(1px);
	transform: rotateZ(45deg) translateZ(1px);
	-webkit-backface-visibility: hidden;
	-moz-backface-visibility: hidden;
	backface-visibility: hidden;
	z-index: 10;
}

.ribbon::before,
.ribbon::after{
	position: absolute;
	top: -20px;
	width: 0;
	height: 0;
	border-bottom: 20px solid #c0392b;
	border-top: 20px solid transparent;
}

.ribbon::before{
	left: -20px;
	border-left: 20px solid transparent;
}
</style>


