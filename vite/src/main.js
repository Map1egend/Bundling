import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import fib from 'virtual:fib'
import env from 'virtual:env'

console.log(`结果：${fib(10)}`)
console.log(env)

createApp(App).mount('#app')
