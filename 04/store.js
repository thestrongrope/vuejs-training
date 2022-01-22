import { ref } from 'https://unpkg.com/vue@3.2.28/dist/vue.esm-browser.js'
import SERVER_URL from './settings.js'

const api = axios.create({
  baseURL: SERVER_URL,
  timeout: 1000
});

const store = {
  tasks: ref([]),
  async get() {
    this.tasks.value = (await api.get()).data.sort( (a,b) => a-b );
  },
  async create(task) {
    const r = await(api.post('', task));
    task.id = r.data.id;
    task.status = 0;
    this.tasks.value.unshift(task);
  },
  async complete(id) {
    const r = await(api.post('/complete', { id }));
    this.tasks.value.forEach(x => {
      if(x.id === id) x.status = 1; 
    });
  },
  async delete(id) {
    const r = await(api.delete('', { data: {id} }));
    this.tasks.value = this.tasks.value.filter(x => x.id !== id);
  }
}
export { store as default };