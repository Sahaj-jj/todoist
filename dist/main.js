(()=>{"use strict";const e=(()=>{const e=[],t=t=>{let d=e.find((e=>e.getName()===t));return d||(d=(e=>{let t=e,d=[];return{getName:()=>t,addHandler:e=>{d.push(e)},invokeHandlers:e=>{d.forEach((t=>{t(e)}))}}})(t),e.push(d)),d};return{publish:(e,d)=>{t(e).invokeHandlers(d)},subscribe:(e,d)=>{t(e).addHandler(d)}}})(),t=(()=>{const t=document.querySelector(".category-container"),d=document.querySelector(".add-category"),r=(e,t=null,d=null)=>{const r=document.createElement(e);return t&&t.forEach((e=>r.classList.add(e))),d&&(r.textContent=d),r},n=e=>{const d=t.lastChild.lastChild;d.addEventListener("click",(()=>{a(d.parentNode,e.getName())}))},i=e=>{t.appendChild((e=>{const t=r("div",["category"]);return t.appendChild(r("div",["text"],e)),t.appendChild(r("div",["delete","btn"],"x")),t})(e.getName()))},a=(t,d)=>{t.remove(),e.publish("categoryRemoved",d)};return{init:()=>{d.addEventListener("click",(()=>{e.publish("addCategory",prompt("Enter"))})),e.subscribe("categoryAdded",i),e.subscribe("categoryAdded",n)}}})(),d=(()=>{const t=[],d=e=>t.find((t=>t.getName()===e)),r=r=>{if(d(r))return void alert("This category already exists!");const n=(t=>{let d=t,r=[];return{getName:()=>d,addItem:t=>{r.push({id:r.length,content:t}),e.publish("itemAdded",r.slice(-1))}}})(r);t.push(n),e.publish("categoryAdded",n)},n=e=>{const r=t.indexOf(d(e));t.splice(r,1)};return{init:()=>{e.subscribe("addCategory",r),e.subscribe("categoryRemoved",n)}}})();t.init(),d.init()})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoibUJBYUEsTUE2Q0EsRUE3QmUsTUFDWCxNQUFNQSxFQUFVLEdBRVZDLEVBQWVDLElBQ2pCLElBQUlDLEVBQVFILEVBQVFJLE1BQUtELEdBQVNBLEVBQU1FLFlBQWNILElBS3RELE9BSktDLElBQ0RBLEVBdEJHLENBQUNELElBQ1osSUFBSUksRUFBT0osRUFDUEssRUFBVyxHQVdkLE1BQU8sQ0FBRUYsUUFUTSxJQUFNQyxFQVNIRSxXQVJDQyxJQUNoQkYsRUFBU0csS0FBS0QsSUFPYUUsZUFMUEMsSUFDcEJMLEVBQVNNLFNBQVFDLElBQ2JBLEVBQUdGLFNBWUtHLENBQU9iLEdBQ2ZGLEVBQVFVLEtBQUtQLElBRVZBLEdBYVgsTUFBTyxDQUNIYSxRQVhZLENBQUNkLEVBQVdVLEtBQ1ZYLEVBQVdDLEdBQ25CUyxlQUFlQyxJQVVyQkssVUFQYyxDQUFDZixFQUFXTyxLQUNaUixFQUFXQyxHQUNuQk0sV0FBV0MsTUFuQlYsR0M4QmYsRUF6RFcsTUFDUCxNQUFNUyxFQUFxQkMsU0FBU0MsY0FBYyx1QkFDNUNDLEVBQWtCRixTQUFTQyxjQUFjLGlCQUV6Q0UsRUFBb0IsQ0FBQ0MsRUFBTUMsRUFBYSxLQUFNQyxFQUFVLFFBQzFELE1BQU1DLEVBQVVQLFNBQVNRLGNBQWNKLEdBR3ZDLE9BRklDLEdBQVlBLEVBQVdYLFNBQVFlLEdBQU9GLEVBQVFHLFVBQVVDLElBQUlGLEtBQzVESCxJQUFTQyxFQUFRSyxZQUFjTixHQUM1QkMsR0FVTE0sRUFBb0JDLElBQ3RCLE1BQU1DLEVBQWFoQixFQUFtQmlCLFVBQVVBLFVBQ2hERCxFQUFXRixpQkFBaUIsU0FBUyxLQUNqQ0ksRUFBZUYsRUFBV0csV0FBWUosRUFBSTVCLGVBYTVDaUMsRUFBZUwsSUFDakJmLEVBQW1CcUIsWUF4QkgsQ0FBQ0MsSUFDakIsTUFBTUMsRUFBT25CLEVBQWtCLE1BQU8sQ0FBQyxhQUd2QyxPQUZBbUIsRUFBS0YsWUFBWWpCLEVBQWtCLE1BQU8sQ0FBQyxRQUFTa0IsSUFDcERDLEVBQUtGLFlBQVlqQixFQUFrQixNQUFPLENBQUMsU0FBVSxPQUFRLE1BQ3REbUIsR0FvQndCQyxDQUFZVCxFQUFJNUIsYUFHN0MrQixFQUFpQixDQUFDTyxFQUFZSCxLQUNoQ0csRUFBV0MsU0FDWCxVQUFlLGtCQUFtQkosSUFZdEMsTUFBTyxDQUNISyxLQVZTLEtBQ1R4QixFQUFnQlcsaUJBQWlCLFNBQVMsS0FDdEMsVUFBZSxjQUFlYyxPQUFPLGFBR3pDLFlBQWlCLGdCQUFpQlIsR0FDbEMsWUFBaUIsZ0JBQWlCTixNQWpEL0IsR0NZTGUsRUFBcUIsTUFFdkIsTUFBTUMsRUFBYSxHQUViQyxFQUFlVCxHQUNWUSxFQUFXNUMsTUFBSzZCLEdBQU9BLEVBQUk1QixZQUFjbUMsSUFHOUNGLEVBQWVFLElBQ2pCLEdBQUlTLEVBQVlULEdBRVosWUFEQVUsTUFBTSxpQ0FHVixNQUFNakIsRUNsQkcsQ0FBQ08sSUFDZCxJQUFJbEMsRUFBT2tDLEVBQ1BXLEVBQVEsR0FhWixNQUFPLENBQ0g5QyxRQVpZLElBQU1DLEVBYWxCOEMsUUFYYUMsSUFDYkYsRUFBTXpDLEtBYkgsQ0FDSDRDLEdBWWdCSCxFQUFNSSxPQVh0QjlCLFFBVzhCNEIsSUFDOUIsVUFBZSxZQUFhRixFQUFNSyxPQUFPLE9EVTdCLENBQVNoQixHQUNyQlEsRUFBV3RDLEtBQUt1QixHQUNoQixVQUFlLGdCQUFpQkEsSUFHOUJHLEVBQWtCSSxJQUNwQixNQUFNaUIsRUFBUVQsRUFBV1UsUUFBUVQsRUFBWVQsSUFDN0NRLEVBQVdXLE9BQU9GLEVBQU8sSUFRN0IsTUFBTyxDQUNIWixLQU5TLEtBQ1QsWUFBaUIsY0FBZVAsR0FDaEMsWUFBaUIsa0JBQW1CRixNQXpCakIsR0FpQzNCLFNBQ0FXLEVBQW1CRixRIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kb2lzdC8uL3NyYy9tb2R1bGVzL3B1YnN1Yi5qcyIsIndlYnBhY2s6Ly90b2RvaXN0Ly4vc3JjL21vZHVsZXMvVUkuanMiLCJ3ZWJwYWNrOi8vdG9kb2lzdC8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly90b2RvaXN0Ly4vc3JjL21vZHVsZXMvY2F0ZWdvcnkuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLypcbkV2ZW50cyA6XG5cbmFkZEl0ZW1cbml0ZW1BZGRlZFxuXG5hZGRDYXRlZ29yeVxucmVtb3ZlQ2F0ZWdvcnlcbnVwZGF0ZUNhdGVnb3JpZXNcblxuKi9cblxuXG5jb25zdCBfRXZlbnQgPSAoZXZlbnROYW1lKSA9PiB7XG4gICAgbGV0IG5hbWUgPSBldmVudE5hbWU7XG4gICAgbGV0IGhhbmRsZXJzID0gW107XG5cbiAgICBjb25zdCBnZXROYW1lID0gKCkgPT4gbmFtZTtcbiAgICBjb25zdCBhZGRIYW5kbGVyID0gKGhhbmRsZXIpID0+IHtcbiAgICAgICAgaGFuZGxlcnMucHVzaChoYW5kbGVyKTtcbiAgICB9ICAgXG4gICAgY29uc3QgaW52b2tlSGFuZGxlcnMgPSAoZXZlbnRBcmdzKSA9PiB7XG4gICAgICAgIGhhbmRsZXJzLmZvckVhY2goZm4gPT4ge1xuICAgICAgICAgICAgZm4oZXZlbnRBcmdzKTtcbiAgICAgICAgfSlcbiAgICB9XG4gICAgIHJldHVybiB7IGdldE5hbWUsIGFkZEhhbmRsZXIsIGludm9rZUhhbmRsZXJzLH07XG59XG5cbmNvbnN0IFB1YlN1YiA9ICgoKSA9PiB7XG4gICAgY29uc3QgX2V2ZW50cyA9IFtdO1xuXG4gICAgY29uc3QgY2hlY2tFdmVudCAgPSAoZXZlbnROYW1lKSA9PiB7XG4gICAgICAgIGxldCBldmVudCA9IF9ldmVudHMuZmluZChldmVudCA9PiBldmVudC5nZXROYW1lKCkgPT09IGV2ZW50TmFtZSk7XG4gICAgICAgIGlmICghZXZlbnQpIHtcbiAgICAgICAgICAgIGV2ZW50ID0gX0V2ZW50KGV2ZW50TmFtZSk7XG4gICAgICAgICAgICBfZXZlbnRzLnB1c2goZXZlbnQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBldmVudDtcbiAgICB9XG5cbiAgICBjb25zdCBwdWJsaXNoID0gKGV2ZW50TmFtZSwgZXZlbnRBcmdzKSA9PiB7XG4gICAgICAgIGNvbnN0IGV2ZW50ID0gY2hlY2tFdmVudChldmVudE5hbWUpO1xuICAgICAgICBldmVudC5pbnZva2VIYW5kbGVycyhldmVudEFyZ3MpO1xuICAgIH1cblxuICAgIGNvbnN0IHN1YnNjcmliZSA9IChldmVudE5hbWUsIGhhbmRsZXIpID0+IHtcbiAgICAgICAgY29uc3QgZXZlbnQgPSBjaGVja0V2ZW50KGV2ZW50TmFtZSk7XG4gICAgICAgIGV2ZW50LmFkZEhhbmRsZXIoaGFuZGxlcik7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgcHVibGlzaCwgXG4gICAgICAgIHN1YnNjcmliZSxcbiAgICB9O1xuXG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBQdWJTdWI7IiwiaW1wb3J0IFB1YlN1YiBmcm9tIFwiLi9wdWJzdWJcIjtcblxuY29uc3QgVUkgPSAoKCkgPT4ge1xuICAgIGNvbnN0ICRjYXRlZ29yeUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jYXRlZ29yeS1jb250YWluZXInKTtcbiAgICBjb25zdCAkYWRkQ2F0ZWdvcnlCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkLWNhdGVnb3J5Jyk7XG5cbiAgICBjb25zdCBjcmVhdGVIdG1sRWxlbWVudCA9ICh0eXBlLCBjbGFzc0FycmF5ID0gbnVsbCwgY29udGVudCA9IG51bGwpID0+IHtcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodHlwZSk7XG4gICAgICAgIGlmIChjbGFzc0FycmF5KSBjbGFzc0FycmF5LmZvckVhY2goY2xzID0+IGVsZW1lbnQuY2xhc3NMaXN0LmFkZChjbHMpKTtcbiAgICAgICAgaWYgKGNvbnRlbnQpIGVsZW1lbnQudGV4dENvbnRlbnQgPSBjb250ZW50O1xuICAgICAgICByZXR1cm4gZWxlbWVudDtcbiAgICB9XG5cbiAgICBjb25zdCBuZXdDYXRlZ29yeSA9IChjYXRlZ29yeU5hbWUpID0+IHtcbiAgICAgICAgY29uc3QgJGNhdCA9IGNyZWF0ZUh0bWxFbGVtZW50KCdkaXYnLCBbJ2NhdGVnb3J5J10pO1xuICAgICAgICAkY2F0LmFwcGVuZENoaWxkKGNyZWF0ZUh0bWxFbGVtZW50KCdkaXYnLCBbJ3RleHQnXSwgY2F0ZWdvcnlOYW1lKSk7XG4gICAgICAgICRjYXQuYXBwZW5kQ2hpbGQoY3JlYXRlSHRtbEVsZW1lbnQoJ2RpdicsIFsnZGVsZXRlJywgJ2J0biddLCAneCcpKTtcbiAgICAgICAgcmV0dXJuICRjYXQ7XG4gICAgfVxuXG4gICAgY29uc3QgYWRkRXZlbnRMaXN0ZW5lciA9IChjYXQpID0+IHtcbiAgICAgICAgY29uc3QgJGRlbGV0ZWJ0biA9ICRjYXRlZ29yeUNvbnRhaW5lci5sYXN0Q2hpbGQubGFzdENoaWxkO1xuICAgICAgICAkZGVsZXRlYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgcmVtb3ZlQ2F0ZWdvcnkoJGRlbGV0ZWJ0bi5wYXJlbnROb2RlLCBjYXQuZ2V0TmFtZSgpKTtcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICAvLyBjb25zdCB1cGRhdGVDYXRlZ29yaWVzID0gKGNhdEFycmF5KSA9PiB7XG4gICAgLy8gICAgIHdoaWxlKCRjYXRlZ29yeUNvbnRhaW5lci5jaGlsZEVsZW1lbnRDb3VudCA+IDEpXG4gICAgLy8gICAgICAgICAkY2F0ZWdvcnlDb250YWluZXIubGFzdENoaWxkLnJlbW92ZSgpO1xuXG4gICAgLy8gICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2F0QXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAvLyAgICAgICAgICRjYXRlZ29yeUNvbnRhaW5lci5hcHBlbmRDaGlsZChuZXdDYXRlZ29yeShjYXRBcnJheVtpXS5nZXROYW1lKCkpKTtcbiAgICAvLyAgICAgfVxuICAgIC8vIH1cblxuICAgIGNvbnN0IGFkZENhdGVnb3J5ID0gKGNhdCkgPT4ge1xuICAgICAgICAkY2F0ZWdvcnlDb250YWluZXIuYXBwZW5kQ2hpbGQobmV3Q2F0ZWdvcnkoY2F0LmdldE5hbWUoKSkpO1xuICAgIH1cblxuICAgIGNvbnN0IHJlbW92ZUNhdGVnb3J5ID0gKGNhdEVsZW1lbnQsIGNhdGVnb3J5TmFtZSkgPT4ge1xuICAgICAgICBjYXRFbGVtZW50LnJlbW92ZSgpO1xuICAgICAgICBQdWJTdWIucHVibGlzaCgnY2F0ZWdvcnlSZW1vdmVkJywgY2F0ZWdvcnlOYW1lKTtcbiAgICB9XG5cbiAgICBjb25zdCBpbml0ID0gKCkgPT4ge1xuICAgICAgICAkYWRkQ2F0ZWdvcnlCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICBQdWJTdWIucHVibGlzaCgnYWRkQ2F0ZWdvcnknLCBwcm9tcHQoJ0VudGVyJykpO1xuICAgICAgICB9KVxuXG4gICAgICAgIFB1YlN1Yi5zdWJzY3JpYmUoJ2NhdGVnb3J5QWRkZWQnLCBhZGRDYXRlZ29yeSk7XG4gICAgICAgIFB1YlN1Yi5zdWJzY3JpYmUoJ2NhdGVnb3J5QWRkZWQnLCBhZGRFdmVudExpc3RlbmVyKTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBpbml0LFxuICAgIH07XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBVSTtcblxuXG5cbiIsImltcG9ydCBQdWJTdWIgZnJvbSBcIi4vbW9kdWxlcy9wdWJzdWJcIjtcbmltcG9ydCBVSSBmcm9tIFwiLi9tb2R1bGVzL1VJXCI7XG5pbXBvcnQgQ2F0ZWdvcnkgZnJvbSBcIi4vbW9kdWxlcy9jYXRlZ29yeVwiXG5cbi8vIGZ1bmN0aW9uIHRlc3QoKSB7XG4vLyAgICAgY29uc3QgY2F0ID0gQ2F0ZWdvcnkoJ2hpJyk7XG5cbi8vICAgICBQdWJTdWIuc3Vic2NyaWJlKCdhZGRJdGVtJywgY2F0LmFkZEl0ZW0pO1xuLy8gICAgIFB1YlN1Yi5wdWJsaXNoKCdhZGRJdGVtJywgJ3Rlc3QnKTtcbi8vIH1cblxuLy8gdGVzdCgpO1xuXG5cbmNvbnN0IENhdGVnb3J5Q29udHJvbGxlciA9ICgoKSA9PiB7XG5cbiAgICBjb25zdCBjYXRlZ29yaWVzID0gW107XG5cbiAgICBjb25zdCBnZXRDYXRlZ29yeSA9IChjYXRlZ29yeU5hbWUpID0+IHtcbiAgICAgICAgcmV0dXJuIGNhdGVnb3JpZXMuZmluZChjYXQgPT4gY2F0LmdldE5hbWUoKSA9PT0gY2F0ZWdvcnlOYW1lKTtcbiAgICB9XG4gICAgXG4gICAgY29uc3QgYWRkQ2F0ZWdvcnkgPSAoY2F0ZWdvcnlOYW1lKSA9PiB7XG4gICAgICAgIGlmIChnZXRDYXRlZ29yeShjYXRlZ29yeU5hbWUpKSB7XG4gICAgICAgICAgICBhbGVydCgnVGhpcyBjYXRlZ29yeSBhbHJlYWR5IGV4aXN0cyEnKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBjYXQgPSBDYXRlZ29yeShjYXRlZ29yeU5hbWUpO1xuICAgICAgICBjYXRlZ29yaWVzLnB1c2goY2F0KTtcbiAgICAgICAgUHViU3ViLnB1Ymxpc2goJ2NhdGVnb3J5QWRkZWQnLCBjYXQpO1xuICAgIH1cblxuICAgIGNvbnN0IHJlbW92ZUNhdGVnb3J5ID0gKGNhdGVnb3J5TmFtZSkgPT4ge1xuICAgICAgICBjb25zdCBpbmRleCA9IGNhdGVnb3JpZXMuaW5kZXhPZihnZXRDYXRlZ29yeShjYXRlZ29yeU5hbWUpKTtcbiAgICAgICAgY2F0ZWdvcmllcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cblxuICAgIGNvbnN0IGluaXQgPSAoKSA9PiB7XG4gICAgICAgIFB1YlN1Yi5zdWJzY3JpYmUoJ2FkZENhdGVnb3J5JywgYWRkQ2F0ZWdvcnkpO1xuICAgICAgICBQdWJTdWIuc3Vic2NyaWJlKCdjYXRlZ29yeVJlbW92ZWQnLCByZW1vdmVDYXRlZ29yeSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgaW5pdCxcbiAgICB9O1xufSkoKTtcblxuVUkuaW5pdCgpO1xuQ2F0ZWdvcnlDb250cm9sbGVyLmluaXQoKTtcblxuXG5cblxuIiwiaW1wb3J0IFB1YlN1YiBmcm9tIFwiLi9wdWJzdWJcIjtcblxuY29uc3QgSXRlbSA9IChpZCwgY29udGVudCkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAgIGlkLFxuICAgICAgICBjb250ZW50LFxuICAgIH07XG59XG5cbmNvbnN0IENhdGVnb3J5ID0gKGNhdGVnb3J5TmFtZSkgPT4ge1xuICAgIGxldCBuYW1lID0gY2F0ZWdvcnlOYW1lO1xuICAgIGxldCBpdGVtcyA9IFtdO1xuXG4gICAgY29uc3QgZ2V0TmFtZSA9ICgpID0+IG5hbWU7XG5cbiAgICBjb25zdCBhZGRJdGVtID0gKGl0ZW1Db250ZW50KSA9PiB7XG4gICAgICAgIGl0ZW1zLnB1c2goSXRlbShpdGVtcy5sZW5ndGgsIGl0ZW1Db250ZW50KSk7XG4gICAgICAgIFB1YlN1Yi5wdWJsaXNoKCdpdGVtQWRkZWQnLCBpdGVtcy5zbGljZSgtMSkpO1xuICAgIH1cblxuICAgIC8vIGNvbnN0IHJlbW92ZUl0ZW0gPSAoaXRlbSkgPT4ge1xuICAgIC8vICAgICBcbiAgICAvLyB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBnZXROYW1lLFxuICAgICAgICBhZGRJdGVtLFxuICAgIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IENhdGVnb3J5OyJdLCJuYW1lcyI6WyJfZXZlbnRzIiwiY2hlY2tFdmVudCIsImV2ZW50TmFtZSIsImV2ZW50IiwiZmluZCIsImdldE5hbWUiLCJuYW1lIiwiaGFuZGxlcnMiLCJhZGRIYW5kbGVyIiwiaGFuZGxlciIsInB1c2giLCJpbnZva2VIYW5kbGVycyIsImV2ZW50QXJncyIsImZvckVhY2giLCJmbiIsIl9FdmVudCIsInB1Ymxpc2giLCJzdWJzY3JpYmUiLCIkY2F0ZWdvcnlDb250YWluZXIiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCIkYWRkQ2F0ZWdvcnlCdG4iLCJjcmVhdGVIdG1sRWxlbWVudCIsInR5cGUiLCJjbGFzc0FycmF5IiwiY29udGVudCIsImVsZW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiY2xzIiwiY2xhc3NMaXN0IiwiYWRkIiwidGV4dENvbnRlbnQiLCJhZGRFdmVudExpc3RlbmVyIiwiY2F0IiwiJGRlbGV0ZWJ0biIsImxhc3RDaGlsZCIsInJlbW92ZUNhdGVnb3J5IiwicGFyZW50Tm9kZSIsImFkZENhdGVnb3J5IiwiYXBwZW5kQ2hpbGQiLCJjYXRlZ29yeU5hbWUiLCIkY2F0IiwibmV3Q2F0ZWdvcnkiLCJjYXRFbGVtZW50IiwicmVtb3ZlIiwiaW5pdCIsInByb21wdCIsIkNhdGVnb3J5Q29udHJvbGxlciIsImNhdGVnb3JpZXMiLCJnZXRDYXRlZ29yeSIsImFsZXJ0IiwiaXRlbXMiLCJhZGRJdGVtIiwiaXRlbUNvbnRlbnQiLCJpZCIsImxlbmd0aCIsInNsaWNlIiwiaW5kZXgiLCJpbmRleE9mIiwic3BsaWNlIl0sInNvdXJjZVJvb3QiOiIifQ==