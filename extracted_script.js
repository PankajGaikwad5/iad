<script>
var SRC={"kA": "IMAGE", "kB": "IMAGE", "kC": "IMAGE", "founder": "IMAGE", "t1": "IMAGE", "t2": "IMAGE", "t3": "IMAGE", "t4": "IMAGE"};
/* Photos are cropped from your screenshots. Replace any entry in SRC with a better original (URL or data URI).
   Slots reuse them via MAP. Photos show in black and white; set --gs:0 on :root for colour. */
var MAP={hero:"kA",p1:"kB",p2:"kC",p3:"kA",w:"kC",s1:"kB",s2:"kC",s3:"kA",c1:"kA",c2:"kB",c3:"kC",f:"founder"};

(function(){
var reduce=matchMedia("(prefers-reduced-motion:reduce)").matches,fine=matchMedia("(hover:hover)").matches,$=function(s,c){return Array.from((c||document).querySelectorAll(s))},E=function(i){return document.getElementById(i)};
gsap.registerPlugin(ScrollTrigger);
$(".im").forEach(function(im){var u=SRC[MAP[im.dataset.k]||im.dataset.k];if(u)im.style.setProperty("--img","url("+u+")")});

var L=null;
if(window.Lenis&&!reduce){L=new Lenis({duration:1.4,easing:function(t){return Math.min(1,1.001-Math.pow(2,-10*t))}});L.on("scroll",ScrollTrigger.update);gsap.ticker.add(function(t){L.raf(t*1000)});gsap.ticker.lagSmoothing(0)}
function go(h){var el=document.querySelector(h);if(!el)return;L?L.scrollTo(el):el.scrollIntoView({behavior:"smooth"})}
$('a[href^="#"]').forEach(function(a){var h=a.getAttribute("href");if(h.length>1)a.addEventListener("click",function(e){e.preventDefault();if(menu.style.visibility==="visible")closeMenu(function(){go(h)});else go(h)})});

/* menu */
var menu=E("menu"),mb=E("mb"),mph=$(".mp .ph");
function openMenu(){menu.style.visibility="visible";mb.setAttribute("aria-expanded","true");if(L)L.stop();
 gsap.to(menu,{clipPath:"inset(0 0 0% 0)",duration:reduce?0:1.1,ease:"expo.inOut"});
 if(!reduce)gsap.from("#menu li a,#menu .fo",{yPercent:40,autoAlpha:0,duration:1.1,stagger:.08,delay:.35,ease:"expo.out"})}
function closeMenu(cb){mb.setAttribute("aria-expanded","false");gsap.to(menu,{clipPath:"inset(0 0 100% 0)",duration:reduce?0:.9,ease:"expo.inOut",onComplete:function(){menu.style.visibility="hidden";if(L)L.start();if(cb)cb()}})}
mb.onclick=openMenu;E("mc").onclick=function(){closeMenu()};addEventListener("keydown",function(e){if(e.key==="Escape"&&menu.style.visibility==="visible")closeMenu()});
$("#menu li a").forEach(function(a){a.addEventListener("mouseenter",function(){mph.forEach(function(p,i){p.classList.toggle("on",i==a.dataset.s)})})});

/* featured slider */
var sd=$(".sd"),cur=0,busy=false,fn=E("fn"),auto;
sd.forEach(function(s,i){var h=$("h2 b",s)[0];if(i)gsap.set(h,{yPercent:110})});
function show(n){n=(n+sd.length)%sd.length;if(n===cur||busy)return;busy=true;var a=sd[cur],b=sd[n],dir=1;
 gsap.set(b,{zIndex:2,clipPath:"inset(0 0 0 100%)"});gsap.set(a,{zIndex:1});
 gsap.timeline({onComplete:function(){busy=false;gsap.set(a,{clipPath:"inset(0 0 0 100%)"});cur=n}})
  .to(b,{clipPath:"inset(0 0 0 0)",duration:reduce?0:1.4,ease:"expo.inOut"},0)
  .fromTo($(".im",b),{scale:1.25,xPercent:8},{scale:1,xPercent:0,duration:reduce?0:2,ease:"expo.out"},0)
  .to($("h2 b",a),{yPercent:-110,duration:.8,ease:"expo.in"},0)
  .fromTo($("h2 b",b),{yPercent:110},{yPercent:0,duration:1.4,ease:"expo.out"},.5);
 fn.textContent=(n+1)+" / "+sd.length;if(!reduce)restart()}
function restart(){if(auto)auto.kill();auto=gsap.delayedCall(6.5,function(){show(cur+1)})}
E("fx").onclick=function(){show(cur+1)};E("fp").onclick=function(){show(cur-1)};

/* team slider */
var sl=E("sl"),cards=$(".tc"),cn=E("cn");
function step(){return cards[0].getBoundingClientRect().width+parseFloat(getComputedStyle(sl).columnGap||0)}
E("nb").onclick=function(){sl.scrollBy({left:step(),behavior:"smooth"})};E("pb").onclick=function(){sl.scrollBy({left:-step(),behavior:"smooth"})};
sl.addEventListener("scroll",function(){cn.textContent=Math.min(cards.length,Math.round(sl.scrollLeft/step())+1)+" / "+cards.length});

if(!reduce){
 restart();
 /* hero */
 gsap.timeline()
  .fromTo("#hph",{clipPath:"inset(46% 30% 46% 30%)"},{clipPath:"inset(0% 0% 0% 0%)",duration:2.4,ease:"expo.inOut"},.1)
  .from("#hph .im",{scale:1.35,duration:3.4,ease:"expo.out"},.1)
  .from("#hp,.hero .bt",{y:40,autoAlpha:0,duration:1.5,stagger:.15,ease:"expo.out"},1.6)
  .from(".hd",{autoAlpha:0,duration:1.2},2);
 gsap.to("#hph .im",{yPercent:12,ease:"none",scrollTrigger:{trigger:".hero",start:"top top",end:"bottom top",scrub:true}});

 /* reveals */
 gsap.fromTo("#fph",{clipPath:"inset(100% 0 0 0)"},{clipPath:"inset(0% 0 0 0)",duration:2,ease:"expo.inOut",scrollTrigger:{trigger:"#founder",start:"top 70%"}});
 gsap.from("#founder>div:first-child>*",{autoAlpha:0,y:40,duration:1.5,stagger:.12,ease:"expo.out",scrollTrigger:{trigger:"#founder",start:"top 65%"}});
 gsap.from(".wt>*",{autoAlpha:0,y:50,duration:1.6,stagger:.15,ease:"expo.out",scrollTrigger:{trigger:".wt",start:"top 80%"}});
 gsap.fromTo("#wph",{clipPath:"inset(0 12% 0 12%)"},{clipPath:"inset(0 0% 0 0%)",ease:"none",scrollTrigger:{trigger:"#wph",start:"top 90%",end:"top 20%",scrub:true}});
 gsap.from(".wh>*,.row",{autoAlpha:0,y:40,duration:1.4,stagger:.1,ease:"expo.out",scrollTrigger:{trigger:"#work",start:"top 75%"}});
 gsap.from(".tc",{autoAlpha:0,x:80,duration:1.6,stagger:.12,ease:"expo.out",scrollTrigger:{trigger:"#sl",start:"top 88%"}});
 $("#fph .im,#wph .im,.tc .im").forEach(function(im){gsap.fromTo(im,{yPercent:-5},{yPercent:5,ease:"none",scrollTrigger:{trigger:im.parentNode,start:"top bottom",end:"bottom top",scrub:true}})});

 /* list preview follows the cursor */
 if(fine){var pv=E("pv"),pp=$(".ph",pv),qx=gsap.quickTo(pv,"x",{duration:.7,ease:"power3"}),qy=gsap.quickTo(pv,"y",{duration:.7,ease:"power3"});
  $(".row").forEach(function(r){
   r.addEventListener("mouseenter",function(){pp.forEach(function(p,i){p.classList.toggle("on",i==r.dataset.i)});gsap.to(pv,{opacity:1,scale:1,duration:.7,ease:"expo.out"})});
   r.addEventListener("mousemove",function(e){qx(e.clientX+40);qy(e.clientY-pv.offsetHeight/2)});
   r.addEventListener("mouseleave",function(){gsap.to(pv,{opacity:0,scale:.85,duration:.5,ease:"expo.out"})})})}

 /* collage drifts at different speeds around the headline */
 $(".cl").forEach(function(c){gsap.fromTo(c,{y:-(+c.dataset.sp)},{y:+c.dataset.sp,ease:"none",scrollTrigger:{trigger:"#cta",start:"top bottom",end:"bottom top",scrub:true}})});
 gsap.from("#cta h2,#cta .bt",{autoAlpha:0,y:50,duration:1.6,stagger:.15,ease:"expo.out",scrollTrigger:{trigger:"#cta",start:"top 55%"}});

 /* footer letters */
 gsap.from(".big span",{yPercent:110,duration:1.6,stagger:.06,ease:"expo.out",scrollTrigger:{trigger:".big",start:"top 92%"}});
}
})();
</script>
</body>
</html>
