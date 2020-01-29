let isCollect = false

Component({
    externalClasses: ['i-class'],

    options: {
        multipleSlots: true
    },

  data: {
    collectLogoUrl: "../../../icon/shoucang.png"
  },

  methods:{
    clickCollect: function() {
      if (isCollect) {
        this.setData({
          collectLogoUrl: "../../../icon/shoucang.png"
        })
        isCollect=false
      }
      else {
        this.setData({
          collectLogoUrl: "../../../icon/shoucang1.png"
        })
        isCollect=true
      }
    }
  },

    properties: {
        full: {
            type: Boolean,
            value: false
        },
        thumb: {
            type: String,
            value: ''
        },
        title: {
            type: String,
            value: ''
        },
        extra: {
            type: String,
            value: ''
        }
    }
});
