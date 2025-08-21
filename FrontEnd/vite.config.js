import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})

// Why use Vite?
//vite starts you app instantly during development, and it builds your app in a fraction of the time compared to other bundlers.
// It allows hot reload (refresh as you change code) 
// bundles app efficiently for production
// it allows you to use jsx : 


//Without Vite, you could still run a React app, 
// but you’d need a lot more manual setup with tools like Webpack or Babel. Vite just makes it modern, fast, and convenient.