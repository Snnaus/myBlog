'use strict';

angular.module('workspaceApp')
  .controller('EditPostCtrl', function ($scope, $routeParams, Auth, $http, $location, $sce) {
    
     //This is the authentication of the view.
    $scope.isLoggedIn = Auth.isLoggedIn();
    $scope.isAdmin = Auth.isAdmin();
    $scope.getCurrentUser = Auth.getCurrentUser();
    /*if($scope.isLoggedIn === false){
      $location.path('/');
    }*/
    $scope.editPost = {};
    $http.get('/api/posts/'+$routeParams.id).success(function(post){
      $scope.editPost = post;
      $scope.postTags = post.category.join([',']);
      $scope.editPost.postDate = new Date(post.postDate);
      $scope.picture = post.thumbPic;
    });
    
   
    //This is all of the post relevant items for the view.
    $scope.preview = false;
    
    
    
    var converter = new showdown.Converter();
    
    $scope.convert = function(content, date){
      console.log($scope.editPost, date);
      var newTags = this.postTags.split([',']), modTags = null;
      newTags = newTags.map(function(tag){return tag.trim()});
      console.log(newTags);
      if(newTags.length > 0 && newTags[0] !== ''){
        modTags = newTags.map(function(data){
          return "<a href='/cat/"+data+"'>"+data+"</a>";
        }).reduce(function(prev, curr){
          return prev + ', '+ curr;
        });
      }
      if(content){
        $scope.editPost.formatDate = date.getMonth()+ 1 +'/'+ date.getDate() +'/'+date.getFullYear();
        var title = "<div class='mdl-card__title'><h2 class='postTitle'>"+$scope.editPost['name']+ "</h2></div>";
        if($scope.picture){
          title = "<div class='mdl-card__media' style=\"background-image: url('"+$scope.editPost['thumbPic']+"');\"><h2 class='postTitle'>"+$scope.editPost['name']+ "</h2></div>";
        }
        content =  title + '\n' + "<div class='mdl-card__subtitle-text date'>" + $scope.editPost.formatDate + '</div>\n' + content;
        content = content + "\n \n" + "<sup><sub> Written by: "+ $scope.editPost.author + "</sub></sup>";
        if(modTags){
          content = content + "<sup><sub>"+" || Tagged under: " + modTags + "</sub></sup>";
        }
        content = content + "<a href='http://twitter.com/intent/tweet?status="+$scope.editPost['name'] + " by "+$scope.editPost.author+"'><span class='fa-stack smFooter'><i class='fa fa-twitter fa-stack-1x'></i></span></a>"+"<a ><span class='fa-stack smFooter'><i class='fa fa-facebook fa-stack-1x'></i></span></a>";
        //href='http://www.facebook.com/sharer/sharer.php?u=[URL]&title='"+$scope.title + " by "+$scope.author+"'
        $scope.editPost.body = converter.makeHtml(content);
        //$scope.result = content;
        $scope.preview = true;
      }
    };
    
    $scope.goBack = function(){
      $scope.preview = false;
    };
    
    $scope.savePost = function(){
      var newTags = this.postTags.split([',']).map(function(tag){return tag.trim()});
      var urlID = this.editPost.for +'/'+ this.editPost.name.split([' ']).join(['-']);
      console.log(this.editPost);
      $scope.editPost['category'] = newTags;
      $scope.editPost['urlID'] = urlID;
      $http.put('/api/posts/'+$routeParams.id, $scope.editPost);
      $location.path('/fileManage');
    };
  });
