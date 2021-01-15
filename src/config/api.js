// Upload Images //
const cors = 'https://cors-anywhere.herokuapp.com/'
const site = 'https://mangae.janamon.co/'
const url = `${cors}${site}`

const folder = 'ma-ngae'
const UPLOAD = `${url}${folder}`
const FETCH = `${site}${folder}`

// https://cors-anywhere.herokuapp.com/YOUR_DOMAIN.COM/ma-ngae/grocery/category-upload.php  Online
export const GROCERY_CATEGORY_UPLOAD = `${UPLOAD}/grocery/category-upload.php`
export const GROCERY_UPLOAD = `${UPLOAD}/grocery/grocery-upload.php`
// End //

// Fetch Images //
export const GROCERY_CATEGORY_FETCH = `${FETCH}/grocery/category-imgs/`
export const GROCERY_FETCH = `${FETCH}/grocery/grocery-imgs/`
// End //

export const GROCERY = '/groceries'
export const G_CATEGORY = '/grocery_categories'
export const G_WEIGHT = '/grocery_weight'