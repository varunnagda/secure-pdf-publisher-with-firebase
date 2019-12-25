firebase.initializeApp(config);
var sortRef="";
var urls = new Array();
var cat_type = new Array();
var title;
var count = -1;
var rootRef = firebase.database().ref('ebooks/');
var catRef = rootRef.child('category/');

//console.log(rootRef);
rootRef.on("child_added", snap => {
    
    count++;
    title = snap.child('file_name').val();
    var description = snap.child('description').val();
    var url = snap.child('url').child('i').val();
    var category_details=snap.child('category_details').val();
    var element_key=snap.key;

   
html_write_function(url ,description , title , count , element_key,category_details);



});


var cat_count=-1;
var cat_array= new Array();
catRef.on("child_added" , snap2 =>{
   
cat_type=snap2.key;

 cat_array[cat_count+1]=cat_type;
cat_count++;
Cat_write_function(cat_type , cat_count);



});

function Cat_write_function(cat_type,cat_count){

$('#cat_type_holder').append("<li  onclick="+"my_cat_Function("+cat_count+ ")"+" > "+"  <div > " +
       
   " <a href="+"#"+">"+cat_type+"</a>" +
     " </div>" +
     " </div>"  +"</li>");
    
}

function my_cat_Function(y){
var sort_keys = new Array();

sortRef = firebase.database().ref('ebooks/category/'+cat_array[y]+'/'); 
var sort_count=-1;
sortRef.on("child_added", snap3 => {
 sort_count++;
 var sort_key=snap3.key;

 sort_keys.push(sort_key);


 }); 
 document.getElementById('myUL_pdf_view').innerHTML = "";
for(var k=0; k<=sort_count; k++){


   var query = firebase.database().ref('ebooks/'+sort_keys[k]);
query.on("value", snap_sort => {
    var description = snap_sort.child('description').val();
    var url = snap_sort.child('url').child('i').val();
    var category_details=snap_sort.child('category_details').val();
var title=snap_sort.child('file_name').val();
document.getElementById('myUL_pdf_view').style.display = "block";
$('#myUL_pdf_view').append(

" <li onclick="+"myFunction("+count+")"+" id="+"list_row"+"> " +
"    <div "+"id="+"title_id"+">" +
  title   + "  <div >"
+ "    nature</div> " +
"<div > " +
description +
"<a >"+category_details+"</a>"+
"  </div>" +
"  <div > " +

" <a href="+"pdf/web/viewer.html"+">"+"Read ebook"+"</a>" +
" </div>" +
" </div>" +
" </li>"
);



});
}    


    }
    
    





function html_write_function(url ,description , title , count , element_key ,category_details) {





console.log(count);
    if(url !=null){
    urls.push(url);


    
    
    $('#myUL_pdf_view').append(

        " <li onclick="+"myFunction("+count+")"+" id="+"list_row"+"> " +
        "    <div "+"id="+"title_id"+">" +
                  title   + "  <div >"
        + "    nature</div> " +
        "<div > " +
        description +
           "<a >"+category_details+"</a>"+
        "  </div>" +
        "  <div > " +
       
        " <a href="+"pdf/web/viewer.html"+">"+"Read ebook"+"</a>" +
        " </div>" +
        " </div>" +
        " </li>"
    );


        }

}








        function myFunction(x) {


            localStorage.setItem('path',urls[x]);
            
        }

     


        jQuery(document).ready(function($){

$('.live-search-list li').each(function(){
$(this).attr('data-search-term', $(this).text().toLowerCase());
});

$('.live-search-box').on('keyup', function(){

var searchTerm = $(this).val().toLowerCase();

$('.live-search-list li').each(function(){
if (title.indexOf(searchTerm) > -1) {
  //  $(this).show();
  $("#list_row").hide();
} else {
//    $(this).hide();
// alert("hh");

}

});

});

});