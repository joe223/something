export default class Drop {
	constructor(root, op) {
		this.root = root
		this.op = op
		this.dragEl = null
		this.dragCount = 0  // for dragenter dragleave
		this.effectAllowed = 'move'

		this.$on(root, 'mousedown', e => {
			this.dragEl = this.$getTargetEl(e.target)
			if (!this.dragEl || !this.$checkPull()) return
			this.dragEl.setAttribute('draggable', 'true')
			this.$prepareDrag()
		})

		this.$on(root, 'mouseup', e => {
			const {dragEl} = this
			dragEl && dragEl.removeAttribute('draggable')
			this.$reset()
		})

		this.$on(root, 'dragstart', e => {
			if (e.dataTransfer) {
				e.dataTransfer.effectAllowed = this.effectAllowed
				e.dataTransfer.setData('Text', this.dragEl)
			}
			Drop.active = this.$group()
		})

		this.$on(root, 'dragenter', e => {
			this.dragCount++
			// this.$log(this.dragCount,  this.$checkPut())
			if (this.dragCount === 1 && this.$checkPut()) {
				this.$emit('Dragenter', e)
			}
		})

		this.$on(root, 'dragover', e => {
			this.$emit('Dragover', e)
			e.preventDefault()  // from drop event
		})

		this.$on(root, 'dragleave', e => {
			this.dragCount--
			if (this.dragCount === 0) {
				this.$emit('Dragleave', e)
			}
		})

		this.$on(root, 'drop', e => {
			if (e.dataTransfer) {
				e.dataTransfer.dropEffect = this.effectAllowed
			}
			if (this.dragCount > 0 && this.$checkPut()) {
				// 同组才能 drop in
				this.$emit('Dropin', e)
			}
			this.$emit('Drop', e)
			this.$reset()
			e.preventDefault()
		})
		this.$on(root, 'dragend', e => {
			this.$emit('Dragend', e)
			this.$reset()
			e.preventDefault()
		})
	}

	$getTargetEl(evtEl) {
		const {root, op} = this
		let els = root.children
		let cls = Array.from(root.querySelectorAll(op.draggable))
		els = !op.draggable ? els : Array.prototype.filter.call(els, el => {
			return cls.indexOf(el) > -1
		})
		return Array.prototype.find.call(els, el => el.contains(evtEl))
	}

	$prepareDrag() {
		Drop.dragEl = this.dragEl
	}

	$reset() {
		this.$log('reset data')
		Drop.active = null
		Drop.dragEl = null
		this.dragEl = null
		this.dragCount = 0
	}

	$on(el, evt, cb) {
		const _this = this
		el.addEventListener(evt, e => {
			if (_this.op.disable === true) return
			cb && cb(e)
		})
	}

	$emit(evtName, e) {
		if (this.op && this.op[`on${evtName}`]) {
			this.op[`on${evtName}`](this.$formatEvt(e), e)
		}
	}

	$group() {
		const {group} = this.op
		const isObj = typeof group === 'object'
		return {
			name: isObj ? group.name : group,
			pull: isObj ? group.pull === void 0 ? true : !!group.pull : true,
			put: isObj ? group.put === void 0 ? true : !!group.put : true
		}
	}

	$checkPut() {
		const group = this.$group()
		return group.put && Drop.active.name === group.name
	}

	$checkPull() {
		return this.$group().pull
	}

	$formatEvt(e) {
		return {
			p: this.$getEvtPosi(e),
			item: Drop.dragEl
		}
	}

	$log(...msg) {
		this.op.debug && console.log(...msg)
	}

	$getEvtPosi(e) {
		const rootPosi = this.root.getBoundingClientRect()
		const evtPosi = {x: e.clientX, y: e.clientY}
		return {
			x: evtPosi.x,
			y: evtPosi.y,
			relativeX: evtPosi.x - rootPosi.left,
			relativeY: evtPosi.y - rootPosi.top
		}
	}
}
