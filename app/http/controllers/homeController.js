function homeController(){
    return {
        index(request,response){
            response.render('home');
        }
    }
}

module.exports = homeController