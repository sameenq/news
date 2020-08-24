import axios from 'axios';

/** Initial State */
const state = {
    articles: [],
    totalRows: 1,
    keyword: null,
    page: 1,
    pageSize:5
};

/** Getter functions */
const getters = {
    getArticles: state => state.articles,
    getTotal: state => state.totalRows,
};

/** Base URI for API end-point */
const baseURI = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=cb7a899214fa40f09d51f125549868ad';

/** Actions to make API call */
const actions = {
    async fetchArticles({ commit },obj) {
        const params = {};
        params['page'] = obj.page;
        params['pageSize'] = obj.pageSize;
        
        if(obj.keyword) {
            params['q'] = obj.keyword;
        }
        const response = await axios.get(baseURI,{params});

        commit('setArticles', response.data)
        commit('setTotal', response.data)
        commit('setPage', obj.page)
    }
};

/** Mutations to update the state of store object */
const mutations = {
    setArticles: (state, data) => {
        state.articles = data.articles;
    },
    setPage: (state, data) => {
        state.page = data;
    },
    setTotal:  (state, data) => {
        state.totalRows = data.totalResults;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}
