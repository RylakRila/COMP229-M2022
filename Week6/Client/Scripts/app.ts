//IIFE
(function()
{

    function Start()
    {
        console.log("App Started!");

        $("a.delete").on("click", (evt) => {
            if(!confirm("Are you sure?")) {
                evt.preventDefault();
                location.href = "/movie-list";
            }
        })
    }

    window.addEventListener("load", Start);

})();