require.config({
    paths: {
        jquery: "../jquery-2.1.1.min"
    }
});
require(["test/1","jquery"],function(m2,$){
    alert(JSON.stringify(m2));
    console.log($);
});