self.addEventListener("push",event=>{
 let data={};try{data=event.data?event.data.json():{}}catch(_){}
 event.waitUntil(self.registration.showNotification(data.title||"Liflow｜予定のお知らせ",{
  body:data.body||"予定の開始時刻が近づいています。",
  tag:data.tag||"liflow-reminder",
  renotify:false,
  data:{url:data.url||"https://koseiliflow.github.io/liflow10/"}
 }));
});
self.addEventListener("notificationclick",event=>{
 event.notification.close();
 const target=event.notification.data?.url||"https://koseiliflow.github.io/liflow10/";
 event.waitUntil((async()=>{
  const windows=await clients.matchAll({type:"window",includeUncontrolled:true});
  for(const client of windows){if("focus" in client){await client.focus();if("navigate" in client)await client.navigate(target);return;}}
  if(clients.openWindow)await clients.openWindow(target);
 })());
});
self.addEventListener("install",event=>self.skipWaiting());
self.addEventListener("activate",event=>event.waitUntil(self.clients.claim()));
