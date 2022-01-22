import { ref, readonly, computed, onMounted } from 'https://unpkg.com/vue@3.2.28/dist/vue.esm-browser.js'
import store from './store.js'
const App = {
    setup() {

      // To store the new task entered by user
      const task = ref({});
      const search = ref('');

      // When the App loads fetch
      // all tasks from the server
      onMounted(() => {
        store.get();
      });

      // Action Handlers
      const addTask = () => {
          store.create(task.value);

          // reset new task when added
          task.value = {};
      }

      const deleteTask = (id) => {
        store.delete(id);
      }
      
      const completeTask = (id) => {
        store.complete(id);
      }

      // Calculated lists of
      // Pending and completed Tasks
      const tasks = computed(() => store.tasks.value.filter(x => x.status === 0 
        && (
            !search.value 
            || x.task.toLowerCase().includes(search.value.toLowerCase())
        ) 
      ));
      const completedTasks = computed(() => store.tasks.value.filter(x => x.status === 1));

      // return the values which we 
      // want to use in the template
      return { 
        search,
        task, tasks, completedTasks, 
        addTask, completeTask, deleteTask
      }
    }
  }
export { App as default }