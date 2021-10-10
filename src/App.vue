<template>
  <v-app>
    <v-app-bar app dark>
      <div class="d-flex align-center">
        <v-toolbar-title>MTsN 4 Vaccine Access</v-toolbar-title>
      </div>
      <v-spacer></v-spacer>
      <strong class="ml-4 mr-4">John Doe</strong>
      <v-avatar color="primary" size="38">
        <img
          alt="Avatar"
          src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
        />
      </v-avatar>
      <v-app-bar-nav-icon class="mr-3"></v-app-bar-nav-icon>
    </v-app-bar>
    <v-main>
      <TableData />
    </v-main>
  </v-app>
</template>

<script>
import TableData from "./components/TableData";

export default {
  name: "App",
  components: {
    TableData,
  },

  data: () => ({
    //
  }),
};
</script>
