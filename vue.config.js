module.exports = {
    css: {
        loaderOptions: {
            sass: {
                prependData: `@import "@/styles/_styles.scss";
                    @import 'node_modules/bootstrap/scss/bootstrap';
                    @import 'node_modules/bootstrap-vue/src/index.scss';`
            }
        }
    }
};