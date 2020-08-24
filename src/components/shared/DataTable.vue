<template>
  <b-container fluid>
    <b-card class="text-center">
      <!-- User Interface controls -->
      <b-row>
        <b-col sm="5" md="6" class="my-1">
          <b-form-group
            label="Filter"
            label-cols-sm="3"
            label-align-sm="right"
            label-size="sm"
            label-for="filterInput"
            class="mb-0"
          >
            <b-input-group size="sm">
              <b-form-input
                v-model="keyword"
                type="search"
                id="filterInput"
                placeholder="Type to Search"
                @keyup.enter="search"
              ></b-form-input>
              <b-input-group-append>
                <b-button variant="success" @click="search">Search</b-button>
              </b-input-group-append>
              <b-input-group-append>
                <b-button variant="outline-secondary" @click="refresh">Clear</b-button>
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
        </b-col>

        <b-col sm="5" md="6" class="my-1">
          <b-form-group
            label="Per page"
            label-cols-sm="6"
            label-cols-md="4"
            label-cols-lg="3"
            label-align-sm="right"
            label-size="sm"
            label-for="perPageSelect"
            class="mb-0"
          >
            <b-form-select
              v-model="pageSize"
              @change="handlePageSizeChange"
              id="perPageSelect"
              size="sm"
              :options="pageOptions"
            ></b-form-select>
          </b-form-group>
        </b-col>
      </b-row>

      <b-row>
        <!-- Main table element -->
        <b-table
          show-empty
          outlined
          responsive
          small
          stacked="sm"
          :items="getArticles"
          :fields="fields"
          :current-page="page"
          :per-page="0"
        >
          <template v-slot:cell(name)="row">{{ row.value.first }} {{ row.value.last }}</template>

          <template v-slot:cell(details)="row">
            <b-button
              variant="info"
              size="sm"
              @click="row.toggleDetails"
            >{{ row.detailsShowing ? 'Hide' : 'Show' }}</b-button>
          </template>

          <template v-slot:cell(publishedAt)="row">{{ row.item.publishedAt|formatDate}}</template>

          <template v-slot:row-details="row">
            <b-card no-body class="overflow-hidden">
              <b-row no-gutters>
                <b-col md="6">
                  <b-card-img :src="row.item.urlToImage" alt="Image" class="rounded-5"></b-card-img>
                </b-col>
                <b-col md="6">
                  <b-card-body :title="row.item.description">
                    <b-card-text>
                      <p>{{row.item.content}}</p>
                      <b-button :href="row.item.url" variant="secondary">More info</b-button>
                    </b-card-text>
                  </b-card-body>
                </b-col>
              </b-row>
            </b-card>
          </template>
        </b-table>
      </b-row>

      <b-row>
        <b-col lg="12" class="my-1">
          <!-- Paginator -->
          <b-pagination
            v-model="page"
            :total-rows="getTotal"
            :per-page="pageSize"
            align="center"
            size="sm"
            class="my-0"
            pills
            @change="handlePageChange"
          ></b-pagination>
        </b-col>
      </b-row>
    </b-card>
  </b-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "DataTable",
  data() {
    return {
      fields: ["publishedAt", "title", "author", "details"],
      page: 1,
      pageSize: 5,
      pageOptions: [5, 10, 20],
      keyword: null,
    };
  },
  methods: {
    ...mapActions(["fetchArticles"]),
    search() {
      this.page = 1;
      this.loadArticles();
    },
    refresh() {
      this.keyword = null;
      this.page = 1;
      this.pageSize = 5;
      this.loadArticles();
    },
    handlePageChange(value) {
      this.page = value;
      this.loadArticles();
    },
    handlePageSizeChange(value) {
      this.pageSize = value;
      this.loadArticles();
    },
    loadArticles() {
       this.fetchArticles({
        keyword: this.keyword,
        page: this.page,
        pageSize: this.pageSize,
      });
    }
  },
  computed: {
    ...mapGetters(["getArticles", "getTotal"]),
  },
  created() {
      this.loadArticles();
  },
};
</script>
