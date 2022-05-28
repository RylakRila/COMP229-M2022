// IIFE -- Immediately Invoked Function Expression
// AKA - Anonymous Self-Executing Function

(function() {
    
    let Start = () => {
        console.log("App Started...");
        for (let index = 0; index < 10; index++) {
            console.log(index);
        }
    }
    
    window.addEventListener("load", Start);
    
})();