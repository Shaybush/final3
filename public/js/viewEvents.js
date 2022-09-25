export const declareEvents = () => { 
    const github = document.querySelector("#github");
    const render = document.querySelector("#render");
    github.addEventListener("click",()=>{
        window.open("https://github.com/Shaybush/final3","_blank");
    })
    render.addEventListener("click",()=>{
        window.open("https://dashboard.render.com/web/srv-ccm0qrmn6mphavi6h7ug","_blank");
    })
}