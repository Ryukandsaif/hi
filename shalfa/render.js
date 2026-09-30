const {chromium}=require('/opt/node22/lib/node_modules/playwright');
const fs=require('fs');
(async()=>{
 const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
 const p=await b.newPage({viewport:{width:1080,height:1920}});
 await p.goto('file://'+__dirname+'/index.html?static');
 await p.evaluate(()=>window.ready);
 fs.mkdirSync('frames',{recursive:true});
 const only=process.argv[2]?process.argv[2].split(',').map(Number):null;
 const N=300;
 for(let i=0;i<N;i++){
  const t=i/30; if(only&&!only.includes(i))continue;
  await p.evaluate(t=>window.renderFrame(t),t);
  const el=await p.$('canvas');
  await el.screenshot({path:`frames/f${String(i).padStart(4,'0')}.png`});
 }
 await b.close();
})();
