<template>
  <div :id="id" :class="$style.marqueeslider">
    <div :class="[$style.marqueecontainer, addClass]" :style="style">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "MarqueeSlider",
  props: {
      id: {
          type: String,
          required: true,
          default: () => {
              return "id";
          },
      },
      vertical: {
          type: Boolean,
          default: () => {
              return false; 
          },
      },
      autoWidth: {
          type: Boolean,
          default: () => {
              return false;
          },
      },
      autoHeight: {
          type: Boolean,
          default: () => {
              return false;
          },
      },
      paused: {
          type: Boolean,
          default: () => {
              return false;
          },
      },
      repeat: {
          type: Number,
          default: () => {
              return 10;
          },
      },
      reverse: {
          type: Boolean,
          default: () => {
              return false;
          },
      },
      space: {
          type: Number,
          default: () => {
              return 200;
          },
      },
      speed: {
          type: Number,
          default: () => {
              return 1500;
          },
      },
      width: {
          type: Number,
          default: () => {
              return 100;
          },
      },
      height: {
          type: Number,
          default: () => {
              return 100;
          },
      },
  },
  data() {
    return {
      container: null,
      containerWidth: 0,
      containerHeight: 0,
      items: [],
      itemsLength: 0,
      itemsWidth: [],
      itemsHeight: [],
    };
  },
  computed: {
    style() {
      return `
        animation-duration: ${this.speed}ms;
        animation-direction: ${this.reverse ? "reverse" : "normal"};
        animation-play-state: ${this.paused ? "paused" : "running"};
        flex-direction: ${this.vertical ? "column" : "row"};
      `;
    },
    addClass() {
      if (this.vertical) {
          return "vertical-anim"
      } else {
          return "horizontal-anim"
      }
    },
  },
  mounted() {
    this.setContainer();
    this.setItems();
    this.setItemsLength();
    if (this.vertical) {
      this.calculateContainerHeight();
      this.setContainerHeight();
    } else {
      this.calculateContainerWidth();
      this.setContainerWidth();
    }
    this.cloneItems();
  },
  methods: {
    calculateContainerWidth() {
      for (let index = 0; index < this.itemsLength; index++) {
        this.itemsWidth.push(this.items[index].offsetWidth);
        this.setItemSpace(index);

        if (this.autoWidth) {
          // if we are not using width specified by the user, we are setting the object-fit:contain for the images
          this.setImageObjectFit(index);
        } else {
          // if the user use the width property and want all items to be equal, the component will set the minWidth of the items
          this.setItemWidth(index);
        }
      }
      this.containerWidth = this.itemsWidth.reduce((a, b) => a + b, 0);
    },
    calculateContainerHeight() {
      for (let index = 0; index < this.itemsLength; index++) {
        this.itemsHeight.push(this.items[index].offsetHeight);
        this.setItemSpace(index);

        if (this.autoHeight) {
          // if we are not using Height specified by the user, we are setting the object-fit:contain for the images
          this.setImageObjectFit(index);
        } else {
          // if the user use the Height property and want all items to be equal, the component will set the minHeight of the items
          this.setItemHeight(index);
        }
      }
      this.containerHeight = this.itemsHeight.reduce((a, b) => a + b, 0);
    },
    cloneItems() {
      const repeatCounter = this.getRepeatCounter();
      for (let index = 0; index < repeatCounter; index++) {
        this.container.appendChild(this.items[index].cloneNode(true));
      }
    },
    getRepeatCounter() {
      return this.items.length * this.repeat;
    },
    setItems() {
      this.items = this.container.children;
    },
    setItemsLength() {
      this.itemsLength = this.items.length;
    },
    setItemSpace(index) {
      if (this.vertical) {
          this.items[index].style.marginBottom = `${this.space}px`;
      } else {
          this.items[index].style.marginRight = `${this.space}px`;
      }
    },
    setItemWidth(index) {
      this.items[index].style.minWidth = `${this.width}px`;
    },
    setItemHeight(index) {
      this.items[index].style.minHeight = `${this.height}px`;
    },
    setImageObjectFit(index) {
      this.items[index].style.objectFit = "contain";
    },
    setContainer() {
      this.container = document.querySelector(
        `#${this.id} .${this.$style.marqueecontainer}`
      );
    },
    setContainerWidth() {
      if (this.autoWidth) {
        this.container.style.width = `${
          this.itemsLength *
          (this.containerWidth / this.itemsLength + this.space)
        }px`;
      } else {
        this.container.style.width = `${
          this.itemsLength * (this.width + this.space)
        }px`;
      }
    },
    setContainerHeight() {
      if (this.autoWidth) {
        this.container.style.height = `${
          this.itemsLength *
          (this.containerHeight / this.itemsLength + this.space)
        }px`;
      } else {
        this.container.style.height = `${
          this.itemsLength * (this.height + this.space)
        }px`;
      }
    },
  },
};
</script>
<style lang="css" module>
.marqueeslider {
  overflow: hidden;
}

.marqueecontainer {
  width: 100%;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  display: flex;
}
</style>

<style lang="css">
.horizontal-anim {
  animation-name: animation-x;
}

.vertical-anim {
  animation-name: animation-y;
}


@keyframes animation-x {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-100%);
  }
}

@keyframes animation-y {
  0% {
    transform: translateY(0%);
  }
  100% {
    transform: translateY(-100%);
  }
}
</style>