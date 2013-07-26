/**
 purpose:
 to let 'anchor' tags do their job and change the hash in the url for internal links.
 this will execute the associated callback with that hash.
 no onclick events needed.
 **/
if (typeof toolkit==='undefined') toolkit={};
toolkit.hashmanager = (function() {

    var vars = {
        globalHashList: {},
        hasLoaded: false,
        windowLoaded: false
    };

    function bindEvents() {
        $(window).on('hashchange', onHashChange);
        var hashChangeSupport = 'onhashchange' in window;
        if (!hashChangeSupport){ //IE7 support
            vars.hash = document.location.hash;
            setInterval(function(){
                if (document.location.hash !== vars.hash){
                    onHashChange(document.location.hash);
                }
            },200);
        }
        vars.windowLoaded = true;
    }

    function onHashChange(hash) {
        hash = cleanHash((typeof hash === 'string') ? hash : location.hash);
        var evt = vars.globalHashList[hash];
        if (!evt) { return; }
        evt.callback(hash);
    }

    function remove() {
        var loc = window.location;
        if ("pushState" in history) {
            location.hash = '!';
            history.pushState("", document.title, loc.pathname + loc.search);
        } else {
            location.hash = '!';
        }
    }

    function change(hash){
        location.hash = '!' + hash;
    }

    function register(hashList, callback){
        var globalHashList = vars.globalHashList;
        $(hashList).each(function(i, hash) {
            hash = cleanHash(hash);
            if (globalHashList[hash]){
                var err = 'hashManager: hash (' + hash + ') already exists';
                throw new Error(err);
            }
            globalHashList[hash] = {
                callback: callback
            };

            if (vars.windowLoaded && hash === cleanHash(location.hash)) {
                callback(hash);
            }
        });
    }

    function cleanHash(hash) {
        return hash.replace(/[#!]/g, '');
    }

    bindEvents();

    return {
        register: register,
        change: change,
        remove: remove,
        onHashChange: onHashChange,
        cleanHash: cleanHash
    };
}());

if (typeof window.define === "function" && window.define.amd) {
    window.define('utils/hashmanager', [], function() {
        return toolkit.hashmanager;
    });
}