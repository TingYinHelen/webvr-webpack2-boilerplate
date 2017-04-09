import '../css/load-control';
export default class LoadControl {
	constructor(radius = 37.5) {
		this.radius = radius;
		this.animate = false;
		this.initDom();
	}
	static Dom(radius) {
		return `<svg class="svg-load">
						<circle cx="50%" cy="50%" r="${radius}"></circle>   
						<text x="50%" y="50%" text-anchor="middle" dominant-baseline="central">Loading...</text>
					</svg>`.repeat(2);
	}
	initDom() {
		const DOM = LoadControl.Dom(this.radius);
		this.dom = document.createElement('section');
		this.dom.className += 'load-control';
		this.dom.innerHTML = DOM;
		document.body.appendChild(this.dom);
		this.cricle = this.dom.querySelectorAll('circle');
		this.loadDom = this.dom.querySelectorAll('svg');
		this.cloneDom = this.loadDom[1];
		this.singleDom();
	}
	singleDom() {
		this.cloneDom.style.display = 'none';
	}
	doubleDom() {
		this.cloneDom.style.display = 'block';
	}
	hasAnimate() {
		return this.animate;
	}
	initAnimate(count) {
		if(!(typeof(count) === 'number') || count <=0 ) return false;
		this.animate = true;
		this.loadDataset = {
			count: count,
			rest: count,
			cricleLength: this.radius * 2 *  Math.PI,
			offest: 0,
			unloadLength: 0
		};
		Array.from(this.cricle).forEach(l => {
			l.style.strokeDasharray = `${this.loadDataset.cricleLength} ${this.loadDataset.cricleLength}`;
			l.style.strokeDashoffset = this.loadDataset.cricleLength;
		});
		this.loadDataset.unloadLength = this.loadDataset.cricleLength;
		this.loadDataset.offest = 1/this.loadDataset.count * this.loadDataset.cricleLength;
	}
	loadItem() {
		let strokeDashoffset = this.loadDataset.unloadLength -= this.loadDataset.offest;
		Array.from(this.cricle).forEach(l => {
			l.style.transition = 'none';
			l.style.transition = 'stroke-dashoffset 1s';
			l.style.strokeDashoffset = strokeDashoffset;
		});
		return --this.loadDataset.rest;
	}
	loadedAll() {
		this.dom.className += ' loaded';
		this.dom.addEventListener('webkitTransitionEnd',e => {
			this.clear();
		});
		this.dom.addEventListener('transitionend',e => {
			this.clear();
		});
	}
	clear() {
		this.dom.remove();
	}
}