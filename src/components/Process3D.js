"use client";
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Process3D() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const stgRef = useRef([]);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;
    
    // Check for reduced motion
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    const cv = canvasRef.current;
    const sec = containerRef.current;
    
    let renderer;
    try { 
      renderer = new THREE.WebGLRenderer({ canvas: cv, alpha: true, antialias: true }); 
    } catch (e) { 
      sec.style.display = 'none'; 
      return; 
    }
    
    renderer.setClearColor(0x000000, 0);
    const scene = new THREE.Scene();
    const cam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 100);
    scene.add(new THREE.AmbientLight(0xffffff, 0.7));
    const sun = new THREE.DirectionalLight(0xffffff, 0.8); 
    sun.position.set(5, 9, 4); 
    scene.add(sun);
    const root = new THREE.Group(); 
    scene.add(root);

    const P = [];
    function bx(w, h, d) { return new THREE.BoxGeometry(w, h, d).translate(0, h / 2, 0); }
    function cy(r, h, s) { return new THREE.CylinderGeometry(r, r, h, s || 14).translate(0, h / 2, 0); }
    
    function add(geo, x, y, z, kind, a, b, glass) {
      const g = new THREE.Group(); 
      g.position.set(x, y, z);
      const fm = new THREE.MeshLambertMaterial({ transparent: true, polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 1 });
      const lm = new THREE.LineBasicMaterial({ transparent: true });
      const m = new THREE.Mesh(geo, fm);
      const l = new THREE.LineSegments(new THREE.EdgesGeometry(geo, 20), lm);
      if (glass) { fm.depthWrite = false; m.renderOrder = 2; l.renderOrder = 3; }
      g.add(m, l); 
      root.add(g); 
      g.visible = false;
      P.push({ g: g, fm: fm, lm: lm, kind: kind, a: a, b: b, glass: !!glass, y: y });
    }
    
    // Stage 2: Massing & Base (0.16 to 0.35)
    add(bx(10, 0.3, 7), 0, 0, 0, 'grow', 0.16, 0.3); // Main slab
    add(bx(5, 0.2, 4), -2, 0.3, 1.5, 'grow', 0.18, 0.32); // Pool deck extension
    
    [-4.5, -1, 4.5].forEach((x, i) => {
      add(cy(0.12, 3.2), x, 0.3, 3, 'grow', 0.25 + i * 0.02, 0.4);
      add(cy(0.12, 3.2), x, 0.3, -3, 'grow', 0.27 + i * 0.02, 0.42);
    });

    // Stage 3: Structure & Volumes (0.35 to 0.55)
    add(bx(2.5, 3.2, 0.2), -3.5, 0.3, -3, 'fade', 0.35, 0.45); // Solid wall
    add(bx(0.2, 3.2, 5), 4.9, 0.3, 0, 'fade', 0.38, 0.48); // Right wall
    add(bx(4, 3.2, 3), 1, 0.3, -1, 'grow', 0.4, 0.52); // Core volume
    
    // Stage 4: Envelope & Facades (0.55 to 0.75)
    add(bx(7.8, 3.2, 0.05), -0.5, 0.3, 3, 'fade', 0.55, 0.65, true); // Front glass
    add(bx(8.8, 3.2, 0.05), -0.5, 0.3, -3, 'fade', 0.57, 0.67, true); // Back glass
    add(bx(11, 0.4, 8), 0, 3.5, 0, 'drop', 0.6, 0.75); // Roof
    
    // Stage 5: Fit-out & Details (0.75 to 1.0)
    add(bx(4.6, 0.05, 3.6), -2, 0.4, 1.5, 'fade', 0.75, 0.85, true); // Pool surface
    add(bx(1.5, 0.8, 0.8), 1, 0.3, 0.5, 'pop', 0.8, 0.85); // Kitchen island
    add(bx(2, 0.1, 1), -1, 0.3, 0, 'pop', 0.82, 0.87); // Dining table
    add(cy(0.4, 0.05, 16), 2.5, 0.3, 1, 'pop', 0.84, 0.89); // Feature planter

    /* plan: grid */
    const N = 200;
    const pp = [];
    const per = [[-5, -3.5], [5, -3.5], [5, 3.5], [-5, 3.5], [-5, -3.5]];
    for (let i = 0; i <= N; i++) {
      const u = i / N * 4, s = Math.min(3, Math.floor(u)), t = u - s;
      pp.push(per[s][0] + (per[s + 1][0] - per[s][0]) * t, 0.02, per[s][1] + (per[s + 1][1] - per[s][1]) * t);
    }
    const pg = new THREE.BufferGeometry(); 
    pg.setAttribute('position', new THREE.Float32BufferAttribute(pp, 3));
    const planMat = new THREE.LineBasicMaterial({ transparent: true }); 
    const plan = new THREE.Line(pg, planMat); 
    root.add(plan);
    const grid = new THREE.GridHelper(26, 26); 
    grid.material.transparent = true; 
    root.add(grid);

    /* Light Theme Colours Matching Studio Ia.D */
    const inkCol = new THREE.Color('#222222'); // Dark lines
    const accCol = new THREE.Color('#111111'); // Dark accent
    const fillCol = new THREE.Color('#ffffff'); // White solid materials
    const glassCol = new THREE.Color('#e0e0e0'); // Light grey glass
    
    P.forEach(function (p) { 
      p.fm.color.copy(p.glass ? glassCol : fillCol); 
      p.lm.color.copy(p.glass ? accCol : inkCol); 
    });
    planMat.color.copy(accCol); 
    grid.material.color.copy(new THREE.Color('#cccccc'));

    let W = 1, H = 1, aspect = 1;
    function size() {
      const r = cv.getBoundingClientRect(); 
      W = Math.max(1, r.width); 
      H = Math.max(1, r.height); 
      aspect = W / H;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2)); 
      renderer.setSize(W, H, false);
      const vh = aspect < 1 ? 20 : 12.5;
      const vw = vh * aspect;
      const sx = aspect > 1.25 ? vw * 0.17 : 0;
      cam.left = -vw / 2 - sx; 
      cam.right = vw / 2 - sx; 
      cam.top = vh / 2; 
      cam.bottom = -vh / 2; 
      cam.updateProjectionMatrix();
    }
    
    const seg = (p, a, b) => Math.min(1, Math.max(0, (p - a) / (b - a)));
    const easeO = (t) => 1 - Math.pow(1 - t, 3);
    const back = (t) => { const c = 1.7; return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2); };

    let lastStage = -1;
    let pT = 0, pC = 0, mx = 0, my = 0, sx2 = 0, sy2 = 0;
    
    const onMouseMove = (e) => { 
      mx = e.clientX / window.innerWidth - 0.5; 
      my = e.clientY / window.innerHeight - 0.5; 
    };
    window.addEventListener('mousemove', onMouseMove);

    function draw(snap) {
      if (!sec) return;
      const r = sec.getBoundingClientRect();
      pT = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height - window.innerHeight)));
      pC += (pT - pC) * (snap ? 1 : 0.09);
      sx2 += (mx - sx2) * 0.05; sy2 += (my - sy2) * 0.05;
      const p = pC;
      
      P.forEach(function (o) {
        const t = seg(p, o.a, o.b), e = easeO(t), g = o.g;
        g.visible = t > 0.001;
        if (!g.visible) return;
        g.scale.set(1, 1, 1); 
        g.position.y = o.y;
        if (o.kind === 'grow') g.scale.y = e;
        else if (o.kind === 'drop') { g.position.y = o.y + (1 - e) * 4; }
        else if (o.kind === 'pop') g.scale.setScalar(Math.max(0.001, back(t)));
        const op = (o.kind === 'fade' || o.kind === 'drop') ? e : 1;
        o.fm.opacity = (o.glass ? 0.35 : 1) * op; 
        o.lm.opacity = (o.glass ? 0.8 : 1) * op;
      });
      
      const tp = seg(p, 0, 0.18);
      pg.setDrawRange(0, Math.max(2, Math.floor(easeO(tp) * (N + 1))));
      planMat.opacity = 1 - seg(p, 0.3, 0.45) * 0.7;
      grid.material.opacity = 0.3 * Math.min(1, tp * 3);
      
      const az = (-38 + 100 * seg(p, 0.05, 1)) * Math.PI / 180 + sx2 * 0.35;
      const el = (26 + sy2 * 10) * Math.PI / 180;
      const R = 32;
      cam.position.set(Math.sin(az) * Math.cos(el) * R, Math.sin(el) * R, Math.cos(az) * Math.cos(el) * R);
      cam.lookAt(0, 1.3, 0);
      
      const st = p < 0.16 ? 0 : p < 0.3 ? 1 : p < 0.5 ? 2 : p < 0.78 ? 3 : 4;
      if (st !== lastStage) { 
        stgRef.current.forEach((li, k) => { 
          if(li) li.classList.toggle('on', k === st); 
        }); 
        lastStage = st; 
      }
      
      const fill = document.getElementById('bFill-custom');
      if(fill) fill.style.width = (p * 100).toFixed(1) + '%';
      
      renderer.render(scene, cam);
    }
    
    let rafId;
    function loop() {
      const r = sec.getBoundingClientRect();
      if (!document.hidden && r.bottom > -50 && r.top < window.innerHeight + 50) draw(reduce);
      rafId = requestAnimationFrame(loop);
    }
    
    size(); 
    draw(true);
    
    let rt; 
    const onResize = () => { 
      clearTimeout(rt); 
      rt = setTimeout(() => { size(); draw(true); }, 120); 
    };
    window.addEventListener('resize', onResize);
    
    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(rafId);
      scene.clear();
      renderer.dispose();
    };
  }, []);

  return (
    <section ref={containerRef} className="build-section relative" aria-label="Our Process">
      <style dangerouslySetInnerHTML={{__html: `
        .build-section { height: 460vh; border-top: 1px solid rgba(0,0,0,0.1); border-bottom: 1px solid rgba(0,0,0,0.1); background-color: #f7f7f7; }
        .build-pin { position: sticky; top: 0; height: 100vh; padding-top: 4.2rem; display: flex; width: 100%; }
        .bCv-canvas { position: absolute; inset: 0; width: 100%; height: 100%; display: block; pointer-events: none; }
        .build-ui { position: relative; z-index: 1; align-self: center; max-width: 420px; padding-left: max(20px, 4vw); }
        .eyebrow-text { font-family: sans-serif; font-size: 12px; text-transform: uppercase; letter-spacing: 0.18em; color: #111; display: flex; align-items: center; gap: 0.7rem; }
        .eyebrow-text::before { content: ""; width: 26px; height: 1px; background: #111; display: inline-block; }
        .build-ui h2 { font-size: clamp(32px, 4vw, 54px); font-family: 'Glacial Indifference', sans-serif; font-weight: 300; letter-spacing: -0.02em; line-height: 1.08; margin: 0.7rem 0 2rem; text-transform: uppercase; color: #111; }
        .build-ui h2 em { font-style: italic; font-weight: 300; color: #111; }
        .stg { list-style: none; margin: 0; padding: 0; }
        .stg li { display: grid; grid-template-columns: 2.2rem 1fr; padding: 0.8rem 0 0.8rem 0.9rem; border-left: 2px solid rgba(0,0,0,0.1); opacity: 0.35; transition: opacity 0.4s, border-color 0.4s; }
        .stg li.on { opacity: 1; border-color: #111; }
        .stg b { font-family: sans-serif; font-weight: 400; font-size: 0.74rem; color: #888; padding-top: 0.2rem; }
        .stg li.on b { color: #111; }
        .stg strong { display: block; font-size: 1.12rem; letter-spacing: -0.01em; color: #111; }
        .stg em { display: block; font-style: normal; color: #444; font-size: 0.92rem; max-height: 0; overflow: hidden; transition: max-height 0.5s ease; }
        .stg li.on em { max-height: 6rem; margin-top: 0.25rem; }
        .bprog { height: 2px; background: rgba(0,0,0,0.1); margin-top: 1.4rem; }
        .bprog i { display: block; height: 100%; width: 0; background: #111; }
        @media (max-width:860px) {
          .build-ui { align-self: flex-end; max-width: none; width: 100%; padding: 1.5rem 20px 1.5rem; background: rgba(247,247,247,0.85); backdrop-filter: blur(8px); }
          .build-ui h2 { display: none; }
          .stg li:not(.on) { display: none; }
        }
      `}} />
      <div className="build-pin">
        <canvas ref={canvasRef} className="bCv-canvas" aria-hidden="true"></canvas>
        <div className="build-ui">
          <div className="eyebrow-text">Process</div>
          <h2>Designed from the<br/><em>ground up</em></h2>
          <ol className="stg">
            <li ref={el => stgRef.current[0] = el}><b>01</b><span><strong>Site &amp; Context</strong><em>Establishing the axes. Sun paths, site lines, and spatial planning.</em></span></li>
            <li ref={el => stgRef.current[1] = el}><b>02</b><span><strong>Foundation &amp; Massing</strong><em>The base framework. Core materials and structural layout.</em></span></li>
            <li ref={el => stgRef.current[2] = el}><b>03</b><span><strong>Spatial Organization</strong><em>Defining the volumes. How spaces transition and interact.</em></span></li>
            <li ref={el => stgRef.current[3] = el}><b>04</b><span><strong>The Envelope</strong><em>Facades and fenestration. Controlling how light enters the building.</em></span></li>
            <li ref={el => stgRef.current[4] = el}><b>05</b><span><strong>Interior &amp; Materiality</strong><em>The human scale. Textures, finishes, and the subtle details.</em></span></li>
          </ol>
          <div className="bprog"><i id="bFill-custom"></i></div>
        </div>
      </div>
    </section>
  );
}
