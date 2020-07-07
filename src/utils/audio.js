import { Howl } from 'howler';
// import homeBgMp3 from '@/assets/mp3/home_bg.mp3';

export const CLOSED = 'closed';
export const SoundType = {
    bgm: 'bgm'
};

class Audio {
    constructor(option) {
        this.audio = new Howl({
            html5: true,
            xhrWithCredentials: true,
            ...option
        });
    }
    play(type) {
        if (type) {
            const mute = localStorage.getItem(type) === CLOSED ? true : false;
            if (mute) {
                return;
            }
        }
        if (this.audio.playing()) {
            this.audio.stop();
        }
        this.audio.play();
    }
    stop() {
        this.audio.stop();
    }
    playing() {
        return this.audio.playing();
    }
    on(event, callback, id) {
        this.audio.on(event, callback, id);
    }
    off(event, callback, id) {
        this.audio.off(event, callback, id);
    }
    unload() {
        this.audio.unload();
    }
}

const homeBgm = new Audio({
    src: 'homeBgMp3',
    loop: true,
    autoplay: false,
    volume: 0.5
});

export const SoundManage = {
    homeBgm: {
        play: () => {
            homeBgm.play(SoundType.bgm);
        },
        stop: () => homeBgm.stop()
    }
};

export default Audio;
