function pubPayload(c,s){
 let p=0,a=0,t=0;const last=[];
 Object.keys(c.asistencia||{}).sort().forEach(d=>{const v=(c.asistencia||{})[d]?.[s.id];if(v){v==='P'?p++:v==='A'?a++:t++;last.push([d,v])}});
 const mats=(c.materias||[]).map(m=>{
  const notas=m.evaluaciones.map(e=>[e.tema+(e.tipo?' · '+e.tipo:''),(c.notas||{})[s.id]?.[e.id]]).filter(x=>x[1]!==undefined&&x[1]!==''&&x[1]!==null);
  const prac=(m.practicas||[]).map(pr=>{
   const hechos=(c.practicasHechas||{})[s.id]||[];
   const partes=[...Array(pr.partes)].map((_,i)=>hechos.includes('pt_morza_'+(i+1)));
   return {nombre:pr.nombre, partes, total:pr.partes};
  });
  const cie={};
  (m.cierres||[]).forEach(k=>{const v=(c.cierres||{})[s.id]?.[m.id+'_'+k];if(v!=null&&v!=='')cie[k]=v});
  return {id:m.id,nombre:m.nombre,notas,practicas:prac,cierres:cie};
 });
 return{n:s.nombre,c:c.nombre,u:td(),p,a,t,last:last.slice(-12).reverse(),materias:mats};
}