var copy1 = document.getElementById('copy1'),
    copy2 = document.getElementById('copy2'),
    grad1 = document.getElementById('top_grad'),
    grad2 = document.getElementById('bottom_grad'),
    logo = document.getElementById('logo'),
    mainClick = document.getElementById('main-click'),
    cta = document.getElementById('cta'),
    replay = document.getElementById('replay'),
    scribble = document.getElementById('scribble');

var tl, Banner = {
    init: function(){
        if (document.readyState === "complete") {
            if(typeof(TweenLite) !== "function") {
                setTimeout( Banner.init, 10200 );
            } else {
                Banner.setup();
                Banner.addListeners();
            }
        }
    },
    setup: function(){
        tl = new TimelineLite({paused:false, delay:1 , onComplete: function() {
            replay.addEventListener("click", Banner.restart, !1);
        }});

        TweenLite.delayedCall(1, Banner.build);
    },
    build: function(){
      
       tl.set(loading,{autoAlpha:0},"+=1")
          .add("play")
          .add([
              TweenLite.set(grad1, {y:33}),
              TweenLite.set(copy1, {y:+20})
          ])
          .add([
              TweenLite.to(grad1, 1.5,{y:190, ease:Power3.easeOut}),
              TweenLite.to(copy1, 1.5,{y:0, ease:Power3.easeOut})
          ])
          .add([
            TweenLite.set(scribble, {alpha:0.9, delay: 0.1}),
            TweenLite.to(scribble, 0.56, {backgroundPosition:"-3120px, 0", ease:SteppedEase.config(12)})
          ],"+=1.2")
          
          .set(grad1, {y:-189},"+=2")

          .add([
             TweenLite.to(grad1, 3.5,{y:-56, ease:Power3.easeIn}),
             TweenLite.to([scribble,copy1], 3.5,{y:-59, ease:Power3.easeIn})
          ])

          .set([copy1,scribble],{alpha:0})
          .set(grad1,{y:1})
          .set(grad2,{alpha:1, y:87})
          .set(copy2,{alpha:1, y:50})
          .set(logo,{alpha:1, y:80})

            .add([
                TweenLite.to(grad1, 3.5,{y:290, ease:Power3.easeOut}),
                TweenLite.to(copy2, 3.5,{y:0, ease:Power3.easeOut})
            ])

            .add([
                TweenLite.to(copy2, 2.5,{y:-79, ease:Power3.easeIn})
             ])

            .add([
               TweenLite.to(grad2, 2,{y:320, ease:Power3.easeOut}),
               TweenLite.to(logo, 2,{y:0, ease:Power3.easeOut})
            ])
          
          .add( TweenLite.to(replay, 0.4, {alpha:1}));  
    },
    restart: function(){
        Enabler.counter("REPLAY_BANNER");
        replay.removeEventListener("click", Banner.restart);
        TweenLite.set(loading, {alpha:1});
        TweenLite.delayedCall(0.1, function(){
            tl.seek("play");
        });
    },
    addListeners: function(){
        mainClick.addEventListener("click", Banner.exitHandler, !1);
        replay.addEventListener("mouseover", Banner.replay.overHandler, !1);
        replay.addEventListener("mouseout", Banner.replay.outHandler, !1);
    },
    replay: {
        overHandler: function(a) {
            TweenLite.to(a.target, 0.3, {rotation: 360, ease: Sine.easeIn});
        },
        outHandler: function(a) {
            TweenLite.to(a.target, 0.3, {rotation: 0, ease: Sine.easeOut});
        }
    },
    exitHandler: function(a){
        var b = a.target.id;
        switch(b){
            case "backup":
                Enabler.exit("2-BACKUP_EXIT");
                break;
            default:
            case "main-click":
                Enabler.exit("1-DEFAULT_EXIT");
                break;
        }
    }

   
};