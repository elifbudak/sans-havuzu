const tagsEl=document.getElementById("tags");   
const textarea=document.getElementById("textarea");

textarea.focus();

textarea.addEventListener("keyup",(e)=>{
    createTags(e.target.value);

    if(e.key==="Enter"){
        setTimeout(()=>{
            e.target.value="";
        },10);
        randomSelect();
    }
});


function createTags(input){
    const tags=input.split(",")
    .filter(tag=>tag.trim()!=="")
    .map(tag=>tag.trim());
//console.log(tags);
    tagsEl.innerHTML="";
    tags.forEach(tag=>{
        const tagEl=document.createElement("span");
        tagEl.classList.add("tag");
        tagEl.innerText=tag;
        tagsEl.appendChild(tagEl);
    });
}


function randomSelect(){
    const times = 30;
    let lastTag = null;

    const interval = setInterval(()=>{
        // Öncekini temizle
        if(lastTag) unhighlightTag(lastTag);
        
        // Yenisini highlight et
        lastTag = pickRandomTag();
        highlightTag(lastTag);

    }, 100);

    setTimeout(()=>{
        clearInterval(interval);
        
        // Hepsini temizle, sadece son seçileni highlight et
        document.querySelectorAll(".tag").forEach(t => unhighlightTag(t));
        
        const winner = pickRandomTag();
        highlightTag(winner);

    }, times * 100);
}
  

function unhighlightTag(tag){
    tag.classList.remove("highlight");
}

function pickRandomTag(){
    const tags=document.querySelectorAll(".tag");
    return tags[Math.floor(Math.random()*tags.length)];
}

function highlightTag(tag){
    tag.classList.add("highlight");
}