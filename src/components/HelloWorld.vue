<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import User from '../entities/user'
import { useAuthStore } from '../stores/authStore';

defineProps<{ msg: string }>()

interface UserType {
  username: string,
  password: string,
  id?: string
}

interface State {
  users: UserType[]
}

const state: State = reactive({
  users: []
})


const username = ref('')
const password = ref('')
const userId = ref('')

onMounted( async () => {
  const response = await fetch('http://localhost:3000/users')
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
    const response = await fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: username.value, password: password.value })
    });

    if (response.ok) {
      state.users.push(new User(username.value, password.value))
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
    const response = await fetch(`http://localhost:3000/users/${userId.value}`, {
      method: 'DELETE',
      headers: {
        'LOL-TOKEN': 'IBOMBE',
        'Content-Type': 'application/json'
      },
    });
    const result = response.json()
    if (response.ok) {
      
      // const userIndex = state.users.findIndex(user => user.id === Number(userId.value))
      // state.users.splice(userIndex, 1)
      // const result = await response.json();
      console.log('Success: ', result)
    }else{
      console.error("Fail: ", result)
    }
  }
  catch(err){
    console.error('catch err: ', err)
  }
}

const editUser = async () => {
  console.log('FE edit')
  try{
    const response = await fetch('http://localhost:3000/users', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username: username.value, password: password.value, id: userId.value})
    });

    if (response.ok) {
      

      // const userIndex = state.users.findIndex(user => user.id === Number(userId.value))
      // console.log(state.users[userIndex], userId.value, userIndex, state.users)
      // state.users[userIndex].username = username.value;
      // state.users[userIndex].password = password.value;

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
          <input v-model="username"/>  
        </label>
        <label>
          Last Name:
          <input v-model="password"/>   
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
      <div v-for="user in state.users" :key="user.username" class="grid-box black-box">
        <p>First name: {{ user.username }}</p>
        <p>Last name: {{ user.password }}</p>
        <p>ID: {{ user.id }}</p>
      </div>
    </div>
  </div>

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
