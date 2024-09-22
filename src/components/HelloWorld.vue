<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import User from '../entities/user'

defineProps<{ msg: string }>()

interface UserType {
  firstName: string,
  lastName: string,
  id: number
}

interface State {
  users: UserType[]
}

const state: State = reactive({
  users: []
})

const userFirstName = ref('')
const userLastName = ref('')
const userId = ref('')

onMounted( async () => {
  const response = await fetch('http://localhost:3000/')
  const data = await response.json()
  state.users = [...data]
})

const crudOption = ref('addUser')

const selectOptions = [
  { text: 'Add user', value: 'addUser' },
  { text: 'Edit user', value: 'editUser'},
  { text: 'Remove user', value: 'removeUser'}
]
// const count = ref(0)

const addUser = async () => {
  try{
    const response = await fetch('http://localhost:3000/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ firstName: userFirstName.value, lastName: userLastName.value })
    });

    if (response.ok) {
      const newId =  1 + Math.max(...state.users.map( user => user.id ))
      state.users.push(new User(userFirstName.value, userLastName.value, newId))
      const result = await response.json();
      console.log('Success: ', result)
    }else{
      console.error("Fail: ", response.status)
    }
  }
  catch(err){
    console.error('catch err: ', err)
  }
}

const removeUser = async () => {
  try{
    const response = await fetch('http://localhost:3000/', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({firstName: userFirstName.value, lastName: userLastName.value, id: userId.value})
    });

    if (response.ok) {
      
      const userIndex = state.users.findIndex(user => user.id === Number(userId.value))
      state.users.splice(userIndex, 1)
      const result = await response.json();
      console.log('Success: ', result)
    }else{
      console.error("Fail: ", response.status)
    }
  }
  catch(err){
    console.error('catch err: ', err)
  }
}

const editUser = async () => {
  console.log('FE edit')
  try{
    const response = await fetch('http://localhost:3000/', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({firstName: userFirstName.value, lastName: userLastName.value, id: userId.value})
    });

    if (response.ok) {
      

      const userIndex = state.users.findIndex(user => user.id === Number(userId.value))
      console.log(state.users[userIndex], userId.value, userIndex, state.users)
      state.users[userIndex].firstName = userFirstName.value;
      state.users[userIndex].lastName = userLastName.value;

      const result = await response.json();
      console.log('Success: ', result)
    }else{
      console.error("Fail: ", response.status)
    }
  }
  catch(err){
    console.error('catch err: ', err)
  }
}



//const fetchUsers = ()
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card" >
    <form class="grid-box">
      <div v-if="crudOption != 'removeUser'" class="grid-box">
        <label>
          First Name:
          <input v-model="userFirstName"/>  
        </label>
        <label>
          Last Name:
          <input v-model="userLastName"/>   
        </label> 
      </div>
      <label  v-if="crudOption != 'addUser'">
        UserType ID:
        <input v-model="userId"/>  
      </label>
      <label>
        Select CRUD op:
        <select v-model="crudOption">
          <option v-for="(option) in selectOptions" :value="option.value" :key="option.value">{{ option.text }}</option>
        </select>  
      </label>
    </form>
    <button v-if="crudOption === 'addUser'" type="button" @click="addUser">ADD USER</button>
    <button v-else-if="crudOption === 'removeUser'" type="button" @click="removeUser">REMOVE USER</button>
    <button v-else="crudOption === 'editUser'" type="button" @click="editUser">EDIT USER</button>

    <div class="grid-box">
      <h3>Users:</h3>
      <div v-for="user in state.users" :key="user.id" class="grid-box black-box">
        <p>First name: {{ user.firstName }}</p>
        <p>Last name: {{ user.lastName }}</p>
        <p>ID: {{ user.id }}</p>
      </div>
    </div>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Learn more about IDE Support for Vue in the
    <a
      href="https://vuejs.org/guide/scaling-up/tooling.html#ide-support"
      target="_blank"
      >Vue Docs Scaling up Guide</a
    >.
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}

  .grid-box {
    display: grid;
    gap: 3px;
  }
  .black-box {
    border: 1px solid black;
  }
</style>
