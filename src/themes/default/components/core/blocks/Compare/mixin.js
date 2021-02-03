import i18n from '@vue-storefront/i18n';
import { mapGetters, mapState } from 'vuex';
/* eslint-disable */

export default {
  data () {
    return {
      categories: {},
      isDifference: false,
      prevRoute: null
    };
  },
  computed: {
    ...mapState({
      currentCategory: state => state.comparePage.currentCategory,
    }),
    ...mapGetters({
      isEmpty : 'compare/getCompareProductsCount'
    }),
    addedProducts () {
      let inCompare = {};
      if (this.items.length && this.currentCategory && Object.keys(this.categories).length) {
        Object.keys(this.categories).forEach(category => {
          inCompare[category] = [];
          this.categories[category].forEach(product => {
            inCompare[category].push(this.$store.getters['compare/isOnCompare'](product));
          });
          inCompare[category] = inCompare[category].reduce((acc, it) => (acc + it), 0);
        });
      }

      if ( !inCompare[this.currentCategory] ){
        delete this.categories[this.currentCategory];
        this.isDifference = false;
        this.$store.commit('comparePage/setCurrentCategory' , Object.keys(this.categories)[0]);
      }

      return inCompare;
    },
    getAvailableAttributes () {
      let attributes = [];
      if (this.items.length && this.currentCategory && Object.keys(this.categories).length){
        this.all_comparable_attributes.forEach(el => {
          this.categories[this.currentCategory].forEach(category => {
            if (Object.keys(category).indexOf(el.attribute_code) > -1 && !attributes.find(attr => attr.attribute_code === el.attribute_code) && this.isAttributeVisible(el)){
              let valuesArr = this.categories[this.currentCategory].map(va => va[el.attribute_code]),
                isUnique = valuesArr.every(item => item === valuesArr[0]);
              el.isUnique = isUnique;
              attributes.push(el);
            }
          });
        });
      }
      return attributes;
    },
    hasDiff () {
      return this.getAvailableAttributes.some(attr => attr.isUnique === false) && this.addedProducts[this.currentCategory] > 1;
    }
  },
  methods: {
    isAttributeVisible (attr) {
      return attr.is_visible && attr.is_comparable && attr.is_visible_on_front;
    },
    scroll () {
        let container = this.$refs['compare-container'],
          innerContainer = document.querySelector('.compare__products-columns'),
          table = this.$refs['compare__products-table'],
          containerOffset = container.offsetTop;
        if (container && innerContainer) {
          if (window.scrollY > containerOffset + 120){
            document.querySelectorAll('.collection-product').forEach(el => el.classList.add('small'));
            innerContainer.style.position = 'absolute';
            if (window.innerWidth < 768){
              innerContainer.style.top = window.scrollY - (containerOffset + 16) + 'px';
              table.style.paddingTop = '200px';

            } else {
              innerContainer.style.top = window.scrollY - (containerOffset + 80) + 'px';
              table.style.paddingTop = '75px';
            }
            innerContainer.style.zIndex = 2;
          } else {
            document.querySelectorAll('.collection-product').forEach(el => el.classList.remove('small'));
            innerContainer.style.position = 'static';
            table.style.paddingTop = '0px';
          }
        }
    },
    changeCategoryIndex(index){
      this.isDifference = false;
      this.$store.commit('comparePage/setCurrentCategory' , index);
    },
    toggleSidebar(value) {
      this.$store.commit('ui/setCompareSidebar', value);
    },
    goBack(){
      this.prevRoute.name ? this.$router.go(-1) : this.$router.push({ name: 'home' });
    },
    categorized(){
      let requiredField = this.items.some(el => !el.category);
      if (requiredField) {
        this.items.forEach(product => this.removeFromCompare(product));
        this.$router.push({name : 'home'});
      } else {
        this.items.forEach((el , i) => {
          let categoryName = el.breadcrumbs[0].name || undefined;
          if (el.category.length && el.breadcrumbs.length && !!categoryName){
            if (!this.categories[categoryName]){
              this.$set(this.categories, [categoryName], [el]);
            } else {
              this.$set(this.categories[categoryName], i, el);
            }
          }
        });
        if (Object.keys(this.categories).length && !this.currentCategory){
          this.$store.commit('comparePage/setCurrentCategory', Object.keys(this.categories)[0]);
        }
      }
    },
    removeAll () {
      for (let k in this.categories){
        this.categories[k].forEach(product => this.removeFromCompare(product));
      }
      this.categories = {};
    }
  },
  async created () {
    this.categorized();
  },
  mounted () {
    window.addEventListener('scroll', this.scroll);
  },
  destroyed () {
    window.removeEventListener('scroll', this.scroll);
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.prevRoute = from;
    });
  },
  async asyncData ({ store, route, context }) {
    await store.dispatch('attribute/loadProductAttributes', {products: store.getters['compare/getCompareItems']});
  },
  watch: {
    'items' : function (newVal, oldVal) {
      if (!Object.keys(oldVal).length){
        this.categorized();
      }
    },
    'isEmpty' : function (newVal, oldVal) {
      if ( !newVal ){
        this.goBack();
      }
    }
  }
};
