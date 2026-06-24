export const getUserInitials =(userName)=>{

    if(!userName)return;

    const wordsArray = userName.split(" ");
    let initials = ``;

    if(wordsArray[0]){
        initials+= wordsArray[0][0];
    }
    if(wordsArray[1]){
        initials+=wordsArray[1][0]
    }
    return initials;
    
}