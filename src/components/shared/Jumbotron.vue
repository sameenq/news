<template>
  <div id="jumbotron">
     <div class="jumbotron text-white jumbotron-image shadow" style="background-image: url(https://images.unsplash.com/photo-1552152974-19b9caf99137?fit=crop&w=1350&q=80);">
      <h2 class="mb-4">
        World News
      </h2>
      <p class="mb-4">
World News is a personalized news aggregator that highlights what’s happening
         in the world so you can discover more about the stories that matter to you via News API.      </p>
    <a href="https://newsapi.org/" class="btn btn-primary">Learn More</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "Jumbotron"
};
</script>

<style scoped lang="scss">
#jumbotron {
  font-family: $font-stack;
}
</style>