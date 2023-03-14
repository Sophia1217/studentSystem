export default {
  data(){
      return{
          num:1,
      }
  },
  created() {
      this.hello()
  },
  methods: {
      hello(){
          console.log('hello from mixin')
      },
  },
}

{/* <template>
  <div>
    <div>组件1里的num：{{num}}</div>
  </div>
</template>
​
<script>
import myMixins from "@/mixins/myMinixn";
export default {
  mixins: [myMixins],
  computed: {},
  created(){
    this.num++
  },
  methods: {},
};
</script>
<style>
</style>
复制代码 */}