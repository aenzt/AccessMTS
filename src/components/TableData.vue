<template>
  <v-data-table
    :headers="headers"
    :items="userData"
    :items-per-page="10"
    loader-height=6
    class="elevation-1 align-center ma-10"
  >
    <template v-slot:item.entryTime="{ item }">
      <span>{{ new Date(item.entryTime).toLocaleString() }}</span>
    </template>
    <template v-slot:item.exitTime="{ item }">
      <span v-if="item.presence == false">{{ new Date(item.exitTime).toLocaleString() }}</span>
      <span v-else>Not exit yet</span>
    </template>
    <template v-slot:item.vacStat1="{ item }">
      <v-chip v-if="item.vacStat1 == true" color="green">Vaccinated</v-chip>
      <v-chip v-else color="red">Not Vaccinated</v-chip>
    </template>
    <template v-slot:item.vacStat2="{ item }">
      <v-chip v-if="item.vacStat2 == true" color="green">Vaccinated</v-chip>
      <v-chip v-else color="red">Not Vaccinated</v-chip>
    </template>
    <template v-slot:item.latestTemp="{ item }">
      <span>{{ item.latestTemp }}</span>
    </template>
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title
          >{{ hours }}:{{ minutes }}:{{ seconds }}</v-toolbar-title
        >
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" persistent max-width="600px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark v-bind="attrs" v-on="on">
              <v-icon dark>
                mdi-plus
              </v-icon>
              Add New User
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">Add User</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field label="Full Name*" required></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      label="Card UID*"
                      hint="No Space"
                      persistent-hint
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-select
                      :items="[
                        '7.1',
                        '7.2',
                        '7.3',
                        '7.4',
                        '7.5',
                        '7.6',
                        '7.7',
                        '7.8',
                        '8.1',
                        '8.2',
                        '8.3',
                        '8.4',
                        '8.5',
                        '8.6',
                        '8.7',
                        '8.8',
                        '9.1',
                        '9.2',
                        '9.3',
                        '9.4',
                        '9.5',
                        '9.6',
                        '9.7',
                        '9.8',
                      ]"
                      label="Class*"
                      required
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-select
                      :items="['true', 'false']"
                      label="1st Vaccine Status*"
                      required
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-select
                      :items="['true', 'false']"
                      label="2nd Vaccine Status*"
                      required
                    ></v-select>
                  </v-col>
                </v-row>
              </v-container>
              <small class='red--text'>*indicates required field</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text>
                Close
              </v-btn>
              <v-btn color="blue darken-1" text>
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
  </v-data-table>
</template>
<script>
import io from "socket.io-client";
export default {
  name: "TableData",
  data() {
    return {
      hours: 0,
      minutes: 0,
      seconds: 0,
      socket: {},
      context: {},
      headers: [
        {
          text: "Nama Siswa",
          align: "start",
          sortable: true,
          value: "name",
        },
        { text: "Kelas", value: "kelas" },
        { text: "Vaccine Status 1", value: "vacStat1", dataType: "Boolean" },
        { text: "Vaccine Status 2", value: "vacStat2", dataType: "Boolean" },
        { text: "Entry Time", value: "entryTime", dataType: "Date" },
        { text: "Exit Time", value: "exitTime", dataType: "Date" },
        { text: "Latest Temperature", value: "latestTemp", dataType: "Number"}
      ],
      userData: [],
    };
  },
  methods: {
    getColor(calories) {
      if (calories > 400) return "red";
      else if (calories > 200) return "orange";
      else return "green";
    },
    setTime() {
      setInterval(() => {
        const date = new Date();
        this.hours = date.getHours();
        this.minutes = this.checkSingleDigit(date.getMinutes());
        this.seconds = this.checkSingleDigit(date.getSeconds());
      }, 1000);
    },
    checkSingleDigit(digit) {
      return ("0" + digit).slice(-2);
    },
  },
  mounted() {
    this.setTime();
    this.socket = io("https://mday1.herokuapp.com/");
    this.socket.on("update", (data) => {
      this.userData = data;
      console.log(data);
    });
  },
};
</script>