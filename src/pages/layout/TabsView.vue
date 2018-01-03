
<template>
  <div class='tabs-view-container'>
    <router-link class="tabs-view" v-for="tag in Array.from(visitedViews)" :to="tag.path" :key="tag.path">
    	 <span class="tag_box_name">
      <el-tag :closable="true" :type="isActive(tag.path)?'primary':''" @close='closeViewTabs(tag,$event)' >
      	{{tag.name}}
      </el-tag>
      </span>
    </router-link>
  </div>
</template>

<script>
  import {mapGetters, mapActions, mapMutations} from 'vuex'
export default {
  computed: {
//  visitedViews() {
//    return this.visitedViews.slice(-6)
//  },
    ...mapGetters(['visitedViews']),
  },
  methods: {
  	...mapActions({
  		delVisitedViews:'delVisitedViews',
  		addVisitedViews:'addVisitedViews',
  		
  	}),
    closeViewTabs(view, $event) {
    	this.delVisitedViews(view).then((views) => {
        if (this.isActive(view.path)) {
          const latestView = views.slice(-1)[0]
          if (latestView) {
            this.$router.push(latestView.path)
          } else {
            this.$router.push('')
          }
        }
      })
      $event.preventDefault()
    },
    generateRoute() {
      if (this.$route.matched[this.$route.matched.length - 1].name) {
        return this.$route.matched[this.$route.matched.length - 1]
      }
      this.$route.matched[0].path = '/'
      return this.$route.matched[0]
    },
    addViewTabs() {
    	this.addVisitedViews(this.generateRoute());
    },
    isActive(path) {
      return path === this.$route.path
    }
  },
  watch: {
    $route() {
      this.addViewTabs()
    },
      visitedViews:function() {
      	if(this.visitedViews.length>5){
      		 this.$store.commit('refreshVisitedViews')
      		
      	}
      
    },
  
 
  }
}
</script>

<style scoped>
  .tabs-view-container {
    display: inline-block;
    vertical-align: top;
    margin-left: 10px;
  }
    .tabs-view {
    display: inline-block;
    vertical-align: top;
    margin-left: 10px;
      margin-left: 10px;
  }
  .tabs-view .el-tag {
  		color: #fff !important;
      background-color: rgba(0,0,0,0.2);
}

a.tabs-view.router-link-exact-active.router-link-active>.tag_box_name .el-tag{
		color: #fff !important;
	 background-color: rgba(0,0,0,0.4);
	}

</style>