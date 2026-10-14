const fs = require('fs');

// Read the original HTML file
const content = fs.readFileSync('C:\\projects\\iad\\Studio Ia.D (1).html', 'utf-8');

// Extract the CSS
const cssMatch = content.match(/<style>([\s\S]*?)<\/style>/);
let css = cssMatch ? cssMatch[1] : '';

// Strictly black and white adjustment
css = css.replace('--w:#fff;--k:#0f0f0f;--g:#858585;--l:rgba(15,15,15,.16)', '--w:#fff;--k:#000;--g:#666;--l:rgba(0,0,0,.2)');
// Make sure fonts match exactly as requested (League Spartan for text, Glacial Indifference for headings)
css = css.replace('--d:"Glacial Indifference","Jost","Century Gothic",sans-serif;--t:"League Spartan","Helvetica Neue",Arial,sans-serif;', '--d:"Glacial Indifference",sans-serif;--t:"League Spartan",sans-serif;');
css = css.replace('.im{position:absolute;inset:-8% 0;background:#c9c9c9 var(--img) center/cover;filter:grayscale(var(--gs)) contrast(1.04)}', '.im{position:absolute;inset:-8% 0;background:#c9c9c9 var(--img) center/cover;filter:grayscale(1) contrast(1.04)}');

// Extract the body content (without script)
let bodyHTML = content.substring(content.indexOf('<body>') + 6, content.lastIndexOf('<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>'));

// Update text data using the exact data from normal homepage
bodyHTML = bodyHTML.replace('House of Light', 'The Modern Villa');
bodyHTML = bodyHTML.replace('Retail Space', 'House of Light');
bodyHTML = bodyHTML.replace('Kothi', 'Nature Retreat');
bodyHTML = bodyHTML.replace('<b>House of Light</b>', '<b>The Modern Villa</b>');
bodyHTML = bodyHTML.replace('<b>Retail Space</b>', '<b>House of Light</b>');
bodyHTML = bodyHTML.replace('<b>Kothi</b>', '<b>Nature Retreat</b>');

// Construct the new React component
const reactComponent = `
"use client";
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLenis } from 'lenis/react';

export default function AltRevamp() {
  const lenis = useLenis();
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    gsap.registerPlugin(ScrollTrigger);

    var SRC={
      "kA": "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=2000", 
      "kB": "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=2000", 
      "kC": "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=2000", 
      "founder": "https://studio-iad-design-preview.ekta-soni9514.chatgpt.site/assets/ishan.jpg", 
      "t1": "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=500", 
      "t2": "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=500", 
      "t3": "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=500", 
      "t4": "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=500",
      "c1": "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=500", 
      "c2": "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=500", 
      "c3": "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=500",
      "s1": "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=2000", 
      "s2": "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=2000", 
      "s3": "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=2000"
    };
    var MAP={hero:"kA",p1:"kB",p2:"kC",p3:"kA",w:"kC",s1:"s1",s2:"s2",s3:"s3",c1:"c1",c2:"c2",c3:"c3",f:"founder", t1:"t1", t2:"t2", t3:"t3", t4:"t4"};

    var reduce=window.matchMedia("(prefers-reduced-motion:reduce)").matches;
    var fine=window.matchMedia("(hover:hover)").matches;
    var $ = function(s,c){return Array.from((c||containerRef.current).querySelectorAll(s))};
    var E = function(i){return containerRef.current.querySelector('#'+i)};

    $(".im").forEach(function(im){var u=SRC[MAP[im.dataset.k]||im.dataset.k];if(u)im.style.setProperty("--img","url("+u+")")});

    var L=lenis;
    if(L) {
      L.on("scroll",ScrollTrigger.update);
      gsap.ticker.add(function(t){L.raf(t*1000)});
      gsap.ticker.lagSmoothing(0);
    }
    
    let ctx = gsap.context(() => {
      function go(h){var el=document.querySelector(h);if(!el)return;L?L.scrollTo(el):el.scrollIntoView({behavior:"smooth"})}
      $('a[href^="#"]').forEach(function(a){var h=a.getAttribute("href");if(h.length>1)a.addEventListener("click",function(e){e.preventDefault();if(menu.style.visibility==="visible")closeMenu(function(){go(h)});else go(h)})});

      var menu=E("menu"),mb=E("mb"),mph=$(".mp .ph");
      function openMenu(){menu.style.visibility="visible";mb.setAttribute("aria-expanded","true");if(L)L.stop();
       gsap.to(menu,{clipPath:"inset(0 0 0% 0)",duration:reduce?0:1.1,ease:"expo.inOut"});
       if(!reduce)gsap.from("#menu li a,#menu .fo",{yPercent:40,autoAlpha:0,duration:1.1,stagger:.08,delay:.35,ease:"expo.out"})}
      function closeMenu(cb){mb.setAttribute("aria-expanded","false");gsap.to(menu,{clipPath:"inset(0 0 100% 0)",duration:reduce?0:.9,ease:"expo.inOut",onComplete:function(){menu.style.visibility="hidden";if(L)L.start();if(cb)cb()}})}
      mb.onclick=openMenu;E("mc").onclick=function(){closeMenu()};window.addEventListener("keydown",function(e){if(e.key==="Escape"&&menu.style.visibility==="visible")closeMenu()});
      $("#menu li a").forEach(function(a){a.addEventListener("mouseenter",function(){mph.forEach(function(p,i){p.classList.toggle("on",i==a.dataset.s)})})});

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

      var sl=E("sl"),cards=$(".tc"),cn=E("cn");
      function step(){return cards[0].getBoundingClientRect().width+parseFloat(window.getComputedStyle(sl).columnGap||0)}
      E("nb").onclick=function(){sl.scrollBy({left:step(),behavior:"smooth"})};E("pb").onclick=function(){sl.scrollBy({left:-step(),behavior:"smooth"})};
      sl.addEventListener("scroll",function(){cn.textContent=Math.min(cards.length,Math.round(sl.scrollLeft/step())+1)+" / "+cards.length});

      if(!reduce){
       restart();
       gsap.timeline()
        .fromTo("#hph",{clipPath:"inset(46% 30% 46% 30%)"},{clipPath:"inset(0% 0% 0% 0%)",duration:2.4,ease:"expo.inOut"},.1)
        .from("#hph .im",{scale:1.35,duration:3.4,ease:"expo.out"},.1)
        .from("#hp,.hero .bt",{y:40,autoAlpha:0,duration:1.5,stagger:.15,ease:"expo.out"},1.6)
        .from(".hd",{autoAlpha:0,duration:1.2},2);
       gsap.to("#hph .im",{yPercent:12,ease:"none",scrollTrigger:{trigger:".hero",start:"top top",end:"bottom top",scrub:true}});

       gsap.fromTo("#fph",{clipPath:"inset(100% 0 0 0)"},{clipPath:"inset(0% 0 0 0)",duration:2,ease:"expo.inOut",scrollTrigger:{trigger:"#founder",start:"top 70%"}});
       gsap.from("#founder>div:first-child>*",{autoAlpha:0,y:40,duration:1.5,stagger:.12,ease:"expo.out",scrollTrigger:{trigger:"#founder",start:"top 65%"}});
       gsap.from(".wt>*",{autoAlpha:0,y:50,duration:1.6,stagger:.15,ease:"expo.out",scrollTrigger:{trigger:".wt",start:"top 80%"}});
       gsap.fromTo("#wph",{clipPath:"inset(0 12% 0 12%)"},{clipPath:"inset(0 0% 0 0%)",ease:"none",scrollTrigger:{trigger:"#wph",start:"top 90%",end:"top 20%",scrub:true}});
       gsap.from(".wh>*,.row",{autoAlpha:0,y:40,duration:1.4,stagger:.1,ease:"expo.out",scrollTrigger:{trigger:"#work",start:"top 75%"}});
       gsap.from(".tc",{autoAlpha:0,x:80,duration:1.6,stagger:.12,ease:"expo.out",scrollTrigger:{trigger:"#sl",start:"top 88%"}});
       $("#fph .im,#wph .im,.tc .im").forEach(function(im){gsap.fromTo(im,{yPercent:-5},{yPercent:5,ease:"none",scrollTrigger:{trigger:im.parentNode,start:"top bottom",end:"bottom top",scrub:true}})});

       if(fine){var pv=E("pv"),pp=$(".ph",pv),qx=gsap.quickTo(pv,"x",{duration:.7,ease:"power3"}),qy=gsap.quickTo(pv,"y",{duration:.7,ease:"power3"});
        $(".row").forEach(function(r){
         r.addEventListener("mouseenter",function(){pp.forEach(function(p,i){p.classList.toggle("on",i==r.dataset.i)});gsap.to(pv,{opacity:1,scale:1,duration:.7,ease:"expo.out"})});
         r.addEventListener("mousemove",function(e){qx(e.clientX+40);qy(e.clientY-pv.offsetHeight/2)});
         r.addEventListener("mouseleave",function(){gsap.to(pv,{opacity:0,scale:.85,duration:.5,ease:"expo.out"})})})}

       $(".cl").forEach(function(c){gsap.fromTo(c,{y:-(+c.dataset.sp)},{y:+c.dataset.sp,ease:"none",scrollTrigger:{trigger:"#cta",start:"top bottom",end:"bottom top",scrub:true}})});
       gsap.from("#cta h2,#cta .bt",{autoAlpha:0,y:50,duration:1.6,stagger:.15,ease:"expo.out",scrollTrigger:{trigger:"#cta",start:"top 55%"}});

       gsap.from(".big span",{yPercent:110,duration:1.6,stagger:.06,ease:"expo.out",scrollTrigger:{trigger:".big",start:"top 92%"}});
      }
    }, containerRef);
    
    return () => ctx.revert();
  }, [lenis]);

  return (
    <div ref={containerRef}>
      <style dangerouslySetInnerHTML={{__html: \`${css.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\`}} />
      <div dangerouslySetInnerHTML={{__html: \`${bodyHTML.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\`}} />
    </div>
  );
}
`;

fs.writeFileSync('C:\\projects\\iad\\studio-iad\\src\\app\\alt-revamp\\page.js', reactComponent);
