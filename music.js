class Music {
    constructor(title, singer, img, file) {
        this.title = title;
        this.singer = singer;
        this.img = img;
        this.file = file;
    }

    getName() {
        return this.title + " - " + this.singer
    }
}


const musicList = [
    new Music("After Hours", "The Weeknd", "theweeknd.jpg", "Weeknd1.mp3"),
    new Music("I Like You", "Post Malone, Doja Cat", "posty.png", "PM-DC1.mp3"),
    new Music("One Right Now", "Post Malone, The Weeknd", "posty.png", "PM-Weeknd.mp3"),
    new Music("All Eyez On Me", "2Pac", "2pac.jpg", "2pac.mp3"),
    new Music("Element Slowed", "Pop Smoke", "element.png", "element-slowed.mp3")
]

