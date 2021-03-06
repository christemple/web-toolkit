if (typeof window.define === "function" && window.define.amd) {
//    explicitly call all js files here to ensure all files are available
    define('toolkit',[
        'utils/polyfill',
        'utils/detect',
        'utils/skycons',
        'utils/hash-manager',
        'utils/popup',
        'utils/toggle',
        'utils/focus',
        'utils/event',
        'components/in-page-nav',
        'components/accordion',
        'components/form',
        'components/lightbox',
        'components/share',
        'components/tooltip',
        'components/video',
        'components/carousel'], function(
            polyfill, detect, skycons, hashManager, popup,toggle, focus, validation, event,
            inPageNav, accordion, datePicker, lightbox, share, tooltip, video, carousel){

        return {
            polyfill: polyfill,
            detect: detect,
            skycons: skycons,
            hashManager: hashManager,
            popup: popup,
            toggle: toggle,
            focus: focus,
            validation: validation,
            event: event,
            inPageNav: inPageNav,
            accordion: accordion,
            datePicker: datePicker,
            lightbox: lightbox,
            share: share,
            tooltip: tooltip,
            video: video,
            carousel: carousel
        };
    });
}