import { computed } from 'https://unpkg.com/vue@3.2.28/dist/vue.esm-browser.js'
import store from './store.js'
const Summary = {
    setup() {
        return { total: computed(() =>store.tasks.value.length) }
    }
}
export { Summary as default }