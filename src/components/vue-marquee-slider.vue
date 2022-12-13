<template>
	<div :id="id" :class="$style.marqueeSlider">
		<div :class="$style.marqueeSliderContainer" :style="style">
			<slot></slot>
		</div>
	</div>
</template>
<script>
export default {
	name: 'MarqueeSlider',
	props: {
		autoWidth: {
			type: Boolean,
			default: () => {
				return false
			}
		},
		id: {
			type: String,
      required: true,
      default: () => {
				return 'id'
			}
		},
		paused: {
			type: Boolean,
			default: () => {
				return false
			}
		},
		repeat: {
			type: Number,
			default: () => {
				return 10
			}
		},
		reverse: {
			type: Boolean,
			default: () => {
				return false
			}
		},
		space: {
			type: Number,
			default: () => {
				return 200
			}
		},
		speed: {
			type: Number,
			default: () => {
				return 1500
			}
		},
		width: {
			type: Number,
			default: () => {
				return 100
			}
		}
	},
	data() {
    return {
      container: null,
      containerWidth: 0,
			items: [],
			itemsLength: 0,
			itemsWidth: []
		}
	},
	computed: {
		style() {
			return `
        animation-duration: ${this.speed}ms;
        animation-direction: ${this.reverse ? 'reverse' : 'normal'};
        animation-play-state: ${this.paused ? 'paused' : 'running'};
      `
		}
	},
  mounted() {
    this.setContainer()
		this.setItems()
    this.setItemsLength()
    this.calculateContainerWidth()
		this.setContainerWidth()
		this.cloneItems()
	},
	methods: {
		calculateContainerWidth() {
			for (let index = 0; index < this.itemsLength; index++) {
				this.itemsWidth.push(this.items[index].offsetWidth)
				this.setItemSpace(index)

				if (this.autoWidth) {
					// if we are not using width specified by the user, we are setting the object-fit:contain for the images
					this.setImageObjectFit(index)
				} else {
					// if the user use the width property and want all items to be equal, the component will set the minWidth of the items
					this.setItemWidth(index)
				}
			}
			this.containerWidth = this.itemsWidth.reduce((a, b) => a + b, 0)
		},
		cloneItems() {
			const repeatCounter = this.getRepeatCounter()
			for (let index = 0; index < repeatCounter; index++) {
				this.container.appendChild(this.items[index].cloneNode(true))
			}
		},
		getRepeatCounter() {
			return this.items.length * this.repeat
		},
		setItems() {
			// get all childrens that will be put inside the slot of the component
			this.items = this.container.children
		},
		setItemsLength() {
			this.itemsLength = this.items.length
		},
		setItemSpace(index) {
			this.items[index].style.marginRight = `${this.space}px`
		},
		setItemWidth(index) {
			this.items[index].style.minWidth = `${this.width}px`
		},
		setImageObjectFit(index) {
			this.items[index].style.objectFit = 'contain'
		},
		setContainer() {
			this.container = document.querySelector(`#${this.id} .${this.$style.marqueeSliderContainer}`)
		},
		setContainerWidth() {
			if (this.autoWidth) {
				this.container.style.width = `${this.itemsLength * (this.containerWidth / this.itemsLength + this.space)}px`
			} else {
				this.container.style.width = `${this.itemsLength * (this.width + this.space)}px`
			}
		}
	}
}
</script>
<style module>
.marqueeSlider {
	overflow: hidden;
}

.marqueeSliderContainer {
	width: 100%;
	animation-name: animation;
	animation-timing-function: linear;
	animation-iteration-count: infinite;
	display: flex;
}

@keyframes animation {
	0% {
		transform: translateX(0%);
	}
	100% {
		transform: translateX(-100%);
	}
}
</style>
