const vehicles = {
  truck: {image:'assets/gray-truck.jpg',alt:'GRAY Mobility commercial electric truck',name:'COMMERCIAL TRUCK MOBILITY',eyebrow:'APPLICATION',status:'CONFIGURATION 01 / TRUCK',text:'A commercial truck configuration for freight transport and logistics operations.'},
  staff: {image:'assets/staff-van-high-resolution.jpg',alt:'Staff van electric shuttle concept',name:'CORPORATE MOBILITY',eyebrow:'APPLICATION',status:'CONFIGURATION 02 / STAFF VAN',text:'A passenger transport configuration intended for corporate staff movement and managed fleet operations.'},
  school: {image:'assets/school-shuttle.jpg',alt:'School van electric shuttle concept',name:'STUDENT MOBILITY',eyebrow:'APPLICATION',status:'CONFIGURATION 03 / SCHOOL VAN',text:'A mission-specific passenger transport concept for school operators, designed around the needs of daily routes and fleet operations.'},
  ambulance: {image:'assets/ambulance.jpg',alt:'Emergency mobility vehicle concept',name:'EMERGENCY MOBILITY',eyebrow:'APPLICATION',status:'CONFIGURATION 04 / EMERGENCY RESPONSE',text:'An emergency response vehicle concept that adapts the common electric platform for specialist healthcare and response applications.'},
  cargo: {image:'assets/reefer-van.jpg',alt:'Commercial transport electric van concept',name:'COMMERCIAL MOBILITY',eyebrow:'APPLICATION',status:'CONFIGURATION 05 / COMMERCIAL TRANSPORT',text:'A commercial transport concept for logistics and temperature-sensitive deliveries, with configurable cargo applications.'}
};
const visual = document.getElementById('vehicleVisual');
const vehicleImage = document.getElementById('vehicleImage');
let activeVehicle = 'truck';
function selectVehicle(key, shouldScroll=false){
  const item = vehicles[key]; if(!item) return;
  activeVehicle = key;
  document.querySelectorAll('.vehicle-tab').forEach(tab=>{const active=tab.dataset.vehicle===key;tab.classList.toggle('active',active);tab.setAttribute('aria-selected',String(active));});
  document.getElementById('assemblyStatus').textContent = item.status;
  document.getElementById('vehicleEyebrow').textContent = item.eyebrow;
  document.getElementById('vehicleTitle').textContent = item.name;
  document.getElementById('vehicleText').textContent = item.text;
  vehicleImage.src=item.image;
  vehicleImage.alt=item.alt;
  visual.classList.add('assembled');
  if(shouldScroll) document.getElementById('transformation').scrollIntoView({behavior:'smooth'});
}
document.querySelectorAll('.vehicle-tab').forEach(tab=>tab.addEventListener('click',()=>selectVehicle(tab.dataset.vehicle)));
document.querySelectorAll('[data-select]').forEach(card=>card.addEventListener('click',()=>selectVehicle(card.dataset.select)));
const observer = new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
const menuToggle=document.getElementById('menuToggle'), mainNav=document.getElementById('mainNav');
menuToggle.addEventListener('click',()=>{const open=mainNav.classList.toggle('open');menuToggle.setAttribute('aria-expanded',String(open));siteHeader.classList.toggle('is-menu-open',open);});
mainNav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{mainNav.classList.remove('open');menuToggle.setAttribute('aria-expanded','false');siteHeader.classList.remove('is-menu-open');}));
const siteHeader=document.getElementById('top');
const updateHeaderOnScroll=()=>{
  const isScrolled=window.scrollY>12;
  siteHeader.classList.toggle('is-scrolled',isScrolled);
  // Detect the page section passing behind the fixed header and adapt contrast.
  const headerProbeY=siteHeader.offsetHeight/2;
  const lightSections=[...document.querySelectorAll('.intro, .statement, .portfolio, .enterprise')];
  const lightSectionUnderHeader=lightSections.some(section=>{
    const rect=section.getBoundingClientRect();
    return rect.top<=headerProbeY && rect.bottom>headerProbeY;
  });
  siteHeader.classList.toggle('is-over-light',isScrolled && lightSectionUnderHeader);
  const max=document.documentElement.scrollHeight-window.innerHeight;
  document.getElementById('scrollProgress').style.width=(max>0?window.scrollY/max*100:0)+'%';
};
window.addEventListener('scroll',updateHeaderOnScroll,{passive:true});
updateHeaderOnScroll();
document.getElementById('year').textContent=new Date().getFullYear();
// Vehicle configuration is displayed directly; no chassis-to-body transition.
