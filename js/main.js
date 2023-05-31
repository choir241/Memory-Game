
/* Public API for cards to fetch "https://memory-game-backend-pizi.onrender.com/api/cards" */

const fetchCardData = async() => {
    try{
        const data = await fetch("https://memory-game-backend-pizi.onrender.com/api/cards");
            data.then(res=>res.json());
            data.then(data=>console.log(data));
    }catch(err){
        console.error(err);
    }
}
