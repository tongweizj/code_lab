<script setup>
// import { User } from "~/types";
const counter = useState("counter", () => Math.round(Math.random() * 1000));
const sameCounter = useState("counter");

// Global State
const foo = useFoo();

const { userData, setUserData } = useUserData();

function function_name() {
  const user = {
    id: "1",
    created_time: "2222",
    karma: 2,
    about: "string",
    loading: true,
  };
  setUserData(user);
}
</script>
<template>
  <div>
    <h2>useState demo</h2>
    <div>
      <h3>Just one page</h3>
      <div>Counter: {{ counter }}</div>
      <div>Same Counter: {{ sameCounter }}</div>
      <div>
        <NButton class="font-mono" @click="counter++"> + </NButton>
        <NButton class="font-mono" @click="counter--"> - </NButton>
      </div>
    </div>
    <div>
      <h3>Global State</h3>
      <div>./composables/</div>
      <p>{{ foo }}</p>
      <p>{{ userData }}</p>

      <div>
        <NButton class="font-mono" @click="($event) => function_name()">
          +
        </NButton>
        <NButton class="font-mono" @click="counter--"> - </NButton>
      </div>
    </div>
  </div>
</template>
