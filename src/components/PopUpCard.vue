<template>
  <div v-if="showPopUp">
    <div
      class="card position-absolute top-50 start-50 translate-middle bg-secondary"
    >
      <div class="card-body  m-4">
        <header>
          <slot name="title" class="card-title"></slot>
        </header>
        <main>
          <slot class="card-text"></slot>
          <table
            v-if="keyInput"
            class="table table-striped table-dark table-hover"
          >
            <thead>
              <tr>
                <th scope="col">Keys</th>
                <th scope="col">Function</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, index) of keyInput" :key="index">
                <td scope="row">{{ row.keys }}</td>
                <td>{{ row.function }}</td>
              </tr>
            </tbody>
          </table>
        </main>
        <footer>
          <slot name="footer" class="card-footer"></slot>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["showPopUp", "keyInput"],
  data() {
    return {};
  },
};
</script>

<style scoped></style>
