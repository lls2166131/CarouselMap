//前后图片索引生成
const nextImg = (index, offset) => {
    let newIndex = 0
    let imgs = parseInt(e('.all').dataset.imgs)
    if (offset == -1) {
        newIndex = (imgs + offset + index) % imgs
    } else if (offset == 1) {
        newIndex =   (offset + index) % imgs
    }
    return newIndex
}

//轮播图片
const changeImg = (newIndex) => {
    let newId = '#photo-' + String(newIndex)
    //remove all className
    let className = 'active'
    removeClassAll(className)
    // add className
    let img = e(newId)
    img.classList.add(className)
    let n = (-8) * (newIndex)
    e('.box-reflect').style.transform = `translateX(${n}rem)`
}

//绑定点击图片轮播事件
const bindClickImgs = () => {
    let photos = es('.photo')
    bindAll(photos, EventType.click, (event) => {
        log('click  imgs')
        let self = event.target
        let all = self.closest('.all')
        //index
        let index = parseInt(self.dataset.id)
        log('click imgs index', index)
        //show
        changeImg(index)
        //save  index
        all.dataset.active = index
    })
}

//绑定前一张、后一张图片按钮
const bindClickBtn = () => {
    let btn= e('.button')
    bindEvent(btn, EventType.click, (event) => {
        log('click btn')
        let self = event.target
        let all = self.closest('.all')
        // index 
        let index = parseInt(all.dataset.active)
        let offset = parseInt(self.dataset.offset)
        let newIndex = nextImg(index, offset)
        log('click btn newIndex', newIndex)
        //  show 
        changeImg(newIndex)
        // save  index
        all.dataset.active = newIndex
    })
}

//自动轮播
const autoImage = function() {
    let all = e('.all')
    let index = parseInt(all.dataset.active)
    let offset = +1
    let newIndex = nextImg(index, offset)
    log('new_index', newIndex)
    // showAll(new_index)
    changeImg(newIndex)
    // save  index
    all.dataset.active = newIndex
}

//周期性自动轮播
const autoPlay = function() {
    let fps = 3000
    setInterval(function() {
        autoImage()
    }, fps)
}

//绑定所有事件
const bindEvents = () => {
    bindClickImgs()
    bindClickBtn()
}

//主函数
const __main = () => {
    bindEvents()
    autoPlay()
}

__main()
