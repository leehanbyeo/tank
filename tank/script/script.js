$(document).ready(function(){
    var speed = 500; // 주인공 탱크의 움직이는 시간
    var dir = "t"; // 주인공 탱크의 방향
    var curpos = {
        x:225 , y:400
    }
    var bullet = "<img id='mybullet' src='images/bullet.png' alt='bullet' />";
    var reload = 900;
    var bspeed = 800;
    var emax = 5;
    var fire = true;
    var hero = "<img id='hero' src='images/hero.png'>";
    var enemy = "<img class='enemy' src='images/enemy.png'>";
    var expl = "images/explode.gif";
    
    function ini(){
        var firstpos = {
            x: 225 , y: 400
        }
                
        $("#stage").empty();
        $("#stage").append(hero);
        $("#hero").css({
            left: firstpos.x+"px", top: firstpos.y+"px"
        });
    }
    
    function where(){
        curpos.x = parseInt($("#hero").css("left"));
        curpos.y = parseInt($("#hero").css("top"));
    }
    
    // 랜덤한 정수 생성기
    //             2    6
    function rand(min, max){
        return Math.floor(Math.random()*(max-min+1) + min);
    }
    
    
    // ←(37)/↑(38)/→(39)/↓(40)/spacebar(32)
    var key = "";
    $(document).keydown(function(e){
        key = e.keyCode;
    });
    $(document).keyup(function(){
        key = "";
    });
    
    $(document).keydown(function(){
        switch(key){
            case 37:
                $("#hero").css("transform","rotate(-90deg)");
                dir = "l";
                $("#hero").stop().animate({
                    left: "-=30px"
                },{
                    duration:speed,
                    easing:"linear",
                    step: function(){
                        where();
                    }
                });
                break;
            case 38:
                $("#hero").css("transform","rotate(0deg)");
                dir = "t";
                $("#hero").stop().animate({
                    top: "-=30px"
                },{
                    duration:speed,
                    easing:"linear",
                    step: function(){
                        where();
                    }
                });
                break;
            case 39:
                $("#hero").css("transform","rotate(90deg)");
                dir = "r";
                $("#hero").stop().animate({
                    left: "+=30px"
                },{
                    duration:speed,
                    easing:"linear",
                    step: function(){
                        where();
                    }
                });
                break;
            case 40:
                $("#hero").css("transform","rotate(180deg)");
                dir = "b";
                $("#hero").stop().animate({
                    top: "+=30px"
                },{
                    duration:speed,
                    easing:"linear",
                    step: function(){
                        where();
                    }
                });
                break;
            case 32:
                if(fire){
                    var bulletdeg = 0;
                    switch (dir){
                        case "l": bulletdeg=-90; break;
                        case "t": bulletdeg=0; break;
                        case "r": bulletdeg=90; break;
                        case "b": bulletdeg=180; break;
                    }
                    $("#stage").append(bullet);
                    $("#mybullet").css({
                        left: curpos.x + 25-10 +"px",
                        top: curpos.y + 25-10 +"px",
                        transform: "rotate("+bulletdeg+"deg)"
                    });
                    switch (dir){
                        case "l": 
                            $("#mybullet").animate({
                                left: "-=500px"
                            },{
                                duration: bspeed,
                                easing: "linear",
                                step: function(){
                                    fire=false;
                                },
                                complete: function(){
                                    $("#mybullet").remove();
                                }
                            });
                            setTimeout(function(){ fire=true; }, reload);
                            break;
                        case "t": 
                            $("#mybullet").animate({
                                top: "-=500px"
                            },{
                                duration: bspeed,
                                easing: "linear",
                                step: function(){
                                    fire=false;
                                },
                                complete: function(){
                                    $("#mybullet").remove();
                                }
                            });
                            setTimeout(function(){ fire=true; }, reload);
                            break;
                        case "r": 
                            $("#mybullet").animate({
                                left: "+=500px"
                            },{
                                duration: bspeed,
                                easing: "linear",
                                step: function(){
                                    fire=false;
                                },
                                complete: function(){
                                    $("#mybullet").remove();
                                }
                            });
                            setTimeout(function(){ fire=true; }, reload);
                            break;
                        case "b": 
                            $("#mybullet").animate({
                                top: "+=500px"
                            },{
                                duration: bspeed,
                                easing: "linear",
                                step: function(){
                                    fire=false;
                                },
                                complete: function(){
                                    $("#mybullet").remove();
                                }
                            });
                            setTimeout(function(){ fire=true; }, reload);
                            break;
                    }
                }
                break;
        }
        
    });
        
    ini();
    
        
    // 적군 생성기
    var en = -1;
    function addenemy(){
        if($(".enemy").length < emax){
            en++;
            var ex = rand(0,450);
            var ey = rand(0,450);
            $("#stage").append(enemy);
            $(".enemy:last-of-type").addClass("e"+en);
            $(".e"+en).css({
                left: ex+"px",
                top: ey+"px"
            });
        }
    }
    
    setInterval(addenemy,rand(500,3000));
    
    
    
    
    
});















